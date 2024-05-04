import { ISwitchgear } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<ISwitchgear>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "sqType",
    header: "Тип РУ",
  },
  {
    accessorKey: "voltage",
    header: "Напряжение",
  },
  {
    accessorKey: "substation",
    header: "Подстанция",
    cell: ({ row }) => {
      const switchgear = row.original;

      return <div>{switchgear.substation.name}</div>;
    },
  },
];
