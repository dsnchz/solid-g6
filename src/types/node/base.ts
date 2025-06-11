import type { BaseNodeStyleProps as GBaseNodeStyleProps } from "@antv/g6";

import type { NodeData } from "../node";
import type { UnknownStruct } from "../utils";

export type BaseNodeStyleProps<NodeType extends UnknownStruct = UnknownStruct> = Omit<
  GBaseNodeStyleProps,
  "childrenData"
> & {
  /**
   * <zh/> 子节点数据
   *
   * <en/> The data of the child node
   * @remarks
   * <zh/> 仅在树图中生效。如果当前节点为收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> Only valid in the tree graph. If the current node is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   * @ignore
   */
  childrenData?: NodeData<NodeType>[];
};
