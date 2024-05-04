export const schemaList: string[] = [
  "110/35/10 кВ",
  "110/35/6 кВ",
  "110/10 кВ",
  "110/6 кВ",
  "35/10 кВ",
  "35/6 кВ",
];

export const sectionList: string[] = [
  "в ТОРО",
  "вне ТОРО",
  "Нерегламентные работы",
  "Технологические потери времени",
  "Отсутствие",
];

export interface IAddress {
  zip: string;
  city: string;
  street: string;
}

export interface IDistrict {
  name: string;
  ddesc?: string;
  address: IAddress;
}

export interface ISubstation {
  id: number;
  name: string;
  psSchema: string;
  district: IDistrict;
}

export const substationColName = new Map([
  ["id", "ID"],
  ["name", "Называние ПС"],
  ["psSchema", "Схема ПС"],
  ["district", "РЭС"],
  ["actions", "Действия"],
]);

export interface ISwitchgear {
  id: number;
  sqType: string;
  voltage: string;
  substation: ISubstation;
}

export interface IBusBar {
  id: number;
  isSection: boolean;
  numb: number;
  switchgear: ISwitchgear;
}