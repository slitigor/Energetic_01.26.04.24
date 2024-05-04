import { useAddressStore } from "@/data/address/useAddressStore";
import { IAddress } from "@/data/types";
import { FC, useState } from "react";
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

interface DialogProps {
  address: IAddress;
}

const EditAddressDialog: FC<DialogProps> = ({ address }) => {
  const [updateAddrs, deleteAddrs] = useAddressStore((state) => [
    state.updateAddrs,
    state.deleteAddrs,
  ]);
  const [editAddres, setEditAddress] = useState<IAddress>(address);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);

  const handleSaveClick = () => {
    if (editAddres.zip && editAddres.city && editAddres.street)
      updateAddrs(address.zip, editAddres);
  };

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
                    setIsDeleteDialog(false);
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
                    setIsDeleteDialog(true);
                    setIsEditDialog(false);
                  }}
                >
                  Удалить
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isDeleteDialog && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Вы действительно хотите удалить эту запись:</h2>
              <p>
                Индекс: &nbsp;{address.zip},&nbsp;адрес: &nbsp;{address.city},
                &nbsp;{address.street}
              </p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsDeleteDialog(false);
                  deleteAddrs(address.zip);
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
        <>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Редактирование</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zip" className="text-right">
                    Индекс
                  </Label>
                  <Input
                    id="zip"
                    disabled
                    value={editAddres.zip}
                    onChange={(e) =>
                      setEditAddress({
                        ...editAddres,
                        zip: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    Населённый пункт
                  </Label>
                  <Input
                    id="city"
                    value={editAddres.city}
                    onChange={(e) =>
                      setEditAddress({
                        ...editAddres,
                        city: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="street" className="text-right">
                    Улица, дом
                  </Label>
                  <Input
                    id="street"
                    value={editAddres.street}
                    onChange={(e) =>
                      setEditAddress({
                        ...editAddres,
                        street: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
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
        </>
      )}
    </Dialog>
  );
};

export default EditAddressDialog;
