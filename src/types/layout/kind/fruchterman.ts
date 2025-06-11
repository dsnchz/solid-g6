import type { FruchtermanLayoutOptions as GFruchtermanLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Fruchterman Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/fruchterman-layout
 */
export type FruchtermanLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GFruchtermanLayoutOptions & {
    type: "fruchterman" | "fruchterman-gpu";
  };
