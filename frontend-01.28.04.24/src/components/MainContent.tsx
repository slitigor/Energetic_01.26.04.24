import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import AddressPage from "./address/AddressPage";
import DistrictPage from "./districts/DistrictPage";
import SubstationPage from "./substation/SubstationPage";
import SwitchgearPage from "./switchgear/SwitchgearPage";
import BusBarPage from "./busbar/BusBarPage";

const MainContent = () => {
  const [tab, setTab] = useState("main");

  return (
    <section>
      <Navbar setTab={setTab} />
      {tab === "main" && <HomePage />}
      {tab === "address" && <AddressPage />}
      {tab === "district" && <DistrictPage />}
      {tab === "substation" && <SubstationPage />}
      {tab === "switchgear" && <SwitchgearPage />}
      {tab === "bus-bar" && <BusBarPage />}
    </section>
  );
};

export default MainContent;
