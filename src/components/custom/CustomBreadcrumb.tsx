import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

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
                          <Link to={dropdownItem.href}>
                            {dropdownItem.label}
                          </Link>
                        ) : (
                          <span>{dropdownItem.label}</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : item.href ? (
              <Link to={item.href}>{item.label}</Link>
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
