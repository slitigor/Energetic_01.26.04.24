import { Minus } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ISwGear } from "@/data/types";
import { FC } from "react";

interface DialogProps {
  swGear: ISwGear;
  unlinkSwGear: (id: number) => void;
}

const AlertDeleteSwGear: FC<DialogProps> = ({ swGear, unlinkSwGear }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Minus className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удаление РУ</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Вы действительно хотите удалить РУ
          {swGear.sgType} {swGear.voltage} кВ?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={() => unlinkSwGear(swGear.id)}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteSwGear;
