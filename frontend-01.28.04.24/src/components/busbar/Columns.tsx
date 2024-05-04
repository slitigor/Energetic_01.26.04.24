import { IBusBar } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";

const Columns: ColumnDef<IBusBar>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "numb",
    header: "Номер",
  },
  {
    accessorKey: "isSection",
    header: "Секция/Система",
    cell: ({ row }) => {
      const isSection = row.original.isSection;
      return <div>{isSection ? "С" : "СШ"}</div>;
    },
  },
  {
    accessorKey: "switchgear",
    header: "РУ",
    cell: ({ row }) => {
      const switchgear = row.original.switchgear;
      return (
        <div>
          {switchgear.sgType} {switchgear.voltage}
        </div>
      );
    },
  },
];

export default Columns;
