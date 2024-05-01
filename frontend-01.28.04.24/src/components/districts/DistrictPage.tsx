import { useDistrictStore } from "@/model/district/useDistrictStore";
import { useEffect } from "react";
import DataTable from "../ui/DataTable";
import { Columns } from "./Column";

const DistrictPage = () => {
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={Columns} data={districtList} />
    </div>
  );
};

export default DistrictPage;
