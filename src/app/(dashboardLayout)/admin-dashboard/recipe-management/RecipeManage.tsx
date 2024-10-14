/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  getAllRecipe,
  deleteRecipe,
  updateRecipe,
} from "@/services/RecipeService";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Switch,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const columns = [
  { key: "title", label: "TITLE" },
  { key: "category", label: "CATEGORY" },
  { key: "author", label: "AUTHOR" },
  { key: "isPremium", label: "PREMIUM" },
  { key: "isPublished", label: "PUBLISHED" },
  { key: "actions", label: "ACTIONS" },
];

const RecipeManage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  // Fetch all recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipe();
        const newFeeds = (response as { data: any[] }).data;
        setRecipes(newFeeds);
        console.log(newFeeds);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Toggle the published status
  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await updateRecipe(id, { isPublished: !currentStatus }); // Assume updateRecipe handles the PATCH request
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe._id === id
            ? { ...recipe, isPublished: !currentStatus }
            : recipe
        )
      );
      console.log(`Toggled published status for recipe with ID: ${id}`);
    } catch (error) {
      console.error("Failed to update published status:", error);
    }
  };

  // Handle delete recipe
  const handleDelete = async (id: string) => {
    try {
      await deleteRecipe(id); // Assume deleteRecipe handles the DELETE request
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      toast.success("Delete Recipe successfully")
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  return (
    <Table aria-label="Recipe Management Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={recipes}>
        {(item) => (
          <TableRow key={item._id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category.join(", ")}</TableCell>
            <TableCell>{`${item.author.name} (${item.author.email})`}</TableCell>
            <TableCell>{item.isPremium ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Switch
                checked={item.isPublished}
                onChange={() =>
                  handleTogglePublished(item._id, item.isPublished)
                }
              />
            </TableCell>

            <TableCell>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDelete(item._id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecipeManage;
