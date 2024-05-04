import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { IDistrict, schemaList } from "@/data/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDistrictStore } from "@/data/district/useDistrictStore";

const AddSubstationDialog = () => {
  const [createSStation] = useSubstationStore((state) => [
    state.createSStation,
  ]);
  const [districtList, getAllDistrict] = useDistrictStore((state) => [
    state.districtList,
    state.getAllDistrict,
  ]);
  const [name, setName] = useState("");
  const [psSchema, setPsSchema] = useState<string>("Выбор схемы");
  const [district, setDistrict] = useState<IDistrict>();
  const [isAddedDialog, setIsAddedDialog] = useState(false);

  const handleSaveClick = () => {
    if (name && psSchema && district !== undefined) {
      createSStation({
        id: Math.floor(Math.random() * 10000),
        name: name,
        psSchema: psSchema,
        district: district,
      });
      setName("");
      setPsSchema("Выбор схемы");
    }
  };

  useEffect(() => {
    getAllDistrict();
  }, [getAllDistrict]);

  const handleChangeDistrict = (name: string) => {
    const d = districtList.find((district) => district.name === name);
    if (d !== undefined) {
      setDistrict(d);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новый сотрудник"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новыя подстанция</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить подстанцию</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название ПС
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="psSchema" className="text-right">
                Схема ПС
              </Label>
              <Select onValueChange={setPsSchema} defaultValue="Выбор схемы">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выбор схемы" />
                </SelectTrigger>
                <SelectContent id="psSchema">
                  <SelectGroup>
                    {schemaList.map((sch) => (
                      <SelectItem value={sch} key={sch}>
                        {sch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                Схема ПС
              </Label>
              <Select
                onValueChange={handleChangeDistrict}
                defaultValue="Выбор РЭС"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выбор РЭС" />
                </SelectTrigger>
                <SelectContent id="district">
                  <SelectGroup>
                    {districtList.map((d) => (
                      <SelectItem value={d.name} key={d.name}>
                        {d.name}
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
                handleSaveClick();
                setIsAddedDialog(false);
              }}
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button onClick={() => setIsAddedDialog(false)}>Отмена</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddSubstationDialog;
