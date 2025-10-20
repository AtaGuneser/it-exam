import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/patient")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <h1>Patients Layout</h1>
    </>
  );
}
