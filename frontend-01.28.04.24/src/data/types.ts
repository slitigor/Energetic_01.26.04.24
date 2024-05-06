export const schemaList: string[] = [
  "110/35/10 кВ",
  "110/35/6 кВ",
  "110/10 кВ",
  "110/6 кВ",
  "35/10 кВ",
  "35/6 кВ",
];

export const sgTypeList: string[] = ["ОРУ", "ЗРУ", "КРУ", "КРУН"];

export const voltageList: string[] = [
  "220 кВ",
  "110 кВ",
  "35 кВ",
  "10 кВ",
  "6 кВ",
  "0.4 кВ",
  "0.22 кВ",
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

export const addressColName = new Map([
  ["zip", "Почтовый индекс"],
  ["city", "Населённый пункт"],
  ["street", "Улица, дом"],
  ["actions", "Действия"],
]);

export interface IDistrict {
  name: string;
  ddesc?: string;
  address: IAddress;
}

export const districtColName = new Map([
  ["name", "Название"],
  ["ddesc", "Описание"],
  ["address", "Адрес"],
  ["actions", "Действия"],
]);

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
  sgType: string;
  voltage: string;
  substation: ISubstation;
}

export const switchgearColName = new Map([
  ["id", "ID"],
  ["sgType", "Вид РУ"],
  ["voltage", "Напряжение"],
  ["substation", "Подстанция"],
  ["actions", "Действия"],
]);

export interface IBusBar {
  id: number;
  isSection: boolean;
  numb: number;
  switchgear: ISwitchgear;
}

export const busbarColName = new Map([
  ["id", "ID"],
  ["isSection", "Секция/Система"],
  ["numb", "Номер"],
  ["switchgear", "Вид РУ"],
  ["actions", "Действия"],
]);
