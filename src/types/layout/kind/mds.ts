import type { MDSLayoutOptions as GMDSLayoutOptions } from "@antv/g6";

import type { UnknownStruct } from "../../utils";
import type { BaseLayoutOptions } from "../base";

/**
 * MDS High-dimensional Data Dimensionality Reduction Layout Layout options
 *
 * @sse https://g6.antv.antgroup.com/en/manual/layout/build-in/mds-layout
 */
export type MDSLayoutOptions<NodeType extends UnknownStruct> = BaseLayoutOptions<NodeType> &
  GMDSLayoutOptions & {
    type: "mds";
  };
