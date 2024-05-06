import { useBusBarStore } from "@/data/busbar/useBusBarStore";
import { useSwitchgearStore } from "@/data/switchgear/useSwitchgearStore";
import { IBusBar } from "@/data/types";
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
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoreHorizontal } from "lucide-react";
import { Input } from "../ui/input";

interface DialogProps {
  busBar: IBusBar;
}

const EditBusBarDialog: FC<DialogProps> = ({ busBar }) => {
  const [updateBB, deleteBB] = useBusBarStore((state) => [
    state.updateBB,
    state.deleteBB,
  ]);
  const [switchgearList, getAllSwGear] = useSwitchgearStore((state) => [
    state.switchgearList,
    state.getAllSwGear,
  ]);
  const [editBB, setEditBB] = useState<IBusBar>(busBar);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [isDelDialog, setIsDelDialog] = useState(false);

  const handleSaveClick = () => {
    if (editBB.numb && editBB.switchgear) updateBB(busBar.id, editBB);
  };

  const changeSwitchgear = (id: string) => {
    const intId = parseInt(id);
    const swGear = switchgearList.find((s) => s.id === intId);
    if (swGear !== undefined) setEditBB({ ...editBB, switchgear: swGear });
  };

  useEffect(() => {
    getAllSwGear();
  }, [getAllSwGear]);

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
                    setIsDelDialog(true);
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
      {isDelDialog && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Вы действительно хотите удалить эту запись:</h2>
              <p>
                {busBar.numb}&nbsp;{busBar.isSection ? "С" : "СШ"}&nbsp;
                {busBar.switchgear.voltage}&nbsp;ПС&nbsp;
                {busBar.switchgear.substation.name}
              </p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsDelDialog(false);
                  deleteBB(busBar.id);
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
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <Label htmlFor="isSection" className="text-right">
                  Секционированная СШ?
                </Label>
                <Checkbox
                  checked={editBB.isSection}
                  onCheckedChange={(value) =>
                    setEditBB({ ...editBB, isSection: !!value })
                  }
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <Label htmlFor="numb" className="text-right">
                  Номер
                </Label>
                <Input
                  type="number"
                  id="numb"
                  value={editBB.numb}
                  onChange={(e) =>
                    setEditBB({ ...editBB, numb: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <Label htmlFor="switchgear" className="text-right">
                  Распредустройство
                </Label>
                <Select onValueChange={(e) => changeSwitchgear(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Вид РУ" />
                  </SelectTrigger>
                  <SelectContent id="switchgear">
                    <SelectGroup>
                      {switchgearList.map((s) => (
                        <SelectItem value={s.id.toString()} key={s.id}>
                          {s.sgType}&nbsp;{s.voltage}&nbsp;ПС&nbsp;
                          {s.substation.name}
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
              <DialogClose asChild>
                <Button>Отмена</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};

export default EditBusBarDialog;
