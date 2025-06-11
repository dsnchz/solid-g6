import type {
  BaseNodeStyleProps as GBaseNodeStyleProps,
  Graph,
  NodeData as GNodeData,
  NodeOptions as GNodeOptions,
} from "@antv/g6";

import type { ElementState, PresetState } from "../element/state";
import type { UnknownStruct } from "../utils";
import type { CircleNodeStyle } from "./kind/circle";
import type { CustomNodeStyle } from "./kind/custom";
import type { DiamondNodeStyle } from "./kind/diamond";
import type { DonutNodeStyle } from "./kind/donut";
import type { EllipseNodeStyle } from "./kind/ellipse";
import type { HexagonNodeStyle } from "./kind/hexagon";
import type { HtmlNodeStyle } from "./kind/html";
import type { ImageNodeStyle } from "./kind/image";
import type { RectNodeStyle } from "./kind/rect";
import type { StarNodeStyle } from "./kind/star";
import type { TriangleNodeStyle } from "./kind/triangle";

export type NodeTypeStyleMap<NodeType extends UnknownStruct = UnknownStruct> = {
  circle: CircleNodeStyle<NodeType>;
  diamond: DiamondNodeStyle<NodeType>;
  donut: DonutNodeStyle<NodeType>;
  ellipse: EllipseNodeStyle<NodeType>;
  hexagon: HexagonNodeStyle<NodeType>;
  html: HtmlNodeStyle<NodeType>;
  image: ImageNodeStyle<NodeType>;
  rect: RectNodeStyle<NodeType>;
  star: StarNodeStyle<NodeType>;
  triangle: TriangleNodeStyle<NodeType>;
};

export type BuiltInNodeTypeName = keyof NodeTypeStyleMap;

type RefinedNodeData = Pick<GNodeData, "id" | "combo" | "children" | "depth">;

export type NodeData<NodeType extends UnknownStruct> = RefinedNodeData & {
  /**
   * <zh/> Node 类型
   *
   * <en/> Node type
   */
  type?: BuiltInNodeTypeName | (string & {});
  /**
   * <zh/> 节点数据
   *
   * <en/> Node data
   * @remarks
   * <zh/> 用于存储节点的自定义数据，可以在样式映射中通过回调函数获取
   *
   * <en/> Used to store custom data of the node, which can be obtained through callback functions in the style mapping
   */
  data?: NodeType;

  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: NodeTypeStyleMap<NodeType>[BuiltInNodeTypeName] | CustomNodeStyle<NodeType>;

  /**
   * <zh/> 节点初始状态
   *
   * <en/> Initial state of the node
   */
  states?: ElementState[];

  // any arbitrary key-value pairs
  [key: string]: unknown;
};

type BaseNodeOptions = Omit<GNodeOptions, "type" | "style" | "state">;

type BaseNodeStyleProps<NodeType extends UnknownStruct = UnknownStruct> = Omit<
  GBaseNodeStyleProps,
  "childrenData"
> & {
  /**
   * <zh/> 子节点数据
   *
   * <en/> The data of the child node
   * @remarks
   * <zh/> 仅在树图中生效。如果当前节点为收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> Only valid in the tree graph. If the current node is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   * @ignore
   */
  childrenData?: NodeData<NodeType>[];
};

type NodeDataFn<R, NodeType extends UnknownStruct> = (this: Graph, datum: NodeData<NodeType>) => R;

type StyleFieldNodeDataFn<S, NodeType extends UnknownStruct = UnknownStruct> = {
  [K in keyof S]?: S[K] | NodeDataFn<S[K], NodeType>;
};

export type NodeOptions<
  T extends string,
  S extends Partial<BaseNodeStyleProps<NodeType>>,
  NodeType extends UnknownStruct = UnknownStruct,
> = BaseNodeOptions & {
  type?: T | NodeDataFn<T, NodeType>;
  style?: S | NodeDataFn<S, NodeType> | StyleFieldNodeDataFn<S, NodeType>;
  /**
   * The state of the node.
   *
   * @see https://g6.antv.antgroup.com/en/manual/element/state
   * */
  state?:
    | {
        [K in PresetState]?: S | NodeDataFn<S, NodeType> | StyleFieldNodeDataFn<S, NodeType>;
      }
    | {
        [customState: string]: S | NodeDataFn<S, NodeType> | StyleFieldNodeDataFn<S, NodeType>;
      };
};

type CircleNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "circle",
  CircleNodeStyle<NodeType>,
  NodeType
>;

type DiamondNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "diamond",
  DiamondNodeStyle<NodeType>,
  NodeType
>;

type DonutNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "donut",
  DonutNodeStyle<NodeType>,
  NodeType
>;

type EllipseNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "ellipse",
  EllipseNodeStyle<NodeType>,
  NodeType
>;

type HexagonNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "hexagon",
  HexagonNodeStyle<NodeType>,
  NodeType
>;

type HtmlNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "html",
  HtmlNodeStyle<NodeType>,
  NodeType
>;
type ImageNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "image",
  ImageNodeStyle<NodeType>,
  NodeType
>;

type RectNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "rect",
  RectNodeStyle<NodeType>,
  NodeType
>;

type StarNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "star",
  StarNodeStyle<NodeType>,
  NodeType
>;

type TriangleNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  "triangle",
  TriangleNodeStyle<NodeType>,
  NodeType
>;

type CustomNodeOptions<NodeType extends UnknownStruct = UnknownStruct> = NodeOptions<
  Exclude<string, BuiltInNodeTypeName>,
  CustomNodeStyle<NodeType>,
  NodeType
>;

/**
 * The different node config options for the graph.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/overview
 */
export type NodeConfigOptions<NodeType extends UnknownStruct = UnknownStruct> =
  | CircleNodeOptions<NodeType>
  | DiamondNodeOptions<NodeType>
  | DonutNodeOptions<NodeType>
  | EllipseNodeOptions<NodeType>
  | HexagonNodeOptions<NodeType>
  | HtmlNodeOptions<NodeType>
  | ImageNodeOptions<NodeType>
  | RectNodeOptions<NodeType>
  | StarNodeOptions<NodeType>
  | TriangleNodeOptions<NodeType>
  | CustomNodeOptions<NodeType>;
