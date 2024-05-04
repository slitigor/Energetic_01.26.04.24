import { ISubstation } from "@/data/types";
import { create } from "zustand";
import { appDataBase } from "../helper";

interface SubstationStore {
  substationList: ISubstation[];
  getAllSStation: () => Promise<void>;
  createSStation: (s: ISubstation) => Promise<void>;
  updateSStation: (id: number, s: ISubstation) => Promise<void>;
  deleteSStation: (id: number) => Promise<void>;
}

export const useSubstationStore = create<SubstationStore>()((set, get) => ({
  substationList: [],
  getAllSStation: async () => {
    try {
      const r = await appDataBase.get("substation");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createSStation: async (s) => {
    const { substationList } = get();
    try {
      const r = await appDataBase.post("substation", s);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        substationList: [...substationList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateSStation: async (id, s) => {
    const { substationList } = get();
    try {
      const r = await appDataBase.put(`substation/${id}`, s);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.map((substation) =>
          substation.id === id ? r.data : substation
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteSStation: async (id) => {
    const { substationList } = get();
    try {
      const r = await appDataBase.get(`substation/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        substationList: substationList.filter(
          (substation) => substation.id !== id
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
