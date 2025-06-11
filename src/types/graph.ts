import type {
  CanvasEvent,
  CustomBehaviorOption,
  EdgeEvent,
  GraphEvent,
  GraphOptions,
  IEvent,
  NodeEvent,
} from "@antv/g6";

import type { BuiltInBehaviorTypeConfig, BuiltInBehaviorTypes } from "./behavior";
import type { ComboConfigOptions, ComboData } from "./combo";
import type { EdgeConfigOptions, EdgeData } from "./edge";
import type { GraphLayoutOptions } from "./layout";
import type { NodeConfigOptions, NodeData } from "./node";
import type { UnknownStruct } from "./utils";

export type G6EventName = `${NodeEvent}` | `${EdgeEvent}` | `${CanvasEvent}` | `${GraphEvent}`;

export type G6EventHandler =
  | ((e: IEvent) => void)
  | {
      handler: (e: IEvent) => void;
      once?: boolean;
    };

export type G6EventsMap = {
  [E in G6EventName]?: G6EventHandler;
};

/**
 * Generic type definition for G6 graph data structure.
 *
 * This type defines the complete data structure for a G6 graph, including nodes,
 * edges, and optional combos (hierarchical groupings). Each element type can be
 * customized with specific data structures while maintaining type safety.
 *
 * @template NodeType - Custom data type for individual nodes, defaults to UnknownStruct
 * @template EdgeType - Custom data type for individual edges, defaults to UnknownStruct
 * @template ComboType - Custom data type for individual combos, defaults to UnknownStruct
 *
 * @example
 * ```typescript
 * // Basic usage with default types
 * const basicData: G6GraphData = {
 *   nodes: [{ id: 'node1' }, { id: 'node2' }],
 *   edges: [{ id: 'edge1', source: 'node1', target: 'node2' }]
 * };
 *
 * // Usage with custom node and edge data types
 * interface MyNodeData {
 *   name: string;
 *   category: string;
 *   value: number;
 * }
 *
 * interface MyEdgeData {
 *   weight: number;
 *   type: 'direct' | 'indirect';
 * }
 *
 * const typedData: G6GraphData<MyNodeData, MyEdgeData> = {
 *   nodes: [
 *     { id: 'node1', data: { name: 'Node 1', category: 'A', value: 10 } },
 *     { id: 'node2', data: { name: 'Node 2', category: 'B', value: 20 } }
 *   ],
 *   edges: [
 *     { id: 'edge1', source: 'node1', target: 'node2', data: { weight: 5, type: 'direct' } }
 *   ]
 * };
 * ```
 *
 * @see {@link NodeData} for node structure details
 * @see {@link EdgeData} for edge structure details
 * @see {@link ComboData} for combo structure details
 */
export type G6GraphData<
  NodeType extends UnknownStruct = UnknownStruct,
  EdgeType extends UnknownStruct = UnknownStruct,
  ComboType extends UnknownStruct = UnknownStruct,
> = {
  /** Array of nodes in the graph, each with optional custom data */
  nodes?: NodeData<NodeType>[];
  /** Array of edges connecting nodes, each with optional custom data */
  edges?: EdgeData<EdgeType>[];
  /** Array of combos for hierarchical grouping of nodes, each with optional custom data */
  combos?: ComboData<ComboType, NodeType>[];
};

/**
 * Utility type for extracting individual data types from a G6GraphData generic type.
 *
 * This type uses conditional type inference to extract the node, edge, and combo
 * data types from a G6GraphData type. It's primarily used internally by other
 * types to maintain type safety when configuring graph options.
 *
 * The type leverages TypeScript's `infer` keyword to extract the generic type
 * parameters from G6GraphData and make them available as separate properties.
 *
 * @template D - The graph data type extending G6GraphData to extract types from
 *
 * @example
 * ```typescript
 * // Define custom data types
 * interface MyNodeData {
 *   name: string;
 *   category: string;
 * }
 *
 * interface MyEdgeData {
 *   weight: number;
 *   type: 'solid' | 'dashed';
 * }
 *
 * interface MyComboData {
 *   title: string;
 *   collapsed: boolean;
 * }
 *
 * // Create a typed graph data type
 * type MyGraphData = G6GraphData<MyNodeData, MyEdgeData, MyComboData>;
 *
 * // Extract individual types using the utility
 * type ExtractedTypes = InferGraphDataTypes<MyGraphData>;
 * // ExtractedTypes is:
 * // {
 * //   node: MyNodeData;
 * //   edge: MyEdgeData;
 * //   combo: MyComboData;
 * // }
 *
 * // Use in practice (this is how it's used internally)
 * type NodeOptions = NodeConfigOptions<ExtractedTypes["node"]>;
 * type EdgeOptions = EdgeConfigOptions<ExtractedTypes["edge"]>;
 * ```
 *
 * @see {@link G6GraphData} for the source data structure
 * @see {@link NodeConfigOptions} for how node types are used
 * @see {@link EdgeConfigOptions} for how edge types are used
 * @see {@link ComboConfigOptions} for how combo types are used
 */
export type InferGraphDataTypes<D extends G6GraphData> = {
  /** The inferred node data type from the G6GraphData generic */
  node: D extends G6GraphData<infer N, UnknownStruct, UnknownStruct> ? N : never;
  /** The inferred edge data type from the G6GraphData generic */
  edge: D extends G6GraphData<UnknownStruct, infer E, UnknownStruct> ? E : never;
  /** The inferred combo data type from the G6GraphData generic */
  combo: D extends G6GraphData<UnknownStruct, UnknownStruct, infer C> ? C : never;
};

/**
 * The supported behaviors for the graph.
 *
 * @see https://g6.antv.antgroup.com/en/manual/behavior/overview
 */
export type G6GraphBehaviors =
  | BuiltInBehaviorTypes
  | BuiltInBehaviorTypeConfig
  | CustomBehaviorOption;

/**
 * Refined and type-safe version of G6's GraphOptions with enhanced type safety.
 *
 * This type extends the base G6 GraphOptions while providing better type inference
 * and safety for graph data, configurations, and behaviors. It replaces several
 * base options with type-safe alternatives that work seamlessly with custom data types.
 *
 * Key improvements over base GraphOptions:
 * - Type-safe data binding with custom node, edge, and combo types
 * - Enhanced layout options with node type inference
 * - Refined behavior configurations
 * - Better integration with the library's utility functions
 *
 * @template D - The graph data type extending G6GraphData, defaults to G6GraphData
 *
 * @example
 * ```typescript
 * // Basic usage with default types
 * const options: G6GraphOptions = {
 *   width: 800,
 *   height: 600,
 *   data: {
 *     nodes: [{ id: 'node1' }, { id: 'node2' }],
 *     edges: [{ id: 'edge1', source: 'node1', target: 'node2' }]
 *   },
 *   layout: { type: 'grid' },
 *   behaviors: ['drag-canvas', 'zoom-canvas']
 * };
 *
 * // Usage with custom typed data
 * interface MyNodeData {
 *   name: string;
 *   category: string;
 * }
 *
 * interface MyEdgeData {
 *   weight: number;
 * }
 *
 * const typedOptions: G6GraphOptions<G6GraphData<MyNodeData, MyEdgeData>> = {
 *   width: 800,
 *   height: 600,
 *   data: {
 *     nodes: [
 *       { id: 'node1', data: { name: 'Node 1', category: 'A' } },
 *       { id: 'node2', data: { name: 'Node 2', category: 'B' } }
 *     ],
 *     edges: [
 *       { id: 'edge1', source: 'node1', target: 'node2', data: { weight: 5 } }
 *     ]
 *   },
 *   node: {
 *     style: { fill: '#4A90E2', r: 10 },
 *     labelText: (d) => d.name // TypeScript knows d has 'name' property
 *   },
 *   edge: {
 *     labelText: (d) => d.weight.toString() // TypeScript knows d has 'weight' property
 *   },
 *   layout: { type: 'force', linkDistance: 100 },
 *   behaviors: ['drag-node', 'zoom-canvas']
 * };
 * ```
 *
 * @see {@link G6GraphData} for data structure details
 * @see {@link NodeConfigOptions} for node configuration options
 * @see {@link EdgeConfigOptions} for edge configuration options
 * @see {@link ComboConfigOptions} for combo configuration options
 * @see {@link GraphLayoutOptions} for layout configuration options
 * @see {@link G6GraphBehaviors} for behavior configuration options
 */
export type G6GraphOptions<D extends G6GraphData = G6GraphData> = Omit<
  GraphOptions,
  "data" | "node" | "edge" | "combo" | "layout" | "behaviors"
> & {
  /** Graph data containing nodes, edges, and optional combos with type safety */
  data?: D;

  /** Configuration options for node appearance and behavior with type inference */
  node?: NodeConfigOptions<InferGraphDataTypes<D>["node"]>;
  /** Configuration options for edge appearance and behavior with type inference */
  edge?: EdgeConfigOptions<InferGraphDataTypes<D>["edge"]>;
  /** Configuration options for combo appearance and behavior with type inference */
  combo?: ComboConfigOptions<InferGraphDataTypes<D>["combo"], InferGraphDataTypes<D>["node"]>;
  /** Layout algorithm configuration with node type inference */
  layout?: GraphLayoutOptions<InferGraphDataTypes<D>["node"]>;
  /** Array of interaction behaviors for the graph */
  behaviors?: G6GraphBehaviors[];
};
