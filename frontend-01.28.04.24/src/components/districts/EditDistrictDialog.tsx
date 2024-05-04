import { useAddressStore } from "@/data/address/useAddressStore";
import { useDistrictStore } from "@/data/district/useDistrictStore";
import { IDistrict } from "@/data/types";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DialogProps {
  district: IDistrict;
}
const EditDistrictDialog: FC<DialogProps> = ({ district }) => {
  const [deleteDistrict, updateDistrict] = useDistrictStore((state) => [
    state.deleteDistrict,
    state.updateDistrict,
  ]);
  const [addressList, getAllAddrs] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddrs,
  ]);
  const [editDistrict, setEditDistrict] = useState<IDistrict>(district);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [isDelDialog, setIsDelDialog] = useState(false);

  const handleSaveClick = () => {
    if (editDistrict.name && editDistrict.address !== undefined)
      updateDistrict(district.name, editDistrict);
  };

  const changeAddress = (zip: string) => {
    const addr = addressList.find((a) => a.zip === zip);
    if (addr !== undefined) setEditDistrict({ ...editDistrict, address: addr });
  };

  useEffect(() => {
    getAllAddrs();
  }, [getAllAddrs]);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="w-8 h-8 p-0">
            <span className="sr-only">Открыть</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsDelDialog(false);
                    setIsEditDialog(true);
                  }}
                >
                  Редактировать
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsEditDialog(false);
                    setIsDelDialog(true);
                  }}
                >
                  Удалить
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isDelDialog && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Вы действительно хотите удалить эту запись:</h2>
              <p>{district.name}&nbsp;РЭС</p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsDelDialog(false);
                  deleteDistrict(district.name);
                }}
              >
                Удалить
              </Button>
              <DialogClose asChild>
                <Button>Отмена</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
      {isEditDialog && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  value={editDistrict.name}
                  onChange={(e) =>
                    setEditDistrict({ ...editDistrict, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ddesc" className="text-right">
                  Схема ПС
                </Label>
                <Input
                  id="ddesc"
                  value={editDistrict.ddesc}
                  onChange={(e) =>
                    setEditDistrict({
                      ...editDistrict,
                      ddesc: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Адрес
                </Label>
                <Select onValueChange={(e) => changeAddress(e)}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Адрес" />
                  </SelectTrigger>
                  <SelectContent id="address">
                    <SelectGroup>
                      {addressList.map((address) => (
                        <SelectItem value={address.zip} key={address.zip}>
                          {address.city}&nbsp;{address.street}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsEditDialog(false);
                  handleSaveClick();
                }}
              >
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};

export default EditDistrictDialog;
