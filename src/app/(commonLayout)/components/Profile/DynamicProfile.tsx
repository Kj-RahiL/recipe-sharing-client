"use client"; 

import { useUser } from "@/context/user.provider";
import { useUserFollow, useUserUnFollow } from "@/hooks/user.hook";
import { getSingleUser } from "@/services/UsersService";
import { TUser } from "@/types";
import { Button, Avatar, Tabs, Tab } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserCreatedPost from "./UserCreatedPost";
import ProfileLoading from "../Loading/ProfileLoading";

const DynamicProfile = () => {
  const { user: logUser } = useUser();
  const { userId } = useParams();
  const [user, setUser] = useState<TUser | null>(null);

  const { mutate: handleUserFollow, isSuccess: followSuccess } = useUserFollow();
  const { mutate: handleUserUnFollow, isSuccess: unFollowSuccess } = useUserUnFollow();

  const fetchUser = async () => {
    const response = await getSingleUser(userId as string);
    setUser(response?.data );
  };
 

  useEffect(() => {
    fetchUser();
  }, [userId, followSuccess, unFollowSuccess]);

  const currentUser = user?._id === logUser?.id;
  const isFollowing = user?.followers?.includes(logUser?.id || "");
  console.log(user?.followers, 'flow')

  const handleFollowToggle = () => {
    if (isFollowing) {
      handleUserUnFollow({ userId: logUser?.id, followId: user?._id });
    } else {
      handleUserFollow({ userId: logUser?.id, followId: user?._id });
    }
  };

  if (!user) return <ProfileLoading/>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <Avatar
          src={user.image}
          alt={user.name}
          size="lg"
          className="rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <div className="flex space-x-2 mt-1 text-sm text-gray-500">
            <span>{user.following?.length ?? 0} Following</span>
            <span>·</span>
            <span>{user.followers?.length ?? 0} Followers</span>
          </div>
        </div>
        {!currentUser && (
          <Button
            className={`ml-auto px-2 py-1 md:px-4 md:py-2 text-sm md:text-base ${isFollowing ? "bg-gradient-to-tr from-neutral-900 via-gray-800 to-pink-600 text-white" : "button-bg"}`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      {/* Tabs Section */}
      <Tabs aria-label="Profile Options" className="mb-4">
        <Tab key="created" title="Created">
          <UserCreatedPost userId={userId as string} />
        </Tab>
        <Tab key="activity" title="Activity">
          <p className="font-semibold text-orange-500">Activity Content Here</p>
          <p className="mt-10 text-gray-500">It&apos;s updating for the feature which post user</p>
          <ul className="space-y-2">
            <li>Commented</li>
            <li>Rated</li>
            <li>Started following</li>
          </ul>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DynamicProfile;
