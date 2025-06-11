import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for star nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/star
 */
export type StarNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * Inner radius, the distance from the star's center to the inner vertex.
   *
   * @default "3/8 of the outer radius"
   */
  innerR?: number;
};
