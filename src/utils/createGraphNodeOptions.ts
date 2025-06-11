import type { G6GraphData, InferGraphDataTypes } from "../types/graph";
import type { NodeConfigOptions } from "../types/node";

/**
 * Creates a type-safe configuration for graph node options.
 *
 * Nodes are the primary elements in a graph representing entities or data points.
 * This function ensures proper typing for node styling, interaction, and animation options.
 *
 * @template D - The graph data type extending G6GraphData
 * @param node - Configuration options for node appearance and behavior
 * @returns The same node configuration with proper typing
 *
 * @example
 * ```typescript
 * const nodeOptions = createGraphNodeOptions({
 *   style: {
 *     fill: '#4A90E2',
 *     stroke: '#2E5C8A',
 *     lineWidth: 2,
 *     r: 20
 *   },
 *   labelText: (data) => data.name || data.id,
 *   animate: { duration: 300 }
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/base-node
 */
export const createGraphNodeOptions = <D extends G6GraphData = G6GraphData>(
  node: NodeConfigOptions<InferGraphDataTypes<D>["node"]>,
): NodeConfigOptions<InferGraphDataTypes<D>["node"]> => {
  return node;
};
