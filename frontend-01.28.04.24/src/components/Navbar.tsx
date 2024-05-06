import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = ({ setTab }: { setTab: (arg: string) => void }) => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("main")}
              className={navigationMenuTriggerStyle()}
            >
              Главная
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("address")}
              className={navigationMenuTriggerStyle()}
            >
              Адреса
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("district")}
              className={navigationMenuTriggerStyle()}
            >
              Районы
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("substation")}
              className={navigationMenuTriggerStyle()}
            >
              Подстанции
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("switchgear")}
              className={navigationMenuTriggerStyle()}
            >
              Распредустройства
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setTab("bus-bar")}
              className={navigationMenuTriggerStyle()}
            >
              Системы шин
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
