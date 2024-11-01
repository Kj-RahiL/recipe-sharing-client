/* eslint-disable @typescript-eslint/no-explicit-any */
import { changePassword } from "@/services/AuthService";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { Lock, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

const ChangePassword = ({ onClose }: any) => {
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const newFormData = { oldPassword, newPassword };
    const res = await changePassword(newFormData);
    try {
      const res = await changePassword(newFormData);
      if (res?.success) {
        toast.success(res.message);
        onClose(); 
      } else {
        toast.error(res?.message || "Password change failed.");
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
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="password"
            variant="underlined"
            label="Current Password"
            name="currentPassword"
            placeholder="Enter current password"
            className="pl-10"
            required
          />
        </div>

        {/* New Password Input */}
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="password"
            variant="underlined"
            label="New Password"
            name="newPassword"
            placeholder="Enter new password"
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

export default ChangePassword;
