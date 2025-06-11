import type { D3Force3DLayoutOptions as GD3Force3DLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * D3 Force 3D Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/d3-force-layout
 */
export type D3Force3DLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GD3Force3DLayoutOptions & {
    type: "d3-force3d";
  };
