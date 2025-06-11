// Import G6 for custom edge creation
import { Group } from "@antv/g";
import { ExtensionCategory, Line, register, subStyleProps } from "@antv/g6";
import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../src";

// Custom Edge Implementation - Edge with Start and End Labels
class LabelEdge extends Line {
  override render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);
    this.drawEndLabel(attributes, container, "start");
    this.drawEndLabel(attributes, container, "end");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drawEndLabel(attributes: any, container: Group, type: "start" | "end") {
    const key = type === "start" ? "startLabel" : "endLabel";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [x, y] = this.getEndpoints(attributes as any)[type === "start" ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === "start" ? 15 : -15,
      fontSize: 16,
      fill: "gray",
      textBaseline: "middle" as const,
      textAlign: type === "start" ? "start" : "end",
    };
    const style = subStyleProps(attributes, key);
    const text = style.text;
    this.upsert(`label-${type}`, "text", text ? { ...fontStyle, ...style } : false, container);
  }
}

// Register the custom edge
register(ExtensionCategory.EDGE, "extra-label-edge", LabelEdge);

export const EdgeTypes = () => {
  const [edgeType, setEdgeType] = createSignal("line");
  const [edgeStyle, setEdgeStyle] = createSignal("solid");

  // Simple graph data for edge demonstrations
  const graphData = createGraphData({
    nodes: [
      { id: "node1", data: { label: "Source" }, style: { x: 100, y: 150 } },
      { id: "node2", data: { label: "Target" }, style: { x: 300, y: 150 } },
      { id: "node3", data: { label: "Node 3" }, style: { x: 200, y: 250 } },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node3", target: "node1" },
    ],
  });

  // Custom edge graph data with labels
  const customEdgeData = createGraphData({
    nodes: [
      { id: "server", data: { label: "Server" }, style: { x: 100, y: 100 } },
      { id: "database", data: { label: "Database" }, style: { x: 300, y: 100 } },
      { id: "client", data: { label: "Client" }, style: { x: 200, y: 200 } },
    ],
    edges: [
      {
        source: "server",
        target: "database",
        data: { startLabel: { text: "queries" }, endLabel: { text: "results" } },
      },
      {
        source: "client",
        target: "server",
        data: { startLabel: { text: "requests" }, endLabel: { text: "responses" } },
      },
    ],
  });

  // Available edge types
  const edgeTypes = [
    { id: "line", name: "Line", icon: "➖" },
    { id: "polyline", name: "Polyline", icon: "〰️" },
    { id: "cubic", name: "Cubic", icon: "🌊" },
    { id: "quadratic", name: "Quadratic", icon: "🏹" },
    { id: "cubic-horizontal", name: "Cubic Horizontal", icon: "↔️" },
    { id: "cubic-vertical", name: "Cubic Vertical", icon: "↕️" },
    { id: "extra-label-edge", name: "Custom Labels", icon: "🔧" },
  ];

  // Edge style options
  const edgeStyles = [
    { id: "solid", name: "Solid", icon: "━" },
    { id: "dashed", name: "Dashed", icon: "┅" },
    { id: "dotted", name: "Dotted", icon: "┈" },
  ];

  const getEdgeStyleProps = createMemo(() => {
    const base = {
      stroke: "#666666",
      lineWidth: 2,
      opacity: 0.8,
      endArrow: true,
    };

    switch (edgeStyle()) {
      case "solid":
        return { ...base, lineDash: [] }; // Empty array clears dash pattern
      case "dashed":
        return { ...base, lineDash: [5, 5] };
      case "dotted":
        return { ...base, lineDash: [2, 2] };
      default:
        return { ...base, lineDash: [] }; // Default to solid (empty array)
    }
  });

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-5xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Edge Types</h1>
          <p class="text-lg text-gray-600">
            Explore different edge shapes, styles, and custom edge implementations in Solid G6
          </p>
        </div>

        {/* Edge Type Selector */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Edge Types</h3>
          <div class="flex flex-wrap gap-3 mb-4">
            <For each={edgeTypes}>
              {(type) => (
                <button
                  onClick={() => setEdgeType(type.id)}
                  class={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    edgeType() === type.id
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span class="text-lg">{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              )}
            </For>
          </div>

          <h4 class="text-lg font-semibold text-gray-900 mb-3">Edge Styles</h4>
          <div class="flex flex-wrap gap-3">
            <For each={edgeStyles}>
              {(style) => (
                <button
                  onClick={() => setEdgeStyle(style.id)}
                  class={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    edgeStyle() === style.id
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span class="text-lg">{style.icon}</span>
                  <span>{style.name}</span>
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Graph Visualization */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Graph with {edgeTypes.find((t) => t.id === edgeType())?.name} Edges (
            {edgeStyles.find((s) => s.id === edgeStyle())?.name})
          </h3>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={edgeType() === "extra-label-edge" ? customEdgeData : graphData}
                width={500}
                height={350}
                node={{
                  style: {
                    fill: "#1890ff",
                    stroke: "#ffffff",
                    lineWidth: 2,
                    size: 40,
                    labelText: (d) => d.data?.label,
                    labelFill: "#333333",
                    labelFontSize: 14,
                    labelFontWeight: "bold",
                  },
                }}
                edge={{
                  type: edgeType(),
                  style: getEdgeStyleProps(),
                }}
                behaviors={["drag-canvas", "drag-element"]}
              />
            </div>
          </div>
        </div>

        {/* Edge Configuration Examples */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">🎛️ Edge Configuration Options</h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Basic Styling</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Basic edge configuration
edge={{
  type: "line",
  style: {
    stroke: "#666666",
    lineDash: [],
    lineWidth: 2,
    opacity: 0.8,
    endArrow: true,
    startArrow: false,
  }
}}`}</code>
              </pre>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Advanced Styling</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Advanced edge styling
edge={{
  type: "cubic",
  style: {
    stroke: "#1890ff",
    lineWidth: 3,
    lineDash: [5, 5],
    opacity: 0.9,
    endArrow: {
      size: 20,
      fill: "#1890ff"
    },
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 10,
  }
}}`}</code>
              </pre>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Curved Edges</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Curved edge types
edge={{
  type: "quadratic", // or "cubic"
  style: {
    stroke: "#52c41a",
    lineWidth: 2,
    curveOffset: 20,
    endArrow: true,
  }
}}`}</code>
              </pre>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Data-Driven Styling</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Dynamic edge styling
edge={{
  style: {
    stroke: (d) => d.data?.type === "primary" 
      ? "#1890ff" : "#d9d9d9",
    lineWidth: (d) => d.data?.weight || 2,
    lineDash: (d) => d.data?.dashed 
      ? [5, 5] : undefined,
  }
}}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Custom Edge Demo */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">🔧 Custom Edge with Labels Demo</h3>
          <p class="text-gray-700 mb-4">
            This demonstrates our custom LabelEdge that adds labels at the start and end of edges:
          </p>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center mb-4">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={customEdgeData}
                width={500}
                height={300}
                node={{
                  style: {
                    fill: "#f8f9fa",
                    stroke: "#dee2e6",
                    lineWidth: 2,
                    size: 50,
                    labelText: (d) => d.data?.label,
                    labelFill: "#333333",
                    labelFontSize: 14,
                    labelFontWeight: "bold",
                  },
                }}
                edge={{
                  type: "extra-label-edge",
                  style: {
                    stroke: "#666666",
                    lineWidth: 2,
                    opacity: 0.8,
                    endArrow: true,
                  },
                }}
                behaviors={["drag-canvas", "drag-element"]}
              />
            </div>
          </div>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p class="text-blue-800">
              <strong>💡 Note:</strong> The custom edge automatically extracts
              <code class="bg-blue-100 px-1 rounded">startLabel</code> and{" "}
              <code class="bg-blue-100 px-1 rounded">endLabel</code> from edge data to display
              directional labels.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Code Example</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { createSignal } from "solid-js";
import { Graph, createGraphData } from "@dschz/solid-g6";

export const EdgeTypes = () => {
  const [edgeType, setEdgeType] = createSignal("line");

  const graphData = createGraphData({
    nodes: [
      { id: "node1", data: { label: "Source" }, style: { x: 100, y: 150 } },
      { id: "node2", data: { label: "Target" }, style: { x: 300, y: 150 } },
      { id: "node3", data: { label: "Node 3" }, style: { x: 200, y: 250 } },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node2", target: "node3" },
      { source: "node3", target: "node1" },
    ],
  });

  return (
    <Graph
      data={graphData}
      width={500}
      height={350}

      node={{
        style: {
          fill: "#1890ff",
          stroke: "#ffffff",
          lineWidth: 2,
          size: 40,
          labelText: (d) => d.data?.label,
          labelFill: "#333333",
          labelFontSize: 14,
          labelFontWeight: "bold",
        },
      }}
      edge={{
        type: edgeType(), // ${edgeTypes.find((t) => t.id === edgeType())?.name}
        style: {
          stroke: "#666666",
          lineWidth: 2,
          opacity: 0.8,
          endArrow: true,
        },
      }}
      behaviors={["zoom-canvas", "drag-canvas", "drag-element"]}
    />
  );
};`}</code>
          </pre>
        </div>

        {/* Creating Custom Edges */}
        <div class="mt-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">🛠️ Creating Custom Edge Types</h2>
          <p class="text-lg text-gray-600 mb-8">
            While built-in edge types cover most use cases, you can create custom edges for
            specialized requirements like adding labels, animations, or complex styling.
          </p>

          {/* Custom Edge Implementation */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              📋 Custom Edge Implementation: LabelEdge
            </h3>
            <p class="text-gray-700 mb-4">
              Here's how to create an edge that displays labels at the start and end points:
            </p>

            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{`// customEdges.ts - Define your custom edge types
import { Group } from "@antv/g";
import { ExtensionCategory, Line, register, subStyleProps } from "@antv/g6";

class LabelEdge extends Line {
  override render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);
    this.drawEndLabel(attributes, container, "start");
    this.drawEndLabel(attributes, container, "end");
  }

  drawEndLabel(attributes: any, container: Group, type: "start" | "end") {
    const key = type === "start" ? "startLabel" : "endLabel";
    const [x, y] = this.getEndpoints(attributes)[type === "start" ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === "start" ? 15 : -15,
      fontSize: 16,
      fill: "gray",
      textBaseline: "middle" as const,
      textAlign: type as const,
    };
    
    const style = subStyleProps(attributes, key);
    const text = style.text;
    
    this.upsert(
      \`label-\${type}\`,
      "text",
      text ? { ...fontStyle, ...style } : false,
      container
    );
  }
}

// Register the custom edge
register(ExtensionCategory.EDGE, "extra-label-edge", LabelEdge);`}</code>
            </pre>

            <div class="mt-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Using the Custom Edge</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Import and use in your Solid component
import { Graph, createGraphData } from "@dschz/solid-g6";
import "./customEdges"; // Import to register the custom edge

export const CustomEdgeDemo = () => {
  const data = createGraphData({
    nodes: [
      { id: "server", data: { label: "Server" } },
      { id: "database", data: { label: "Database" } },
    ],
    edges: [
      {
        source: "server",
        target: "database",
        data: { 
          startLabel: { text: "queries" }, 
          endLabel: { text: "results" } 
        },
      },
    ],
  });

  return (
    <Graph
      data={data}
      width={400}
      height={200}
      edge={{
        type: "extra-label-edge", // Use our custom edge type
        style: {
          stroke: "#666666",
          lineWidth: 2,
          opacity: 0.8,
          endArrow: true,
        }
      }}
    />
  );
};`}</code>
              </pre>
            </div>
          </div>

          {/* Edge Types Overview */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">🎯 Built-in Edge Types</h3>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Straight Edges</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-center">
                    <span class="text-blue-500 mr-2">•</span>
                    <strong>line</strong> - Simple straight line between nodes
                  </li>
                  <li class="flex items-center">
                    <span class="text-blue-500 mr-2">•</span>
                    <strong>polyline</strong> - Multi-segment line with waypoints
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Curved Edges</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-center">
                    <span class="text-green-500 mr-2">•</span>
                    <strong>cubic</strong> - Smooth cubic Bézier curve
                  </li>
                  <li class="flex items-center">
                    <span class="text-green-500 mr-2">•</span>
                    <strong>quadratic</strong> - Simple quadratic curve
                  </li>
                  <li class="flex items-center">
                    <span class="text-green-500 mr-2">•</span>
                    <strong>cubic-horizontal/vertical</strong> - Directional curves
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">💡 Edge Best Practices</h3>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">✅ Do</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Use curved edges for dense graphs to reduce overlaps</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Apply consistent arrow styles throughout your graph</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Use different colors/styles to represent edge types</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Consider edge weight for line thickness</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">❌ Don't</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Make edges too thick or thin for readability</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Use too many different edge styles in one graph</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Forget to handle edge labels overlapping nodes</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Ignore color accessibility for edge distinction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🎨</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Flexible Styling</h4>
            <p class="text-gray-600">
              Configure edge appearance with colors, line styles, arrows, and animations
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">⚡</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Reactive Updates</h4>
            <p class="text-gray-600">
              Edge types and styles update instantly with SolidJS reactivity
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🔧</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Custom Extensions</h4>
            <p class="text-gray-600">
              Create custom edge types with labels, animations, and specialized behaviors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
