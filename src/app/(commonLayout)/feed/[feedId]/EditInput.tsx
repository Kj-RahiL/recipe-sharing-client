/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateComment } from "@/services/RecipeService";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { Highlighter } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const EditInput = ({refetch, onClose , commentId, comment}: any) => {
    const { feedId } = useParams();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editComment = formData.get("editComment") as string;
    try {
      const res = await UpdateComment(feedId as string, commentId, editComment);
      console.log(res)
      if (res?.success) {
        toast.success(res.message);
        onClose(); 
        refetch()
      } else {
        toast.error(res?.message || "Comment Update failed.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="space-y-4" onSubmit={handleChangePassword}>
        {/* Current Password Input */}
        <div className="relative">
          <Highlighter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="Edit"
            variant="underlined"
            label="EDit Comment"
            name="editComment"
            defaultValue={comment}
            className="pl-10"
            required
          />
        </div>

        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            type="button"
            onPress={onClose}
          >
            Close
          </Button>
          <Button className="btn button-bg" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
};

export default EditInput;
