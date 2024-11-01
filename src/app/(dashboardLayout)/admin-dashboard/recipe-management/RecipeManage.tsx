/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  deleteRecipe,
  updateRecipe,
  getAllRecipe,
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
  Badge,
  Pagination,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchContext } from "../../components/searchContext/search-context";

const columns = [
  { key: "title", label: "TITLE" },
  { key: "category", label: "CATEGORY" },
  { key: "author", label: "AUTHOR" },
  { key: "isPremium", label: "PREMIUM" },
  { key: "isPublished", label: "PUBLISHED" },
  { key: "delete", label: "DELETE" },
];

const RecipeManage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const { searchValue } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(recipes);

  // Fetch all recipes on component mount
  useEffect(() => {
    const fetchRecipes = async (page: number) => {
      try {
        const response = await getAllRecipe(page, searchValue, "");
        setRecipes(response.data);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes(currentPage);
  }, [currentPage, searchValue]);

  // Toggle the published status
  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const res = await updateRecipe(id, { isPublished: !currentStatus }); // Assume updateRecipe handles the PATCH request
      console.log(res);
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
      toast.success("Delete Recipe successfully");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table aria-label="Recipe Management Table h-screen">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={recipes}>
          {(item) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category.join(", ")}</TableCell>
              <TableCell>{`${item.author.name} (${item.author.email})`}</TableCell>
              <TableCell>{item.isPremium ? "Yes" : "No"}</TableCell>
              <TableCell>
                <div className="flex items-center justify-between w-[150px]">
                  <Badge
                    color={item.isPublished ? "success" : "default"}
                    variant="flat"
                    size="md"
                    className="capitalize"
                  >
                    {item.isPublished ? "Published" : "Unpublished"}
                  </Badge>
                  <Switch
                    checked={item.isPublished}
                    onChange={() =>
                      handleTogglePublished(item._id, item.isPublished)
                    }
                    color={item.isPublished ? "primary" : "default"}
                  />
                </div>
              </TableCell>

              <TableCell>
                <Button
                  className="bg-gradient-to-tr from-neutral-900 via-gray-800 to-pink-600 text-white"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                  style={{ marginLeft: 8 }}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center my-10">
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
};

export default RecipeManage;
