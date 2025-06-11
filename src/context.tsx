import type { Graph } from "@antv/g6";
import { type Accessor, createContext, useContext } from "solid-js";

import type { G6GraphData, G6GraphOptions } from "./types/graph";

export type G6GraphContextValue<D extends G6GraphData = G6GraphData> = {
  /**
   * The G6 graph instance.
   */
  readonly graph: Accessor<Graph>;

  /**
   * The G6 graph data.
   */
  readonly graphData: () => D;
  /**
   * Update the graph options.
   */
  readonly setGraphOptions: (options: G6GraphOptions<D>) => Promise<void>;
};

export const G6GraphContext = createContext<G6GraphContextValue>();

/**
 * Hook to access the G6 graph context and its associated methods.
 *
 * This hook provides access to the G6 graph instance, graph data, and methods
 * for updating graph options. It can only be used by child components of the
 * Graph component.
 *
 * @returns The G6 graph context value containing graph instance and methods
 * @throws Will throw an error if used outside of a Graph component's children
 *
 * @example
 * ```tsx
 * import { Graph, useGraph } from 'solid-g6';
 *
 * function MyGraphComponent() {
 *   const { graph, graphData, setGraphOptions } = useGraph();
 *
 *   // Access the G6 graph instance
 *   const graphInstance = graph();
 *
 *   // Get current graph data
 *   const currentData = graphData();
 *
 *   // Update graph options
 *   const handleUpdateLayout = async () => {
 *     await setGraphOptions({
 *       layout: { type: 'force', linkDistance: 150 }
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleUpdateLayout}>
 *         Change Layout
 *       </button>
 *     </div>
 *   );
 * }
 *
 * // Must be used as a child of Graph component
 * function App() {
 *   return (
 *     <Graph {...graphOptions}>
 *       <MyGraphComponent />
 *     </Graph>
 *   );
 * }
 * ```
 *
 * @see {@link G6GraphContextValue} for available context properties and methods
 * @see {@link Graph} for the required parent component
 */
export const useGraph = (): G6GraphContextValue => {
  const ctx = useContext(G6GraphContext);

  if (!ctx) {
    throw new Error("[solid-g6] useGraph must be used within a G6GraphProvider.");
  }

  return ctx;
};
