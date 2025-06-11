import type { UnknownStruct } from "../utils";
import type { AntvDagreLayoutOptions } from "./kind/antvDagre";
import type { CircularLayoutOptions } from "./kind/circular";
import type { ConcentricLayoutOptions } from "./kind/concentric";
import type { CustomLayoutOptions } from "./kind/custom";
import type { D3ForceLayoutOptions } from "./kind/d3Force";
import type { D3Force3DLayoutOptions } from "./kind/d3Force3d";
import type { DagreLayoutOptions } from "./kind/dagre";
import type { FishboneLayoutOptions } from "./kind/fishbone";
import type { ForceLayoutOptions } from "./kind/force";
import type { ForceAtlas2LayoutOptions } from "./kind/forceAtlas2";
import type { FruchtermanLayoutOptions } from "./kind/fruchterman";
import type { GridLayoutOptions } from "./kind/grid";
import type { MDSLayoutOptions } from "./kind/mds";
import type { RadialLayoutOptions } from "./kind/radial";
import type { RandomLayoutOptions } from "./kind/random";
import type { SnakeLayoutOptions } from "./kind/snake";

export type GraphLayoutOptions<NodeType extends UnknownStruct = UnknownStruct> =
  | AntvDagreLayoutOptions<NodeType>
  | CircularLayoutOptions<NodeType>
  | ConcentricLayoutOptions<NodeType>
  | D3ForceLayoutOptions<NodeType>
  | D3Force3DLayoutOptions<NodeType>
  | DagreLayoutOptions<NodeType>
  | FishboneLayoutOptions<NodeType>
  | ForceLayoutOptions<NodeType>
  | ForceAtlas2LayoutOptions<NodeType>
  | FruchtermanLayoutOptions<NodeType>
  | GridLayoutOptions<NodeType>
  | MDSLayoutOptions<NodeType>
  | RadialLayoutOptions<NodeType>
  | RandomLayoutOptions<NodeType>
  | SnakeLayoutOptions<NodeType>
  | CustomLayoutOptions<NodeType>;
