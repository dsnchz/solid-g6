import type { RadialLayoutOptions as GRadialLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Radial Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/radial-layout
 */
export type RadialLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GRadialLayoutOptions & {
    type: "radial";
  };
