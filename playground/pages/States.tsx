import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../src";

export const States = () => {
  // State management for interactive examples
  const [selectedNodeStates, setSelectedNodeStates] = createSignal<string[]>([]);
  const [selectedEdgeStates, setSelectedEdgeStates] = createSignal<string[]>([]);

  // Available states for demonstration - Based on G6 official built-in states
  // @see https://g6.antv.antgroup.com/en/manual/element/state
  const availableStates = [
    {
      id: "selected",
      name: "Selected",
      color: "#1890ff",
      description: "Elements chosen by the user",
    },
    {
      id: "active",
      name: "Active",
      color: "#52c41a",
      description: "Currently interactive active elements",
    },
    {
      id: "highlight",
      name: "Highlight",
      color: "#faad14",
      description: "Elements that need emphasis",
    },
    {
      id: "inactive",
      name: "Inactive",
      color: "#8c8c8c",
      description: "Faded out non-focused elements",
    },
    { id: "disable", name: "Disable", color: "#d9d9d9", description: "Non-interactive elements" },
  ];

  // Basic states example data
  const basicStatesData = createGraphData({
    nodes: [
      {
        id: "normal",
        data: { label: "Default" },
        style: { x: 100, y: 100 },
      },
      {
        id: "selected",
        data: { label: "Selected" },
        style: { x: 300, y: 100 },
        states: ["selected"], // Initial state set in data
      },
      {
        id: "active",
        data: { label: "Active" },
        style: { x: 500, y: 100 },
        states: ["active"],
      },
      {
        id: "highlight",
        data: { label: "Highlight" },
        style: { x: 100, y: 250 },
        states: ["highlight"],
      },
      {
        id: "inactive",
        data: { label: "Inactive" },
        style: { x: 300, y: 250 },
        states: ["inactive"],
      },
      {
        id: "disable",
        data: { label: "Disable" },
        style: { x: 500, y: 250 },
        states: ["disable"],
      },
    ],
    edges: [
      { source: "normal", target: "selected" },
      { source: "selected", target: "active" },
      { source: "active", target: "highlight", states: ["highlight"] },
      { source: "highlight", target: "inactive" },
      { source: "inactive", target: "disable", states: ["disable"] },
      { source: "disable", target: "normal", states: ["inactive"] },
    ],
  });

  // Dynamic data for the interactive example
  const createDynamicData = () => {
    return createGraphData({
      nodes: [
        {
          id: "node1",
          data: { label: "Node 1" },
          style: { x: 150, y: 100 },
          states: selectedNodeStates().includes("node1") ? ["selected"] : [],
        },
        {
          id: "node2",
          data: { label: "Node 2" },
          style: { x: 350, y: 100 },
          states: selectedNodeStates().includes("node2") ? ["highlight"] : [],
        },
        {
          id: "node3",
          data: { label: "Node 3" },
          style: { x: 250, y: 200 },
          states: selectedNodeStates().includes("node3") ? ["active"] : [],
        },
      ],
      edges: [
        {
          source: "node1",
          target: "node2",
          states: selectedEdgeStates().includes("edge1") ? ["highlight"] : [],
        },
        {
          source: "node2",
          target: "node3",
          states: selectedEdgeStates().includes("edge2") ? ["selected"] : [],
        },
        {
          source: "node3",
          target: "node1",
          states: selectedEdgeStates().includes("edge3") ? ["inactive"] : [],
        },
      ],
    });
  };

  const toggleNodeState = (nodeId: string) => {
    setSelectedNodeStates((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId],
    );
  };

  const toggleEdgeState = (edgeId: string) => {
    setSelectedEdgeStates((prev) =>
      prev.includes(edgeId) ? prev.filter((id) => id !== edgeId) : [...prev, edgeId],
    );
  };

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Graph States</h1>
          <p class="text-lg text-gray-600">
            Learn how to use states to create dynamic, interactive graph visualizations with
            different visual appearances for different element states.
          </p>
        </div>

        {/* What are States */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🎯 What are States?</h2>
          <p class="text-gray-700 mb-4">
            States allow you to define different visual appearances for nodes, edges, and combos
            based on their current condition or user interaction. Each element can have multiple
            states simultaneously.
          </p>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-blue-900 mb-2">📋 Setting States in Data</h3>
              <pre class="bg-blue-100 text-blue-900 p-3 rounded text-sm">
                <code>{`const data = createGraphData({
  nodes: [
    {
      id: "node1",
      data: { label: "Selected Node" },
      // Initial states
      states: ["selected", "highlighted"]
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2", 
      states: ["error"] // Edge can have states too
    }
  ]
});`}</code>
              </pre>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-green-900 mb-2">🎨 Defining State Styles</h3>
              <pre class="bg-green-100 text-green-900 p-3 rounded text-sm">
                <code>{`<Graph
  data={data}
  node={{
    style: {
      fill: "#1890ff", // Default style
    },
    state: {
      selected: { fill: "#ff4d4f", lineWidth: 3 },
      highlighted: { stroke: "#faad14" },
      error: { fill: "#ff7875" }
    }
  }}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Available States Reference */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">📚 Preset States</h2>
          <p class="text-gray-700 mb-4">
            G6 provides several preset state types that you can use in your graphs. These built-in
            states follow G6's official conventions and provide consistent behavior across all graph
            elements.
          </p>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <p class="text-blue-800">
              <strong>📖 Official Documentation:</strong> Learn more about element states in the{" "}
              <a
                href="https://g6.antv.antgroup.com/en/manual/element/state"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 underline hover:text-blue-800"
              >
                G6 Element State Guide
              </a>
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <For each={availableStates}>
              {(state) => (
                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center mb-2">
                    <div
                      class="w-4 h-4 rounded-full mr-3"
                      style={{ "background-color": state.color }}
                    />
                    <h3 class="font-semibold text-gray-900">{state.name}</h3>
                  </div>
                  <p class="text-sm text-gray-600">{state.description}</p>
                  <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                    {state.id}
                  </code>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Basic States Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🎨 Preset States Example</h2>
          <p class="text-gray-700 mb-4">
            This example shows nodes and edges with different initial states defined in their data.
            Notice how each state has its own visual appearance.
          </p>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center mb-4">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={basicStatesData}
                width={600}
                height={350}
                node={{
                  style: {
                    fill: "#e6f7ff",
                    stroke: "#1890ff",
                    lineWidth: 2,
                    size: 60,
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
                    active: {
                      fill: "#d9f7be",
                      stroke: "#52c41a",
                      lineWidth: 3,
                    },
                    highlight: {
                      fill: "#fff7e6",
                      stroke: "#faad14",
                      lineWidth: 3,
                    },
                    inactive: {
                      fill: "#f0f0f0",
                      stroke: "#8c8c8c",
                      opacity: 0.5,
                    },
                    disable: {
                      fill: "#f5f5f5",
                      stroke: "#d9d9d9",
                      opacity: 0.6,
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
                  state: {
                    selected: {
                      stroke: "#1890ff",
                      lineWidth: 3,
                    },
                    active: {
                      stroke: "#52c41a",
                      lineWidth: 3,
                    },
                    highlight: {
                      stroke: "#faad14",
                      lineWidth: 3,
                    },
                    inactive: {
                      stroke: "#8c8c8c",
                      opacity: 0.4,
                    },
                    disable: {
                      stroke: "#d9d9d9",
                      opacity: 0.4,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p class="text-yellow-800">
              <strong>💡 Notice:</strong> These are the 5 built-in state types provided by G6. You
              can also define custom states for your specific use cases beyond these preset ones.
            </p>
          </div>
        </div>

        {/* Interactive States Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">⚡ Interactive States Example</h2>
          <p class="text-gray-700 mb-4">
            Click the buttons below to dynamically add/remove states from nodes and edges. This
            demonstrates how states can be changed programmatically.
          </p>

          <div class="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Node States</h3>
              <div class="space-y-2">
                <button
                  onClick={() => toggleNodeState("node1")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedNodeStates().includes("node1")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedNodeStates().includes("node1") ? "✓" : "○"} Node 1 - Selected State
                </button>
                <button
                  onClick={() => toggleNodeState("node2")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedNodeStates().includes("node2")
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedNodeStates().includes("node2") ? "✓" : "○"} Node 2 - Highlight State
                </button>
                <button
                  onClick={() => toggleNodeState("node3")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedNodeStates().includes("node3")
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedNodeStates().includes("node3") ? "✓" : "○"} Node 3 - Active State
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Edge States</h3>
              <div class="space-y-2">
                <button
                  onClick={() => toggleEdgeState("edge1")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedEdgeStates().includes("edge1")
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedEdgeStates().includes("edge1") ? "✓" : "○"} Edge 1-2 - Highlight
                </button>
                <button
                  onClick={() => toggleEdgeState("edge2")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedEdgeStates().includes("edge2")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedEdgeStates().includes("edge2") ? "✓" : "○"} Edge 2-3 - Selected
                </button>
                <button
                  onClick={() => toggleEdgeState("edge3")}
                  class={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                    selectedEdgeStates().includes("edge3")
                      ? "bg-gray-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedEdgeStates().includes("edge3") ? "✓" : "○"} Edge 3-1 - Inactive
                </button>
              </div>
            </div>
          </div>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={createDynamicData()}
                width={500}
                height={300}
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
                    active: {
                      fill: "#d9f7be",
                      stroke: "#52c41a",
                      lineWidth: 3,
                    },
                    highlight: {
                      fill: "#fff7e6",
                      stroke: "#faad14",
                      lineWidth: 3,
                    },
                    inactive: {
                      fill: "#f0f0f0",
                      stroke: "#8c8c8c",
                      opacity: 0.5,
                    },
                    disable: {
                      fill: "#f5f5f5",
                      stroke: "#d9d9d9",
                      opacity: 0.6,
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
                  state: {
                    selected: {
                      stroke: "#1890ff",
                      lineWidth: 3,
                    },
                    active: {
                      stroke: "#52c41a",
                      lineWidth: 3,
                    },
                    highlight: {
                      stroke: "#faad14",
                      lineWidth: 3,
                    },
                    inactive: {
                      stroke: "#8c8c8c",
                      opacity: 0.4,
                    },
                    disable: {
                      stroke: "#d9d9d9",
                      opacity: 0.4,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">💻 Code Examples</h2>
          <p class="text-gray-700 mb-6">
            Here are practical code examples showing how to work with states in your graphs.
          </p>

          <div class="space-y-8">
            {/* Setting Initial States in Data */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                🎯 Setting Initial States in Data
              </h3>
              <p class="text-gray-600 mb-3">
                Define initial states directly in your graph data when creating nodes and edges.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`const data = createGraphData({
  nodes: [
    {
      id: "node1",
      data: { label: "Normal Node" },
      // No states - will use default styling
    },
    {
      id: "node2", 
      data: { label: "Selected Node" },
      states: ["selected"], // Single state
    },
    {
      id: "node3",
      data: { label: "Multi-State Node" },
      states: ["selected", "highlight"], // Multiple states
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      states: ["highlight"], // Edge with initial state
    }
  ]
});`}</code>
                </pre>
              </div>
            </div>

            {/* Configuring State Styles */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">🎨 Configuring State Styles</h3>
              <p class="text-gray-600 mb-3">
                Define how elements should look in different states using the state configuration.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`<Graph
  data={data}
  node={{
    style: {
      fill: "#e6f7ff",      // Default fill color
      stroke: "#1890ff",    // Default border
      lineWidth: 2,         // Default border width
    },
    state: {
      selected: {
        fill: "#bae7ff",
        stroke: "#1890ff", 
        lineWidth: 4,
        shadowColor: "rgba(24,144,255,0.3)",
        shadowBlur: 10,
      },
      active: {
        fill: "#d9f7be",
        stroke: "#52c41a",
        lineWidth: 3,
      },
      highlight: {
        stroke: "#faad14",
        lineWidth: 3,
      },
      inactive: {
        opacity: 0.5,
      },
      disable: {
        fill: "#f5f5f5",
        stroke: "#d9d9d9",
        opacity: 0.6,
      }
    }
  }}
  edge={{
    style: {
      stroke: "#8c8c8c",
      lineWidth: 2,
    },
    state: {
      selected: { stroke: "#1890ff", lineWidth: 3 },
      highlight: { stroke: "#faad14", lineWidth: 3 },
      inactive: { opacity: 0.4 },
    }
  }}
/>`}</code>
                </pre>
              </div>
            </div>

            {/* Dynamic State Management */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">⚡ Dynamic State Management</h3>
              <p class="text-gray-600 mb-3">
                Programmatically change element states using the graph's API methods accessed
                through the useGraph hook.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`import { useGraph } from '@dschz/solid-g6';

// Component with access to graph instance
const MyGraphComponent = () => {
  const { graph } = useGraph();

  // Set single state
  const selectNode = (nodeId: string) => {
    graph().setElementState(nodeId, 'selected');
  };

  // Set multiple states
  const highlightAndSelectNode = (nodeId: string) => {
    graph().setElementState(nodeId, ['selected', 'highlight']);
  };

  // Remove all states (revert to default)
  const clearNodeStates = (nodeId: string) => {
    graph().setElementState(nodeId, []);
  };

  // Batch set states for multiple elements
  const updateMultipleStates = () => {
    graph().setElementState({
      node1: ['selected'],
      node2: ['highlight'], 
      edge1: ['active']
    });
  };

  // Query current states
  const getNodeStates = (nodeId: string) => {
    const nodeStates = graph().getElementState(nodeId);
    console.log(nodeStates); // ['selected', 'highlight']
    return nodeStates;
  };

  // Get all elements in a specific state
  const getSelectedNodes = () => {
    return graph().getElementDataByState('node', 'selected');
  };

  return (
    <div>
      <button onClick={() => selectNode('node1')}>
        Select Node 1
      </button>
      <button onClick={() => highlightAndSelectNode('node2')}>
        Highlight & Select Node 2
      </button>
      <button onClick={() => clearNodeStates('node1')}>
        Clear Node 1 States
      </button>
    </div>
  );
};`}</code>
                </pre>
              </div>
            </div>

            {/* Custom States */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">🛠️ Custom States</h3>
              <p class="text-gray-600 mb-3">
                Create your own custom states beyond the built-in ones for specific use cases.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`<Graph
  data={data}
  node={{
    style: {
      fill: "#ffffff",
      stroke: "#cccccc",
    },
    state: {
      // Built-in states
      selected: { stroke: "#1890ff", lineWidth: 3 },
      
      // Custom states for business logic
      warning: {
        fill: "#fff7e6",
        stroke: "#fa8c16", 
        lineWidth: 2,
        lineDash: [4, 4], // Dashed border for warnings
      },
      success: {
        fill: "#f6ffed",
        stroke: "#52c41a",
        shadowColor: "rgba(82,196,26,0.3)",
        shadowBlur: 8,
      },
      processing: {
        fill: "#e6f7ff",
        stroke: "#1890ff",
        // Add animation or pulsing effect
        opacity: 0.8,
      },
      locked: {
        fill: "#f5f5f5",
        stroke: "#d9d9d9",
        opacity: 0.6,
        // Add lock icon
        labelFill: "#8c8c8c",
      }
    }
  }}
/>

// Use custom states
graphRef()?.setElementState('node1', 'warning');
graphRef()?.setElementState('node2', ['selected', 'processing']);`}</code>
                </pre>
              </div>
            </div>

            {/* State Priority */}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">
                📋 State Priority & Combination
              </h3>
              <p class="text-gray-600 mb-3">
                Understanding how multiple states combine and override each other.
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-green-400 text-sm">
                  <code>{`// When multiple states are applied: ['selected', 'highlight']
// Final style = Default + Selected + Highlight

// Example with conflicting properties:
node: {
  style: {
    fill: "#ffffff",    // Default fill
    lineWidth: 1,       // Default line width
  },
  state: {
    selected: {
      fill: "#bae7ff",  // Overrides default fill
      lineWidth: 3,     // Overrides default line width  
    },
    highlight: {
      fill: "#fff7e6",  // Would override selected fill
      stroke: "#faad14" // Adds new property
    }
  }
}

// Result when both states are active:
// fill: "#fff7e6"     (highlight overrides selected)
// lineWidth: 3        (from selected, not overridden)
// stroke: "#faad14"   (from highlight, new property)`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
            <p class="text-blue-800">
              <strong>💡 Best Practice:</strong> Use states consistently across your application and
              consider the visual hierarchy when combining multiple states. Always test state
              combinations to ensure the resulting appearance meets your design expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
