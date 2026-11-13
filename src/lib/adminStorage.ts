import fs from 'fs/promises';
import path from 'path';

const GITHUB_OWNER = process.env.GITHUB_OWNER || 'neonvibeai';
const GITHUB_REPO = process.env.GITHUB_REPO || 'skin-medic';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

export interface StorageResult {
  mode: 'local' | 'github';
  commitSha?: string;
}

export function isCloudEnvironment(): boolean {
  return Boolean(process.env.VERCEL);
}

export function hasGitHubToken(): boolean {
  return Boolean(process.env.GITHUB_TOKEN);
}

async function githubRequest(url: string, init?: RequestInit): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(
      'GITHUB_TOKEN is not configured in Vercel Environment Variables. Add GITHUB_TOKEN (GitHub Personal Access Token with repo write access) in Vercel Project Settings -> Environment Variables so changes made in /admin persist to the repository and redeploy automatically.'
    );
  }
  return fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
}

export async function readRepoJson<T>(relativePath: string): Promise<T> {
  if (isCloudEnvironment() && hasGitHubToken()) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${relativePath}?ref=${GITHUB_BRANCH}`;
    const res = await githubRequest(apiUrl);
    if (res.ok) {
      const data = (await res.json()) as { content?: string };
      if (data.content) {
        const decoded = Buffer.from(data.content, 'base64').toString('utf8');
        return JSON.parse(decoded) as T;
      }
    }
  }

  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath);
  const raw = await fs.readFile(fullPath, 'utf8');
  return JSON.parse(raw) as T;
}

export async function writeRepoFile(
  relativePath: string,
  content: Buffer | string,
  commitMessage: string
): Promise<StorageResult> {
  if (!isCloudEnvironment()) {
    const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    return { mode: 'local' };
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${relativePath}`;
  let existingSha: string | undefined;

  const getRes = await githubRequest(`${apiUrl}?ref=${GITHUB_BRANCH}`);
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha?: string };
    existingSha = existing.sha;
  } else if (getRes.status !== 404) {
    const errText = await getRes.text();
    throw new Error(`GitHub read failed (${getRes.status}): ${errText}`);
  }

  const base64Content = Buffer.isBuffer(content)
    ? content.toString('base64')
    : Buffer.from(content, 'utf8').toString('base64');

  const putRes = await githubRequest(apiUrl, {
    method: 'PUT',
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      branch: GITHUB_BRANCH,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub save failed (${putRes.status}): ${errText}`);
  }

  const putData = (await putRes.json()) as { commit?: { sha?: string } };
  return { mode: 'github', commitSha: putData.commit?.sha };
}

export async function writeRepoJson<T>(
  relativePath: string,
  data: T,
  commitMessage: string
): Promise<StorageResult> {
  const formatted = `${JSON.stringify(data, null, 2)}\n`;
  return writeRepoFile(relativePath, formatted, commitMessage);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
