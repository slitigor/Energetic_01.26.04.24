import { useAddressStore } from "@/model/address/useAddressStore";
import DataTable from "../ui/DataTable";
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
    <div className="container mx-auto py-10">
      <DataTable columns={Columns} data={addressList} />
    </div>
  );
};

export default AddressPage;
