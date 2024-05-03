import AddressPage from "./components/address/AddressPage";
import BusBarPage from "./components/busbar/BusBarPage";
import DistrictPage from "./components/districts/DistrictPage";
import SubstationPage from "./components/substation/SubstationPage";
import SwitchgearPage from "./components/switchgear/SwitchgearPage";

function App() {
  return (
    <div className="p-8">
      <AddressPage />
      <DistrictPage />
      <SubstationPage />
      <SwitchgearPage />
      <BusBarPage />
    </div>
  );
}

export default App;
