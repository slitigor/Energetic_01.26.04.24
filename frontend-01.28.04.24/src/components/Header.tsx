import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[60px] px-4">
      <div>logo</div>
      <div>
        <h1>ЖЕУР</h1>
      </div>
      <div>
        <div className="flex gap-3 items-center justify-center">
          <ModeToggle />
          user
        </div>
      </div>
    </header>
  );
};

export default Header;
