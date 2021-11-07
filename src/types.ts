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
  fromYear: number;
  toYear: number;
}

export type { Transaction, DateTime };
