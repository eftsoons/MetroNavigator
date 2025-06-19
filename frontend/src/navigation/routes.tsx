import type { JSX, ReactNode } from "react";

import Navigation from "@/pages/Navigation";
import News from "@/pages/News";
import Rating from "@/pages/Rating";
import Profile from "@/pages/Profile";
import Support from "@/pages/Support";

interface Route {
  path: string;
  Element: ReactNode;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  {
    path: "/",
    Element: <Navigation />,
  },
  {
    path: "/news",
    Element: <News />,
  },
  { path: "/rating", Element: <Rating /> },
  { path: "/profile/:userid", Element: <Profile /> },
  { path: "/support", Element: <Support /> },
];
