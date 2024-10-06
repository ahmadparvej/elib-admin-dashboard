import { ChevronLeft } from "lucide-react";

import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook, editBook } from "@/http/api";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";


export const CreateBook = () => {
  
  const location = useLocation();
  const bookToEdit = location?.state?.row; // Access book data passed from Books.tsx
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const editPage = location.pathname.includes('edit');

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    genre: z.string().min(2, {
      message: "genre must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "description must be at least 2 characters.",
    }),
    pdf: editPage
        ? z.instanceof(FileList).optional() // Optional in edit mode
        : z.instanceof(FileList).refine(file => file.length === 1, "PDF is required"), // Required in create mode
      coverImage: editPage
        ? z.instanceof(FileList).optional() // Optional in edit mode
        : z.instanceof(FileList).refine(file => file.length === 1, "Cover image is required"), // Required in create mode
  })

  console.log(location, bookToEdit?._id);
  
  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard/home",
    },
    {
      label: "Books",
      href: "/dashboard/books",
    },
    {
      label: editPage ? "Edit": "Add Book"
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editPage
    ? {
        title: bookToEdit.title,
        genre: bookToEdit.genre,
        description: bookToEdit.description,
      }
    : {
        title: "",
        genre: "",
        description: "",
    }
  })

  const coverImageRef = form.register('coverImage');
  const pdfRef = form.register('pdf');

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('genre', values.genre);
    formData.append('description', values.description);

    if(values?.coverImage && values?.coverImage[0])
    formData.append('coverImage', values.coverImage[0]);

    if(values?.pdf && values?.pdf[0])
    formData.append('file', values.pdf[0]);

    mutation.mutate({formData, bookId: bookToEdit?._id});
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editPage? editBook: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Books']
      });
      toast({
        variant: 'default',
        title: 'Book Saved Successfully'
      });
      navigate('/dashboard/books')
    },
    onError: (error:any) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message
      })
    }
  })

  return (
    <>
      <div className="flex items-center">
        <CustomBreadcrumb items={breadcrumbItems} />
      </div>
      <main className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid max-w-full flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard/books">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                { editPage ? bookToEdit.title : 'Create a new book'}
              </h1>
              {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                In stock
              </Badge> */}
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link to="/dashboard/books">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                </Link>
                <Button type="submit" size="sm" isLoading={mutation.isPending}>Save Book</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader className="flex flex-row gap-4">
                    <CardTitle>Books Details</CardTitle>
                    <CardDescription>
                      Fill out the form below to create a book
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 mb-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                              <Input placeholder="genre" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                  <CardHeader>
                    <CardTitle>Cover Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                        control={form.control}
                        name="coverImage"
                        render={() => (
                          <FormItem>
                            <FormLabel>Upload</FormLabel>
                            <FormControl>
                              <Input placeholder="file" type="file" {...coverImageRef} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Upload PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                        control={form.control}
                        name="pdf"
                        render={() => (
                          <FormItem>
                            <FormLabel>PDF</FormLabel>
                            <FormControl>
                              <Input placeholder="file" type="file" {...pdfRef} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" isLoading={mutation.isPending}>Save Book</Button>
            </div>
          </div>
        </form>
      </Form>
      </main>
    </>
  );
};
