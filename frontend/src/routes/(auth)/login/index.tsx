import { createFileRoute, redirect } from "@tanstack/react-router";


import { isAuthenticated } from "@/hooks/use-auth";
import { LoginPage } from "@/components/pages/login";


export const Route = createFileRoute("/(auth)/login/")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/patients" });
    }
  },
  component: LoginPage,
});
