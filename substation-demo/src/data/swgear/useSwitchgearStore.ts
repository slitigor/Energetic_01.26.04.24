import { create } from "zustand";
import { ISwGear } from "../types";
import { appDB } from "../helper";

interface SwitchgearStore {
  swGearList: ISwGear[];
  getAllSwGear: () => Promise<void>;
  createSwGear: (swg: ISwGear) => Promise<void>;
  updateSwGear: (id: number, swg: ISwGear) => Promise<void>;
  deleteSwGear: (id: number) => Promise<void>;
}

export const useSwGearStore = create<SwitchgearStore>()((set, get) => ({
  swGearList: [],
  getAllSwGear: async () => {
    const r = await appDB.get("swgears");
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      swGearList: r.data,
    });
  },
  createSwGear: async (swg) => {
    const { swGearList } = get();
    const r = await appDB.post("swgears", swg);
    if (r.status !== 200 && r.status !== 201) throw new Error("Server Error!");
    set({
      swGearList: [...swGearList, r.data],
    });
  },
  updateSwGear: async (id, swg) => {
    const { swGearList } = get();
    const r = await appDB.put(`swgears/${id}`, swg);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      swGearList: swGearList.map((swg) => (swg.id === id ? r.data : swg)),
    });
  },
  deleteSwGear: async (id) => {
    const { swGearList } = get();
    console.log("id: ", id);

    const r = await appDB.delete(`swgears/${id}`);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      swGearList: swGearList.filter((swg) => swg.id !== id),
    });
  },
}));
