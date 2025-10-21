import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Menu, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

type NavigationLink = {
  to: string;
  label: string;
};

const navigationLinks: NavigationLink[] = [
  { to: "/", label: "Home" },
  { to: "/patients", label: "Patients" },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="font-semibold text-lg sm:text-xl hover:opacity-80 transition"
        >
          🏥 It Exam Patients
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.to ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Button */}
          {token ? (
            <Button
              variant="destructive"
              className="flex items-center gap-2 hover:bg-red-600/90 transition cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Çıkış Yap
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex items-center gap-2 hover:bg-primary/10 transition cursor-pointer">
              <Link to="/login">
                <LogIn className="h-4 w-4" /> Giriş Yap
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menü</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition",
                      pathname === link.to
                        ? "bg-muted text-primary"
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {token ? (
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="flex items-center gap-2 mt-4 hover:bg-red-600/90 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" /> Çıkış Yap
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="flex items-center gap-2 mt-4 hover:bg-primary/10 cursor-pointer">
                    <Link to="/login">
                      <LogIn className="h-4 w-4" /> Giriş Yap
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
