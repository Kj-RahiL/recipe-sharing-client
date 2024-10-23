/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Camera, User, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/user.provider";
import { updateUser } from "@/services/UsersService";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatedProfile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const { user } = useUser();

  // Handle image preview and store file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Upload image to imgbb
  const uploadImage = async () => {
    if (!imageFile) return null; 

    const formData = new FormData();
    formData.append("image", imageFile); 
console.log(imageFile)
    try {
      const res = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data.data?.url)
      return data.data?.url; 
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // Handle form submission with image upload
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageUrl = await uploadImage(); // Upload image and get URL
    const userData: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      if (key === "image") return;
      if (value) userData[key] = value;
    });

    if (imageUrl) userData.image = imageUrl; // Add image URL to user data

    try {
      console.log(userData, 'userr')
      const res = await updateUser(user?.id, userData);
      console.log("User updated successfully:", res);
    } catch (error) {
      console.error("User update failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onPress={onOpen} className="max-w-fit">
        Update Profile
      </Button>

      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Your Profile
              </ModalHeader>

              <ModalBody>
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="text"
                      variant="underlined"
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      className="pl-10"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="email"
                      variant="underlined"
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input
                      type="text"
                      variant="underlined"
                      label="Phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>

                  {/* Image Input with Preview */}
                  <div>
                    <label className="block font-medium mb-2 text-gray-700">
                      Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="imageUpload"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-600"
                      >
                        <Camera />
                        <span>Choose Image</span>
                      </label>
                      <input
                        id="imageUpload"
                        type="file"
                        className="hidden"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          width={64}
                          height={64}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                      )}
                    </div>
                  </div>

                  {/* Bio Textarea */}
                  <Textarea
                    variant="underlined"
                    name="bio"
                    placeholder="Enter your bio"
                    className="w-full"
                  />

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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdatedProfile;
