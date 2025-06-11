import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for hexagon nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/hexagon
 */
export type HexagonNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * Outer radius, the distance from the hexagon's center to any vertex.
   *
   * @default "Half of the minimum of width and height"
   */
  outerR?: number;
};
