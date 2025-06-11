import type { UnknownStruct } from "../../utils";
import type { BaseComboStyleProps } from "../base";

/**
 * Style configuration for circle combos.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/combo/build-in/circle-combo
 */
export type CircleComboStyle<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = Partial<BaseComboStyleProps<ComboType, NodeType>>;
