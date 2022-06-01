export interface IActDoc {
  docName: string;
  city?: string;
  actNumber: string;
  contractNumber?: string;
  contractDateFrom: number;
  actDate: number;
  cost: string;
  details: IActDetails[];
  info: IActInfo;
  billAuthor?: string;
}
export interface IActDetails {
  price: number;
  quantity: string;
  title: string;
  total: string;
  units: string;
}
export interface IActInfo {
  client: IActInfoUser;
  executor: IActInfoUser;
}
export interface IActInfoUser {
  companyName?: string;
  name: string;
  surname: string;
  patronym: string;
  address: string;
  reg: string;
  email: string;
  tel: string;
  bank: string;
  account: string;
  entityType?: string;
}
export interface IOption {
  value: string | number;
  name: string;
}

export interface ICurrency {
  name: string;
  rate?: number;
  symbol: string;
}

export interface IInvoice {
  invoice: string;
  teamName: string;
  code: string;
  location: string;
  email: string;
  invoiceNumber: string;
  agreementNumber: string;
  billToColumn1: string;
  billToColumn2: string;
  billToColumn3: string;
  invoiceDate: Date;
  dueDate: Date;
  details: IInvoiceDetails[];
  notes: string;
  wireTransferDetails: string;
}

export interface IInvoiceDetails {
  title: string;
  price: number;
  quantity: string;
  total: string;
}

export interface IRoutes {
  home: string;
  actOfWork: string;
  bill: string;
  login: string;
  registration: string;
  companyRegistration: string;
}

export interface IDetails {
  title: string;
  units: string;
  price: number;
  quantity: string;
  total: string;
}
