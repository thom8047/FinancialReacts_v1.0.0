interface Transaction {
  TRANS_DATE: string;
  POST_DATE: string;
  REF_ID: string;
  DESCR: string;
  CHARGE: string;
}

interface DateTime {
  fromMonth: number;
  toMonth: number;
  year: number;
}

export type { Transaction, DateTime };
