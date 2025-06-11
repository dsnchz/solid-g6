import type { BaseEdgeStyleProps, Padding, Point } from "@antv/g6";
import type { Direction } from "@antv/g6/lib/types";

type DirectionMap = {
  readonly [key in Direction]: {
    readonly stepX: number;
    readonly stepY: number;
  };
};

type OrthRouter = {
  readonly type: "orth";
  readonly padding?: Padding;
};

type ShortestPathRouter = {
  /**
   * Shortest path routing, an intelligent version of orthogonal routing 'orth'. This routing consists
   * of horizontal or vertical orthogonal segments. It uses the A* algorithm to calculate the shortest
   * path and supports automatic avoidance of other nodes (obstacles) on the path.
   * */
  readonly type: "shortest-path";
  /** Minimum distance between the node anchor point and the corner. */
  readonly offset?: Padding;
  /** Grid cell size.	*/
  readonly gridSize?: number;
  /** Maximum allowed rotation angle (radians).	*/
  readonly maxAllowedDirectionChange?: number;
  /** Possible starting directions of the node.	*/
  readonly startDirections?: Direction[];
  /** Possible ending directions of the node.	*/
  readonly endDirections?: Direction[];
  /** Specifies the movable directions.	*/
  readonly directionMap?: DirectionMap;
  /** Represents additional costs for certain paths during path searching. The key is the radian value, and the value is the cost. */
  readonly penalties?: Record<string, number>;
  /** Specifies the function to calculate the distance between two points. */
  readonly distFunc?: (p1: Point, p2: Point) => number;
  /** Maximum number of iterations.	*/
  readonly maximumLoops?: number;
  /** Whether to enable obstacle avoidance. */
  readonly enableObstacleAvoidance?: boolean;
};

/**
 * Style configuration for polyline edges.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/build-in/polyline
 */
export type PolylineEdgeStyle = Partial<BaseEdgeStyleProps> & {
  /** Array of control points used to define the turning points of the polyline. */
  readonly controlPoints?: Point[];
  /** Corner radius of the turning points. */
  readonly radius?: number;
  /** Whether to enable routing. */
  readonly router?: false | OrthRouter | ShortestPathRouter;
};
