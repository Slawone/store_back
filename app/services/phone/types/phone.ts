export type PhoneForDb = {
  brandId: number;
  name: string;
  description?: string;
  price: number;
};

export type PhoneFromDb = {
  brandId: number,
  id: number;
  name: string;
  description?: string;
  price: number;
};
