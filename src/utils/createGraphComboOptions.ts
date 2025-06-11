import type { ComboConfigOptions } from "../types/combo";
import type { G6GraphData, InferGraphDataTypes } from "../types/graph";

/**
 * Creates a type-safe configuration for graph combo options.
 *
 * Combos are special nodes that can contain other nodes, allowing for
 * hierarchical grouping and organization of graph elements.
 *
 * @template D - The graph data type extending G6GraphData
 * @param combo - Configuration options for combo styling and behavior
 * @returns The same combo configuration with proper typing
 *
 * @example
 * ```typescript
 * const comboOptions = createGraphComboOptions({
 *   style: {
 *     fill: '#f0f0f0',
 *     stroke: '#666',
 *     lineWidth: 2
 *   },
 *   labelText: (data) => data.label || data.id
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/combo/build-in/base-combo
 */
export const createGraphComboOptions = <D extends G6GraphData = G6GraphData>(
  combo: ComboConfigOptions<InferGraphDataTypes<D>["combo"], InferGraphDataTypes<D>["node"]>,
): ComboConfigOptions<InferGraphDataTypes<D>["combo"], InferGraphDataTypes<D>["node"]> => {
  return combo;
};
