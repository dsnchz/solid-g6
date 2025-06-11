import type { ComboData as GComboData, ComboOptions as GComboOptions, Graph } from "@antv/g6";

import type { ElementState, PresetState } from "../element/state";
import type { UnknownStruct } from "../utils";
import type { BaseComboStyleProps } from "./base";
import type { CircleComboStyle } from "./kind/circle";
import type { CustomComboStyle } from "./kind/custom";
import type { RectComboStyle } from "./kind/rect";

type ComboTypeStyleMap = {
  circle: CircleComboStyle;
  rect: RectComboStyle;
};

type BuiltInComboTypeName = keyof ComboTypeStyleMap;

type RefinedComboData = Pick<GComboData, "id" | "style" | "combo">;

export type ComboData<
  ComboType extends UnknownStruct,
  NodeType extends UnknownStruct,
> = RefinedComboData & {
  /**
   * <zh/> Combo 类型
   *
   * <en/> Combo type
   */
  type?: BuiltInComboTypeName | (string & {});

  data?: ComboType;
  style?:
    | CircleComboOptions<ComboType, NodeType>["style"]
    | RectComboOptions<ComboType, NodeType>["style"]
    | CustomComboOptions<ComboType, NodeType>["style"];

  /**
   * <zh/> 组合初始状态
   *
   * <en/> Initial state of the combo
   */
  states?: ElementState[];

  // any arbitrary key-value pairs
  [key: string]: unknown;
};

type BaseComboOptions = Omit<GComboOptions, "type" | "style" | "state">;

type ComboDataFn<R, ComboType extends UnknownStruct, NodeType extends UnknownStruct> = (
  this: Graph,
  datum: ComboData<ComboType, NodeType>,
) => R;

type StyleFieldComboDataFn<
  S extends Partial<BaseComboStyleProps<ComboType, NodeType>>,
  ComboType extends UnknownStruct,
  NodeType extends UnknownStruct,
> = {
  [K in keyof S]?: S[K] | ComboDataFn<S[K], ComboType, NodeType>;
};

export type ComboOptions<
  T extends string = string,
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
  S extends Partial<BaseComboStyleProps<ComboType, NodeType>> = Partial<
    BaseComboStyleProps<ComboType, NodeType>
  >,
> = BaseComboOptions & {
  type?: T | ComboDataFn<T, ComboType, NodeType>;
  style?: S | ComboDataFn<S, ComboType, NodeType> | StyleFieldComboDataFn<S, ComboType, NodeType>;
  /**
   * The state of the node.
   *
   * @see https://g6.antv.antgroup.com/en/manual/element/state
   * */
  state?:
    | {
        [K in PresetState]?:
          | S
          | ComboDataFn<S, ComboType, NodeType>
          | StyleFieldComboDataFn<S, ComboType, NodeType>;
      }
    | {
        [customState: string]:
          | S
          | ComboDataFn<S, ComboType, NodeType>
          | StyleFieldComboDataFn<S, ComboType, NodeType>;
      };
};

type CircleComboOptions<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = ComboOptions<"circle", ComboType, NodeType, CircleComboStyle<ComboType, NodeType>>;

type RectComboOptions<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = ComboOptions<"rect", ComboType, NodeType, RectComboStyle<ComboType, NodeType>>;

type CustomComboOptions<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = ComboOptions<
  Exclude<string, BuiltInComboTypeName>,
  ComboType,
  NodeType,
  CustomComboStyle<ComboType, NodeType>
>;

/**
 * The different combo config options for the graph.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/combo/overview
 */
export type ComboConfigOptions<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> =
  | CircleComboOptions<ComboType, NodeType>
  | RectComboOptions<ComboType, NodeType>
  | CustomComboOptions<ComboType, NodeType>;
