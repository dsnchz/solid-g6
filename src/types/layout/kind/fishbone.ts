import type { FishboneLayoutOptions as GFishboneLayoutOptions, Size } from "@antv/g6";

import type { NodeData } from "../../node";
import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

type CoreFishboneOptions = Pick<
  GFishboneLayoutOptions,
  "direction" | "hGap" | "vGap" | "width" | "height"
>;

/**
 * Fishbone Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/fishbone
 */
export type FishboneLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  CoreFishboneOptions & {
    type: "fishbone";
    /**
     * <zh/> 节点大小
     *
     * <en/> Node size
     */
    nodeSize?: Size | ((node: NodeData<NodeType>) => Size);
    /**
     * <zh/> 获取鱼骨间距
     *
     * <en/> Get rib separation
     * @defaultValue () => 60
     */
    getRibSep?: (node: NodeData<NodeType>) => number;
  };
