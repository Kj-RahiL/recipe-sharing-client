"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button, Spinner} from "@nextui-org/react";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { NavLogo } from "./NavLogo";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from 'clsx';
import { link as linkStyles } from "@nextui-org/theme";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import NavbarDropDown from "./NavbarDropDown";

const NavigationPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user  } = useUser();
  const router = useRouter();

  
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="mx-auto container">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <NavLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
        <NavLogo />
        </NavbarBrand>
        
         
        {siteConfig.navItems.map((item)=>(
          <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
        </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {user?.email ? (<NavbarItem className="hidden lg:flex">
        <NavbarDropDown/>
        </NavbarItem>): (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button onClick={() => router.push("/login")}>Login</Button>
          </NavbarItem>
        )}
        
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === siteConfig.navMenuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationPage;
