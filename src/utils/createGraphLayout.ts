import type { GraphLayoutOptions } from "../types/layout";
import type { UnknownStruct } from "../types/utils";

/**
 * Creates a type-safe configuration for graph layout options.
 *
 * Layout algorithms determine how nodes are positioned in the graph.
 * This function provides type safety for layout configuration and parameters.
 *
 * @template NodeType - The node data type extending UnknownStruct
 * @param layout - Configuration options for the layout algorithm
 * @returns The same layout configuration with proper typing
 *
 * @example
 * ```typescript
 * const layoutOptions = createGraphLayout({
 *   type: 'force',
 *   linkDistance: 100,
 *   nodeStrength: -300,
 *   edgeStrength: 200,
 *   animate: true
 * });
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/layout/build-in/base-layout
 */
export const createGraphLayout = <NodeType extends UnknownStruct>(
  layout: GraphLayoutOptions<NodeType>,
): GraphLayoutOptions<NodeType> => {
  return layout;
};
