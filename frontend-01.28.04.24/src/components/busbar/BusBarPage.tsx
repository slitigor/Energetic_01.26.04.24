import { useBusBarStore } from "@/data/busbar/useBusBarStore";
import { DataTable } from "../ui/DataTable";
import Columns from "./Columns";
import { useEffect } from "react";
import { busbarColName } from "@/data/types";
import AddBusBarDialog from "./AddBusBarDialog";

const BusBarPage = () => {
  const [busBarList, getAllBB] = useBusBarStore((state) => [
    state.busBarList,
    state.getAllBB,
  ]);

  useEffect(() => {
    getAllBB();
  }, [getAllBB]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список секций шин
      </h2>
      <DataTable
        columns={Columns}
        data={busBarList}
        columnName={busbarColName}
        addedDialog={<AddBusBarDialog />}
      />
    </div>
  );
};

export default BusBarPage;
