import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useTokenStore from '@/store';

export interface Items{
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean
}

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

export function DashboardLayout() {

  const location = useLocation();
  const { token, setToken } = useTokenStore((state)=> state);

  if(!token){
    return <Navigate to={'/auth/login'} replace/>
  }

  const items:Items[]  = [
    { path: "/dashboard/home", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { path: "/dashboard/books", label: "Books", icon: <Package className="h-4 w-4" /> },
    { path: "/dashboard/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" />, disabled: true },
    { path: "/dashboard/customers", label: "Customers", icon: <Users className="h-4 w-4" />, disabled: true },
    { path: "/dashboard/analytics", label: "Analytics", icon: <LineChart className="h-4 w-4" />, disabled: true },
  ];

  const handleLogout = () => {
    setToken('');
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Elib</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {items.map((item, index) => (
                item.disabled ? 
                <div key={index} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground cursor-not-allowed">
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                      {item.badge}
                    </span>
                  )}
                </div>: 
                <Link
                  key={index}
                  to={item.path}
                  aria-disabled={item.disabled}
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
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {items.map((item) => (
                    item.disabled ? 
                    <div key={item.path} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground cursor-not-allowed">
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                          {item.badge}
                        </span>
                      )}
                    </div>: 
                    <Link
                      key={item.path}
                      to={item.path}
                      aria-disabled={item.disabled}
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
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant={'ghost'} size={'sm'} onClick={handleLogout}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
