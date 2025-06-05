import { Route, Router } from "@solidjs/router";
import { ErrorBoundary, For, type JSX, type ParentProps } from "solid-js";

import { Navbar } from "./Navbar";
import { ErrorPage } from "./pages/Error";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

type Page = {
  readonly path: string;
  readonly component: () => JSX.Element;
};

const PAGES: readonly Page[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const MainContent = (props: ParentProps) => {
  return (
    <main class="flex flex-col h-full w-full grow overflow-auto bg-app-background">
      {props.children}
    </main>
  );
};

const RootLayout = (props: ParentProps) => (
  <div id="root-screen" class="h-screen w-screen">
    <Navbar />
    <MainContent>{props.children}</MainContent>
  </div>
);

export const App = () => {
  return (
    <ErrorBoundary fallback={(e, r) => <ErrorPage error={e} reset={r} />}>
      <Router root={RootLayout}>
        <For each={PAGES}>{(page) => <Route path={page.path} component={page.component} />}</For>
      </Router>
    </ErrorBoundary>
  );
};
