interface Transaction {
  date: string;
  amount: string;
}

interface DateTime {
  fromMonth: number;
  toMonth: number;
  year: number;
}

export type { Transaction, DateTime };
