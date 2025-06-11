import type { ForceLayoutOptions as GForceLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Force Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/force-layout
 */
export type ForceLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GForceLayoutOptions & {
    type: "force" | "gforce";
  };
