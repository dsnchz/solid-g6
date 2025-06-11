import type { UnknownStruct } from "../../utils";
import type { BaseNodeStyleProps } from "../base";

/**
 * Style configuration for donut rounds.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/donut#donutround
 */
type DonutRound = {
  /** Color */
  color?: string;

  /**
   * Fill color
   * @default "#1783FF"
   */
  fill?: string;

  /**
   * Fill color opacity
   * @default 1
   */
  fillOpacity?: number | string;

  /**
   * Stroke end style
   * @default "butt"
   */
  lineCap?: "round" | "square" | "butt";

  /** Stroke dash style */
  lineDash?: number[];

  /** Stroke dash offset */
  lineDashOffset?: number;

  /**
   * Stroke join style
   * @default "miter"
   */
  lineJoin?: "round" | "bevel" | "miter";

  /**
   * Stroke width
   * @default 1
   */
  lineWidth?: number;

  /**
   * Opacity
   * @default 1
   */
  opacity?: number | string;

  /** Shadow blur */
  shadowBlur?: number;

  /** Shadow color */
  shadowColor?: string;

  /** Shadow offset in x-axis direction */
  shadowOffsetX?: number | string;

  /** Shadow offset in y-axis direction */
  shadowOffsetY?: number | string;

  /**
   * Shadow type
   * @default "outer"
   */
  shadowType?: "inner" | "outer";

  /**
   * Stroke color
   * @default "#000"
   */
  stroke?: string;

  /**
   * Stroke color opacity
   * @default 1
   */
  strokeOpacity?: number | string;

  /**
   * Value for ratio calculation
   * @required
   */
  value: number;

  /**
   * Visibility of the shape
   * @default "visible"
   */
  visibility?: "visible" | "hidden";
};

/**
 * Style configuration for donut nodes.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/node/build-in/donut
 */
export type DonutNodeStyle<NodeType extends UnknownStruct = UnknownStruct> = Partial<
  BaseNodeStyleProps<NodeType>
> & {
  /**
   * Fill color
   *
   * @default "#1783FF"
   */
  donutFill?: string;

  /**
   * Fill color opacity
   *
   * @default 1
   */
  donutFillOpacity?: number | string;

  /**
   * Stroke end style
   *
   * @default "butt"
   */
  donutLineCap?: "round" | "square" | "butt";

  /**
   * Stroke dash style
   */
  donutLineDash?: number[];

  /**
   * Stroke dash offset
   */
  donutLineDashOffset?: number;

  /**
   * Stroke join style
   *
   * @default "miter"
   */
  donutLineJoin?: "round" | "bevel" | "miter";

  /**
   * Stroke width
   *
   * @default 1
   */
  donutLineWidth?: number;

  /**
   * Opacity
   *
   * @default 1
   */
  donutOpacity?: number | string;

  /**
   * Color or palette name
   *
   * @default "tableau"
   */
  donutPalette?: string | string[];

  /**
   * Donut data
   */
  donuts?: number[] | DonutRound[];

  /**
   * Shadow blur
   */
  donutShadowBlur?: number;

  /**
   * Shadow color
   */
  donutShadowColor?: string;

  /**
   * Shadow offset in x-axis direction
   */
  donutShadowOffsetX?: number | string;

  /**
   * Shadow offset in y-axis direction
   */
  donutShadowOffsetY?: number | string;

  /**
   * Shadow type
   *
   * @default "outer"
   */
  donutShadowType?: "inner" | "outer";

  /**
   * Stroke color
   *
   * @default "#000"
   */
  donutStroke?: string;

  /**
   * Stroke color opacity
   *
   * @default 1
   */
  donutStrokeOpacity?: number | string;

  /**
   * Visibility of the shape
   *
   * @default "visible"
   */
  donutVisibility?: "visible" | "hidden";

  /**
   * Inner ring radius, percentage or px
   *
   * @default "50%"
   */
  innerR?: string | number;
};
