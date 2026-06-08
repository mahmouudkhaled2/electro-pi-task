import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type ProfileDropdownProps = {
  isAuthenticated: boolean;
};

export default function ProfileDropdown({ isAuthenticated }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-none">
          <User className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAuthenticated && (
          <>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
              Logout
            </DropdownMenuItem>
          </>
        )}
        {!isAuthenticated && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register">Register</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
