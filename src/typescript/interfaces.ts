

export interface IActDoc {
  actDate: number
  actDateNumber: string
  actDateTo: number
  actNumber: string
  clientTextBlock: string
  clientСompany: string
  clientСompanyDirector: string
  cost: string
  details: IActDetails[]
  docName: string
  executorTextBlock: string
  info: IActInfo
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
  account: string
  address: string
  bank: string
  email: string
  initials: string
  name: string
  reg: string
  tel: string
}
export interface IOption {
  value: string | number;
  label: string;
}
