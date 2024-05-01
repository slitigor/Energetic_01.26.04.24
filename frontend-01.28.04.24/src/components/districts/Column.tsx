import { IDistrict } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<IDistrict>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "ddesc",
    header: "Описание",
  },
  {
    accessorKey: "address",
    header: "Адрес",
    cell: ({ row }) => {
      const district = row.original;
      return <div>{district.address.zip}</div>;
    },
  },
];
