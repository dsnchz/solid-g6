import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for circle nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/circle
 */
export type CircleNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
>;
