export interface IApiOrderAddress {
  id: number;
  name: string;
  street: string;
  building: string;
  flat?: string;
  comment?: string;
  userId: string;
}
