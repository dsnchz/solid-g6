import { Route, Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import type { Component, ParentProps } from "solid-js";
import { ErrorBoundary } from "solid-js";

import { Navbar } from "./Navbar";
import { Behaviors } from "./pages/Behaviors";
import { EdgeTypes } from "./pages/EdgeTypes";
import { ErrorPage } from "./pages/Error";
import { Events } from "./pages/Events";
import { GraphChildren } from "./pages/GraphChildren";
import { Home } from "./pages/Home";
import { Layouts } from "./pages/Layouts";
import { NodeTypes } from "./pages/NodeTypes";
import { NotFound } from "./pages/NotFound";
import { Overview } from "./pages/Overview";
import { States } from "./pages/States";

export interface Page {
  path: string;
  name: string;
  title: string;
  icon: string;
  component: Component;
}

// Simple page definitions - keeping it minimal
export const PAGES: Page[] = [
  {
    path: "/",
    name: "Home",
    title: "Home",
    icon: "🏠",
    component: Home,
  },
  {
    path: "/overview",
    name: "Overview",
    title: "Overview",
    icon: "📖",
    component: Overview,
  },
  {
    path: "/node-types",
    name: "Node Types",
    title: "Node Types",
    icon: "🔷",
    component: NodeTypes,
  },
  {
    path: "/edge-types",
    name: "Edge Types",
    title: "Edge Types",
    icon: "🔗",
    component: EdgeTypes,
  },
  {
    path: "/states",
    name: "Element States",
    title: "States",
    icon: "⚡",
    component: States,
  },
  {
    path: "/graph-children",
    name: "Graph Children",
    title: "Graph Children",
    icon: "👶",
    component: GraphChildren,
  },
  {
    path: "/behaviors",
    name: "Behaviors",
    title: "Behaviors",
    icon: "🎯",
    component: Behaviors,
  },
  {
    path: "/events",
    name: "Events",
    title: "Events",
    icon: "⚡",
    component: Events,
  },
  {
    path: "/layouts",
    name: "Layouts",
    title: "Layouts",
    icon: "🌐",
    component: Layouts,
  },
  {
    path: "*",
    name: "Not Found",
    title: "Not Found",
    icon: "❓",
    component: NotFound,
  },
];

// Simple navigation structure
export const NAV_STRUCTURE = [
  {
    name: "Home",
    icon: "🏠",
    pages: PAGES.filter((p) => p.path === "/"),
  },
  {
    name: "Documentation",
    icon: "📖",
    pages: PAGES.filter((p) => p.path === "/overview"),
  },
  {
    name: "Examples",
    icon: "📚",
    pages: PAGES.filter((p) => p.path !== "/" && p.path !== "/overview" && p.path !== "*"),
  },
];

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Root layout component that includes the responsive navigation
const RootLayout = (props: ParentProps) => {
  return (
    <div class="min-h-screen bg-gray-100">
      {/* Responsive Navigation */}
      <Navbar />

      {/* Main content area - responsive margins */}
      <div class="pt-16 md:pt-0 md:ml-64">
        <main class="min-h-screen">{props.children}</main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <ErrorBoundary fallback={(e, r) => <ErrorPage error={e} reset={r} />}>
      <QueryClientProvider client={queryClient}>
        <Router root={RootLayout}>
          <Route path="/" component={Home} />
          <Route path="/overview" component={Overview} />
          <Route path="/layouts" component={Layouts} />
          <Route path="/node-types" component={NodeTypes} />
          <Route path="/edge-types" component={EdgeTypes} />
          <Route path="/behaviors" component={Behaviors} />
          <Route path="/events" component={Events} />
          <Route path="/states" component={States} />
          <Route path="/graph-children" component={GraphChildren} />
          <Route path="*" component={NotFound} />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
