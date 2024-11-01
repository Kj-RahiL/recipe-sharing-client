"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { NavLogo } from "./NavLogo";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.provider";
import NavbarDropDown from "./NavbarDropDown";
import { usePathname } from "next/navigation";
import { logout } from "@/services/AuthService";

const NavigationPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="2xl"
      height="5rem"
    >
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

        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
              data-active={pathname === item.href}
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
        {user?.email ? (
          <NavbarItem className="hidden lg:flex">
            <NavbarDropDown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button onClick={() => router.push("/login")} className="button-bg">Login</Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
              data-active={pathname === item.href}
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium"
            )}
            color="foreground"
            href={
              user?.role === "admin"
                ? "/admin-dashboard"
                : user?.role === "user"
                ? "/dashboard"
                : "/"
            }
          >
            Dashboard
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem key="logout" onClick={() => handleLogout()} className="text-pink-700">
          LogOut
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationPage;
