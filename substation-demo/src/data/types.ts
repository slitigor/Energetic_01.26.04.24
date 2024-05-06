export const unomList: number[] = [220, 110, 35, 10, 6, 0.4, 0.22];
export const swTypeList: string[] = ["ОРУ", "ЗРУ", "КРУ", "КРУН"];

export interface ISubstation {
  id: number;
  name: string;
}

export interface ISwGear {
  id: number;
  voltage: number;
  sgType: string;
  substationId: number;
  numb: number;
  isSec: boolean;
}
