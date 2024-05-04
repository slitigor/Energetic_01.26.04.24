import { ISwitchgear, switchgearColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";

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
    accessorKey: "sqType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="sqType"
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
];
