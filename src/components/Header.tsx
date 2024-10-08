"use client";
import { Bell, ChevronDown, Search, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  // const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* <Image
                src="https://www.ekitistate.gov.ng/wp-content/uploads/LOGO-1.jpg?height=40&width=40"
                alt="EKFARMS Logo"
                width={40}
                height={40}
              /> */}
            </div>
            <User2Icon className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-green-600">
              ADMIN
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10 w-64"
                placeholder="Search something here..."
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Albert Flores" />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 text-left hidden md:block">
                    <p className="text-sm font-medium">Albert Flores</p>
                    <p className="text-xs text-muted-foreground">
                      albert@gmail.com
                    </p>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Your Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
