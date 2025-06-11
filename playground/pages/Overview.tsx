import {
  createGraphBehaviors,
  createGraphComboOptions,
  createGraphData,
  createGraphEdgeOptions,
  createGraphLayout,
  createGraphNodeOptions,
  Graph,
} from "../../src";

export const Overview = () => {
  // Example data for demonstrations with combos
  const graphData = createGraphData({
    nodes: [
      { id: "node1", data: { label: "TypeScript", category: "language" }, combo: "frontend" },
      { id: "node2", data: { label: "Auto-complete", category: "feature" }, combo: "frontend" },
      { id: "node3", data: { label: "Support", category: "service" }, combo: "backend" },
      { id: "node4", data: { label: "Validation", category: "feature" }, combo: "backend" },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node3", target: "node4" },
    ],
    combos: [
      { id: "frontend", data: { label: "Frontend Stack", type: "development" } },
      { id: "backend", data: { label: "Backend Stack", type: "infrastructure" } },
    ],
  });

  // Working examples using the utility functions with proper typing
  const nodeConfig = createGraphNodeOptions<typeof graphData>({
    type: "circle",
    style: {
      fill: "#1890ff",
      stroke: "#ffffff",
      lineWidth: 2,
      size: 40,
      labelText: (d) => d.data?.label,
      labelFill: "#ffffff",
      labelFontSize: 12,
    },
  });

  const edgeConfig = createGraphEdgeOptions<typeof graphData>({
    style: {
      stroke: "#e6f7ff",
      lineWidth: 2,
      opacity: 0.8,
    },
  });

  const comboConfig = createGraphComboOptions<typeof graphData>({
    style: {
      fill: "#f0f0f0",
      stroke: "#d9d9d9",
      lineWidth: 2,
      radius: 8,
      labelText: (d) => d.data?.label,
      labelFill: "#666666",
      labelFontSize: 14,
      labelFontWeight: "bold",
    },
  });

  const layoutConfig = createGraphLayout<(typeof graphData)["nodes"][number]["data"]>({
    type: "dagre",
    rankdir: "TB",
    nodesep: 50,
    ranksep: 70,
  });

  // Note: createGraphBehaviors doesn't need type parameters
  const behaviorsConfig = createGraphBehaviors(["zoom-canvas", "drag-canvas", "drag-element"]);

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-5xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Overview</h1>
          <p class="text-lg text-gray-600">
            Understanding the Graph component and utility functions for type-safe graph development
          </p>
        </div>

        {/* Graph Component Section */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">📊 Graph Component</h2>
          <p class="text-gray-700 mb-4">
            The <code class="bg-gray-100 px-2 py-1 rounded text-sm">Graph</code> component is the
            core of Solid G6. It provides a reactive wrapper around G6's graph rendering engine with
            full TypeScript support.
          </p>

          <div class="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Basic Usage</h3>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{`import { Graph } from "@dschz/solid-g6";

const MyGraph = () => {
  return (
    <Graph
      data={{
        nodes: [
          { id: "1", data: { label: "Node 1" } },
          { id: "2", data: { label: "Node 2" } }
        ],
        edges: [
          { source: "1", target: "2" }
        ]
      }}
      width={600}
      height={400}
      layout={{ type: "dagre" }}
      node={{
        type: "circle",
        style: {
          fill: "#1890ff",
          labelText: (d) => d.data?.label
        }
      }}
      behaviors={["zoom-canvas", "drag-canvas"]}
    />
  );
};`}</code>
            </pre>
          </div>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p class="text-blue-800">
              <strong>💡 TypeScript Benefits:</strong> When you define props directly on the Graph
              component, you get full auto-complete and type checking for all configuration options.
            </p>
          </div>
        </div>

        {/* Utility Functions Section */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🛠️ Utility Functions</h2>
          <p class="text-gray-700 mb-4">
            When you need to define graph configurations outside of the component props context
            (e.g., in separate variables, configuration objects, or dynamic scenarios), TypeScript
            loses its auto-complete capabilities. Our utility functions restore this functionality.
          </p>

          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-red-800 mb-2">❌ Without Utilities</h3>
              <pre class="bg-red-100 text-red-900 p-3 rounded text-sm">
                <code>{`// No auto-complete, prone to errors
const nodeConfig = {
  type: "circle", // No validation
  style: {
    fil: "#1890ff", // Typo not caught
    // Missing properties not suggested
  }
};`}</code>
              </pre>
            </div>

            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 class="text-lg font-semibold text-green-800 mb-2">✅ With Utilities</h3>
              <pre class="bg-green-100 text-green-900 p-3 rounded text-sm">
                <code>{`// Full auto-complete and validation
const nodeConfig = createGraphNodeOptions<
  typeof myData
>({
  type: "circle", // Type validated
  style: {
    // Auto-complete available for all fields
    // All properties are suggested
    fill: "#1890ff",
    labelText: (d) => d.data?.label,
  }
});`}</code>
              </pre>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">Available Utility Functions</h3>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="border border-gray-200 rounded p-4">
                <h4 class="font-semibold text-gray-900 mb-2">🎯 Core Functions</h4>
                <ul class="space-y-1 text-sm text-gray-700">
                  <li>
                    <code>createGraphOptions()</code> - Complete graph configuration
                  </li>
                  <li>
                    <code>createGraphData()</code> - Graph data structure
                  </li>
                  <li>
                    <code>createGraphLayout()</code> - Layout algorithms (with generics)
                  </li>
                  <li>
                    <code>createGraphBehaviors()</code> - Interaction behaviors
                  </li>
                </ul>
              </div>

              <div class="border border-gray-200 rounded p-4">
                <h4 class="font-semibold text-gray-900 mb-2">🎨 Styling Functions</h4>
                <ul class="space-y-1 text-sm text-gray-700">
                  <li>
                    <code>createGraphNodeOptions()</code> - Node styling & types
                  </li>
                  <li>
                    <code>createGraphEdgeOptions()</code> - Edge styling & types
                  </li>
                  <li>
                    <code>createGraphComboOptions()</code> - Combo styling & types
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <h4 class="text-lg font-semibold text-yellow-800 mb-2">⚡ Type Inference Guide</h4>
            <p class="text-yellow-800 mb-2">
              <strong>Important:</strong> Different utility functions have different typing
              requirements:
            </p>
            <pre class="bg-yellow-100 text-yellow-900 p-3 rounded text-sm">
              <code>{`// ✅ Functions that NEED typeof for data-aware typing:
const nodeConfig = createGraphNodeOptions<typeof myGraphData>({
  // Gets auto-complete for your specific data properties
});
const edgeConfig = createGraphEdgeOptions<typeof myGraphData>({
  // Gets auto-complete for your specific data properties  
});
const comboConfig = createGraphComboOptions<typeof myGraphData>({
  // Gets auto-complete for your specific data properties
});
const layoutConfig = createGraphLayout<
  typeof myGraphData["nodes"][number]["data"]
>({
  type: "dagre", // Needs NodeType for layout-specific callbacks
  rankdir: "TB",
});

// ✅ Functions that DON'T need type parameters:
const completeConfig = createGraphOptions({
  // Infers everything from complete structure - no typing needed!
});
const behaviorsConfig = createGraphBehaviors([
  "zoom-canvas", "drag-canvas" // Standard behaviors
]);`}</code>
            </pre>
          </div>
        </div>

        {/* Practical Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">💼 Practical Example</h2>
          <p class="text-gray-700 mb-4">
            Here's a real-world example showing how utility functions enable better code
            organization:
          </p>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">External Configuration</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// configs/graphConfig.ts - External configuration file
import { 
  createGraphData,
  createGraphNodeOptions, 
  createGraphEdgeOptions, 
  createGraphComboOptions,
  createGraphLayout,
  createGraphBehaviors 
} from "@dschz/solid-g6";

// 1. First, define your graph data structure
const myGraphData = createGraphData({
  nodes: [
    { id: "1", data: { label: "Node 1", category: "primary" } },
    { id: "2", data: { label: "Node 2", category: "secondary" } }
  ],
  edges: [
    { source: "1", target: "2" }
  ]
});

// 2. Use typeof for data-aware utilities
export const defaultNodeStyle = createGraphNodeOptions<
  typeof myGraphData
>({
  type: "circle",
  style: {
    fill: "#1890ff",
    stroke: "#ffffff", 
    lineWidth: 2,
    size: 40,
    labelText: (d) => d.data?.label, // ✅ Auto-complete for 'label'
    labelFill: "#ffffff",
    labelFontSize: 12,
  }
});

export const defaultEdgeStyle = createGraphEdgeOptions<
  typeof myGraphData
>({
  style: {
    stroke: "#e6f7ff",
    lineWidth: 2,
    opacity: 0.8,
  }
});

// 3. Layout needs NodeType for node-specific callbacks
export const dagreLayout = createGraphLayout<
  typeof myGraphData["nodes"][number]["data"]
>({
  type: "dagre",
  rankdir: "TB",
  nodesep: 50,
  ranksep: 70,
});

export const interactiveBehaviors = createGraphBehaviors([
  "zoom-canvas",
  "drag-canvas", 
  "drag-element"
]);`}</code>
              </pre>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Component Usage</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// MyComponent.tsx - Clean component code
import { Graph, createGraphData } from "@dschz/solid-g6";
import { 
  defaultNodeStyle, 
  defaultEdgeStyle, 
  dagreLayout, 
  interactiveBehaviors 
} from "../configs/graphConfig";

export const MyDashboard = () => {
  const data = createGraphData({
    nodes: [/* your nodes */],
    edges: [/* your edges */]
  });

  return (
    <Graph
      data={data}
      width={800}
      height={600}
      layout={dagreLayout}        // ✅ Type-safe
      node={defaultNodeStyle}     // ✅ Type-safe  
      edge={defaultEdgeStyle}     // ✅ Type-safe
      behaviors={interactiveBehaviors} // ✅ Type-safe
    />
  );
};`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Complete Configuration Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            🔧 Complete Configuration with createGraphOptions
          </h2>
          <p class="text-gray-700 mb-4">
            For maximum externalization, use{" "}
            <code class="bg-gray-100 px-2 py-1 rounded text-sm">createGraphOptions</code>
            to define your entire graph configuration in one place. This combines all other utility
            functions into a single, type-safe configuration object.
          </p>

          <div class="space-y-4">
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p class="text-blue-800">
                <strong>💡 Best for:</strong> Complex applications where you want to completely
                separate configuration from components, or when building reusable graph templates.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Complete External Configuration
              </h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// configs/completeGraphConfig.ts - Everything in one place
import { createGraphData, createGraphOptions } from "@dschz/solid-g6";

// Define your data structure first with combos
const myGraphData = createGraphData({
  nodes: [
    { 
      id: "1", 
      data: { label: "Task 1", priority: "high", category: "backend" }, 
      combo: "development" 
    },
    { 
      id: "2", 
      data: { label: "Task 2", priority: "medium", category: "frontend" }, 
      combo: "development" 
    },
    { 
      id: "3", 
      data: { label: "Task 3", priority: "low", category: "testing" }, 
      combo: "qa" 
    }
  ],
  edges: [
    { source: "1", target: "2" },
    { source: "2", target: "3" }
  ],
  combos: [
    { 
      id: "development", 
      data: { label: "Development", team: "engineering" } 
    },
    { 
      id: "qa", 
      data: { label: "Quality Assurance", team: "testing" } 
    }
  ]
});

// Complete graph configuration using createGraphOptions
export const taskFlowConfig = createGraphOptions({
  // No type parameters needed - everything inferred!
  // Graph dimensions
  width: 800,
  height: 600,
  
  // Data (could also be passed separately to Graph component)
  data: myGraphData,
  
  // Node configuration with data-aware typing
  node: {
    type: "rect",
    style: {
      fill: (d) => {
        // ✅ Full auto-complete for d.data properties!
        switch (d.data?.priority) {
          case "high": return "#ff4d4f";
          case "medium": return "#faad14"; 
          case "low": return "#52c41a";
          default: return "#1890ff";
        }
      },
      stroke: "#ffffff",
      lineWidth: 2,
      size: [120, 60],
      radius: 8,
      labelText: (d) => d.data?.label, // ✅ Auto-complete for label
      labelFill: "#ffffff",
      labelFontSize: 12,
      labelFontWeight: "bold",
    }
  },
  
  // Edge configuration with data-aware typing  
  edge: {
    style: {
      stroke: "#8c8c8c",
      lineWidth: 2,
      opacity: 0.8,
      endArrow: true,
      endArrowType: "triangle",
      endArrowSize: 8,
    }
  },
  
  // Combo configuration with data-aware typing
  combo: {
    style: {
      fill: "#f8f9fa",
      stroke: "#dee2e6",
      lineWidth: 2,
      radius: 8,
      labelText: (d) => d.data?.label, // ✅ Auto-complete for combo
      labelFill: "#495057",
      labelFontSize: 16,
      labelFontWeight: "bold",
      labelPlacement: "top",
    }
  },
  
  // Layout configuration (no typing needed - handled internally)
  layout: {
    type: "dagre",
    rankdir: "TB",
    nodesep: 50,
    ranksep: 80,
  },
  
  // Behaviors configuration
  behaviors: ["zoom-canvas", "drag-canvas", "drag-element"],
  
  // Additional G6 options
  autoResize: true,
  background: "#fafafa",
});`}</code>
              </pre>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Ultra-Clean Component Usage</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// TaskFlowGraph.tsx - Minimal component code
import { Graph } from "@dschz/solid-g6";
import { 
  taskFlowConfig, 
  compactTaskFlowConfig 
} from "../configs/completeGraphConfig";

export const TaskFlowGraph = (props: { compact?: boolean }) => {
  return (
    <Graph
      {...(props.compact ? compactTaskFlowConfig : taskFlowConfig)}
      // You can still override specific options if needed
      onReady={(graph) => {
        console.log("Task flow graph ready!", graph);
      }}
    />
  );
};

// Usage in your app
<TaskFlowGraph />           {/* Full size */}
<TaskFlowGraph compact />   {/* Compact version */}`}</code>
              </pre>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mt-6">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-green-800 mb-2">✅ Advantages</h4>
                <ul class="space-y-1 text-sm text-green-700">
                  <li>• Complete separation of config and components</li>
                  <li>• Full TypeScript auto-complete for all options</li>
                  <li>• Easy to create configuration variants</li>
                  <li>• Reusable across multiple components</li>
                  <li>• Centralized configuration management</li>
                </ul>
              </div>

              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-amber-800 mb-2">⚠️ When to Use</h4>
                <ul class="space-y-1 text-sm text-amber-700">
                  <li>• Complex graphs with many configuration options</li>
                  <li>• Multiple graph instances with similar configs</li>
                  <li>• Configuration-driven applications</li>
                  <li>• When building reusable graph templates</li>
                  <li>• Large teams with shared configurations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Graph */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🎮 Live Demo</h2>
          <p class="text-gray-700 mb-4">
            This graph is built using the utility functions with proper typing, including combo
            nodes:
          </p>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={graphData}
                width={600}
                height={400}
                layout={layoutConfig}
                node={nodeConfig}
                edge={edgeConfig}
                combo={comboConfig}
                behaviors={behaviorsConfig}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">✨ Best Practices</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">✅ Do</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  Use&nbsp;<code>typeof</code>&nbsp;for data-aware utilities (node/edge/combo
                  styling)
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  Use <code>createGraphOptions</code> for complete externalization
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  Organize configs in separate files for reusability
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  Leverage TypeScript auto-complete for faster development
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  Define props directly on Graph when simple
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">❌ Don't</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  Create raw configuration objects without utilities
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  Add type parameters to functions that don't need them
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  Skip type validation for external configs
                </li>
                <li class="flex items-start">
                  <span class="text-red-500 mr-2">•</span>
                  Duplicate configuration code across components
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
