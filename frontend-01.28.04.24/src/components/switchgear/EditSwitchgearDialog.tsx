import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { useSwitchgearStore } from "@/data/switchgear/useSwitchgearStore";
import { ISwitchgear, sgTypeList, voltageList } from "@/data/types";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { DialogContent } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DialogProps {
  switchgear: ISwitchgear;
}

const EditSwitchgearDialog: FC<DialogProps> = ({ switchgear }) => {
  const [updateSwGear, deleteSwGear] = useSwitchgearStore((state) => [
    state.updateSwGear,
    state.deleteSwGear,
  ]);
  const [substationList, getAllSStation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSStation,
  ]);
  const [editSwGear, setEditSwGear] = useState<ISwitchgear>(switchgear);
  const [isEditDialog, setIsEditDialog] = useState(false);
  const [isDelDialog, setIsDelDialog] = useState(false);

  const handleSaveClick = () => {
    if (
      editSwGear.sgType &&
      editSwGear.voltage &&
      editSwGear.substation !== undefined
    ) {
      updateSwGear(switchgear.id, editSwGear);
    }
  };

  const changeSubstation = (id: string) => {
    const intId = parseInt(id);
    const station = substationList.find((s) => s.id === intId);
    if (station !== undefined)
      setEditSwGear({ ...editSwGear, substation: station });
  };

  useEffect(() => {
    getAllSStation();
  }, [getAllSStation]);

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
                {switchgear.sgType}&nbsp;{switchgear.voltage} на ПС&nbsp;
                {switchgear.substation.name}
              </p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsDelDialog(false);
                  deleteSwGear(switchgear.id);
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
                <Label htmlFor="sqType" className="text-right">
                  Вид РУ
                </Label>
                <Select>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Вид РУ" />
                  </SelectTrigger>
                  <SelectContent id="sqType">
                    <SelectGroup>
                      {sgTypeList.map((type) => (
                        <SelectItem value={type} key={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="voltage" className="text-right">
                  Напряжение
                </Label>
                <Select>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Вид РУ" />
                  </SelectTrigger>
                  <SelectContent id="voltage">
                    <SelectGroup>
                      {voltageList.map((volt) => (
                        <SelectItem value={volt} key={volt}>
                          {volt}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="substation" className="text-right">
                  Адрес
                </Label>
                <Select onValueChange={(e) => changeSubstation(e)}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Адрес" />
                  </SelectTrigger>
                  <SelectContent id="substation">
                    <SelectGroup>
                      {substationList.map((substation) => (
                        <SelectItem
                          value={substation.id.toString()}
                          key={substation.id}
                        >
                          ПС&nbsp;{substation.psSchema}&nbsp;{substation.name}
                          {substation.psSchema}
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

export default EditSwitchgearDialog;
