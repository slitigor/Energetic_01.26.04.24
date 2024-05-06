import { ISwitchgear } from "@/data/types";
import { create } from "zustand";
import { appDataBase } from "../helper";

interface SwitchgearStore {
  switchgearList: ISwitchgear[];
  getAllSwGear: () => Promise<void>;
  createSwGear: (swg: ISwitchgear) => Promise<void>;
  updateSwGear: (id: number, swg: ISwitchgear) => Promise<void>;
  deleteSwGear: (id: number) => Promise<void>;
}

export const useSwitchgearStore = create<SwitchgearStore>()((set, get) => ({
  switchgearList: [],
  getAllSwGear: async () => {
    try {
      const r = await appDataBase.get("switchgear");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        switchgearList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createSwGear: async (swg) => {
    const { switchgearList } = get();
    try {
      const r = await appDataBase.post("switchgear", swg);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        switchgearList: [...switchgearList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateSwGear: async (id, swg) => {
    const { switchgearList } = get();
    try {
      const r = await appDataBase.put(`switchgear/${id}`, swg);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        switchgearList: switchgearList.map((s) => (s.id === id ? r.data : s)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSwGear: async (id) => {
    const { switchgearList } = get();
    try {
      const r = await appDataBase.delete(`switchgear/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        switchgearList: switchgearList.filter((s) => s.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
