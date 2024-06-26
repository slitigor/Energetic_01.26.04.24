import { useSwitchgearStore } from "@/data/switchgear/useSwitchgearStore";
import { useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Columns";
import { switchgearColName } from "@/data/types";
import AddSwGearDialog from "./AddSwGearDialog";

const SwitchgearPage = () => {
  const [switchgearList, getAllSwGear] = useSwitchgearStore((state) => [
    state.switchgearList,
    state.getAllSwGear,
  ]);

  useEffect(() => {
    getAllSwGear();
  }, [getAllSwGear]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список распредустройств
      </h2>
      <DataTable
        columns={Columns}
        data={switchgearList}
        columnName={switchgearColName}
        addedDialog={<AddSwGearDialog />}
      />
    </div>
  );
};

export default SwitchgearPage;
