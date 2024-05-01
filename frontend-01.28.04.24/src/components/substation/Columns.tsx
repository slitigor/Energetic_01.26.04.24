import { ISubstation } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<ISubstation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "psSchema",
    header: "Схема ПС",
  },
  {
    accessorKey: "district",
    header: "РЭС",
    cell: ({ row }) => {
      const substation = row.original;

      return <div>{substation.district.name}</div>;
    },
  },
];
