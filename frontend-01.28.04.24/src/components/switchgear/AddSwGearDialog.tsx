import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { useSwitchgearStore } from "@/data/switchgear/useSwitchgearStore";
import { ISubstation, sgTypeList, voltageList } from "@/data/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddSwGearDialog = () => {
  const [createSwGear] = useSwitchgearStore((state) => [state.createSwGear]);
  const [substationList, getAllAddrs] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSStation,
  ]);
  const [isAddedDialog, setIsAddedDialog] = useState(false);
  const [sgType, setSgType] = useState("");
  const [voltage, setVoltage] = useState("");
  const [substation, setSubstation] = useState<ISubstation>();

  const handleSaveClick = () => {
    console.log(
      "type: ",
      sgType,
      " voltage: ",
      voltage,
      " substation: ",
      substation?.name
    );

    if (sgType && voltage && substation !== undefined) {
      createSwGear({
        id: Math.floor(Math.random() * 10000),
        sgType: sgType,
        voltage: voltage,
        substation: substation,
      });
      setSgType("");
      setVoltage("");
      setSubstation;
    }
  };

  const changeSubstation = (id: string) => {
    const intId = parseInt(id);
    const station = substationList.find((s) => s.id === intId);
    if (station !== undefined) setSubstation(station);
  };

  useEffect(() => {
    getAllAddrs();
  }, [getAllAddrs]);

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
            <DialogTitle>Добавить распредустройство</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sgType" className="text-right">
                Вид РУ
              </Label>
              <Select onValueChange={setSgType}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Выбери вид РУ" />
                </SelectTrigger>
                <SelectContent id="sgType">
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
              <Select onValueChange={setVoltage}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Выбери напряжение" />
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
                Подстанция
              </Label>
              <Select onValueChange={(e) => changeSubstation(e)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Подстанция" />
                </SelectTrigger>
                <SelectContent id="substation">
                  <SelectGroup>
                    {substationList.map((substation) => (
                      <SelectItem
                        value={substation.id.toString()}
                        key={substation.id}
                      >
                        ПС&nbsp;{substation.psSchema}&nbsp;{substation.name}
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

export default AddSwGearDialog;
