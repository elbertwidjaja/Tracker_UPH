import React, { createContext, useContext, useState, ReactNode } from "react";

interface TransactionData {
  transactionData: any[];
  setTransactionData: (data: any[]) => void;
}

const defaultValue: TransactionData = {
  transactionData: [],
  setTransactionData: () => {},
};

const TransactionDataContext = createContext(defaultValue);

export const useTransactionData = () => useContext(TransactionDataContext);

export const TransactionDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactionData, setTransactionData] = useState<any[]>([]);

  return (
    <TransactionDataContext.Provider
      value={{ transactionData, setTransactionData }}
    >
      {children}
    </TransactionDataContext.Provider>
  );
};
