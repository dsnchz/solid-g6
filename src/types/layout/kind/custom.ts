import type { RandomLayoutOptions as GRandomLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Custom Layout options
 */
export type CustomLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GRandomLayoutOptions & {
    /**
     * <zh/> 布局类型
     *
     * <en/> Layout type
     */
    type: string;
  };
