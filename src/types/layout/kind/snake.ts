import type { Size, SnakeLayoutOptions as GSnakeLayoutOptions } from "@antv/g6";

import type { NodeData } from "../../node";
import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

type CoreSnakeOptions = Pick<
  GSnakeLayoutOptions,
  "padding" | "cols" | "rowGap" | "colGap" | "clockwise"
>;

/**
 * Snake Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/snake
 */
export type SnakeLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  CoreSnakeOptions & {
    readonly type: "snake";
    /**
     * <zh/> 节点尺寸
     *
     * <en/> Node size
     */
    nodeSize?: Size | ((node: NodeData<NodeType>) => Size);
    /**
     * <zh/> 节点排序方法。默认按照在图中的路径顺序进行展示
     *
     * <en/> Node sorting method
     */
    sortBy?: (nodeA: NodeData<NodeType>, nodeB: NodeData<NodeType>) => -1 | 0 | 1;
  };
