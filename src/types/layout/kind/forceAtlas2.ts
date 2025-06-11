import type { ForceAtlas2LayoutOptions as GForceAtlas2LayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Force Atlas 2 Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/force-atlas2-layout
 */
export type ForceAtlas2LayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GForceAtlas2LayoutOptions & {
    type: "force-atlas2";
  };
