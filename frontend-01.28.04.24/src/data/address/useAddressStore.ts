import { IAddress } from "@/data/types";
import { create } from "zustand";
import { appDataBase } from "../helper";

interface AddressStore {
  addressList: IAddress[];
  getAllAddrs: () => Promise<void>;
  createAddrs: (addr: IAddress) => Promise<void>;
  updateAddrs: (zip: string, addr: IAddress) => Promise<void>;
  deleteAddrs: (zip: string) => Promise<void>;
}

export const useAddressStore = create<AddressStore>()((set, get) => ({
  addressList: [],
  getAllAddrs: async () => {
    try {
      const r = await appDataBase.get("address");
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        addressList: r.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createAddrs: async (addr) => {
    const { addressList } = get();
    try {
      const r = await appDataBase.post("address", addr);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        addressList: [...addressList, r.data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateAddrs: async (zip, addr) => {
    const { addressList } = get();
    try {
      const r = await appDataBase.put(`address/${zip}`, addr);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        addressList: addressList.map((a) => (a.zip === zip ? r.data : a)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteAddrs: async (zip) => {
    const { addressList } = get();
    try {
      const r = await appDataBase.delete(`address/${zip}`);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      set({
        addressList: addressList.filter((a) => a.zip !== zip),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
