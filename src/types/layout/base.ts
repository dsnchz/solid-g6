import type { WebWorkerLayoutOptions } from "@antv/g6";

import type { NodeData } from "../node";
import type { UnknownStruct } from "../utils";

type LayoutAnimationOptions = {
  /**
   * <zh/> 启用布局动画，对于迭代布局，会在两次迭代之间进行动画过渡
   *
   * <en/> Enable layout animation, for iterative layout, animation transition will be performed between two iterations
   */
  animation?: boolean;
};

export type BaseLayoutOptions<NodeType extends UnknownStruct> = LayoutAnimationOptions &
  WebWorkerLayoutOptions & {
    /**
     * <zh/> 参与该布局的节点
     *
     * <en/> Nodes involved in the layout
     * @param node - <zh/> 节点数据 | <en/> node data
     * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
     */
    nodeFilter?: (node: NodeData<NodeType>) => boolean;
    /**
     * <zh/> 使用前布局，在初始化元素前计算布局
     *
     * <en/> Use pre-layout to calculate the layout before initializing the elements
     * @remarks
     * <zh/> 不适用于流水线布局
     *
     * <en/> Not applicable to pipeline layout
     */
    preLayout?: boolean;
    /**
     * <zh/> 不可见节点是否参与布局
     *
     * <en/> Whether invisible nodes participate in the layout
     * @remarks
     * <zh/> 当 preLayout 为 true 时生效
     *
     * <en/> Takes effect when preLayout is true
     */
    isLayoutInvisibleNodes?: boolean;
    [key: string]: unknown;
  };
