import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isDropdown?: boolean;
  dropdownItems?: { label: string; href?: string }[]; // Optional dropdown items
}

export interface CustomBreadcrumbProps {
  items: BreadcrumbItemProps[];
}

export function CustomBreadcrumb({ items }: CustomBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.isDropdown && item.dropdownItems ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.dropdownItems.map((dropdownItem, i) => (
                      <DropdownMenuItem key={i} asChild>
                        {dropdownItem.href ? (
                          <BreadcrumbLink href={dropdownItem.href}>
                            {dropdownItem.label}
                          </BreadcrumbLink>
                        ) : (
                          <span>{dropdownItem.label}</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
