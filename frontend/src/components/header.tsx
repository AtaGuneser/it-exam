import type { FileRoutesByTo } from "@/routeTree.gen";
import { Link } from "@tanstack/react-router";

type NavigationLink = { to: keyof FileRoutesByTo; label: string };

const navigationLinks: NavigationLink[] = [
  { to: "/", label: "Home" },
  { to: "/pokemon", label: "Pokemon" },
  { to: "/posts", label: "Posts" },
];

export function Header() {
  return (
    <header style={{ padding: 20, background: "#eee" }}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1>Tanstack Tech Demo</h1>
        </Link>
        <div className="flex gap-4">
          {navigationLinks.map((link) => (
            <Link to={link.to}>{link.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
