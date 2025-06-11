import { createSignal, For, Show, Suspense } from "solid-js";

import {
  getLayoutExample,
  hasExample,
  type LayoutExampleType,
} from "./layouts/LayoutExampleRegistry";

export const Layouts = () => {
  const [activeExample, setActiveExample] = createSignal<LayoutExampleType | null>(null);

  // Available layout types with descriptions and use cases
  const layoutCategories = [
    {
      category: "Force-Directed",
      description: "Physics-based layouts that simulate forces between nodes",
      icon: "⚡",
      layouts: [
        {
          type: "force",
          name: "Force",
          description: "Basic force-directed layout with configurable forces",
          useCase: "General network visualization, social graphs",
          complexity: "Medium",
          performance: "Good",
          bestFor: ["Small to medium networks", "Interactive exploration", "General purpose"],
        },
        {
          type: "d3-force",
          name: "D3 Force",
          description: "Advanced D3-based force simulation with multiple force types",
          useCase: "Complex network analysis, interactive simulations",
          complexity: "High",
          performance: "Good",
          bestFor: ["Complex force configurations", "Custom force types", "Advanced interactions"],
        },
        {
          type: "fruchterman",
          name: "Fruchterman-Reingold",
          description: "Classic force-directed algorithm optimized for aesthetic layouts",
          useCase: "Academic papers, clean network visualizations",
          complexity: "Medium",
          performance: "Good",
          bestFor: ["Aesthetic layouts", "Academic visualizations", "Balanced distributions"],
        },
        {
          type: "force-atlas2",
          name: "ForceAtlas2",
          description: "Gephi-inspired layout for large networks with community detection",
          useCase: "Large social networks, community analysis",
          complexity: "High",
          performance: "Excellent",
          bestFor: ["Large networks", "Community detection", "Social network analysis"],
        },
      ],
    },
    {
      category: "Hierarchical",
      description: "Tree-like structures with clear parent-child relationships",
      icon: "🌳",
      layouts: [
        {
          type: "dagre",
          name: "Dagre",
          description: "Directed acyclic graph layout with automatic edge routing",
          useCase: "Flowcharts, decision trees, process diagrams",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Flowcharts", "Org charts", "Process flows", "Dependencies"],
        },
        {
          type: "antv-dagre",
          name: "AntV Dagre",
          description: "Enhanced dagre with improved visual appeal and customization",
          useCase: "Professional diagrams, documentation",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Professional diagrams", "Documentation", "Clean hierarchies"],
        },
      ],
    },
    {
      category: "Circular",
      description: "Nodes arranged in circular or radial patterns",
      icon: "🔄",
      layouts: [
        {
          type: "circular",
          name: "Circular",
          description: "Nodes arranged in a perfect circle",
          useCase: "Cycle visualization, equal importance networks",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Cycle detection", "Equal relationships", "Simple networks"],
        },
        {
          type: "radial",
          name: "Radial",
          description: "Tree-like structure arranged radially around a center",
          useCase: "Organizational charts, family trees",
          complexity: "Medium",
          performance: "Good",
          bestFor: ["Hierarchical radial", "Family trees", "Organization charts"],
        },
        {
          type: "concentric",
          name: "Concentric",
          description: "Nodes arranged in concentric circles based on properties",
          useCase: "Importance-based visualization, layered networks",
          complexity: "Medium",
          performance: "Good",
          bestFor: ["Importance visualization", "Layered data", "Priority-based layouts"],
        },
      ],
    },
    {
      category: "Grid-Based",
      description: "Structured layouts with regular patterns",
      icon: "🔲",
      layouts: [
        {
          type: "grid",
          name: "Grid",
          description: "Nodes arranged in a regular grid pattern",
          useCase: "Matrix visualization, regular data display",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Matrix data", "Regular patterns", "Consistent spacing"],
        },
      ],
    },
    {
      category: "Specialized",
      description: "Layouts for specific use cases and data types",
      icon: "🎯",
      layouts: [
        {
          type: "mds",
          name: "MDS (Multidimensional Scaling)",
          description: "Projects high-dimensional data into 2D while preserving distances",
          useCase: "Data analysis, dimensionality reduction",
          complexity: "High",
          performance: "Medium",
          bestFor: ["High-dimensional data", "Distance preservation", "Data analysis"],
        },
        {
          type: "fishbone",
          name: "Fishbone",
          description: "Specialized layout for cause-and-effect diagrams",
          useCase: "Root cause analysis, problem solving",
          complexity: "Medium",
          performance: "Good",
          bestFor: ["Cause-effect diagrams", "Problem analysis", "Structured brainstorming"],
        },
        {
          type: "snake",
          name: "Snake",
          description: "Sequential layout that follows a snake-like pattern",
          useCase: "Timeline visualization, sequential processes",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Timeline data", "Sequential processes", "Linear flows"],
        },
        {
          type: "random",
          name: "Random",
          description: "Randomly positioned nodes for initial placement",
          useCase: "Starting point for other layouts, testing",
          complexity: "Low",
          performance: "Excellent",
          bestFor: ["Initial positioning", "Testing", "Random sampling"],
        },
      ],
    },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div class="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Graph Layouts</h1>
          <p class="text-lg text-gray-600 mb-6">
            Explore the complete collection of layout algorithms available in Solid G6. Each layout
            is optimized for different data types and use cases.
          </p>
        </div>

        {/* Layout Categories */}
        <div class="space-y-8">
          <For each={layoutCategories}>
            {(category) => (
              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">{category.icon}</span>
                  <div>
                    <h2 class="text-2xl font-semibold text-gray-900">{category.category}</h2>
                    <p class="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                  <For each={category.layouts}>
                    {(layout) => (
                      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden min-w-0">
                        <div class="flex items-start justify-between mb-3">
                          <h3 class="text-lg font-semibold text-gray-900 flex-1 pr-2 break-words">
                            {layout.name}
                          </h3>
                          <code class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 flex-shrink-0">
                            {layout.type}
                          </code>
                        </div>

                        <p class="text-gray-700 text-sm mb-3 break-words">{layout.description}</p>

                        <div class="space-y-2 mb-4 flex-1">
                          <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span class="text-xs font-medium text-gray-500 flex-shrink-0">
                              USE CASE:
                            </span>
                            <span class="text-xs text-gray-700 break-words">{layout.useCase}</span>
                          </div>

                          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div class="flex items-center gap-2">
                              <span class="text-xs font-medium text-gray-500 flex-shrink-0">
                                COMPLEXITY:
                              </span>
                              <span
                                class={`text-xs px-2 py-1 rounded ${getComplexityColor(layout.complexity)}`}
                              >
                                {layout.complexity}
                              </span>
                            </div>

                            <div class="flex items-center gap-2">
                              <span class="text-xs font-medium text-gray-500 flex-shrink-0">
                                PERFORMANCE:
                              </span>
                              <span
                                class={`text-xs px-2 py-1 rounded ${getPerformanceColor(layout.performance)}`}
                              >
                                {layout.performance}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="mb-4 min-w-0">
                          <span class="text-xs font-medium text-gray-500 block mb-1">
                            BEST FOR:
                          </span>
                          <div class="flex flex-wrap gap-1 overflow-hidden">
                            <For each={layout.bestFor}>
                              {(use) => (
                                <span class="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded break-all max-w-full inline-block">
                                  {use}
                                </span>
                              )}
                            </For>
                          </div>
                        </div>

                        {hasExample(layout.type) ? (
                          <div class="mt-auto">
                            <button
                              onClick={() =>
                                setActiveExample(
                                  activeExample() === layout.type
                                    ? null
                                    : (layout.type as LayoutExampleType),
                                )
                              }
                              class="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                            >
                              {activeExample() === layout.type
                                ? "🔼 Hide Example"
                                : "🔧 Try Interactive Example"}
                            </button>
                            <Show when={activeExample() === layout.type}>
                              <Suspense
                                fallback={
                                  <div class="mt-4 p-4 text-center text-gray-500 text-sm">
                                    Loading example...
                                  </div>
                                }
                              >
                                {(() => {
                                  const ExampleComponent = getLayoutExample(
                                    layout.type as LayoutExampleType,
                                  );
                                  return <ExampleComponent />;
                                })()}
                              </Suspense>
                            </Show>
                          </div>
                        ) : (
                          <button
                            class="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm mt-auto"
                            disabled
                          >
                            📋 Detailed Example (Coming Soon)
                          </button>
                        )}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Quick Start Guide */}
        <div class="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🚀 Quick Start Guide</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Basic Layout Usage</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto min-w-0">
                <code class="whitespace-pre-wrap break-words">
                  {`import { Graph, createGraphData } from "@dschz/solid-g6";

export const MyGraph = () => {
  const data = createGraphData({
    nodes: [/* your nodes */],
    edges: [/* your edges */]
  });

  return (
    <Graph
      data={data}
      width={600}
      height={400}
      layout={{
        type: "dagre",
        rankdir: "TB",
        nodesep: 50,
        ranksep: 80,
      }}
    />
  );
};`}
                </code>
              </pre>
            </div>

            <div class="min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">External Configuration</h3>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto min-w-0">
                <code class="whitespace-pre-wrap break-words">{`import { 
  Graph, 
  createGraphData, 
  createGraphLayout 
} from "@dschz/solid-g6";

const layoutConfig = createGraphLayout<MyNodeType>({
  type: "force",
  linkDistance: 100,
  nodeStrength: 300,
  alpha: 0.3,
});

export const MyGraph = () => (
  <Graph
    data={data}
    layout={layoutConfig}
  />
);`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Layout Selection Guide */}
        <div class="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">🎯 Choosing the Right Layout</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center p-4">
              <div class="text-4xl mb-3">🚀</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Getting Started?</h3>
              <p class="text-gray-600 text-sm mb-3 break-words">
                Start with <strong>Dagre</strong> for hierarchical data or <strong>Force</strong>{" "}
                for network data
              </p>
              <div class="flex gap-2 justify-center flex-wrap">
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">dagre</span>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">force</span>
              </div>
            </div>

            <div class="text-center p-4">
              <div class="text-4xl mb-3">📊</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Large Datasets?</h3>
              <p class="text-gray-600 text-sm mb-3 break-words">
                Use <strong>Grid</strong> for matrices or <strong>ForceAtlas2</strong> for networks
              </p>
              <div class="flex gap-2 justify-center flex-wrap">
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">grid</span>
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded break-words">
                  force-atlas2
                </span>
              </div>
            </div>

            <div class="text-center p-4 md:col-span-2 lg:col-span-1">
              <div class="text-4xl mb-3">🎨</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Specialized Needs?</h3>
              <p class="text-gray-600 text-sm mb-3 break-words">
                Try <strong>Circular</strong> for cycles or <strong>MDS</strong> for data analysis
              </p>
              <div class="flex gap-2 justify-center flex-wrap">
                <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  circular
                </span>
                <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">mds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
