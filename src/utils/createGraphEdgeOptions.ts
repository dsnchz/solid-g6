import type { EdgeConfigOptions } from "../types/edge";
import type { G6GraphData, InferGraphDataTypes } from "../types/graph";

/**
 * Creates a type-safe configuration for graph edge options.
 *
 * Edges represent connections between nodes in the graph. This function
 * ensures proper typing for edge styling, interaction, and animation options.
 *
 * @template D - The graph data type extending G6GraphData
 * @param edge - Configuration options for edge appearance and behavior
 * @returns The same edge configuration with proper typing
 *
 * @example
 * ```typescript
 * const edgeOptions = createGraphEdgeOptions({
 *   style: {
 *     stroke: '#999',
 *     lineWidth: 2,
 *     endArrow: true
 *   },
 *   labelText: (data) => data.weight?.toString(),
 *   animate: { duration: 300 }
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/build-in/base-edge
 */
export const createGraphEdgeOptions = <D extends G6GraphData = G6GraphData>(
  edge: EdgeConfigOptions<InferGraphDataTypes<D>["edge"]>,
): EdgeConfigOptions<InferGraphDataTypes<D>["edge"]> => {
  return edge;
};
