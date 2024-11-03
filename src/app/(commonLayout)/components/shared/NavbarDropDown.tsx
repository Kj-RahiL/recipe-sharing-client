"use client";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const NavbarDropDown = () => {
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  console.log(user);
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={user?.image}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          href={
            user?.role === "admin"
              ? "/admin-dashboard"
              : user?.role === "user"
              ? "/dashboard"
              : "/"
          }
        >
          Dashboard
        </DropdownItem>
        <DropdownItem key="settings" href="/profile">
          My Profile
        </DropdownItem>
        {user ? (
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => handleLogout()}
          >
            Log Out
          </DropdownItem>
        ) : (
          <DropdownItem
            key="login"
            color="default"
            onClick={() => router.push("/login")}
          >
            Log In
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
