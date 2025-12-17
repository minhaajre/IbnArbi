import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from "lucide-react";

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled data-testid="button-auth-loading">
        <User className="w-4 h-4 animate-pulse" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={signIn}
        className="gap-2"
        data-testid="button-sign-in"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 px-2"
          data-testid="button-user-menu"
        >
          <Avatar className="w-6 h-6">
            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />}
            <AvatarFallback className="text-xs">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm max-w-24 truncate">
            {user.displayName || user.email?.split("@")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={signOut} data-testid="button-sign-out">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
