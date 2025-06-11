import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../src";

export const Behaviors = () => {
  // State for enabled behaviors
  const [enabledBehaviors, setEnabledBehaviors] = createSignal<string[]>([
    "drag-canvas",
    "zoom-canvas",
    "drag-element",
  ]);

  // Sample graph data for behavior demonstrations
  const graphData = createGraphData({
    nodes: [
      { id: "node1", data: { label: "Node 1" }, style: { x: 100, y: 100 } },
      { id: "node2", data: { label: "Node 2" }, style: { x: 300, y: 100 } },
      { id: "node3", data: { label: "Node 3" }, style: { x: 200, y: 200 } },
      { id: "node4", data: { label: "Node 4" }, style: { x: 400, y: 200 } },
      { id: "node5", data: { label: "Node 5" }, style: { x: 150, y: 300 } },
      { id: "node6", data: { label: "Node 6" }, style: { x: 350, y: 300 } },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node3", target: "node4" },
      { source: "node4", target: "node5" },
      { source: "node5", target: "node6" },
      { source: "node1", target: "node3" },
      { source: "node2", target: "node4" },
    ],
  });

  // Available behaviors with descriptions
  const availableBehaviors = [
    {
      id: "drag-canvas",
      name: "Drag Canvas",
      description: "Drag to pan the canvas around",
      category: "Canvas",
      icon: "🖱️",
    },
    {
      id: "zoom-canvas",
      name: "Zoom Canvas",
      description: "Mouse wheel to zoom in/out",
      category: "Canvas",
      icon: "🔍",
    },
    {
      id: "drag-element",
      name: "Drag Element",
      description: "Drag nodes to reposition them",
      category: "Element",
      icon: "↔️",
    },
    {
      id: "click-select",
      name: "Click Select",
      description: "Click to select nodes/edges",
      category: "Selection",
      icon: "👆",
    },
    {
      id: "brush-select",
      name: "Brush Select",
      description: "Hold Shift + drag to select multiple elements",
      category: "Selection",
      icon: "🖌️",
    },
    {
      id: "lasso-select",
      name: "Lasso Select",
      description: "Hold Shift + drag to lasso select elements",
      category: "Selection",
      icon: "🎯",
    },
    {
      id: "hover-activate",
      name: "Hover Activate",
      description: "Highlight elements on hover",
      category: "Interaction",
      icon: "✨",
    },
    {
      id: "focus-element",
      name: "Focus Element",
      description: "Double-click to focus on element",
      category: "Interaction",
      icon: "🎪",
    },
    {
      id: "scroll-canvas",
      name: "Scroll Canvas",
      description: "Use scroll to pan the canvas",
      category: "Canvas",
      icon: "📜",
    },
    {
      id: "auto-adapt-label",
      name: "Auto Adapt Label",
      description: "Automatically adapt label visibility",
      category: "Display",
      icon: "🏷️",
    },
    {
      id: "optimize-viewport-transform",
      name: "Optimize Viewport",
      description: "Optimize rendering for better performance",
      category: "Performance",
      icon: "⚡",
    },
    {
      id: "fix-element-size",
      name: "Fix Element Size",
      description: "Keep element size constant during zoom",
      category: "Display",
      icon: "📏",
    },
  ];

  // Group behaviors by category
  const behaviorsByCategory = createMemo(() => {
    const categories: Record<string, typeof availableBehaviors> = {};
    availableBehaviors.forEach((behavior) => {
      if (!categories[behavior.category]) {
        categories[behavior.category] = [];
      }
      categories[behavior.category]?.push(behavior);
    });
    return categories;
  });

  const toggleBehavior = (behaviorId: string) => {
    setEnabledBehaviors((prev) => {
      if (prev.includes(behaviorId)) {
        return prev.filter((id) => id !== behaviorId);
      } else {
        return [...prev, behaviorId];
      }
    });
  };

  const getActiveCount = (category: string) => {
    const categoryBehaviors = behaviorsByCategory()[category] || [];
    return categoryBehaviors.filter((b) => enabledBehaviors().includes(b.id)).length;
  };

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Graph Behaviors</h1>
          <p class="text-lg text-gray-600">
            Interactive behaviors that enhance user experience with graph visualization
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          {/* Behavior Controls */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Available Behaviors ({enabledBehaviors().length} active)
              </h3>

              <For each={Object.entries(behaviorsByCategory())}>
                {([category, behaviors]) => (
                  <div class="mb-6">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                      <span>{category}</span>
                      <span class="text-sm font-normal bg-gray-100 px-2 py-1 rounded">
                        {getActiveCount(category)}/{behaviors.length}
                      </span>
                    </h4>
                    <div class="space-y-2">
                      <For each={behaviors}>
                        {(behavior) => (
                          <div class="flex items-start gap-3">
                            <button
                              onClick={() => toggleBehavior(behavior.id)}
                              class={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                enabledBehaviors().includes(behavior.id)
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "border-gray-300 hover:border-blue-400"
                              }`}
                            >
                              {enabledBehaviors().includes(behavior.id) && (
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                            <div class="flex-1 min-w-0">
                              <button
                                onClick={() => toggleBehavior(behavior.id)}
                                class="text-left w-full"
                              >
                                <div class="flex items-center gap-2 mb-1">
                                  <span class="text-lg">{behavior.icon}</span>
                                  <span class="font-medium text-gray-900 text-sm">
                                    {behavior.name}
                                  </span>
                                </div>
                                <p class="text-xs text-gray-600 leading-relaxed">
                                  {behavior.description}
                                </p>
                              </button>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>

              <div class="mt-6 pt-4 border-t border-gray-200">
                <div class="space-y-2 mb-4">
                  <button
                    onClick={() =>
                      setEnabledBehaviors([
                        "drag-canvas",
                        "zoom-canvas",
                        "drag-element",
                        "hover-activate",
                      ])
                    }
                    class="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    📱 Canvas Mode (No Selection Conflicts)
                  </button>
                  <button
                    onClick={() =>
                      setEnabledBehaviors([
                        "zoom-canvas",
                        "drag-element",
                        "click-select",
                        "brush-select",
                        "lasso-select",
                      ])
                    }
                    class="w-full px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  >
                    🎯 Selection Mode (No Canvas Drag)
                  </button>
                </div>
                <button
                  onClick={() => setEnabledBehaviors([])}
                  class="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors mb-2"
                >
                  Disable All
                </button>
                <button
                  onClick={() => setEnabledBehaviors(availableBehaviors.map((b) => b.id))}
                  class="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Enable All (May Have Conflicts)
                </button>
              </div>
            </div>
          </div>

          {/* Graph Visualization */}
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Interactive Graph Demo</h3>
              <p class="text-gray-600 mb-4">
                Enable different behaviors and interact with the graph to see how they work.
              </p>

              <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
                <div class="bg-white rounded border shadow-sm">
                  <Graph
                    data={graphData}
                    width={600}
                    height={400}
                    node={{
                      style: {
                        fill: "#1890ff",
                        stroke: "#ffffff",
                        lineWidth: 2,
                        size: 40,
                        labelText: (d) => d.data?.label,
                        labelFill: "#333333",
                        labelFontSize: 12,
                        labelFontWeight: "bold",
                      },
                      state: {
                        selected: {
                          fill: "#ff4d4f",
                          stroke: "#ffffff",
                          lineWidth: 3,
                        },
                        hover: {
                          fill: "#40a9ff",
                        },
                        active: {
                          fill: "#52c41a",
                        },
                      },
                    }}
                    edge={{
                      style: {
                        stroke: "#666666",
                        lineWidth: 2,
                        opacity: 0.8,
                        endArrow: true,
                      },
                      state: {
                        selected: {
                          stroke: "#ff4d4f",
                          lineWidth: 3,
                        },
                        hover: {
                          stroke: "#40a9ff",
                        },
                      },
                    }}
                    behaviors={enabledBehaviors()}
                  />
                </div>
              </div>

              {/* Active Behaviors Display */}
              <div class="mt-4">
                <h4 class="text-sm font-semibold text-gray-700 mb-2">
                  Currently Active Behaviors:
                </h4>
                <div class="flex flex-wrap gap-2">
                  <For each={enabledBehaviors()}>
                    {(behaviorId) => {
                      const behavior = availableBehaviors.find((b) => b.id === behaviorId);
                      if (!behavior) return null;
                      return (
                        <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          <span>{behavior.icon}</span>
                          <span>{behavior.name}</span>
                        </span>
                      );
                    }}
                  </For>
                  {enabledBehaviors().length === 0 && (
                    <span class="text-gray-500 text-sm italic">
                      No behaviors active - the graph is static
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Behavior Instructions */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">How to Test Behaviors</h3>

              {/* Behavior Conflicts Warning */}
              <div class="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <span class="text-amber-400 text-lg">⚠️</span>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-semibold text-amber-800">Behavior Conflicts</h4>
                    <p class="text-sm text-amber-700 mt-1">
                      <strong>Drag Canvas</strong> and <strong>Selection behaviors</strong>{" "}
                      (brush/lasso) may conflict since they compete for the same mouse events. For
                      best testing experience:
                    </p>
                    <ul class="text-sm text-amber-700 mt-2 ml-4">
                      <li>• Test selection behaviors with drag-canvas disabled, OR</li>
                      <li>• Use different modifier keys (Shift for brush, Alt for lasso)</li>
                      <li>• Ensure you hold modifier keys properly</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Canvas Behaviors</h4>
                  <ul class="space-y-1 text-sm text-gray-600">
                    <li>
                      • <strong>Drag Canvas:</strong> Click and drag on empty space
                    </li>
                    <li>
                      • <strong>Zoom Canvas:</strong> Use mouse wheel
                    </li>
                    <li>
                      • <strong>Scroll Canvas:</strong> Use trackpad scroll gestures
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Element Behaviors</h4>
                  <ul class="space-y-1 text-sm text-gray-600">
                    <li>
                      • <strong>Drag Element:</strong> Click and drag nodes
                    </li>
                    <li>
                      • <strong>Click Select:</strong> Click nodes/edges to select
                    </li>
                    <li>
                      • <strong>Hover Activate:</strong> Move mouse over elements
                    </li>
                    <li>
                      • <strong>Focus Element:</strong> Double-click elements
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Selection Behaviors</h4>
                  <ul class="space-y-1 text-sm text-gray-600">
                    <li>
                      • <strong>Brush Select:</strong> Hold Shift + drag to create selection box
                    </li>
                    <li>
                      • <strong>Lasso Select:</strong> Hold Shift + drag to lasso
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Special Behaviors</h4>
                  <ul class="space-y-1 text-sm text-gray-600">
                    <li>
                      • <strong>Auto Adapt Label:</strong> Labels adapt to zoom level
                    </li>
                    <li>
                      • <strong>Fix Element Size:</strong> Elements stay same size when zooming
                    </li>
                    <li>
                      • <strong>Optimize Viewport:</strong> Better performance during interactions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="mt-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">🔧 Using Behaviors in Code</h2>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Basic Setup</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`import { Graph, createGraphData } from "@dschz/solid-g6";

export const InteractiveGraph = () => {
  const data = createGraphData({
    nodes: [
      { id: "node1", data: { label: "Node 1" } },
      { id: "node2", data: { label: "Node 2" } },
    ],
    edges: [
      { source: "node1", target: "node2" },
    ],
  });

  return (
    <Graph
      data={data}
      width={600}
      height={400}
      behaviors={[
        "drag-canvas",
        "zoom-canvas", 
        "drag-element",
        "click-select"
      ]}
    />
  );
};`}</code>
              </pre>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Resolving Behavior Conflicts</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Option 1: Configure with different triggers
<Graph
  data={data}
  behaviors={[
    "zoom-canvas",
    "drag-element",
    {
      type: "drag-canvas",
      trigger: "drag", // Default trigger
      enableOptimize: true,
    },
    {
      type: "brush-select",
      trigger: "shift-drag", // Shift + drag
      includeEdges: true,
    },
    {
      type: "lasso-select", 
      trigger: "alt-drag", // Alt + drag (alternative)
    }
  ]}
/>

// Option 2: Use click-select instead for simpler interaction
<Graph
  data={data}
  behaviors={[
    "drag-canvas",
    "zoom-canvas", 
    "drag-element",
    "click-select", // No conflicts with drag
    "hover-activate"
  ]}
/>`}</code>
              </pre>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Advanced Configuration</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Detailed behavior configuration
<Graph
  data={data}
  behaviors={[
    {
      type: "zoom-canvas",
      sensitivity: 2,
      maxZoom: 5,
      minZoom: 0.1,
    },
    {
      type: "drag-canvas",
      enableOptimize: true,
      allowDragOnItem: false, // Only drag on empty canvas
    },
    {
      type: "hover-activate",
      degree: 1, // Highlight connected nodes
      activeState: "hover",
    }
  ]}
  node={{
    state: {
      selected: { fill: "#ff4d4f", lineWidth: 3 },
      hover: { fill: "#40a9ff" },
    }
  }}
/>`}</code>
              </pre>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Dynamic Behaviors</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`const [behaviors, setBehaviors] = createSignal([
  "drag-canvas",
  "zoom-canvas"
]);

const toggleSelection = () => {
  setBehaviors(prev => 
    prev.includes("click-select")
      ? prev.filter(b => b !== "click-select")
      : [...prev, "click-select"]
  );
};

return (
  <div>
    <button onClick={toggleSelection}>
      Toggle Selection
    </button>
    <Graph
      data={data}
      behaviors={behaviors()}
    />
  </div>
);`}</code>
              </pre>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Event Handling</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`<Graph
  data={data}
  behaviors={["click-select", "hover-activate"]}
  onNodeClick={(event) => {
    console.log("Node clicked:", event.target.id);
  }}
  onNodeSelect={(event) => {
    console.log("Node selected:", event.target.id);
  }}
  onCanvasDrag={(event) => {
    console.log("Canvas dragged:", event);
  }}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🎯</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Interactive Controls</h4>
            <p class="text-gray-600">
              Rich set of built-in behaviors for navigation, selection, and manipulation
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">⚡</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Performance Optimized</h4>
            <p class="text-gray-600">
              Behaviors are optimized for smooth interactions even with large graphs
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🔧</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Highly Configurable</h4>
            <p class="text-gray-600">
              Each behavior can be customized with options to fit your specific needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
