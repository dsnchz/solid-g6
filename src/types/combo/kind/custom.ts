import type { UnknownStruct } from "../../utils";
import type { BaseComboStyleProps } from "../base";

/**
 * Style configuration for custom combos.
 *
 */
export type CustomComboStyle<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = Partial<BaseComboStyleProps<ComboType, NodeType>> & {
  [key: string]: unknown;
};
