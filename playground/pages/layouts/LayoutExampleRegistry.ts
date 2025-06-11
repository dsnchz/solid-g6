import { lazy } from "solid-js";

// Lazy-loaded layout examples - only load when needed
export const LAYOUT_EXAMPLES = {
  dagre: lazy(() => import("./examples/DagreExample").then((m) => ({ default: m.DagreExample }))),
  circular: lazy(() =>
    import("./examples/CircularExample").then((m) => ({ default: m.CircularExample })),
  ),
  radial: lazy(() =>
    import("./examples/RadialExample").then((m) => ({ default: m.RadialExample })),
  ),
  grid: lazy(() => import("./examples/GridExample").then((m) => ({ default: m.GridExample }))),
  concentric: lazy(() =>
    import("./examples/ConcentricExample").then((m) => ({ default: m.ConcentricExample })),
  ),
  "antv-dagre": lazy(() =>
    import("./examples/AntvDagreExample").then((m) => ({ default: m.AntvDagreExample })),
  ),
  fishbone: lazy(() =>
    import("./examples/FishboneExample").then((m) => ({ default: m.FishboneExample })),
  ),
  mds: lazy(() => import("./examples/MDSExample").then((m) => ({ default: m.MDSExample }))),
  snake: lazy(() => import("./examples/SnakeExample").then((m) => ({ default: m.SnakeExample }))),
  "force-atlas2": lazy(() =>
    import("./examples/ForceAtlas2Example").then((m) => ({ default: m.ForceAtlas2Example })),
  ),
  "d3-force": lazy(() =>
    import("./examples/D3ForceExample").then((m) => ({ default: m.D3ForceExample })),
  ),
  fruchterman: lazy(() =>
    import("./examples/FruchtermanExample").then((m) => ({ default: m.FruchtermanExample })),
  ),
  force: lazy(() => import("./examples/ForceExample").then((m) => ({ default: m.ForceExample }))),
  // Future examples:
  // etc...
} as const;

// Type helper for available layout examples
export type LayoutExampleType = keyof typeof LAYOUT_EXAMPLES;

// Check if a layout has an available example
export const hasExample = (layoutType: string): layoutType is LayoutExampleType => {
  return layoutType in LAYOUT_EXAMPLES;
};

// Get example component for a layout type
export const getLayoutExample = (layoutType: LayoutExampleType) => {
  return LAYOUT_EXAMPLES[layoutType];
};
