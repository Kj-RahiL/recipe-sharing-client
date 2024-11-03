/* eslint-disable @typescript-eslint/no-explicit-any */
import {  forgetPassword } from "@/services/AuthService";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const ForgetPassword = ({ onClose }: any) => {
  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    console.log(email, 'forrr')
    try {
      const res = await forgetPassword(email);
      console.log(res)
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
      <form className="space-y-4" onSubmit={handleForgetPassword}>
        {/* Current Password Input */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="email"
            variant="underlined"
            label="Email"
            name="email"
            placeholder="Enter Register Email"
            className="pl-10"
            required
          />
        </div>

        
        {/* <div className="relative">
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
        </div> */}

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

export default ForgetPassword;