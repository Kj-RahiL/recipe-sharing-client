/* ProfileCard.tsx */
"use client";
import { useUser } from "@/context/user.provider";
import { Tabs, Tab, Input, Button, useDisclosure, ModalHeader } from "@nextui-org/react";
import UserCreatedPost from "./UserCreatedPost";
import { useGetSingleUser } from "@/hooks/user.hook";
import EllipsisDropDown from "./EllipsisDropDown";
import Image from "next/image";
import CustomModal from "@/app/(dashboardLayout)/components/modal/CustomModal";
import UpdateRecipe from "@/app/(commonLayout)/components/feed/UpdateRecipe";


const ProfileCard = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data, isLoading, refetch } = useGetSingleUser(user?.id as string);
  const profileData = data?.data;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleCreated = () => {
    onOpen();
  };
  const handleModalClose = () => {
    onClose()
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex items-start mb-4 justify-between">
        <div className="flex gap-2 items-center">
          {profileData?.image && (
            <Image
              src={profileData.image}
              alt="Tony Ellis"
              width={100}
              height={100}
              className="rounded-full object-cover max-w-28 max-h-28"
            />
          )}
          <div className="ml-4">
            <h1 className="text-xl font-bold">{profileData?.name}</h1>
            <p className="text-gray-500">{profileData?.email}</p>
            <div className="flex space-x-2 mt-1 text-sm text-gray-500">
              <span>{profileData?.following?.length ?? 0} Following</span>
              <span>·</span>
              <span>{profileData?.followers?.length ?? 0} Followers</span>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              {profileData?.bio}
            </p>
          </div>
        </div>
        <EllipsisDropDown refetch={refetch}/>
      </div>

      {/* Tabs Section */}
      <Tabs aria-label="Profile Options" className="mb-4">
        <Tab key="created" title="Created">
          <Input
          onClick={() => handleCreated()}
            type="text"
            placeholder="What's On Your Mind..."
            className="mb-4"
          />
          <UserCreatedPost userId={user?.id as string} />
        </Tab>
        <Tab key="activity" title="Activity">
          <p className="font-semibold text-orange-500">Activity Content Here</p>
          <Button onClick={() => handleCreated()} className="button-bg mt-4">Post Recipe</Button>
        </Tab>
      </Tabs>

      {/* edit modal */}
      <CustomModal
        size="xl"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Create Your Recipe
        </ModalHeader>
        <UpdateRecipe
          onClose={handleModalClose}
        />
      </CustomModal>
    </div>
  );
};

export default ProfileCard;
