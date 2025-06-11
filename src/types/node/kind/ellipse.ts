import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for ellipse nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/ellipse
 */
export type EllipseNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
>;
