import { ISwitchgear, switchgearColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import EditSwitchgearDialog from "./EditSwitchgearDialog";

export const Columns: ColumnDef<ISwitchgear>[] = [
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
        titleList={switchgearColName}
      />
    ),
  },
  {
    accessorKey: "sgType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="sgType"
        titleList={switchgearColName}
      />
    ),
  },
  {
    accessorKey: "voltage",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="voltage"
        titleList={switchgearColName}
      />
    ),
  },
  {
    accessorKey: "substation",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="substation"
        titleList={switchgearColName}
      />
    ),
    cell: ({ row }) => {
      const substation = row.original.substation;

      return <div>{substation.name}</div>;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const switchgear = row.original;
      return <EditSwitchgearDialog switchgear={switchgear} />;
    },
  },
];
