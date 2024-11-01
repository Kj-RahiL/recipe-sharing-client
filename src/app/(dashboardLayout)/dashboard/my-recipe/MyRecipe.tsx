/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/context/user.provider";
import { deleteRecipe, getAllRecipe } from "@/services/RecipeService";
import {
  Button,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Delete, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CustomModal from "../../components/modal/CustomModal";
import UpdateRecipe from "@/app/(commonLayout)/components/feed/UpdateRecipe";
import { TRecipe } from "@/types";
import { useSearchContext } from "../../components/searchContext/search-context";

const columns = [
  { key: "image", label: "Image" },
  { key: "title", label: "TITLE" },
  { key: "category", label: "CATEGORY" },
  { key: "isPremium", label: "PREMIUM" },
  { key: "isPublished", label: "PUBLISHED" },
  { key: "actions", label: "ACTIONS" },
];

const MyRecipe = () => {
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const { searchValue } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState<TRecipe | null>(null);
  const { user } = useUser();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const fetchRecipes = async (page: number) => {
    try {
      const res = await getAllRecipe(page, searchValue, "");
      setRecipes(res.data);
      setTotalPages(res.totalPages);
      setCurrentPage(res.currentPage);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [user?.id, currentPage]);

  const myRecipes = recipes?.filter((recipe) => recipe?.author?._id === user?.id);
  console.log(myRecipes);

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteRecipe(id); // Assume deleteRecipe handles the DELETE request
      if (res.success) {
        setRecipes((prev) => prev!.filter((recipe) => recipe?._id !== id));
        console.log(res);
        toast.success(res.message || "Delete Recipe successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete recipe");
    }
  };

  const handleUpdate = (recipe: any) => {
    setSelectedRecipe(recipe);
    onOpen();
  };
  const handleModalClose = () => {
    setSelectedRecipe(null); // Reset selected recipe on close
    onClose();
    fetchRecipes(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Table aria-label="User Management Table " className="h-screen">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={myRecipes}>
          {(recipe: TRecipe) => (
            <TableRow key={recipe._id}>
              <TableCell>
                <Image
                  src={recipe.image}
                  alt="recipe-image"
                  width={100}
                  height={100}
                />
              </TableCell>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>
                {Array.isArray(recipe.category)
                  ? recipe.category.join(", ")
                  : recipe.category}
              </TableCell>
              <TableCell>{recipe.isPremium ? "Premium" : "Normal"}</TableCell>
              <TableCell>{recipe.isPublished ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleUpdate(recipe)}
                  className="mr-2 btn button-bg"
                >
                  <Edit></Edit>
                </Button>

                <Button
                  className="bg-gradient-to-tr from-neutral-900 via-gray-800 to-pink-600 text-white"
                  onClick={() => handleDelete(recipe._id!)}
                >
                  <Delete />
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
      {/* edit modal */}
      <CustomModal
        size="xl"
        scrollBehavior="outside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">
          Update Your Recipe
        </ModalHeader>
        <UpdateRecipe
          existingRecipe={selectedRecipe}
          onClose={handleModalClose}
        />
      </CustomModal>
    </>
  );
};

export default MyRecipe;
