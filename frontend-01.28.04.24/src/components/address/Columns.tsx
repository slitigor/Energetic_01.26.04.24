import { IAddress } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<IAddress>[] = [
  {
    accessorKey: "zip",
    header: "Индекс",
  },
  {
    accessorKey: "city",
    header: "Город",
  },
  {
    accessorKey: "street",
    header: "Улица",
  },
];
