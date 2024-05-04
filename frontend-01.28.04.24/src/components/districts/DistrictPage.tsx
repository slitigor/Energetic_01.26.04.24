import { useDistrictStore } from "@/data/district/useDistrictStore";
import { useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Column";
import { districtColName } from "@/data/types";
import AddDistrictDialog from "./AddDistrictDialog";

const DistrictPage = () => {
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список районов электросетей
      </h2>
      <DataTable
        columns={Columns}
        data={districtList}
        columnName={districtColName}
        addedDialog={<AddDistrictDialog />}
      />
    </div>
  );
};

export default DistrictPage;
