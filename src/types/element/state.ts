/**
 * Preset states for nodes and edges.
 *
 * @see https://g6.antv.antgroup.com/en/manual/element/state
 */
export type PresetState = "selected" | "active" | "highlight" | "inactive" | "disable";

export type ElementState = PresetState | (string & {});
