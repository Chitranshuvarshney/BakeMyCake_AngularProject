export type CakeRequest = {
  id?: string;
  cakeName?: string;
  dateOfDelivery?: Date;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: number;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pinCode: number;
  totalBill?: number;
  quantity?: number;
  cakePrice?: number;
};
