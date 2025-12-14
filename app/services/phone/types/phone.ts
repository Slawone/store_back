export type PhoneForDb = {
  brandId: number;
  name: string;
  description?: string;
  price: number;
};

export type PhoneFromDb = {
  id: number;
  brandId: number;
  name: string;
  description?: string;
  price: number;
};
