import AddressPage from "./components/address/AddressPage";
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
    </div>
  );
}

export default App;
