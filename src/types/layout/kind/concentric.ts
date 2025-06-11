import type { ConcentricLayoutOptions as GConcentricLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Concentric Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/concentric-layout
 */
export type ConcentricLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GConcentricLayoutOptions & {
    type: "concentric";
  };
