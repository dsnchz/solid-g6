import type { BaseEdgeStyleProps, Point } from "@antv/g6";

/**
 * Style configuration for cubic bezier edges.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/build-in/cubic
 */
export type CubicBezierEdgeStyle = Partial<BaseEdgeStyleProps> & {
  /** Array of control points used to define the shape of the curve. If not specified, control points will be calculated using `curveOffset` and `curvePosition`.	*/
  readonly controlPoints?: [Point, Point];
  /** Relative position of the control point on the line connecting the two endpoints, ranging from 0-1. (default: 0.5) */
  readonly curvePosition?: number | number[];
  /** Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. (default: 20) */
  readonly curveOffset?: number | number[];
};
