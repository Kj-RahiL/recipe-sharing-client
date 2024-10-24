import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
  } from "@nextui-org/react";
import { Lock, LockKeyhole, Mail, Phone, User } from "lucide-react";
const ChangePassword = ({ onClose }: any) => {   
    return (
        <div className="flex flex-col gap-4">
   
                <form className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="password"
                      variant="underlined"
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      className="pl-10"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="email"
                      variant="underlined"
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      className="pl-10"
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
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
             
    </div>
    );
};

export default ChangePassword;