import { createRouter, createRoute, redirect } from "@tanstack/react-router";
import { Route } from "./__root";
import { AuthPage, HomePage } from "../pages";

const AuthPageRoute = createRoute({
  getParentRoute: () => Route,
  path: "/Auth",
  component: AuthPage,
});
const HomePageRoute = createRoute({
  getParentRoute: () => Route,
  path: "/Home",
  component: HomePage,
});

const HomeAliasRoute = createRoute({
  getParentRoute: () => Route,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/Home" });
  }
});



const routetree = Route.addChildren([AuthPageRoute,HomePageRoute,HomeAliasRoute]);
export const router = createRouter({ routeTree: routetree });
