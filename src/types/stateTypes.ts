export type stateSchema = {
  amount: string;
  fromAccount: string;
  payee: string;
  date: Date;
  repeat: string;
  note: string;
};

export type billType = { id: number; state: stateSchema };
