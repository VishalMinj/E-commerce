import { Header } from "../components";
import { Toaster} from "react-hot-toast";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Toaster
        toastOptions={{
          duration: 2500,
        }}
      />
      <Outlet />
    </>
  ),
});
