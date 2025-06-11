import type { BaseComboStyleProps as GBaseComboStyleProps } from "@antv/g6";

import type { NodeData } from "../node";
import type { UnknownStruct } from "../utils";
import type { ComboData } from ".";

export type BaseComboStyleProps<
  ComboType extends UnknownStruct = UnknownStruct,
  NodeType extends UnknownStruct = UnknownStruct,
> = Omit<GBaseComboStyleProps, "childrenData"> & {
  /**
   * <zh/> 组合的子元素数据
   *
   * <en/> The data of the children of combo
   * @remarks
   * <zh/> 如果组合是收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> If the combo is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   */
  childrenData?: (NodeData<NodeType> | ComboData<ComboType, NodeType>)[];
};
