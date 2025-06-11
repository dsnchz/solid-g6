import type { G6GraphBehaviors } from "../types/graph";

/**
 * Creates a configuration for graph behaviors with type safety.
 *
 * Behaviors define how users can interact with the graph, such as drag-drop,
 * zoom, select, and other interactive features.
 *
 * @param behaviors - Array of behavior configurations to apply to the graph
 * @returns The same behaviors array with proper typing for G6 graph
 *
 * @example
 * ```typescript
 * const behaviors = createGraphBehaviors([
 *   'zoom-canvas',
 *   'drag-canvas',
 *   { type: 'drag-node', enableTransient: false }
 * ]);
 * ```
 *
 * @see https://g6.antv.antgroup.com/en/manual/behavior/overview
 */
export const createGraphBehaviors = (behaviors: G6GraphBehaviors[]): G6GraphBehaviors[] => {
  return behaviors;
};
