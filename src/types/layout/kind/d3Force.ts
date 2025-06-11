import type { D3ForceLayoutOptions as GD3ForceLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * D3 Force Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/d3-force-layout
 */
export type D3ForceLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GD3ForceLayoutOptions & {
    type: "d3-force";
  };
