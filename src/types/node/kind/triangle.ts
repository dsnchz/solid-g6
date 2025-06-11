import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for triangle nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/triangle
 */
export type TriangleNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * The direction of the triangle.
   *
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";
};
