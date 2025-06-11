import type { BaseEdgeStyleProps, Point } from "@antv/g6";

/**
 * Style configuration for quadratic edges.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/build-in/quadratic
 */
export type QuadraticEdgeStyle = Partial<BaseEdgeStyleProps> & {
  /** Array of control points used to define the shape of the curve. If not specified, control points will be calculated using curveOffset and curvePosition.	 */
  readonly controlPoints?: Point[];
  /** Relative position of the control point on the line connecting the two endpoints, ranging from 0-1. (default: 0.5) */
  readonly curvePosition?: number;
  /** Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending. (default: 30) */
  readonly curveOffset?: number;
};
