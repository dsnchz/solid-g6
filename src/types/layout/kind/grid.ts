import type { GridLayoutOptions as GGridLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Grid Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/grid-layout
 */
export type GridLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GGridLayoutOptions & {
    type: "grid";
  };
