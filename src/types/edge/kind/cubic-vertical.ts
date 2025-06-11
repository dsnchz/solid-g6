import type { BaseEdgeStyleProps } from "@antv/g6";

/**
 * Style configuration for cubic vertical bezier edges.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/edge/build-in/cubic-vertical
 */
export type CubicVerticalBezierEdgeStyle = Partial<BaseEdgeStyleProps> & {
  /**
   * Relative position of the control point on the line connecting the two endpoints, ranging from 0-1.
   *
   * @default [0.5, 0.5]
   */
  readonly curvePosition?: number | number[];
  /**
   * Distance of the control point from the line connecting the two endpoints, understood as the degree of curve bending.
   *
   * @default [0, 0]
   */
  readonly curveOffset?: number | number[];
};
