import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]">
      <div>logo</div>
      <div className="text-[24px] font-bold uppercase tracking-wide">
        Подстанции
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <div>user</div>
      </div>
    </header>
  );
};

export default Header;
