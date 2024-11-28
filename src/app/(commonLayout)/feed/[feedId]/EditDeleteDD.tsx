/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {  EllipsisVertical, LucideEdit, Trash2 } from "lucide-react";
import CustomModal from "@/app/(dashboardLayout)/components/modal/CustomModal";
import EditInput from "./EditInput";
import { useParams } from "next/navigation";
import { DeleteComment } from "@/services/RecipeService";
import { toast } from "sonner";

const EditDeleteDD = ({ refetch, commentId, comment }: any) => {
  const { feedId } = useParams();
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
 
  const handleDeleteComment = async() => {
    const res = await DeleteComment(feedId as string,commentId )
    console.log(res)
      if (res?.success) {
        toast.success(res.message);
        onClose(); 
        refetch()
      } else {
        toast.error(res?.message || "Comment delete failed.");
      }
  };


  const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <EllipsisVertical />
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              onClick={onOpen}
              key="edit"
              shortcut="⌘⇧E"
              description="Edit the comment"
              startContent={
                <LucideEdit className={iconClasses} onClick={onOpen} />
              }
            >
              Edit
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              onClick={handleDeleteComment}
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Delete the comment"
              startContent={
                <Trash2 className={cn(iconClasses, "text-danger")} />
              }
            >
              Delete
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <CustomModal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Update Comment
        </ModalHeader>
        <EditInput onClose={onClose} refetch={refetch}  commentId={commentId} comment={comment} />
      </CustomModal>
    </div>
  );
};

export default EditDeleteDD;
