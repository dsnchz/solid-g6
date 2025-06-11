import type { G6GraphData } from "../types/graph";

/**
 * Creates a type-safe graph data configuration.
 *
 * This function provides type safety for graph data containing nodes, edges,
 * and optionally combos. It ensures the data structure conforms to G6 requirements.
 *
 * @template D - The graph data type extending G6GraphData
 * @param data - The graph data object containing nodes, edges, and optional combos
 * @returns The same data object with proper typing for G6 graph
 *
 * @example
 * ```typescript
 * const graphData = createGraphData({
 *   nodes: [
 *     { id: 'node1', data: { label: 'Node 1' } },
 *     { id: 'node2', data: { label: 'Node 2' } }
 *   ],
 *   edges: [
 *     { id: 'edge1', source: 'node1', target: 'node2' }
 *   ]
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/data
 */
export const createGraphData = <D extends G6GraphData = G6GraphData>(data: D): D => {
  return data;
};
