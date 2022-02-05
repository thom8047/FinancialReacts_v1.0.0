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

interface tooltipProps {
  active: boolean;
  label: string | number;
  payload: any[];
}

export type { Transaction, DateTime, tooltipProps };
