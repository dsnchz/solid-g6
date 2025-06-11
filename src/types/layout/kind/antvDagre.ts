import type { AntVDagreLayoutOptions as GAntVDagreLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Antv Dagre Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/antv-dagre-layout
 */
export type AntvDagreLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GAntVDagreLayoutOptions & {
    type: "antv-dagre";
  };
