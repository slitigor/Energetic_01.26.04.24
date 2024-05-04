import { IAddress, addressColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import EditAddressDialog from "./EditAddressDialog";

export const Columns: ColumnDef<IAddress>[] = [
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
    accessorKey: "zip",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="zip"
        titleList={addressColName}
      />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="city"
        titleList={addressColName}
      />
    ),
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="street"
        titleList={addressColName}
      />
    ),
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const address = row.original;
      return <EditAddressDialog address={address} />;
    },
  },
];
