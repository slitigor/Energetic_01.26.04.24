import { IBusBar, busbarColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import EditBusBarDialog from "./EditBusBarDialog";

const Columns: ColumnDef<IBusBar>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="id"
        titleList={busbarColName}
      />
    ),
  },
  {
    accessorKey: "numb",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="numb"
        titleList={busbarColName}
      />
    ),
  },
  {
    accessorKey: "isSection",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="isSection"
        titleList={busbarColName}
      />
    ),
    cell: ({ row }) => {
      const isSection = row.original.isSection;
      return <div>{isSection ? "С" : "СШ"}</div>;
    },
  },
  {
    accessorKey: "switchgear",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="switchgear"
        titleList={busbarColName}
      />
    ),
    cell: ({ row }) => {
      const switchgear = row.original.switchgear;
      return (
        <div>
          {switchgear.sgType}&nbsp;{switchgear.voltage}&nbsp;ПС&nbsp;
          {switchgear.substation.name}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const busBar = row.original;
      return <EditBusBarDialog busBar={busBar} />;
    },
  },
];

export default Columns;
