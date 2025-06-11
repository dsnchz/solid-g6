import type { DagreLayoutOptions as GDagreLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Antv Dagre Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/dagre-layout
 */
export type DagreLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GDagreLayoutOptions & {
    type: "dagre";
  };
