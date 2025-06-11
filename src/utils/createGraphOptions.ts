import type { G6GraphOptions } from "../types/graph";
import type { G6GraphData } from "../types/graph";

/**
 * Creates a type-safe configuration for complete graph options.
 *
 * This is the main configuration function that combines all graph settings
 * including data, layout, behaviors, and visual options for nodes, edges, and combos.
 *
 * @template D - The graph data type extending G6GraphData
 * @param options - Complete graph configuration options
 * @returns The same options object with proper typing for G6 graph
 *
 * @example
 * ```typescript
 * const graphOptions = createGraphOptions({
 *   width: 800,
 *   height: 600,
 *   data: {
 *     nodes: [{ id: 'node1', data: { label: 'Node 1' } }],
 *     edges: []
 *   },
 *   layout: { type: 'grid' },
 *   behaviors: ['drag-canvas', 'zoom-canvas'],
 *   node: {
 *     style: { fill: '#4A90E2', r: 10 }
 *   }
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/api/graph/overview
 */
export const createGraphOptions = <D extends G6GraphData = G6GraphData>(
  options: G6GraphOptions<D>,
): G6GraphOptions<D> => {
  return options;
};
