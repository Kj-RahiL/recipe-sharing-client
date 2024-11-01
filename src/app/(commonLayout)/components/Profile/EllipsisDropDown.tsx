import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { EllipsisVertical } from "lucide-react";
import UpdatedProfile from "./UpdatedProfile";
import ChangePassword from "./ChangePassword";
import CustomModal from "@/app/(dashboardLayout)/components/modal/CustomModal";

const EllipsisDropDown = ({refetch}:any) => {
    const updateProfileDisclosure = useDisclosure(); // Manage Update Profile Modal
    const changePasswordDisclosure = useDisclosure(); 
  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <EllipsisVertical />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="Update Profile" className="h-14 gap-2">
          <Button className="bg-gray-200/30 w-full" onClick={updateProfileDisclosure.onOpen}>
              Update Profile
            </Button>
          </DropdownItem>
          <DropdownItem key="Change Password">
            <Button className="bg-gray-200/30 w-full" onClick={changePasswordDisclosure.onOpen}>
              Change Password
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CustomModal
        placement="center"
        isOpen={updateProfileDisclosure.isOpen}
        onOpenChange={updateProfileDisclosure.onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Update Your Profile
        </ModalHeader>
        <UpdatedProfile onClose={updateProfileDisclosure.onClose} refetch={refetch}/>
      </CustomModal>

      <CustomModal
        placement="center"
        isOpen={changePasswordDisclosure.isOpen}
        onOpenChange={changePasswordDisclosure.onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Change Your Password
        </ModalHeader>
        <ChangePassword onClose={changePasswordDisclosure.onClose} />
      </CustomModal>
    </div>
  );
};

export default EllipsisDropDown;
