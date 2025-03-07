import { createRouter, createRoute } from "@tanstack/react-router";
import { Route } from "./__root";
import { AuthPage } from "../pages/AuthPage";

const AuthPageRoute = createRoute({
  getParentRoute: () => Route,
  path: "/",
  component: AuthPage,
});

const routetree = Route.addChildren([AuthPageRoute]);
export const router = createRouter({ routeTree: routetree });
