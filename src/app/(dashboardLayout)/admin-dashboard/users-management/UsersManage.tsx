/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { deleteUser, getAllUsers, updateUserStatus } from "@/services/UsersService";

const UserManage = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      const users = (response as { data: any[] }).data;
      setUsers(users);
    };
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  // Handle status change to 'block'
  const handleStatusChange = async (id: string) => {
    const updateStatus = {
        status: 'block'
    }
    await updateUserStatus(id, updateStatus);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, status: "block" } : user
      )
    );
  };

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
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
              <Button color="danger" onClick={() => handleDelete(user._id)} className="ml-2">
                Delete
              </Button>
              {user.status === "in-progress" && (
                <Button
                  color="warning"
                  onClick={() => handleStatusChange(user._id)}
                >
                  Block
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
