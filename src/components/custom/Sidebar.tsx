import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface SidebarProps {
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();

  const renderNavItems = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            location.pathname === item.path
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {item.icon}
          {item.label}
          {item.badge && (
            <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden h-full max-h-screen md:flex flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">Elib</span>
          </Link>
        </div>
        <div className="flex-1">{renderNavItems()}</div>
        <div className="mt-auto p-4">
          <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            {renderNavItems()}
            <div className="mt-auto">
              <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg">
                Upgrade to Pro
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
