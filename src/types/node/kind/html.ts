import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for html nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/html
 */
export type HtmlNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * Horizontal offset. The HTML container defaults to the top-left corner as the origin, and dx is used for horizontal offset.
   *
   * @default 0
   */
  dx?: number;

  /**
   * Vertical offset. The HTML container defaults to the top-left corner as the origin, and dy is used for vertical offset.
   *
   * @default 0
   */
  dy?: number;

  /**
   * HTML content, can be a string or HTMLElement
   *
   * @default 0
   */
  innerHTML: string | HTMLElement;
};
