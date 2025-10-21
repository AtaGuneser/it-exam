import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";


import { routeTree } from "./routeTree.gen";

import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner/Spinner";
import { testContext } from "@/context/test-context";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  context: {
    queryClient,
    testContext: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});


declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ testContext }} />
        <Toaster
          style={{ zIndex: 10000 }}
          closeButton
          toastOptions={{
            classNames: {
              closeButton: "transform scale-[2.5] !w-[8px] !h-[8px]",
            },
          }}
        />
      </QueryClientProvider>
  );
}
