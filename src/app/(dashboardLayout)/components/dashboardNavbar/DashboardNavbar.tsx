import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Input } from "@nextui-org/react";
import { ChevronLeft, MenuIcon, SearchCheck } from "lucide-react";
import React from "react";
import { useSidebarContext } from "../../layout/layout-context";
import UserDropdown from "./user-dropdown";
import { useSearchContext } from "../searchContext/search-context";

const DashboardNavbar = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, setCollapsed } = useSidebarContext();
  const { setSearchValue } = useSearchContext();
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-10">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          {collapsed ? (
            <ChevronLeft onClick={setCollapsed}> </ChevronLeft>
          ) : (
            <MenuIcon onClick={setCollapsed}></MenuIcon>
          )}
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchCheck />}
            isClearable
            onChange={(e) => setSearchValue(e.target.value)} 
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <UserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};

export default DashboardNavbar;
