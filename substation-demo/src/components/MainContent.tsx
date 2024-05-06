import { useSubstationStore } from "@/data/substation/useSubstationStore";
import { useEffect } from "react";
import { useSwGearStore } from "@/data/swgear/useSwitchgearStore";
import SubstationCard from "./substation/SubstationCard";
import { Button } from "./ui/button";

const MainContent = () => {
  const [stationList, getAllSS] = useSubstationStore((state) => [
    state.stationList,
    state.getAllSS,
  ]);
  const [swGearList, getAllSwGear] = useSwGearStore((state) => [
    state.swGearList,
    state.getAllSwGear,
  ]);

  useEffect(() => {
    getAllSS();
    getAllSwGear();
  }, [getAllSS, getAllSwGear]);

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-[24px] mb-2">Список подстанций</h2>
        <Button>Add</Button>
      </div>
      <div className="grid grid-flow-row md:grid-flow-col gap-4">
        {stationList.map((st) => (
          <SubstationCard key={st.id} substation={st} swGearList={swGearList} />
        ))}
      </div>
    </section>
  );
};

export default MainContent;
