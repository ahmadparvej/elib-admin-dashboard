// Books.tsx
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { File, MoreHorizontal, PlusCircle } from "lucide-react";

export function Books() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Books"],
    queryFn: getBooks,
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

  // Define the actions for each row
  const actions = (row: Record<string, any>) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Book
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Manage your books and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Pass the API response (data) to the CustomTable component */}
                  <CustomTable headers={headers} rows={data?.data} actions={actions} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{data?.data?.length}</strong> of <strong>{data?.data?.length}</strong> books
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
