import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { CustomTable } from "@/components/custom/CustomTable"; // Import the new CustomTable component
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { deleteBook, getBooks } from "@/http/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { File, PlusCircle, PencilLine, Trash2 } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { CustomPagination } from "@/components/custom/CustomPagination";
import { useState } from "react";

export function Books() {

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: ()=> {
      queryClient.invalidateQueries({
        queryKey: ['Books']
      });
      toast({
        variant: 'default',
        title: 'Book Deleted Successfully'
      });
    }
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Books", currentPage],
    queryFn: ()=> getBooks( currentPage, 3),
    staleTime: 10000
  });

  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard/home",
    },
    {
      label: "Books",
    },
  ];

  // Define table headers with key and label
  const headers = [
    { key: 'coverImage', label: 'Cover' },
    { key: 'title', label: 'Title' },
    { key: 'genre', label: 'Genre' },
    { key: 'createdAt', label: 'Created At' },
  ];

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data...</div>;
  }

  // Define edit and delete handlers
  const handleEdit = (row: any) => {
    console.log("Edit clicked for:", row);
    navigate("/dashboard/books/edit", { state: { row } })
  };

  const handleDelete = (row: any) => {
    mutation.mutate(row._id);
  };

  // Define the actions for each row
  const actions = (row: any) => (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleEdit(row)}
        aria-label="Edit"
      >
        <PencilLine className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDelete(row)}
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update the current page state
    // You can also make an API call here to fetch data for the new page
  };

  return (
    <>
      <div className="flex items-center">
        <CustomBreadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-1 justify-center">
        <main className="grid flex-1 items-start gap-4 sm:px-0 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-7 gap-1">
                  <Link to="/dashboard/books/create" className="flex justify-center items-center">
                    <PlusCircle className="h-3.5 w-3.5 mr-1" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Book
                      </span>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader className="flex flex-row gap-4 px-5 py-5">
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Manage your books and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  {/* Pass the API response (data) to the CustomTable component */}
                  <CustomTable headers={headers} rows={data?.data.books} actions={actions} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{data?.data?.books.length}</strong> of <strong>{data?.data?.totalBooks}</strong> books
                  </div>
                  <CustomPagination 
                    currentPage={currentPage}
                    totalPage={data?.data?.totalBooks}
                    onPageChange={handlePageChange}
                  />
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
