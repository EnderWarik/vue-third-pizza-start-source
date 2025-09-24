export type ProductItem = {
  id: string;
  title: string;
  img: string;
  imgWidth?: number;
  imgHeight?: number;
  size: string;
  dough: string;
  sauce: string;
  fillings?: string[];
  alt?: string;
  count: number;
  price: number;
};
export type AdditionalItem = {
  id: string;
  img: string;
  title: string;
  price: number | string;
  imgWidth?: number;
  imgHeight?: number;
  alt?: string;
};
