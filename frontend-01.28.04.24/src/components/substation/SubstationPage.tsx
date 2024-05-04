import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Columns";
import { substationColName } from "@/data/types";
import AddSubstationDialog from "./AddSubstationDialog";

const SubstationPage = () => {
  const [substationList, getAllSStation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSStation,
  ]);

  useEffect(() => {
    getAllSStation();
  }, [getAllSStation]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      <DataTable
        columns={Columns}
        data={substationList}
        columnName={substationColName}
        addedDialog={<AddSubstationDialog />}
      />
    </div>
  );
};

export default SubstationPage;
