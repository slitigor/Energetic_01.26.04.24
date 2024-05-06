import { ISubstation, ISwGear } from "@/data/types";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import AlertDeleteSwGear from "./AlertDeleteSwGear";
import { useSwGearStore } from "@/data/swgear/useSwitchgearStore";
import AddedSwGearDialog from "../swgear/AddedSwGearDialog";

interface CardProps {
  substation: ISubstation;
  swGearList: ISwGear[];
}
const SubstationCard: FC<CardProps> = ({ substation, swGearList }) => {
  const [deleteSwGear] = useSwGearStore((state) => [state.deleteSwGear]);

  const unlinkSwGear = (id: number) => {
    deleteSwGear(id);
  };

  return (
    <Card className="flex flex-col justify-between w-[350px]">
      <CardHeader>
        <CardTitle className="font-bold text-lg">{substation.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="mb-6">Распредустройства</h3>
        <ul>
          {swGearList.map(
            (s) =>
              s.substationId === substation.id && (
                <li
                  className="flex justify-between items-center 
                      gap-2 mb-1 hover:bg-[#181818] p-2 pl-4 rounded-lg"
                  key={s.id}
                >
                  <Label>
                    {s.sgType} {s.voltage} кВ
                  </Label>
                  <AlertDeleteSwGear swGear={s} unlinkSwGear={unlinkSwGear} />
                </li>
              )
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2">
        <AddedSwGearDialog />
      </CardFooter>
    </Card>
  );
};

export default SubstationCard;
