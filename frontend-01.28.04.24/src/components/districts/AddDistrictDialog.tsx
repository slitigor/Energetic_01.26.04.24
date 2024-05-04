import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { useAddressStore } from "@/data/address/useAddressStore";
import { useEffect, useState } from "react";
import { IAddress } from "@/data/types";

const AddDistrictDialog = () => {
  const [createDistrict] = useDistrictStore((state) => [state.createDistrict]);
  const [addressList, getAllAddrs] = useAddressStore((state) => [
    state.addressList,
    state.getAllAddrs,
  ]);
  const [isAddedDialog, setIsAddedDialog] = useState(false);
  const [name, setName] = useState("");
  const [ddesc, setDdesc] = useState("");
  const [address, setAddress] = useState<IAddress>();

  const handleSaveClick = () => {
    if (name && address !== undefined) {
      createDistrict({
        name: name,
        ddesc: ddesc,
        address: address,
      });
      setName("");
      setDdesc("");
      setAddress(undefined);
    }
  };

  const changeAddress = (zip: string) => {
    const addr = addressList.find((a) => a.zip === zip);
    if (addr !== undefined) setAddress(addr);
  };

  useEffect(() => {
    getAllAddrs();
  }, [getAllAddrs]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Добавить РЭС"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новый РЭС</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить РЭС</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название РЭС
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ddesc" className="text-right">
                Описание РЭС
              </Label>
              <Input
                id="ddesc"
                value={ddesc}
                onChange={(e) => setDdesc(e.target.value)}
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

export default AddDistrictDialog;
