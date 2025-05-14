export interface CreditCardExpense {
  id?: string;
  date: string;
  transactionDetail: string;
  amountInPesos: number;
  amountInDollars?: number;
  installments: number;
  remainingInstallments?: number;
  isSelected?: boolean;
} 