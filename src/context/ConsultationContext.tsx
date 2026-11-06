'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsultationContextType {
  isOpen: boolean;
  selectedProduct: string | null;
  openConsultation: (productName?: string) => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const openConsultation = (productName?: string) => {
    setSelectedProduct(productName || null);
    setIsOpen(true);
  };

  const closeConsultation = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ConsultationContext.Provider
      value={{
        isOpen,
        selectedProduct,
        openConsultation,
        closeConsultation
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
}
