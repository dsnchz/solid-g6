import { createSignal, For } from "solid-js";

import { createGraphData, Graph, useGraph } from "../../src";

// Global shared signals - can be imported and used across components
const [selectedNodes, setSelectedNodes] = createSignal<string[]>([]);
const [highlightedNodes, setHighlightedNodes] = createSignal<string[]>([]);

// Example child component using useGraph hook imperatively
const GraphControls = () => {
  const { graph } = useGraph();

  const selectAllNodes = () => {
    // Select all nodes using known node IDs
    const nodeIds = ["node1", "node2", "node3", "node4"];
    nodeIds.forEach((nodeId) => {
      graph().setElementState(nodeId, ["selected"]);
    });
  };

  const clearAllStates = () => {
    // Clear states for known elements
    const nodeIds = ["node1", "node2", "node3", "node4"];
    const edgeIds = ["node1-node2", "node2-node3", "node3-node4", "node4-node1"];

    nodeIds.forEach((nodeId) => {
      graph().setElementState(nodeId, []);
    });

    edgeIds.forEach((edgeId) => {
      graph().setElementState(edgeId, []);
    });
  };

  const zoomToFit = () => {
    graph().fitView();
  };

  const randomLayout = () => {
    // Note: This is a simplified example
    // In a real app, you'd update the data source and let reactivity handle the update
    console.log("Random layout triggered - would update node positions");
  };

  return (
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">🎮 Imperative Controls</h3>
      <p class="text-sm text-gray-600 mb-3">
        These buttons use the useGraph hook to directly call graph methods
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          onClick={selectAllNodes}
          class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Select All Nodes
        </button>
        <button
          onClick={clearAllStates}
          class="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
        >
          Clear All States
        </button>
        <button
          onClick={zoomToFit}
          class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
        >
          Zoom to Fit
        </button>
        <button
          onClick={randomLayout}
          class="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
        >
          Random Layout
        </button>
      </div>
    </div>
  );
};

// Example child component using shared signals declaratively
const NodeSelector = () => {
  const nodes = ["node1", "node2", "node3", "node4"];

  const toggleNodeSelection = (nodeId: string) => {
    setSelectedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId],
    );
  };

  const toggleNodeHighlight = (nodeId: string) => {
    setHighlightedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId],
    );
  };

  return (
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">✨ Declarative Controls</h3>
      <p class="text-sm text-gray-600 mb-3">
        These buttons update shared signals that the Graph component reads reactively
      </p>

      <div class="space-y-3">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">Node Selection</h4>
          <div class="flex flex-wrap gap-2">
            <For each={nodes}>
              {(nodeId) => (
                <button
                  onClick={() => toggleNodeSelection(nodeId)}
                  class={`px-3 py-2 rounded text-sm transition-colors ${
                    selectedNodes().includes(nodeId)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {selectedNodes().includes(nodeId) ? "✓" : "○"} {nodeId}
                </button>
              )}
            </For>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">Node Highlighting</h4>
          <div class="flex flex-wrap gap-2">
            <For each={nodes}>
              {(nodeId) => (
                <button
                  onClick={() => toggleNodeHighlight(nodeId)}
                  class={`px-3 py-2 rounded text-sm transition-colors ${
                    highlightedNodes().includes(nodeId)
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {highlightedNodes().includes(nodeId) ? "✓" : "○"} Highlight {nodeId}
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example child component using setGraphOptions to update parent configuration
const GraphThemeControls = () => {
  const { setGraphOptions } = useGraph();

  const applyDarkTheme = async () => {
    await setGraphOptions({
      node: {
        style: {
          fill: "#2d3748",
          stroke: "#4a5568",
          lineWidth: 2,
          size: 50,
          labelText: (d) => String(d.data?.label || ""),
          labelFill: "#ffffff",
          labelFontSize: 12,
          labelFontWeight: "bold",
        },
        state: {
          selected: {
            fill: "#4299e1",
            stroke: "#3182ce",
            lineWidth: 4,
            shadowColor: "rgba(66,153,225,0.3)",
            shadowBlur: 10,
          },
          highlight: {
            fill: "#ecc94b",
            stroke: "#d69e2e",
            lineWidth: 3,
          },
        },
      },
      edge: {
        style: {
          stroke: "#4a5568",
          lineWidth: 2,
          opacity: 0.8,
          endArrow: true,
        },
      },
    });
  };

  const applyLightTheme = async () => {
    await setGraphOptions({
      node: {
        style: {
          fill: "#e6f7ff",
          stroke: "#1890ff",
          lineWidth: 2,
          size: 50,
          labelText: (d) => String(d.data?.label || ""),
          labelFill: "#333333",
          labelFontSize: 12,
          labelFontWeight: "bold",
        },
        state: {
          selected: {
            fill: "#bae7ff",
            stroke: "#1890ff",
            lineWidth: 4,
            shadowColor: "rgba(24,144,255,0.3)",
            shadowBlur: 10,
          },
          highlight: {
            fill: "#fff7e6",
            stroke: "#faad14",
            lineWidth: 3,
          },
        },
      },
      edge: {
        style: {
          stroke: "#8c8c8c",
          lineWidth: 2,
          opacity: 0.8,
          endArrow: true,
        },
      },
    });
  };

  const enableCircularLayout = async () => {
    await setGraphOptions({
      layout: {
        type: "circular",
      },
    });
  };

  const enableForceLayout = async () => {
    await setGraphOptions({
      layout: {
        type: "d3-force",
      },
    });
  };

  return (
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">🎨 Configuration Controls</h3>
      <p class="text-sm text-gray-600 mb-3">
        These buttons use setGraphOptions to update the parent's graph configuration
      </p>

      <div class="space-y-3">
        <div>
          <h4 class="font-medium text-gray-700 mb-2">Theme Controls</h4>
          <div class="flex gap-2">
            <button
              onClick={applyDarkTheme}
              class="px-3 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-900 transition-colors"
            >
              🌙 Dark Theme
            </button>
            <button
              onClick={applyLightTheme}
              class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              ☀️ Light Theme
            </button>
          </div>
        </div>

        <div>
          <h4 class="font-medium text-gray-700 mb-2">Layout Controls</h4>
          <div class="flex gap-2">
            <button
              onClick={enableCircularLayout}
              class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
            >
              🔄 Circular Layout
            </button>
            <button
              onClick={enableForceLayout}
              class="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
            >
              ⚡ Force Layout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example child component that shows graph information
const GraphInfo = () => {
  return (
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">📊 Graph Information</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-gray-50 rounded p-3">
          <div class="font-medium text-gray-700">Nodes</div>
          <div class="text-2xl font-bold text-blue-600">4</div>
        </div>
        <div class="bg-gray-50 rounded p-3">
          <div class="font-medium text-gray-700">Edges</div>
          <div class="text-2xl font-bold text-green-600">4</div>
        </div>
        <div class="bg-gray-50 rounded p-3">
          <div class="font-medium text-gray-700">Selected</div>
          <div class="text-2xl font-bold text-purple-600">{selectedNodes().length}</div>
        </div>
        <div class="bg-gray-50 rounded p-3">
          <div class="font-medium text-gray-700">Highlighted</div>
          <div class="text-2xl font-bold text-orange-600">{highlightedNodes().length}</div>
        </div>
      </div>
    </div>
  );
};

export const GraphChildren = () => {
  // Create reactive graph data that responds to shared signals
  const createReactiveData = () => {
    return createGraphData({
      nodes: [
        {
          id: "node1",
          data: { label: "Node 1" },
          style: { x: 150, y: 100 },
          states: [
            ...(selectedNodes().includes("node1") ? ["selected"] : []),
            ...(highlightedNodes().includes("node1") ? ["highlight"] : []),
          ],
        },
        {
          id: "node2",
          data: { label: "Node 2" },
          style: { x: 350, y: 100 },
          states: [
            ...(selectedNodes().includes("node2") ? ["selected"] : []),
            ...(highlightedNodes().includes("node2") ? ["highlight"] : []),
          ],
        },
        {
          id: "node3",
          data: { label: "Node 3" },
          style: { x: 150, y: 250 },
          states: [
            ...(selectedNodes().includes("node3") ? ["selected"] : []),
            ...(highlightedNodes().includes("node3") ? ["highlight"] : []),
          ],
        },
        {
          id: "node4",
          data: { label: "Node 4" },
          style: { x: 350, y: 250 },
          states: [
            ...(selectedNodes().includes("node4") ? ["selected"] : []),
            ...(highlightedNodes().includes("node4") ? ["highlight"] : []),
          ],
        },
      ],
      edges: [
        { source: "node1", target: "node2" },
        { source: "node2", target: "node3" },
        { source: "node3", target: "node4" },
        { source: "node4", target: "node1" },
      ],
    });
  };

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Graph Children Components</h1>
          <p class="text-lg text-gray-600">
            Learn how to create child components that can interact with the graph both imperatively
            through the useGraph hook and declaratively through shared signals.
          </p>
        </div>

        {/* Introduction */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🌟 Two Interaction Patterns</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 class="text-lg font-semibold text-blue-900 mb-2">🎮 Imperative Pattern</h3>
              <p class="text-blue-800 text-sm mb-2">
                Child components use the <code class="bg-blue-100 px-1 rounded">useGraph</code> hook
                to directly call methods on the graph instance.
              </p>
              <ul class="text-blue-700 text-sm space-y-1">
                <li>• Direct method calls</li>
                <li>• Immediate effects</li>
                <li>• Event-driven actions</li>
              </ul>
            </div>

            <div class="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 class="text-lg font-semibold text-green-900 mb-2">✨ Declarative Pattern</h3>
              <p class="text-green-800 text-sm mb-2">
                Child components update shared signals that the Graph component reads reactively.
              </p>
              <ul class="text-green-700 text-sm space-y-1">
                <li>• Reactive data flow</li>
                <li>• Automatic updates</li>
                <li>• State synchronization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Live Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🚀 Live Example</h2>
          <p class="text-gray-700 mb-6">
            The graph below has child components that demonstrate both interaction patterns. The
            declarative controls update shared signals that automatically update the graph, while
            imperative controls directly call graph methods.
          </p>

          <div class="bg-gray-100 rounded-lg p-6">
            <Graph
              data={createReactiveData()}
              width={500}
              height={350}
              node={{
                style: {
                  fill: "#e6f7ff",
                  stroke: "#1890ff",
                  lineWidth: 2,
                  size: 50,
                  labelText: (d) => d.data?.label,
                  labelFill: "#333333",
                  labelFontSize: 12,
                  labelFontWeight: "bold",
                },
                state: {
                  selected: {
                    fill: "#bae7ff",
                    stroke: "#1890ff",
                    lineWidth: 4,
                    shadowColor: "rgba(24,144,255,0.3)",
                    shadowBlur: 10,
                  },
                  highlight: {
                    fill: "#fff7e6",
                    stroke: "#faad14",
                    lineWidth: 3,
                  },
                },
              }}
              edge={{
                style: {
                  stroke: "#8c8c8c",
                  lineWidth: 2,
                  opacity: 0.8,
                  endArrow: true,
                },
              }}
              behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
            >
              <GraphControls />
              <NodeSelector />
              <GraphThemeControls />
              <GraphInfo />
            </Graph>
          </div>
        </div>

        {/* Code Examples */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">💻 Implementation Details</h2>

          <div class="space-y-8">
            {/* Shared Signals */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">🌐 Global Shared Signals</h3>
              <p class="text-gray-600 mb-3">
                Signals in Solid can be global and imported across components. They don't need to be
                bound to specific components.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`// shared-state.ts - Global signals
import { createSignal } from 'solid-js';

// These can be imported and used anywhere
export const [selectedNodes, setSelectedNodes] = createSignal<string[]>([]);
export const [highlightedNodes, setHighlightedNodes] = createSignal<string[]>([]);
export const [graphScale, setGraphScale] = createSignal(1);`}</code>
                </pre>
              </div>
            </div>

            {/* Imperative Child Component */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                🎮 Imperative Child Component
              </h3>
              <p class="text-gray-600 mb-3">
                Child components can use the useGraph hook to directly interact with the graph
                instance.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`import { useGraph } from '@dschz/solid-g6';

const GraphControls = () => {
  const { graph } = useGraph();

  const selectAllNodes = () => {
    const allNodes = graph().getAllNodesData();
    allNodes.forEach(node => {
      graph().setElementState(node.id, ['selected']);
    });
  };

  const zoomToFit = () => {
    graph().fitView();
  };

  return (
    <div>
      <button onClick={selectAllNodes}>Select All</button>
      <button onClick={zoomToFit}>Zoom to Fit</button>
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>

            {/* Declarative Child Component */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                ✨ Declarative Child Component
              </h3>
              <p class="text-gray-600 mb-3">
                Child components can update shared signals that the parent Graph component reads
                reactively.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`import { selectedNodes, setSelectedNodes } from './shared-state';

const NodeSelector = () => {
  const toggleNodeSelection = (nodeId: string) => {
    setSelectedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <div>
      <button onClick={() => toggleNodeSelection('node1')}>
        {selectedNodes().includes('node1') ? '✓' : '○'} Node 1
      </button>
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>

            {/* Parent Component */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                📊 Parent Component with Reactive Data
              </h3>
              <p class="text-gray-600 mb-3">
                The parent component creates reactive data that automatically updates when shared
                signals change.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`import { selectedNodes, highlightedNodes } from './shared-state';

const MyGraphPage = () => {
  // Reactive data that responds to signal changes
  const createReactiveData = () => {
    return createGraphData({
      nodes: [
        {
          id: "node1",
          data: { label: "Node 1" },
          states: [
            ...(selectedNodes().includes("node1") ? ["selected"] : []),
            ...(highlightedNodes().includes("node1") ? ["highlight"] : []),
          ],
        },
        // ... more nodes
      ],
    });
  };

  return (
    <Graph data={createReactiveData()}>
      <GraphControls />
      <NodeSelector />
      <GraphInfo />
    </Graph>
  );
};`}</code>
                </pre>
              </div>
            </div>

            {/* setGraphOptions */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                🔧 Configuration Updates with setGraphOptions
              </h3>
              <p class="text-gray-600 mb-3">
                The useGraph hook also provides a setGraphOptions function that allows child
                components to update the parent's graph configuration asynchronously.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`import { useGraph } from '@dschz/solid-g6';

const ThemeControls = () => {
  const { setGraphOptions } = useGraph();

  const applyDarkTheme = async () => {
    await setGraphOptions({
      node: {
        style: {
          fill: "#2d3748",
          stroke: "#4a5568",
          labelFill: "#ffffff",
        },
      },
      edge: {
        style: {
          stroke: "#4a5568",
        },
      },
    });
  };

  const changeLayout = async () => {
    await setGraphOptions({
      layout: {
        type: 'circular',
      },
    });
  };

  return (
    <div>
      <button onClick={applyDarkTheme}>Dark Theme</button>
      <button onClick={changeLayout}>Circular Layout</button>
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">💡 Best Practices</h2>

          <div class="space-y-4">
            <div class="border-l-4 border-blue-400 bg-blue-50 p-4">
              <h3 class="font-semibold text-blue-900 mb-2">🎮 When to Use Imperative Pattern</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>• One-time actions (zoom to fit, reset layout)</li>
                <li>• Complex graph manipulations</li>
                <li>• Performance-critical operations</li>
                <li>• Event-driven interactions</li>
              </ul>
            </div>

            <div class="border-l-4 border-green-400 bg-green-50 p-4">
              <h3 class="font-semibold text-green-900 mb-2">✨ When to Use Declarative Pattern</h3>
              <ul class="text-green-800 space-y-1 text-sm">
                <li>• State synchronization across components</li>
                <li>• Reactive UI updates</li>
                <li>• Persistent state management</li>
                <li>• Multiple components affecting same data</li>
              </ul>
            </div>

            <div class="border-l-4 border-purple-400 bg-purple-50 p-4">
              <h3 class="font-semibold text-purple-900 mb-2">🔄 Combining Both Patterns</h3>
              <p class="text-purple-800 text-sm">
                You can use both patterns together! Use declarative signals for state management and
                imperative calls for actions. This gives you the best of both worlds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
