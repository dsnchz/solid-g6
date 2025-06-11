import { Graph as G6Graph, type GraphOptions } from "@antv/g6";
import {
  type Context,
  createEffect,
  createSignal,
  type JSX,
  mergeProps,
  onCleanup,
  onMount,
  type ParentProps,
  Show,
  splitProps,
} from "solid-js";

import { G6GraphContext, type G6GraphContextValue } from "./context";
import type { G6EventsMap, G6GraphData, G6GraphOptions } from "./types/graph";

/**
 * Props for the Graph component.
 *
 * This type extends G6GraphOptions with additional properties for container
 * styling, event handling, and lifecycle callbacks. It provides a complete
 * configuration interface for rendering and managing G6 graphs in SolidJS.
 *
 * @template D - The graph data type extending G6GraphData, defaults to G6GraphData
 *
 * @example
 * ```tsx
 * // Basic usage with default types
 * const basicProps: GraphProps = {
 *   width: 800,
 *   height: 600,
 *   data: {
 *     nodes: [{ id: 'node1' }, { id: 'node2' }],
 *     edges: [{ id: 'edge1', source: 'node1', target: 'node2' }]
 *   },
 *   layout: { type: 'grid' }
 * };
 *
 * // Advanced usage with custom types and events
 * interface MyNodeData {
 *   name: string;
 *   category: string;
 * }
 *
 * const advancedProps: GraphProps<G6GraphData<MyNodeData>> = {
 *   id: 'my-graph',
 *   class: 'graph-container',
 *   width: 1000,
 *   height: 700,
 *   data: {
 *     nodes: [
 *       { id: 'node1', data: { name: 'Node 1', category: 'A' } }
 *     ],
 *     edges: []
 *   },
 *   node: {
 *     style: { fill: '#4A90E2', r: 15 },
 *     labelText: (d) => d.name
 *   },
 *   layout: { type: 'force', linkDistance: 100 },
 *   behaviors: ['drag-node', 'zoom-canvas'],
 *   events: {
 *     'node:click': (e) => console.log('Node clicked:', e.target.id)
 *   },
 *   onReady: (graph) => console.log('Graph ready:', graph),
 *   onInit: (graph) => console.log('Graph initialized:', graph)
 * };
 * ```
 *
 * @see {@link G6GraphOptions} for base graph configuration options
 * @see {@link G6GraphData} for data structure details
 * @see {@link G6EventsMap} for event configuration options
 */
export type GraphProps<D extends G6GraphData = G6GraphData> = G6GraphOptions<D> & {
  /**
   * The id for the container element.
   */
  readonly id?: string;

  /**
   * The class for the container element.
   */
  readonly class?: string;

  /**
   * The style for the container element.
   */
  readonly style?: JSX.CSSProperties;

  /**
   * The events for the graph.
   *
   * @see https://g6.antv.antgroup.com/en/manual/further-reading/event
   */
  readonly events?: G6EventsMap;
  /**
   * Callback for when the graph is initialized, after new Graph().
   */
  readonly onInit?: (graph: G6Graph) => void;
  /**
   * Callback for when the graph is ready, after graph.render().
   */
  readonly onReady?: (graph: G6Graph) => void;
  /**
   * Callback for when the graph is destroyed, after graph.destroy().
   */
  readonly onDestroy?: () => void;
};

/**
 * Main Graph component for rendering G6 graphs in SolidJS applications.
 *
 * This component creates and manages a G6 graph instance, providing a SolidJS-friendly
 * interface for graph visualization. It handles the complete lifecycle of the graph,
 * including initialization, rendering, event binding, and cleanup.
 *
 * The component creates a context provider that allows child components to access
 * the graph instance and methods through the useGraph hook.
 *
 * @template D - The graph data type extending G6GraphData, defaults to G6GraphData
 * @param props - Graph properties including G6 options, container styling, and callbacks
 * @returns JSX element containing the graph container and context provider
 *
 * @example
 * ```tsx
 * import { Graph, createGraphData } from 'solid-g6';
 *
 * // Basic usage
 * function BasicGraph() {
 *   const graphData = createGraphData({
 *     nodes: [
 *       { id: 'node1', data: { label: 'Node 1' } },
 *       { id: 'node2', data: { label: 'Node 2' } }
 *     ],
 *     edges: [
 *       { id: 'edge1', source: 'node1', target: 'node2' }
 *     ]
 *   });
 *
 *   return (
 *     <Graph
 *       width={800}
 *       height={600}
 *       data={graphData}
 *       layout={{ type: 'grid' }}
 *       behaviors={['drag-canvas', 'zoom-canvas']}
 *     />
 *   );
 * }
 *
 * // Advanced usage with events and child components
 * function AdvancedGraph() {
 *   const handleNodeClick = (e) => {
 *     console.log('Node clicked:', e.target.id);
 *   };
 *
 *   const handleGraphReady = (graph) => {
 *     console.log('Graph is ready!', graph);
 *   };
 *
 *   return (
 *     <Graph
 *       id="advanced-graph"
 *       class="my-graph"
 *       width={1000}
 *       height={700}
 *       data={complexData}
 *       layout={{ type: 'force', linkDistance: 150 }}
 *       node={{
 *         style: { fill: '#4A90E2', r: 20 },
 *         labelText: (d) => d.name
 *       }}
 *       events={{
 *         'node:click': handleNodeClick,
 *         'canvas:click': () => console.log('Canvas clicked')
 *       }}
 *       onReady={handleGraphReady}
 *       onInit={(graph) => console.log('Graph initialized')}
 *     >
 *       <GraphControls />
 *       <GraphLegend />
 *     </Graph>
 *   );
 * }
 *
 * // Child components can use useGraph hook
 * function GraphControls() {
 *   const { graph, setGraphOptions } = useGraph();
 *
 *   const changeLayout = async () => {
 *     await setGraphOptions({
 *       layout: { type: 'circular' }
 *     });
 *   };
 *
 *   return <button onClick={changeLayout}>Change Layout</button>;
 * }
 * ```
 *
 * @see {@link GraphProps} for available properties
 * @see {@link useGraph} for accessing graph context in child components
 * @see {@link G6GraphOptions} for graph configuration options
 * @see https://g6.antv.antgroup.com/en/api/graph/overview G6 Graph API documentation
 */
export const Graph = <D extends G6GraphData = G6GraphData>(
  props: ParentProps<GraphProps<D>>,
): JSX.Element => {
  let container!: HTMLDivElement;

  const _props = mergeProps(
    {
      id: "solid-g6",
      events: {},
      data: {
        nodes: [] as D["nodes"],
        edges: [] as D["edges"],
        combos: [] as D["combos"],
      },
      style: {
        height: "inherit",
        position: "relative",
      } as JSX.CSSProperties,
    },
    props,
  );

  const [graph, setGraph] = createSignal<G6Graph>();

  const [local, g6GraphOptions] = splitProps(_props, [
    "id",
    "class",
    "style",
    "events",
    "onInit",
    "onReady",
    "onDestroy",
    "children",
  ]);

  const setGraphOptions = async (options: G6GraphOptions<D>) => {
    const g = graph();

    if (!g || g.destroyed) return;

    g.setOptions(options as GraphOptions);

    await g.render();
    local.onReady?.(g);
  };

  onMount(() => {
    const graph = new G6Graph({ container, ...(g6GraphOptions as GraphOptions) });

    for (const [event, entry] of Object.entries(local.events)) {
      if (!entry) continue;

      if (typeof entry === "function") {
        graph.on(event, entry);
      } else {
        const { handler, once = false } = entry;
        graph.on(event, handler, once);
      }
    }

    local.onInit?.(graph);

    setGraph(graph);

    createEffect(() => {
      void setGraphOptions(g6GraphOptions as G6GraphOptions<D>);
    });

    onCleanup(() => {
      graph.off();
      graph.destroy();
      local.onDestroy?.();

      setGraph(undefined);
    });
  });

  // Have to typecast here since contexts do not support generics well at creation time.
  const GraphContext = G6GraphContext as unknown as Context<G6GraphContextValue<D>>;

  return (
    <div ref={container} id={local.id} class={local.class} style={local.style}>
      <Show when={graph()}>
        {(g) => {
          return (
            <GraphContext.Provider
              value={{
                graph: g,
                graphData: () => g().getData() as D,
                setGraphOptions,
              }}
            >
              {local.children}
            </GraphContext.Provider>
          );
        }}
      </Show>
    </div>
  );
};
