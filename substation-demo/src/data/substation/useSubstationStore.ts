import { create } from "zustand";
import { ISubstation } from "../types";
import { appDB } from "../helper";

interface SubstationStore {
  stationList: ISubstation[];
  getAllSS: () => Promise<void>;
  createSS: (ss: ISubstation) => Promise<void>;
  updateSS: (id: number, ss: ISubstation) => Promise<void>;
  deleteSS: (id: number) => Promise<void>;
}

export const useSubstationStore = create<SubstationStore>()((set, get) => ({
  stationList: [],
  getAllSS: async () => {
    const r = await appDB.get("substation");
    if (r.status !== 200) throw new Error("Server Error!");
    set({ stationList: r.data });
  },
  createSS: async (ss) => {
    const { stationList } = get();
    const r = await appDB.post("substation", ss);
    if (r.status !== 200 && r.status !== 201) throw new Error("Server Error!");
    set({
      stationList: [...stationList, r.data],
    });
  },
  updateSS: async (id, ss) => {
    const { stationList } = get();
    const r = await appDB.put(`substation/${id}`, ss);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      stationList: stationList.map((s) => (s.id === id ? r.data : s)),
    });
  },
  deleteSS: async (id) => {
    const { stationList } = get();
    const r = await appDB.delete(`substation/${id}`);
    if (r.status !== 200) throw new Error("Server Error!");
    set({
      stationList: stationList.filter((s) => s.id !== id),
    });
  },
}));
