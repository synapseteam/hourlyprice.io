

export interface IActDoc {
  docName: string
  city?: string
  actNumber: string
  contractNumber?: string
  contractDateFrom: number
  actDate: number
  cost: string
  details: IActDetails[]
  info: IActInfo
  billAuthor?: string
}
export interface IActDetails {
  price: number
  quantity: string
  title: string
  total: string
  units: string

}
export interface IActInfo {
  client: IActInfoUser
  executor: IActInfoUser
}
export interface IActInfoUser {
  companyName?: string
  name: string
  surname: string
  patronym: string
  address: string
  reg: string
  email: string
  tel: string
  bank: string
  account: string
  entityType?: string
}
export interface IOption {
  value: string | number;
  label: string;
}
