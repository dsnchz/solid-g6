import type { UnknownStruct } from "../../utils";
import type { BaseComboStyleProps } from "../base";

/**
 * Style configuration for rect combos.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/combo/build-in/rect-combo
 */
export type RectComboStyle<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = Partial<BaseComboStyleProps<ComboType, NodeType>>;
