import { IDistrict } from "@/utils/types";
import { create } from "zustand";
import { appDataBase } from "../helper";

interface DistrictStore {
  districtList: IDistrict[];
  getAllDistrict: () => Promise<void>;
  createDistrict: (d: IDistrict) => Promise<void>;
  updateDistrict: (n: string, d: IDistrict) => Promise<void>;
  deleteDistrict: (n: string) => Promise<void>;
}

export const useDistrictStore = create<DistrictStore>()((set, get) => ({
  districtList: [],
  getAllDistrict: async () => {
    try {
      const r = await appDataBase.get("district");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        districtList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createDistrict: async (d) => {
    const { districtList } = get();
    try {
      const r = await appDataBase.post("district", d);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        districtList: [...districtList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateDistrict: async (n, d) => {
    const { districtList } = get();
    try {
      const r = await appDataBase.put(`district/${n}`, d);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        districtList: districtList.map((district) =>
          district.name === n ? r.data : district
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteDistrict: async (n) => {
    const { districtList } = get();
    try {
      const r = await appDataBase.delete(`district/${n}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        districtList: districtList.filter((district) => district.name !== n),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
