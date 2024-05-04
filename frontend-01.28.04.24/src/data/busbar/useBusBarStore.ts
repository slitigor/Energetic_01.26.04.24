import { IBusBar } from "@/data/types";
import { create } from "zustand";
import { appDataBase } from "../helper";

interface BusBarStore {
  busBarList: IBusBar[];
  getAllBB: () => Promise<void>;
  createBB: (bb: IBusBar) => Promise<void>;
  updateBB: (id: number, bb: IBusBar) => Promise<void>;
  deleteBB: (id: number) => Promise<void>;
}

export const useBusBarStore = create<BusBarStore>()((set, get) => ({
  busBarList: [],
  getAllBB: async () => {
    try {
      const r = await appDataBase.get("/bus-bar");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        busBarList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createBB: async (bb) => {
    const { busBarList } = get();
    try {
      const r = await appDataBase.post("/bus-bar", bb);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        busBarList: [...busBarList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateBB: async (id, bb) => {
    const { busBarList } = get();
    try {
      const r = await appDataBase.put(`/bus-bar/${id}`, bb);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        busBarList: busBarList.map((bb) => (bb.id === id ? r.data : bb)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteBB: async (id) => {
    const { busBarList } = get();
    try {
      const r = await appDataBase.delete(`/bus-bar/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        busBarList: busBarList.filter((bb) => bb.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
