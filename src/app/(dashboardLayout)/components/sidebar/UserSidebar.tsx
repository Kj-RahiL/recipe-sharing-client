import { usePathname } from 'next/navigation';
import { useSidebarContext } from '../../layout/layout-context';
import { Sidebar } from './sidebarStyles';
import Link from 'next/link';
import { Home, Settings, Soup, SquarePen, User2Icon } from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarMenu from './SidebarMenu';
import { Avatar, Tooltip } from '@nextui-org/react';

const UserSidebar = () => {
    const pathname = usePathname();
    const { collapsed } = useSidebarContext();
    return (
      <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
            <Soup />
            <p className="font-bold text-inherit px-4">Chef&apos;s Circle</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/dashboard/profile"}
                title="User Profile"
                icon={<User2Icon/>}
                href="/dashboard/profile"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/create-recipe"}
                title="Create Recipe"
                icon={< SquarePen/>}
                href="/dashboard/create-recipe"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/my-recipe"}
                title="My Recipe"
                icon={< SquarePen/>}
                href="/dashboard/my-recipe"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Home"} color="primary">
              <div className="max-w-fit">
                <Link href='/'><Home/></Link>
              </div>
            </Tooltip>
            <Tooltip content={"settings"} color="primary">
              <div className="max-w-fit">
                <Settings />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
            <Link href="/admin-dashboard/profile">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
    );
};

export default UserSidebar;