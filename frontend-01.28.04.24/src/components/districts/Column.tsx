import { IDistrict, districtColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/column-header";
import { Checkbox } from "../ui/checkbox";
import EditDistrictDialog from "./EditDistrictDialog";

export const Columns: ColumnDef<IDistrict>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="name"
        titleList={districtColName}
      />
    ),
  },
  {
    accessorKey: "ddesc",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ddesc"
        titleList={districtColName}
      />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="address"
        titleList={districtColName}
      />
    ),
    cell: ({ row }) => {
      const district = row.original;
      return <div>{district.address.zip}</div>;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const district = row.original;
      return <EditDistrictDialog district={district} />;
    },
  },
];
