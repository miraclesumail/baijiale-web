/**
 * @Author aiden
 * @Date 2021-02-25 16:45:54
 * @Last Modified by: Aiden.Ark
 * @Last Modified time: 2022-07-01 15:25:50
 */
import React from "react";
import { RouteObject } from "react-router-dom";
import Layout1 from "@/Layout/defaultLayout";
import Layout2 from "@/Layout/Layout2";
import LazyRoute from "./LazyRoute";
const HomeLazy = React.lazy(() => import("@/views/Home"));
const AuthLazy = React.lazy(() => import("@/views/Auth"));
const Bet = React.lazy(() => import("@/views/Bet"));
const Test = React.lazy(() => import("@/views/test"));
const TablePick = React.lazy(() => import("@/views/TablePick"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout1 />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <LazyRoute title="home">
            <HomeLazy />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    path: "/bet",
    element: <Layout2 />,
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <Bet />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    path: "/tablePick",
    element: <Layout2 />,
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <TablePick />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLazy />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];
export default routes;
