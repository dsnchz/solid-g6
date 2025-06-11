import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for image nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/image
 */
export type ImageNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * Alias for the img attribute.
   *
   * @default ""
   */
  readonly img?: string;
  /**
   * Image source, i.e., image URL string.
   */
  readonly src: string;
};
