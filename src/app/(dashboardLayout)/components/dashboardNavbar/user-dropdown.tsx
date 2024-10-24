
import { ThemeSwitcher } from "@/app/(commonLayout)/components/shared/ThemeSwitcher";
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

const UserDropdown = () => {
  const router = useRouter();
  const { user, setIsLoading } = useUser();
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
        <DropdownItem key="settings" href="/admin-dashboard/profile">
          My Profile
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => handleLogout()}
        >
          Log Out
        </DropdownItem>
        <DropdownItem>
          <ThemeSwitcher></ThemeSwitcher>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
