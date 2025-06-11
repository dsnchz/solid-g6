import type {
  BaseEdgeStyleProps,
  CubicHorizontalStyleProps,
  CubicStyleProps,
  CubicVerticalStyleProps,
  EdgeData as GEdgeData,
  EdgeOptions as GEdgeOptions,
  Graph,
  LineStyleProps,
  PolylineStyleProps,
  QuadraticStyleProps,
} from "@antv/g6";
import type { EdgeStyle } from "@antv/g6/lib/spec/element/edge";

import type { ElementState, PresetState } from "../element/state";
import type { UnknownStruct } from "../utils";
import type { CustomEdgeStyle } from "./kind/custom";

type BaseEdgeOptions = Omit<GEdgeOptions, "type" | "style" | "state">;

export type EdgeTypeStyleMap = {
  cubic: CubicStyleProps;
  "cubic-vertical": CubicVerticalStyleProps;
  "cubic-horizontal": CubicHorizontalStyleProps;
  line: LineStyleProps;
  polyline: PolylineStyleProps;
  quadratic: QuadraticStyleProps;
};

export type BuiltInEdgeTypeName = keyof EdgeTypeStyleMap;

type RefinedEdgeData = Pick<GEdgeData, "id" | "source" | "target">;

export type EdgeData<EdgeType extends UnknownStruct> = RefinedEdgeData & {
  /**
   * <zh/> 边类型
   *
   * <en/> Edge type
   */
  type?: BuiltInEdgeTypeName | (string & {});
  /**
   * <zh/> 边数据
   *
   * <en/> Edge data
   * @remarks
   * <zh/> 用于存储边的自定义数据，可以在样式映射中通过回调函数获取
   *
   * <en/> Used to store custom data of the edge, which can be obtained through callback functions in the style mapping
   */
  data?: EdgeType;
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?: EdgeTypeStyleMap[BuiltInEdgeTypeName] | CustomEdgeStyle;

  /**
   * <zh/> 边初始状态
   *
   * <en/> Initial state of the edge
   */
  states?: ElementState[];

  // any arbitrary key-value pairs
  [key: string]: unknown;
};

type EdgeDataFn<R, EdgeType extends UnknownStruct> = (this: Graph, datum: EdgeData<EdgeType>) => R;

type StyleFieldEdgeDataFn<S, EdgeType extends UnknownStruct = UnknownStruct> = {
  [K in keyof S]?: S[K] | EdgeDataFn<S[K], EdgeType>;
};

export type EdgeOptions<
  T extends string,
  S extends Partial<BaseEdgeStyleProps>,
  EdgeType extends UnknownStruct = UnknownStruct,
> = BaseEdgeOptions & {
  type?: T | EdgeDataFn<T, EdgeType>;
  style?: S | EdgeDataFn<S, EdgeType> | StyleFieldEdgeDataFn<S, EdgeType>;
  state?:
    | {
        [K in PresetState]?: S | EdgeDataFn<S, EdgeType> | StyleFieldEdgeDataFn<S, EdgeType>;
      }
    | {
        [customState: string]: S | EdgeDataFn<S, EdgeType> | StyleFieldEdgeDataFn<S, EdgeType>;
      };
};

type CubicEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "cubic",
  EdgeTypeStyleMap["cubic"],
  EdgeType
>;

type CubicVerticalEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "cubic-vertical",
  EdgeTypeStyleMap["cubic-vertical"],
  EdgeType
>;

type CubicHorizontalEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "cubic-horizontal",
  EdgeTypeStyleMap["cubic-horizontal"],
  EdgeType
>;

type LineEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "line",
  EdgeTypeStyleMap["line"],
  EdgeType
>;

type PolylineEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "polyline",
  EdgeTypeStyleMap["polyline"],
  EdgeType
>;

type QuadraticEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  "quadratic",
  EdgeTypeStyleMap["quadratic"],
  EdgeType
>;

type CustomEdgeOptions<EdgeType extends UnknownStruct = UnknownStruct> = EdgeOptions<
  Exclude<string, BuiltInEdgeTypeName>,
  EdgeStyle,
  EdgeType
>;

/**
 * The different edge config options for the graph.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/overview
 */
export type EdgeConfigOptions<EdgeType extends UnknownStruct = UnknownStruct> =
  | CubicEdgeOptions<EdgeType>
  | CubicVerticalEdgeOptions<EdgeType>
  | CubicHorizontalEdgeOptions<EdgeType>
  | LineEdgeOptions<EdgeType>
  | PolylineEdgeOptions<EdgeType>
  | QuadraticEdgeOptions<EdgeType>
  | CustomEdgeOptions<EdgeType>;
