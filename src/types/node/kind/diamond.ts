import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for diamond nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/diamond
 */
export type DiamondNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
>;
