// Import G6 for custom node creation
import { Group } from "@antv/g";
import { ExtensionCategory, Rect, type RectStyleProps, register } from "@antv/g6";
import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../src";

// Custom Node Implementation - Simple Status Node
class StatusNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data || {};
  }

  // Status indicator style
  getStatusIndicatorStyle(attributes: Required<RectStyleProps>) {
    const [width = 100, height = 60] = this.getSize(attributes);
    const status = (this.data?.status as string) || "normal";

    // Status colors
    const statusColors: Record<string, string> = {
      normal: "#52c41a", // Green
      warning: "#faad14", // Orange
      error: "#ff4d4f", // Red
      inactive: "#d9d9d9", // Gray
    };

    return {
      x: width / 2 - 8,
      y: -height / 2 + 8,
      r: 6,
      fill: statusColors[status] || statusColors.normal,
      stroke: "#fff",
      lineWidth: 2,
    };
  }

  // Icon style
  override getIconStyle(attributes: Required<RectStyleProps>) {
    const [width = 100, height = 60] = this.getSize(attributes);
    const type = (this.data?.type as string) || "default";

    // Icon mapping
    const iconMap: Record<string, string> = {
      server: "🖥️",
      database: "🗄️",
      api: "🔌",
      user: "👤",
      default: "📦",
    };

    return {
      x: -width / 2 + 10,
      y: -height / 2 + 8,
      text: iconMap[type] || iconMap.default,
      fontSize: 16,
      textAlign: "left" as const,
      textBaseline: "top" as const,
    };
  }

  override render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);

    // Add status indicator
    const statusStyle = this.getStatusIndicatorStyle(attributes);
    this.upsert("status-indicator", "circle", statusStyle, container);

    // Add icon
    const iconStyle = this.getIconStyle(attributes);
    this.upsert("icon", "text", iconStyle, container);
  }
}

// Register the custom node
register(ExtensionCategory.NODE, "status-node", StatusNode);

export const NodeTypes = () => {
  const [nodeType, setNodeType] = createSignal("circle");

  // Simple 4-node graph with individual node styling
  const graphData = createGraphData({
    nodes: [
      {
        id: "node1",
        data: { label: "Node 1" },
        style: {
          labelPlacement: "top",
        },
      },
      { id: "node2", data: { label: "Node 2" } },
      { id: "node3", data: { label: "Node 3" } },
      { id: "node4", data: { label: "Node 4" } },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node1", target: "node3" },
      { source: "node1", target: "node4" },
    ],
  });

  // Available node types including our custom node
  const nodeTypes = [
    { id: "circle", name: "Circle", icon: "⭕" },
    { id: "rect", name: "Rectangle", icon: "⬜" },
    { id: "ellipse", name: "Ellipse", icon: "🥚" },
    { id: "diamond", name: "Diamond", icon: "💎" },
    { id: "triangle", name: "Triangle", icon: "🔺" },
    { id: "hexagon", name: "Hexagon", icon: "⬡" },
    { id: "star", name: "Star", icon: "⭐" },
  ];

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-5xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Node Types</h1>
          <p class="text-lg text-gray-600">
            Explore different node shapes and types available in Solid G6
          </p>
        </div>

        {/* Node Type Selector */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Built-in Node Types</h3>
          <div class="flex flex-wrap gap-3">
            <For each={nodeTypes}>
              {(type) => (
                <button
                  onClick={() => setNodeType(type.id)}
                  class={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    nodeType() === type.id
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
        </div>

        {/* Graph Visualization */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Graph with {nodeTypes.find((t) => t.id === nodeType())?.name} Nodes
          </h3>

          <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
            <div class="bg-white rounded border shadow-sm">
              <Graph
                data={graphData}
                width={600}
                height={400}
                layout={{
                  type: "grid",
                  cols: 2,
                  rows: 2,
                }}
                node={{
                  type: nodeType(),
                  style: {
                    fill: "#1890ff",
                    stroke: "#ffffff",
                    lineWidth: 2,
                    size: nodeType() === "ellipse" ? [80, 40] : 50,
                    labelText: (d) => d.data?.label,
                    labelFill: "#333333",
                    labelFontSize: 14,
                    labelFontWeight: "bold",
                  },
                }}
                edge={{
                  style: {
                    stroke: "#666666",
                    lineWidth: 2,
                    opacity: 0.9,
                  },
                }}
                behaviors={["drag-canvas", "drag-element"]}
              />
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Code Example</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { createSignal } from "solid-js";
import { Graph, createGraphData } from "@dschz/solid-g6";

export const NodeTypes = () => {
  const [nodeType, setNodeType] = createSignal("circle");

  // Simple 4-node graph with individual node styling
  const graphData = createGraphData({
    nodes: [
      { 
        id: "node1", 
        data: { label: "Node 1" },
        style: {
          labelPlacement: "top",
        }
      },
      { id: "node2", data: { label: "Node 2" } },
      { id: "node3", data: { label: "Node 3" } },
      { id: "node4", data: { label: "Node 4" } },
    ],
    edges: [
      { source: "node1", target: "node2" },
      { source: "node1", target: "node3" },
      { source: "node1", target: "node4" },
    ],
  });

  return (
    <Graph
      data={graphData}
      width={600}
      height={400}
      layout={{
        type: "grid",
        cols: 2,
        rows: 2,
      }}
      node={{
        type: nodeType(), // ${nodeTypes.find((t) => t.id === nodeType())?.name}
        style: {
          fill: "#1890ff",
          stroke: "#ffffff",
          lineWidth: 2,
          size: nodeType() === "ellipse" ? [80, 40] : 50,
          labelText: (d) => d.data?.label,
          labelFill: "#333333",
          labelFontSize: 14,
          labelFontWeight: "bold",
        },
      }}
      edge={{
        style: {
          stroke: "#666666",
          lineWidth: 2,
          opacity: 0.9,
        },
      }}
      behaviors={["zoom-canvas", "drag-canvas", "drag-element"]}
    />
  );
};`}</code>
          </pre>
        </div>

        {/* Features Overview */}
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🎨</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Multiple Shapes</h4>
            <p class="text-gray-600">
              Choose from various built-in node shapes including circles, rectangles, stars, and
              more
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">⚡</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Reactive Updates</h4>
            <p class="text-gray-600">
              Node types update instantly thanks to SolidJS reactivity and proper graph re-rendering
            </p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🎯</div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Interactive</h4>
            <p class="text-gray-600">
              Drag nodes, zoom, and pan to explore the graph while maintaining the selected node
              type
            </p>
          </div>
        </div>

        {/* Custom Node Types */}
        <div class="mt-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">🛠️ Creating Custom Node Types</h2>
          <p class="text-lg text-gray-600 mb-8">
            While built-in node types cover most use cases, you can create custom nodes for
            specialized requirements. Based on the{" "}
            <a
              href="https://g6.antv.antgroup.com/en/manual/element/node/custom-node"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              official G6 documentation
            </a>
            , here's how to implement custom nodes with Solid G6.
          </p>

          {/* Live Custom Node Demo */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">🔧 Live Custom Node Demo</h3>
            <p class="text-gray-700 mb-4">
              This demonstrates our custom StatusNode with icons and color-coded status indicators:
            </p>

            <div class="bg-gray-100 rounded-lg p-4 flex justify-center mb-4">
              <div class="bg-white rounded border shadow-sm">
                <Graph
                  data={createGraphData({
                    nodes: [
                      {
                        id: "server1",
                        data: { label: "Web Server", type: "server", status: "normal" },
                        style: { x: 100, y: 100 },
                      },
                      {
                        id: "db1",
                        data: { label: "Database", type: "database", status: "warning" },
                        style: { x: 300, y: 100 },
                      },
                      {
                        id: "api1",
                        data: { label: "API Gateway", type: "api", status: "error" },
                        style: { x: 500, y: 100 },
                      },
                      {
                        id: "user1",
                        data: { label: "User Service", type: "user", status: "inactive" },
                        style: { x: 200, y: 200 },
                      },
                    ],
                    edges: [
                      { source: "server1", target: "db1" },
                      { source: "server1", target: "api1" },
                      { source: "api1", target: "user1" },
                    ],
                  })}
                  width={600}
                  height={300}
                  layout={{
                    type: "force",
                    linkDistance: 150,
                    nodeStrength: 300,
                  }}
                  node={{
                    type: "status-node",
                    style: {
                      size: [120, 60],
                      fill: "#f8f9fa",
                      stroke: "#dee2e6",
                      lineWidth: 2,
                      radius: 8,
                      labelText: (d) => d.data?.label,
                      labelFill: "#333333",
                      labelFontSize: 12,
                      labelFontWeight: "bold",
                      labelPlacement: "bottom",
                    },
                  }}
                  edge={{
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

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-green-500" />
                <span>Normal Status</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Warning Status</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <span>Error Status</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-gray-400" />
                <span>Inactive Status</span>
              </div>
            </div>
          </div>

          {/* Three Approaches */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              Three Approaches to Custom Nodes
            </h3>

            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-green-800 mb-2">
                  ✅ Inherit Existing Types (Recommended)
                </h4>
                <ul class="space-y-2 text-sm text-green-700">
                  <li>• Extend BaseNode, Circle, Rect, Ellipse, Diamond, etc.</li>
                  <li>• Less code, faster development</li>
                  <li>• Reuse existing functionality</li>
                  <li>• Perfect for most use cases</li>
                </ul>
              </div>

              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-amber-800 mb-2">
                  ⚠️ Build from Scratch (Advanced)
                </h4>
                <ul class="space-y-2 text-sm text-amber-700">
                  <li>• Based on G graphics system</li>
                  <li>• Maximum control and freedom</li>
                  <li>• Handle all details yourself</li>
                  <li>• For highly specialized needs</li>
                </ul>
              </div>

              <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-purple-800 mb-2">
                  🚀 Solid JSX Components (Coming Soon)
                </h4>
                <ul class="space-y-2 text-sm text-purple-700">
                  <li>• Write nodes as Solid components</li>
                  <li>• Familiar JSX syntax</li>
                  <li>• Fine-grained reactivity</li>
                  <li>• No virtual DOM overhead</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Coming Soon Details */}
          <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 border border-purple-200 mb-8">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span class="text-2xl">🔮</span>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  Native Solid JSX Node Components
                </h3>
                <p class="text-gray-700 mb-4">
                  Exciting news! There's active development happening to add support for using
                  <strong> native Solid JSX components</strong> to render nodes directly on the
                  canvas. This will allow you to create custom nodes using familiar JSX syntax
                  instead of extending G6's base classes.
                </p>

                <div class="bg-white rounded-lg p-4 mb-4 border border-purple-100">
                  <h4 class="font-semibold text-gray-900 mb-2">🎯 What This Means</h4>
                  <ul class="space-y-1 text-sm text-gray-700">
                    <li>• Write nodes as Solid components with JSX</li>
                    <li>• Leverage Solid's fine-grained reactivity for ultra-performant updates</li>
                    <li>• No virtual DOM overhead - direct canvas rendering</li>
                    <li>• Seamless integration with existing Solid applications</li>
                    <li>• Familiar component patterns for frontend developers</li>
                  </ul>
                </div>

                <div class="bg-purple-50 rounded-lg p-4 mb-4">
                  <h4 class="font-semibold text-purple-900 mb-2">🔗 Track Progress</h4>
                  <p class="text-purple-800 text-sm mb-2">
                    This feature is being developed as part of the official G6 project:
                  </p>
                  <a
                    href="https://github.com/antvis/G6/pull/7199"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 underline text-sm font-medium"
                  >
                    <span>📋 G6 Pull Request #7199 - feat: adds extension for solid-js</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span>
                    <strong>Status:</strong> In Development - Stay tuned for updates!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Custom Node Example */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              📋 Basic Example: Node with Subtitle
            </h3>
            <p class="text-gray-700 mb-4">
              Let's create a rectangle node with both a main title and subtitle using G6's extension
              system.
            </p>

            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{`// customNodes.ts - Define your custom node types
import { Group } from "@antv/g";
import { Rect, register, ExtensionCategory, type RectStyleProps } from "@antv/g6";

class DualLabelNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data || {};
  }

  // Define subtitle style
  getSubtitleStyle(attributes: Required<RectStyleProps>) {
    return {
      x: 0,
      y: 45, // Placed below the main title
      text: (this.data?.subtitle as string) || "",
      fontSize: 12,
      fill: "#666",
      textAlign: "center" as const,
      textBaseline: "middle" as const,
    };
  }

  // Draw subtitle shape
  drawSubtitleShape(attributes: Required<RectStyleProps>, container: Group) {
    const subtitleStyle = this.getSubtitleStyle(attributes);
    this.upsert("subtitle", "text", subtitleStyle, container);
  }

  // Override render method
  override render(attributes = this.parsedAttributes, container: Group) {
    // 1. Render the basic rectangle and main title
    super.render(attributes, container);
    
    // 2. Add our custom subtitle
    this.drawSubtitleShape(attributes, container);
  }
}

// Register the custom node type
register(ExtensionCategory.NODE, "dual-label-node", DualLabelNode);`}</code>
            </pre>

            <div class="mt-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Using the Custom Node</h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{`// Import and use in your Solid component
import { Graph, createGraphData } from "@dschz/solid-g6";
import "./customNodes"; // Import to register the custom node

export const CustomNodeDemo = () => {
  const data = createGraphData({
    nodes: [
      { 
        id: "1", 
        data: { label: "Main Title", subtitle: "This is a subtitle" },
        style: { 
          x: 150, 
          y: 100 
        }
      }
    ],
  });

  return (
    <Graph
      data={data}
      width={400}
      height={200}
      node={{
        type: "dual-label-node", // Use our custom node type
        style: {
          size: [120, 80],
          fill: "#e8f4f8",
          stroke: "#1890ff",
          lineWidth: 2,
          radius: 4,
          labelText: (d) => d.data?.label,
          labelFill: "#333",
          labelFontSize: 14,
          labelFontWeight: "bold",
        }
      }}
    />
  );
};`}</code>
              </pre>
            </div>
          </div>

          {/* Advanced Example: Node with Icon */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              🎨 Advanced Example: Node with Icon and Badge
            </h3>
            <p class="text-gray-700 mb-4">
              Create a more complex node with icon, label, and interactive badge.
            </p>

            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{`import { Group } from "@antv/g";
import { Rect, register, ExtensionCategory, type RectStyleProps } from "@antv/g6";

class IconBadgeNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data || {};
  }

  // Icon styling
  getIconStyle(attributes: Required<RectStyleProps>) {
    const [width, height] = this.getSize(attributes);
    const icon = this.data?.icon as string;
    
    return {
      x: -width / 2 + 10,
      y: -height / 2 + 10,
      width: 20,
      height: 20,
      src: icon,
    };
  }

  // Badge styling (notification count)
  getBadgeStyle(attributes: Required<RectStyleProps>) {
    const [width, height] = this.getSize(attributes);
    
    return {
      x: width / 2 - 8,
      y: -height / 2 + 8,
      r: 8,
      fill: "#ff4d4f",
      stroke: "#fff",
      lineWidth: 2,
    };
  }

  getBadgeTextStyle(attributes: Required<RectStyleProps>) {
    const [width, height] = this.getSize(attributes);
    const badgeCount = (this.data?.badgeCount as number) || 0;
    
    return {
      x: width / 2 - 8,
      y: -height / 2 + 8,
      text: badgeCount > 99 ? "99+" : String(badgeCount),
      fontSize: 10,
      fill: "#fff",
      textAlign: "center" as const,
      textBaseline: "middle" as const,
      fontWeight: "bold",
    };
  }

  // Label positioning (to the right of icon)
  getCustomLabelStyle(attributes: Required<RectStyleProps>) {
    const [width, height] = this.getSize(attributes);
    const label = (this.data?.label as string) || "";
    
    return {
      x: -width / 2 + 35,
      y: -height / 2 + 20,
      text: label,
      fontSize: 12,
      fill: "#333",
      textAlign: "left" as const,
      textBaseline: "middle" as const,
    };
  }

  override render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);
    
    // Draw icon
    if (this.data?.icon) {
      const iconStyle = this.getIconStyle(attributes);
      this.upsert("custom-icon", "image", iconStyle, container);
    }
    
    // Draw badge (if badgeCount > 0)
    const badgeCount = (this.data?.badgeCount as number) || 0;
    if (badgeCount > 0) {
      const badgeStyle = this.getBadgeStyle(attributes);
      this.upsert("badge", "circle", badgeStyle, container);
      
      const badgeTextStyle = this.getBadgeTextStyle(attributes);
      this.upsert("badge-text", "text", badgeTextStyle, container);
    }
    
    // Draw custom label
    const labelStyle = this.getCustomLabelStyle(attributes);
    this.upsert("custom-label", "text", labelStyle, container);
  }
}

register(ExtensionCategory.NODE, "icon-badge-node", IconBadgeNode);`}</code>
            </pre>
          </div>

          {/* State-Responsive Node */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              🎯 State-Responsive Custom Node
            </h3>
            <p class="text-gray-700 mb-4">
              Create nodes that respond to interaction states like hover, selected, and active.
            </p>

            <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
              <code>{`class StatefulNode extends Rect {
  get data() {
    return this.context.graph.getNodeData(this.id).data || {};
  }

  // Override key style to respond to states
  protected override getKeyStyle(attributes: Required<RectStyleProps>) {
    const style = super.getKeyStyle(attributes);
    
    // Check current states
    const states = (attributes as any).states || [];
    
    if (states.includes("selected")) {
      return {
        ...style,
        stroke: "#1890ff",
        lineWidth: 3,
        shadowColor: "rgba(24,144,255,0.3)",
        shadowBlur: 10,
      };
    }
    
    if (states.includes("hover")) {
      return {
        ...style,
        stroke: "#40a9ff",
        lineWidth: 2,
        cursor: "pointer",
      };
    }
    
    return style;
  }

  // Status indicator that changes with states
  getStatusIndicatorStyle(attributes: Required<RectStyleProps>) {
    const states = (attributes as any).states || [];
    const [width, height] = this.getSize(attributes);
    
    let fill = "#52c41a"; // Default: green (normal)
    
    if (states.includes("selected")) fill = "#1890ff"; // Blue when selected
    if (states.includes("hover")) fill = "#faad14";    // Orange on hover
    if ((this.data?.status as string) === "error") fill = "#ff4d4f"; // Red for errors
    
    return {
      x: width / 2 - 6,
      y: height / 2 - 6,
      r: 4,
      fill,
      stroke: "#fff",
      lineWidth: 1,
    };
  }

  override render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);
    
    // Add status indicator
    const statusStyle = this.getStatusIndicatorStyle(attributes);
    this.upsert("status-indicator", "circle", statusStyle, container);
  }
}

register(ExtensionCategory.NODE, "stateful-node", StatefulNode);`}</code>
            </pre>

            <div class="mt-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-2">
                Using with State Configuration
              </h4>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>
                  {`// In your Graph component
<Graph
  data={data}
  node={{
    type: "stateful-node",
    style: {
      fill: "#f6f7f9",
      stroke: "#d9d9d9",
      lineWidth: 1,
    },
    state: {
      // Define state-specific styles
      hover: {
        fill: "#e6f7ff",
      },
      selected: {
        fill: "#bae7ff",
      }
    }
  }}
  onNodeClick={(event) => {
    // Toggle selected state
    const nodeId = event.target.id;
    graph.setElementState(nodeId, ['selected']);
  }}
/>`}
                </code>
              </pre>
            </div>
          </div>

          {/* Best Practices */}
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">💡 Custom Node Best Practices</h3>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">✅ Do</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Start by extending existing node types (Rect, Circle, etc.)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Use meaningful names for custom shapes (e.g., 'icon', 'badge')</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Implement state-responsive styling for better UX</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Register node types before using them in graphs</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-green-500 mr-2 mt-0.5">•</span>
                    <span>Use TypeScript for better development experience</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">❌ Don't</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Create overly complex nodes that impact performance</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Forget to call super.render() when extending nodes</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Hard-code values that could be configurable</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Ignore accessibility considerations (colors, contrast)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-red-500 mr-2 mt-0.5">•</span>
                    <span>Skip error handling for missing data properties</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
              <p class="text-blue-800">
                <strong>💡 Pro Tip:</strong> For more complex custom nodes, refer to the{" "}
                <a
                  href="https://g6.antv.antgroup.com/en/manual/element/node/custom-node"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline hover:text-blue-900"
                >
                  official G6 custom node documentation
                </a>{" "}
                which includes advanced examples like clickable buttons, complex layouts, and
                performance optimization techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
