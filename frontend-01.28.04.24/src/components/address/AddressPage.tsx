import { useAddressStore } from "@/data/address/useAddressStore";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Columns";
import { useEffect } from "react";

const AddressPage = () => {
  const [addressList, getAllAddrs] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddrs,
  ]);

  useEffect(() => {
    getAllAddrs();
  }, [getAllAddrs]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список адресов РЭС
      </h2>
      <DataTable columns={Columns} data={addressList} />
    </div>
  );
};

export default AddressPage;
