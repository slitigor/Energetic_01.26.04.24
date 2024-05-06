import { useBusBarStore } from "@/data/busbar/useBusBarStore";
import { useSwitchgearStore } from "@/data/switchgear/useSwitchgearStore";
import { ISwitchgear } from "@/data/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddBusBarDialog = () => {
  const [createBB] = useBusBarStore((state) => [state.createBB]);
  const [switchgearList, getAllSwGear] = useSwitchgearStore((state) => [
    state.switchgearList,
    state.getAllSwGear,
  ]);
  const [isAddedDialog, setIsAddedDialog] = useState(false);
  const [isSection, setIsSection] = useState(false);
  const [numb, setNumb] = useState(1);
  const [switchgear, setSwitchgear] = useState<ISwitchgear>();

  const handleSaveClick = () => {
    if (numb && switchgear !== undefined) {
      createBB({
        id: Math.floor(Math.random() * 10000),
        isSection: isSection,
        numb: numb,
        switchgear: switchgear,
      });
      setIsSection(false);
      setNumb(1);
      setSwitchgear(undefined);
    }
  };

  const changeSwitchgear = (id: string) => {
    const intId = parseInt(id);
    const swGear = switchgearList.find((s) => s.id === intId);
    if (swGear !== undefined) setSwitchgear(swGear);
  };

  useEffect(() => {
    getAllSwGear();
  }, [getAllSwGear]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Добавить С/СШ"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новая система</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить систему</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <Label htmlFor="isSection" className="text-right">
                Секционированная СШ?
              </Label>
              <Checkbox
                checked={isSection}
                onCheckedChange={(value) => setIsSection(!!value)}
              />
            </div>
            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
              <Label htmlFor="numb" className="text-right">
                Номер
              </Label>
              <Input
                type="number"
                id="numb"
                value={numb}
                onChange={(e) => setNumb(parseInt(e.target.value))}
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
                setIsAddedDialog(false);
                handleSaveClick();
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

export default AddBusBarDialog;
