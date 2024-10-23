"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { deleteUser, updateUserStatus } from "@/services/UsersService";
import { useGetAllUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { TUser } from "@/types";

const UserManage = () => {
  const { data: users, isLoading, error, isSuccess, refetch } = useGetAllUser();

  // Handle user deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      if (isSuccess) {
        toast.success("User deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(`Failed to delete user: ${error?.message}`);
    }
  };

  // Handle status change to 'blocked'
  const handleStatusChange = async (id: string) => {
    const updateStatus = { status: "blocked" };
    try {
      await updateUserStatus(id, updateStatus);
      if (isSuccess) {
        toast.success("User status updated to 'blocked'.");
        refetch();
      }
    } catch (error) {
      toast.error(`Failed to update status: ${error.message}`);
    }
  };
  // Handle status change to 'In-progress'
  const handleBlockChange = async (id: string) => {
    const updateStatus = { status: "in-progress" };
    try {
      await updateUserStatus(id, updateStatus);
      if (isSuccess) {
        toast.success("User status updated to 'in-progress'.");
        refetch();
      }
    } catch (error) {
      toast.error(`Failed to update status: ${error.message}`);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <Table aria-label="User Management Table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>PHONE</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {users?.data?.map((user: TUser) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
              <Button
                color="danger"
                onClick={() => handleDelete(user._id!)}
                className="ml-2"
              >
                Delete
              </Button>
              {user.status === "in-progress" ? (
                <Button
                  color="warning"
                  onClick={() => handleStatusChange(user._id!)}
                >
                  Block
                </Button>
              ) : (
                <Button
                  color="success"
                  onClick={() => handleBlockChange(user._id!)}
                >
                  UnBlock
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserManage;
