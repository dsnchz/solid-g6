import type { CircularLayoutOptions as GCircularLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Antv Dagre Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/circular-layout
 */
export type CircularLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GCircularLayoutOptions & {
    type: "circular";
  };
