export type IProductItem = {
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
