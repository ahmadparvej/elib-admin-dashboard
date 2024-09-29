import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb';

const breadcrumbItems = [
  {
    label: "Dashboard",
    href: "/dashboard/home",
  },
  {
    label: "Books",
    href: "/dashboard/books"
  },
  {
    label: "Add Book",
    href: "/dashboard/books/create"
  },
];

export const CreateBook = () => {
  return (
    <>
      <div className="flex items-center">
        <CustomBreadcrumb items={breadcrumbItems} />
      </div>
    </>
  );
};
