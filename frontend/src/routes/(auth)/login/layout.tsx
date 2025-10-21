import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
