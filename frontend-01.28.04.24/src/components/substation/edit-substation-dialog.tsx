import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { ISubstation, schemaList } from "@/data/types";
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
import { useDistrictStore } from "@/data/district/useDistrictStore";

interface DialogProps {
  substation: ISubstation;
}

const EditDialog: FC<DialogProps> = ({ substation }) => {
  const [deleteSStation, updateSStation] = useSubstationStore((state) => [
    state.deleteSStation,
    state.updateSStation,
  ]);
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);
  const [editSStation, setEditSStation] = useState<ISubstation>(substation);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isEditDialog, setIsEditDialog] = useState(false);

  const handleSaveClick = () => {
    if (
      editSStation.name &&
      editSStation.psSchema &&
      editSStation.district !== undefined
    ) {
      updateSStation(substation.id, editSStation);
    }
  };

  const changeDistrict = (name: string) => {
    const d = districtList.find((district) => district.name === name);
    if (d !== undefined) {
      setEditSStation({ ...editSStation, district: d });
    }
  };

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

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
                  onClick={() => setIsDeleteDialog(true)}
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
                ПС&nbsp;{substation.psSchema}
                &nbsp;{substation.name}&nbsp;кВ
              </p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setIsDeleteDialog(false);
                  deleteSStation(substation.id);
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
                  <Label htmlFor="name" className="text-right">
                    Название
                  </Label>
                  <Input
                    id="name"
                    value={editSStation.name}
                    onChange={(e) =>
                      setEditSStation({ ...editSStation, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="psSchema" className="text-right">
                    Схема ПС
                  </Label>
                  <Select
                    onValueChange={(e) =>
                      setEditSStation({
                        ...editSStation,
                        psSchema: e,
                      })
                    }
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Выбор схемы" />
                    </SelectTrigger>
                    <SelectContent id="psSchema">
                      <SelectGroup>
                        {schemaList.map((schema) => (
                          <SelectItem value={schema} key={schema}>
                            {schema}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="district" className="text-right">
                    РЭС
                  </Label>
                  <Select onValueChange={(e) => changeDistrict(e)}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Выбор РЭС" />
                    </SelectTrigger>
                    <SelectContent id="district">
                      <SelectGroup>
                        {districtList.map((district) => (
                          <SelectItem value={district.name} key={district.name}>
                            {district.name}
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
        </>
      )}
    </Dialog>
  );
};

export default EditDialog;
