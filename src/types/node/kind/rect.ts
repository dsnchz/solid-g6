import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for rect nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/rect
 */
export type RectNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
>;
