<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=Solid-G6" alt="solid-g6">
</p>

# @dschz/solid-g6

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![@antv/g6](https://img.shields.io/badge/@antv/g6-5.0.0+-orange?style=flat-square)](https://github.com/tradingview/lightweight-charts)
[![npm](https://img.shields.io/npm/v/@dschz/solid-g6?color=blue)](https://www.npmjs.com/package/@dschz/solid-g6)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dschz/solid-uplot)](https://bundlephobia.com/package/@dschz/solid-g6)
[![JSR](https://jsr.io/badges/@dschz/solid-g6/score)](https://jsr.io/@dschz/solid-g6)
[![CI](https://github.com/dsnchz/solid-g6/actions/workflows/ci.yaml/badge.svg)](https://github.com/dsnchz/solid-g6/actions/workflows/ci.yaml)
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?logo=discord&logoColor=white)](https://discord.gg/ct5eR58XQS)

<div align="center">
  <table style="border: none; border-collapse: collapse;">
    <tr>
      <td align="center" style="border: none; padding: 0;">
        <img src="https://www.solidjs.com/img/logo/without-wordmark/logo.svg" alt="SolidJS" width="80" height="80">
      </td>
      <td align="center" style="border: none; padding: 0 20px; vertical-align: middle; font-size: 32px; font-weight: bold;">
        +
      </td>
      <td align="center" style="border: none; padding: 0;">
        <a href="https://g6.antv.antgroup.com/en" target="_blank">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" alt="AntV" width="80" height="80">
        </a>
      </td>
    </tr>
  </table>
</div>

<p align="center">
  <strong>Bringing together SolidJS reactivity with AntV G6's powerful graph visualization capabilities</strong>
</p>

A comprehensive graph visualization library for [SolidJS](https://www.solidjs.com/) built on top of [AntV G6](https://g6.antv.antgroup.com/). Create interactive, customizable graph visualizations with powerful layout algorithms and real-time controls.

To see the kinds of graphs you can create using G6, ckeck out their [Playground](https://g6.antv.antgroup.com/en/examples) page.

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Developer Experience](#️-developer-experience)
- [🚀 Roadmap & Future Enhancements](#-roadmap--future-enhancements)
- [📦 Installation](#-installation)
- [📚 Library Exports](#-library-exports)
- [⚡ Quick Start](#-quick-start)
- [🎮 Interactive Playground](#-interactive-playground)
- [🎨 Visual Elements](#-visual-elements)
  - [🔵 Nodes](#-nodes)
  - [🔗 Edges](#-edges)
  - [📦 Combos](#-combos)
  - [🖼️ Canvas](#️-canvas)
  - [🎯 Styling & Themes](#-styling--themes)
- [🎯 Supported Layouts](#-supported-layouts)
  - [⚡ Force-Directed Layouts](#-force-directed-layouts)
  - [🌳 Hierarchical Layouts](#-hierarchical-layouts)
  - [⭕ Circular Layouts](#-circular-layouts)
  - [📊 Grid & Specialized Layouts](#-grid--specialized-layouts)
  - [🔧 Custom Layouts](#-custom-layouts)
- [📖 API Reference](#-api-reference)
  - [Graph Component](#graph-component)
  - [Context API](#context-api)
  - [Utility Functions](#utility-functions)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

- **13+ Layout Algorithms**: Comprehensive collection of graph layout algorithms for different visualization needs
- **Real-time Controls**: Interactive parameter adjustment with immediate visual feedback
- **Physics Simulation**: Advanced force-directed layouts with customizable physics parameters
- **Clustering Support**: Built-in clustering capabilities for organizing related nodes
- **TypeScript Support**: Full type safety with comprehensive TypeScript definitions
- **Responsive Design**: Mobile-friendly layouts that adapt to different screen sizes
- **Educational Content**: Detailed explanations of algorithms and use cases
- **Performance Optimized**: Efficient rendering for large graphs with thousands of nodes
- **Extensible Architecture**: Easy to add custom layouts and behaviors
- **SolidJS Integration**: Leverages SolidJS reactivity for optimal performance

## 🛠️ Developer Experience

Solid G6 significantly enhances the developer experience when working with AntV G6 by providing:

### 🎯 **Enhanced Type Safety**

- **Generic Type Support**: Adds generics and data type inference that G6's TypeScript definitions lack
- **Cross-field Type Inference**: Utility functions automatically infer types across data structures and configurations
- **Enhanced IntelliSense**: Improved autocomplete that understands your specific data shapes
- **Type-safe Data Access**: Strong typing for node/edge/combo data properties throughout the API

### 🔧 **Simplified Configuration**

- **Utility Functions**: Type-safe helpers that eliminate guesswork and reduce boilerplate
- **Consistent Patterns**: Standardized approach to creating graphs, layouts, and styling
- **Composition-friendly**: Easy to compose and reuse configurations across your application
- **Zero Runtime Overhead**: All utilities are compile-time only - no bundle size impact

### 📚 **Improved Documentation**

- **Inline Documentation**: JSDoc comments with examples for every option and parameter
- **Type Definitions as Documentation**: Your IDE shows exactly what options are available
- **Real-world Examples**: Comprehensive playground with 13+ layout examples and use cases

### 🚀 **Productivity Benefits**

```tsx
// Before: G6 with TypeScript (lacks generics & data inference)
const graph = new G6Graph({
  container: containerRef,
  data: myData, // Basic typing, no data shape inference
  layout: { type: "force", gravity: 1 }, // Layout options typed, but not connected to data
  node: {
    style: {
      labelText: (d) => d.data?.label, // 'd.data' is 'unknown' - no autocomplete
    },
  },
});

// After: Solid G6 (adds generics & cross-field inference)
const data = createGraphData({
  nodes: [{ id: "1", data: { label: "Node 1", category: "important" } }],
  edges: [{ source: "1", target: "2" }],
});

const nodeConfig = createGraphNodeOptions<typeof data>({
  style: {
    labelText: (d) => d.data.label, // Full autocomplete - knows 'label' exists
    fill: (d) => (d.data.category === "important" ? "red" : "blue"), // 'category' typed
  },
});

<Graph data={data} node={nodeConfig} />;
```

**Result**: Builds upon G6's solid TypeScript foundation by adding the missing generics and data inference for a significantly improved developer experience.

## 🚀 Roadmap & Future Enhancements

### SolidJS JSX Custom Nodes (Coming Soon)

A [community-driven effort](https://github.com/antvis/G6/pull/7199) is underway to add `g6-extension-solid` (very much inspired by `g6-extension-react`) to the core G6 library, which will enable **Solid JSX-Powered Custom Nodes**

#### ✨ **Key Benefits**

- **True JSX Integration**: Use familiar SolidJS components for complex node designs
- **Fine-Grained Reactivity**: Leverage SolidJS's superior reactivity for real-time updates
- **Zero Virtual DOM Overhead**: Maximum performance with direct DOM manipulation
- **Component Reusability**: Share node components across different graphs
- **CSS-in-JS Support**: Full styling capabilities with your preferred CSS solution

#### 🎨 **Advanced Use Cases**

- **Rich Data Visualizations**: Embed charts, progress bars, and complex layouts within nodes
- **Interactive Elements**: Buttons, forms, and controls directly in graph nodes
- **Real-Time Data Binding**: Live updates without manual re-rendering
- **Responsive Node Design**: Nodes that adapt to zoom levels and screen sizes

This extension will make `@dschz/solid-g6` an even more powerful and flexible graph visualization library for SolidJS applications.

**Status**: 🚧 Work in Progress [G6 PR #7199](https://github.com/antvis/G6/pull/7199)

## 📦 Installation

### Install Dependencies

```bash
# Using npm
npm install @antv/g6 @dschz/solid-g6

# Using pnpm
pnpm install @antv/g6 @dschz/solid-g6

# Using yarn
yarn install @antv/g6 @dschz/solid-g6

# Using bun
bun install @antv/g6 @dschz/solid-g6
```

## 📚 Library Exports

Solid G6 provides a comprehensive set of components, utilities, and types for graph visualization:

### Core Components & Hooks

- **`Graph`** - Main graph visualization component
- **`useGraph`** - SolidJS hook for accessing graph context and methods

### Utility Functions (Type-Safe)

- **`createGraphData`** - Create type-safe graph data structures
- **`createGraphOptions`** - Configure complete graph options
- **`createGraphLayout`** - Set up layout algorithms with type inference
- **`createGraphBehaviors`** - Define interaction behaviors
- **`createGraphNodeOptions`** - Configure node styling and behavior
- **`createGraphEdgeOptions`** - Configure edge styling and behavior
- **`createGraphComboOptions`** - Configure combo (group) styling and behavior

### TypeScript Types

All TypeScript interfaces and types are exported for advanced usage scenarios, including `G6GraphData`, `G6GraphOptions`, `NodeData`, `EdgeData`, and layout-specific types.

## ⚡ Quick Start

```tsx
import { Graph, createGraphData } from "@dschz/solid-g6";
import { createSignal } from "solid-js";

function App() {
  const [graphData] = createSignal(
    createGraphData({
      nodes: [
        { id: "node1", data: { label: "Node 1" } },
        { id: "node2", data: { label: "Node 2" } },
        { id: "node3", data: { label: "Node 3" } },
      ],
      edges: [
        { source: "node1", target: "node2" },
        { source: "node2", target: "node3" },
      ],
    }),
  );

  return (
    <Graph
      data={graphData()}
      layout={{
        type: "force",
        gravity: 1,
        edgeStrength: 0.5,
        nodeStrength: -10,
      }}
      style={{ width: "800px", height: "600px" }}
    />
  );
}
```

## 🎮 Interactive Playground

**The best way to explore Solid G6 is through our comprehensive interactive playground!**

### 🚀 **Run Locally for Full Experience**

We **highly recommend** cloning the repository and running the playground locally to access:

- **Live Interactive Examples** - 13+ layout algorithms with real-time parameter controls
- **Complete Source Code** - View and copy implementation details for each example
- **Multiple Demo Scenarios** - Each layout includes 2-3 different use cases and data structures
- **Educational Content** - Algorithm explanations, physics concepts, and best practice guides
- **Responsive Testing** - See how layouts adapt to different screen sizes
- **Performance Insights** - Test with larger datasets and observe behavior

### 📥 **Get Started in 2 Minutes**

```bash
# Clone the repository
git clone https://github.com/dsnchz/solid-g6.git
cd solid-g6

# Install dependencies
bun install

# Start the playground
bun start

# Open http://localhost:3000 in your browser
```

### 🎯 **What You'll Find**

The playground includes comprehensive examples for:

- **Force-Directed Layouts** (4 types) - Physics simulations with clustering
- **Hierarchical Layouts** (2 types) - Tree structures and organizational charts
- **Circular Layouts** (3 types) - Radial arrangements and concentric circles
- **Grid-Based Layouts** (1 type) - Regular matrix arrangements
- **Specialized Layouts** (3 types) - MDS, Fishbone diagrams, and sequential flows

Each example features:

- 🎛️ **Interactive Controls** - Sliders, toggles, and dropdowns for real-time adjustment
- 📊 **Demo Scenarios** - Multiple pre-configured datasets showing different use cases
- 📖 **Algorithm Explanations** - Educational content about how each layout works
- 💾 **Copy-Ready Code** - Implementation snippets you can use directly
- 🔗 **Official Documentation Links** - Direct links to G6's layout documentation

### 💡 **Why Run Locally?**

While this README provides comprehensive information, the **interactive playground offers the most effective learning experience**:

- **Visual Learning** - See algorithms in action with your own data
- **Parameter Understanding** - Experiment with settings to understand their impact
- **Implementation Clarity** - Full source code with TypeScript types
- **Real-world Context** - Multiple scenarios showing practical applications

**Start exploring: `bun start` and visit `http://localhost:3000`** 🚀

## 🎨 Visual Elements

### 🔵 **Nodes**

Individual graph elements with comprehensive styling and interaction capabilities:

- **Built-in Shapes**: `circle`, `rect`, `ellipse`, `diamond`, `triangle`, `star`, `image`, `donut`, `3d-sphere`
- **Custom Node Types**: Create fully custom node renderers with unique shapes, behaviors, and interactions
- **Custom Styling**: Colors, sizes, borders, shadows, opacity, and CSS properties
- **Interactive States**: Hover, selected, disabled with automatic state management
- **Rich Labels**: Text positioning, formatting, multi-line support, and custom fonts
- **Data Binding**: Automatic visual mapping from node data properties

### 🔗 **Edges**

Connections between nodes with flexible routing and styling:

- **Edge Types**: `line`, `polyline`, `cubic`, `quadratic`, `cubic-horizontal`, `cubic-vertical`, `loop-edge`
- **Custom Edge Types**: Build custom edge renderers with unique routing algorithms and visual effects
- **Visual Styling**: Colors, thickness, dash patterns, opacity, and gradients
- **Smart Routing**: Automatic collision avoidance and optimal path calculation
- **Directional Flow**: Arrows, labels, and markers for directed relationships
- **Curved Connections**: Bezier curves and custom bend points for complex routing

### 📦 **Combos**

Grouping containers for organizing related nodes:

- **Flexible Grouping**: Logical organization of related nodes with visual boundaries
- **Custom Combo Types**: Design custom group containers with specialized layouts and behaviors
- **Interactive Management**: Expand/collapse, drag groups, and nested hierarchies
- **Custom Styling**: Background colors, borders, padding, and visual themes
- **Dynamic Updates**: Real-time group membership changes and visual updates
- **Label Support**: Group titles, descriptions, and metadata display

### 🖼️ **Canvas**

Rendering context and interaction surface:

- **Multiple Renderers**: SVG, Canvas, and WebGL rendering backends for different performance needs
- **Custom Canvas Types**: Implement specialized rendering engines or interaction layers
- **Zoom & Pan**: Built-in viewport controls with smooth animations and boundaries
- **Event Handling**: Comprehensive event system for mouse, touch, and keyboard interactions
- **Performance Optimization**: Automatic LOD (Level of Detail) and viewport culling

### 🎯 **Styling & Themes**

All elements support comprehensive customization:

```tsx
<Graph
  node={{
    style: { fill: "#1890ff", stroke: "#096dd9", lineWidth: 2 },
    labelStyle: { fontSize: 12, fontWeight: "bold" },
    state: {
      hover: { fill: "#40a9ff" },
      selected: { stroke: "#722ed1", lineWidth: 3 },
    },
  }}
  edge={{
    style: { stroke: "#d9d9d9", lineWidth: 1 },
    labelStyle: { background: "white", padding: [2, 4] },
  }}
  combo={{
    style: { fill: "#f0f0f0", stroke: "#d9d9d9" },
    labelStyle: { fontSize: 14, fontWeight: "bold" },
  }}
/>
```

**🎨 Explore Styling**: See all visual customization options in the [**interactive playground**](#-interactive-playground) with live style editors and preset themes.

## 🎯 Supported Layouts

Solid G6 supports 13+ built-in layout algorithms covering all major visualization patterns:

### ⚡ **Force-Directed Layouts**

- **`force`** - Classic physics simulation with gravity and clustering
- **`d3-force`** - Advanced D3 force system with 5 configurable force types
- **`forceAtlas2`** - High-performance algorithm for large networks
- **`fruchterman`** - Aesthetic force-directed with community detection

### 🌳 **Hierarchical Layouts**

- **`dagre`** - Directed graphs with sophisticated edge routing
- **`antv-dagre`** - Enhanced Dagre with improved visual appeal

### ⭕ **Circular Layouts**

- **`circular`** - Even distribution around a circle
- **`radial`** - Tree structures in concentric circles
- **`concentric`** - Multiple circles based on node properties

### 📊 **Grid & Specialized Layouts**

- **`grid`** - Regular matrix arrangement
- **`mds`** - Multidimensional scaling for similarity visualization
- **`fishbone`** - Cause-and-effect diagrams
- **`snake`** - Sequential flow arrangements

### 🔧 **Custom Layouts**

Register your own layout algorithms for specialized use cases:

```tsx
import { BaseLayout, register, type GraphData }
import { Graph } from "@dschz/solid-g6";

class DiagonalLayout extends BaseLayout {
  id = 'diagonal-layout';

  async execute(data: GraphData): Promise<GraphData> {
    const { nodes = [] } = data;
    return {
      nodes: nodes.map((node, index) => ({
        id: node.id,
        style: {
          x: 50 * index + 25,
          y: 50 * index + 25,
        },
      })),
    };
  }
}

// Register custom layout
register("diagonal-layout", DiagonalLayout);

// Use in graph
<Graph layout={{ type: "diagonal-layout", customParam: "value" }} />;
```

### 📚 **Interactive Examples**

Explore all layouts with live examples and controls in our [**interactive playground**](#-interactive-playground) - the best way to understand each algorithm's capabilities and use cases.

## 📖 API Reference

### Graph Component

The main component for rendering graphs.

```tsx
interface GraphProps<D extends G6GraphData = G6GraphData> {
  // Graph data
  data: D;

  // Layout configuration
  layout?: LayoutOptions;

  // Visual styling
  node?: NodeStyle;
  edge?: EdgeStyle;
  combo?: ComboStyle;

  // Event handlers
  events?: G6EventsMap;
  onInit?: (graph: G6Graph) => void;
  onReady?: (graph: G6Graph) => void;
  onDestroy?: () => void;

  // Container properties
  id?: string;
  class?: string;
  style?: JSX.CSSProperties;
}
```

### Context API

Access graph instance and data within components.

```tsx
import { useGraph } from "@dschz/solid-g6";

function GraphComponent() {
  const { graph, graphData, setGraphOptions } = useGraph();

  // Access graph instance
  const g = graph();

  // Get current data
  const data = graphData();

  // Update options
  await setGraphOptions({ layout: { type: "circular" } });
}
```

### Utility Functions

Solid G6 provides a comprehensive set of utility functions for type-safe graph creation and configuration. These utilities provide:

- **Type Safety**: Full TypeScript support with generic type inference
- **Consistency**: Standardized patterns across your application
- **Developer Experience**: Better autocomplete and error detection
- **Flexibility**: Easy composition and reusability

#### Core Utilities

```tsx
import {
  createGraphData,
  createGraphOptions,
  createGraphLayout,
  createGraphBehaviors,
  createGraphNodeOptions,
  createGraphEdgeOptions,
  createGraphComboOptions,
} from "@dschz/solid-g6";

// Create type-safe graph data
const data = createGraphData({
  nodes: [
    { id: "node1", data: { label: "Node 1", category: "important" } },
    { id: "node2", data: { label: "Node 2", category: "normal" } },
  ],
  edges: [{ source: "node1", target: "node2" }],
  combos: [{ id: "group1", data: { label: "Group 1" } }],
});

// Create layout configuration with type inference
const layout = createGraphLayout({
  type: "force",
  gravity: 1,
  clustering: true,
  clusterNodeStrength: -5,
});

// Create node styling with proper typing
const nodeConfig = createGraphNodeOptions<typeof data>({
  style: {
    fill: (node) => (node.data.category === "important" ? "#ff4d4f" : "#1890ff"),
    stroke: "#fff",
    r: 20,
    labelText: (node) => node.data.label,
  },
});

// Create edge styling
const edgeConfig = createGraphEdgeOptions<typeof data>({
  style: {
    stroke: "#e6f7ff",
    strokeWidth: 2,
  },
});

// Create interaction behaviors
const behaviors = createGraphBehaviors(["drag-canvas", "zoom-canvas", "drag-element"]);

// Combine into complete graph options
const graphOptions = createGraphOptions({
  data,
  layout,
  node: nodeConfig,
  edge: edgeConfig,
  behaviors,
});
```

#### Why Use Utility Functions?

1. **Type Safety**: Utilities provide full TypeScript support with generic type inference
2. **Consistency**: Standardized patterns ensure consistent configuration across your app
3. **Validation**: Runtime validation of configuration options (where applicable)
4. **Composition**: Easy to compose and reuse configurations
5. **IDE Support**: Better autocomplete, IntelliSense, and error detection
6. **Future-proof**: Updates to G6 options are handled through utility updates

### Types

Comprehensive TypeScript definitions for all components.

```tsx
interface G6GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
  combos?: ComboData[];
}

interface NodeData {
  id: string;
  data?: {
    label?: string;
    cluster?: string;
    size?: number;
    type?: string;
    [key: string]: any;
  };
}

interface EdgeData {
  source: string;
  target: string;
  data?: {
    weight?: number;
    label?: string;
    [key: string]: any;
  };
}
```

## 🎨 Styling & Theming

### Custom Node Styles

```tsx
<Graph
  node={{
    style: (node) => ({
      fill: getNodeColor(node),
      stroke: "#333",
      strokeWidth: 2,
      r: getNodeSize(node),
    }),
    labelText: (node) => node.data?.label,
    labelStyle: {
      fontSize: 12,
      fill: "#333",
      fontWeight: "bold",
    },
  }}
/>
```

### Edge Customization

```tsx
<Graph
  edge={{
    style: (edge) => ({
      stroke: getEdgeColor(edge),
      strokeWidth: getEdgeWidth(edge),
      strokeOpacity: 0.8,
    }),
    labelText: (edge) => edge.data?.label,
  }}
/>
```

## 🔧 Advanced Usage

### Custom Layout Implementation

```tsx
// Register custom layout
import { Graph, register } from "@dschz/solid-g6";

register("custom-layout", CustomLayoutAlgorithm);

// Use in graph
<Graph
  layout={{
    type: "custom-layout",
    customParam: "value",
  }}
/>;
```

### Dynamic Data Updates

```tsx
import { createGraphData } from "@dschz/solid-g6";

function DynamicGraph() {
  const [data, setData] = createSignal(
    createGraphData({
      nodes: [{ id: "node1", data: { label: "Initial Node" } }],
      edges: [],
    }),
  );

  // Update data reactively
  createEffect(() => {
    const newGraphData = createGraphData({
      nodes: [
        { id: "node1", data: { label: "Updated Node" } },
        { id: "node2", data: { label: "New Node" } },
      ],
      edges: [{ source: "node1", target: "node2" }],
    });
    setData(newGraphData);
  });

  return <Graph data={data()} />;
}
```

### Event Handling

```tsx
<Graph
  events={{
    "node:click": (event) => {
      console.log("Node clicked:", event.itemId);
    },
    "edge:hover": (event) => {
      console.log("Edge hovered:", event.itemId);
    },
    "canvas:drag": (event) => {
      console.log("Canvas dragged");
    },
  }}
/>
```

## 📱 Responsive Design

All layouts automatically adapt to different screen sizes:

```tsx
<Graph
  style={{
    width: "100%",
    height: "60vh",
    "min-width": "300px",
    "min-height": "400px",
  }}
  layout={{
    type: "force",
    // Layout automatically adjusts for container size
  }}
/>
```

## 🤝 Contributing

Code contributions are welcome! Please follow these guidelines:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/dsnchz/solid-g6.git

# Install dependencies
bun install

# Run playground app
bun start
```

### Code Quality

```bash
# Lint code
bun run lint

# Format code
bun run format

# Fix linting issues
bun run lint:fix

# Fix formatting issues
bun run format:fix
```

### Commit Guidelines

- Use [conventional commits](https://www.conventionalcommits.org/)
- Keep git history clean with rebasing
- Ensure CI checks pass before merging

### Adding New Layouts

1. Create layout example in `playground/pages/layouts/examples/`
2. Register in `LayoutExampleRegistry.ts`
3. Add comprehensive documentation
4. Include multiple demo scenarios
5. Add interactive controls
6. Update this README

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**[⬆ Back to Top](#-table-of-contents)**

Made with ❤️ using [SolidJS](https://solidjs.com) and [AntV G6](https://g6.antv.antgroup.com)

</div>
