import type {
  AutoAdaptLabelOptions,
  BrushSelectOptions,
  ClickSelectOptions,
  CollapseExpandOptions,
  CreateEdgeOptions,
  DragCanvasOptions,
  DragElementForceOptions,
  DragElementOptions,
  FixElementSizeOptions,
  FocusElementOptions,
  HoverActivateOptions,
  LassoSelectOptions,
  OptimizeViewportTransformOptions,
  ScrollCanvasOptions,
  ZoomCanvasOptions,
} from "@antv/g6";

export type BehaviorTypeConfigMap = {
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/drag-canvas
   */
  "drag-canvas": DragCanvasOptions & {
    type: "drag-canvas";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/zoom-canvas
   */
  "zoom-canvas": ZoomCanvasOptions & {
    type: "zoom-canvas";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/scroll-canvas
   */
  "scroll-canvas": ScrollCanvasOptions & {
    type: "scroll-canvas";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/optimize-viewport-transform
   */
  "optimize-viewport-transform": OptimizeViewportTransformOptions & {
    type: "optimize-viewport-transform";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/click-select
   */
  "click-select": ClickSelectOptions & {
    type: "click-select";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/brush-select
   */
  "brush-select": BrushSelectOptions & {
    type: "brush-select";
  };
  "lasso-select": LassoSelectOptions & {
    type: "lasso-select";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/create-edge
   */
  "create-edge": CreateEdgeOptions & {
    type: "create-edge";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/drag-element
   */
  "drag-element": DragElementOptions & {
    type: "drag-element";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/drag-element-force
   */
  "drag-element-force": DragElementForceOptions & {
    type: "drag-element-force";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/collapse-expand
   */
  "collapse-expand": CollapseExpandOptions & {
    type: "collapse-expand";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/focus-element
   */
  "focus-element": FocusElementOptions & {
    type: "focus-element";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/hover-activate
   */
  "hover-activate": HoverActivateOptions & {
    type: "hover-activate";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/fix-element-size
   */
  "fix-element-size": FixElementSizeOptions & {
    type: "fix-element-size";
  };
  /**
   * @see https://g6.antv.antgroup.com/en/manual/behavior/build-in/auto-adapt-label
   */
  "auto-adapt-label": AutoAdaptLabelOptions & {
    type: "auto-adapt-label";
  };
};

/**
 * All the built-in behavior types for G6
 */
export type BuiltInBehaviorTypes = keyof BehaviorTypeConfigMap | (string & {});
export type BuiltInBehaviorTypeConfig = BehaviorTypeConfigMap[keyof BehaviorTypeConfigMap];
