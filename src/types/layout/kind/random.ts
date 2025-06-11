import type { RandomLayoutOptions as GRandomLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * Random Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/random-layout
 */
export type RandomLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GRandomLayoutOptions & {
    type: "random";
  };
