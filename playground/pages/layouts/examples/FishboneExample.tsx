import { treeToGraphData } from "@antv/g6";
import { createMemo, createSignal, For } from "solid-js";

import { Graph } from "../../../../src";

export const FishboneExample = () => {
  // Interactive controls
  const [ribSep, setRibSep] = createSignal(60);
  const [nodeSize, setNodeSize] = createSignal(8);
  const [fontSize, setFontSize] = createSignal(10);
  const [showSubCategories, setShowSubCategories] = createSignal(false);

  // Get depth-based colors for visual hierarchy
  const getDepthColor = (depth: number) => {
    switch (depth) {
      case 0:
        return "#ff4d4f"; // Red - Root problem
      case 1:
        return "#1890ff"; // Blue - Main categories
      case 2:
        return "#52c41a"; // Green - Subcategories
      default:
        return "#8c8c8c"; // Gray - Default
    }
  };

  // Create fishbone data using our local treeToGraphData implementation
  const createFishboneData = () => {
    if (showSubCategories()) {
      return treeToGraphData({
        id: "quality",
        label: "Website\nPerformance",
        children: [
          {
            id: "server",
            label: "Server",
            children: [
              { id: "hardware", label: "Hardware" },
              { id: "database", label: "Database" },
            ],
          },
          {
            id: "code",
            label: "Code",
            children: [
              { id: "algorithms", label: "Algorithms" },
              { id: "memory", label: "Memory" },
            ],
          },
          {
            id: "network",
            label: "Network",
            children: [
              { id: "cdn", label: "CDN" },
              { id: "bandwidth", label: "Bandwidth" },
            ],
          },
          {
            id: "content",
            label: "Content",
            children: [
              { id: "images", label: "Images" },
              { id: "scripts", label: "Scripts" },
            ],
          },
          { id: "browser", label: "Browser" },
          { id: "monitoring", label: "Monitoring" },
        ],
      });
    }

    // Basic fishbone structure
    return treeToGraphData({
      id: "quality",
      label: "Website\nPerformance",
      children: [
        { id: "server", label: "Server" },
        { id: "code", label: "Code" },
        { id: "network", label: "Network" },
        { id: "content", label: "Content" },
        { id: "browser", label: "Browser" },
        { id: "monitoring", label: "Monitoring" },
      ],
    });
  };

  const fishboneData = createMemo(() => createFishboneData());

  return (
    <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn more about Fishbone layout configuration options, use cases, and examples for
          cause-and-effect analysis.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/fishbone"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 Fishbone Layout Guide
          <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      {/* Interactive Controls */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded">
        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Rib Separation: {ribSep()}px</label>
          <input
            type="range"
            min="40"
            max="120"
            step="10"
            value={ribSep()}
            onInput={(e) => setRibSep(parseInt(e.target.value))}
            class="text-xs"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Node Size: {nodeSize()}px</label>
          <input
            type="range"
            min="6"
            max="12"
            step="1"
            value={nodeSize()}
            onInput={(e) => setNodeSize(parseInt(e.target.value))}
            class="text-xs"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Font Size: {fontSize()}px</label>
          <input
            type="range"
            min="8"
            max="12"
            step="1"
            value={fontSize()}
            onInput={(e) => setFontSize(parseInt(e.target.value))}
            class="text-xs"
          />
        </div>

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={showSubCategories()}
              onChange={(e) => setShowSubCategories(e.target.checked)}
              class="mr-2"
            />
            Show Details
          </label>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={fishboneData()}
            width={700}
            height={500}
            layout={{
              type: "fishbone",
              getRibSep: () => ribSep(),
            }}
            node={{
              style: (d) => ({
                fill: getDepthColor((d.data?.depth as number) || 0),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: nodeSize(),
                labelText: d.data?.label as string,
                labelFill: "#ffffff",
                labelFontSize: fontSize(),
                labelFontWeight: "bold",
                labelPlacement: "center",
              }),
            }}
            edge={{
              type: "polyline",
              style: {
                stroke: "#1890ff",
                lineWidth: 3,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Layout Features */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">🐟 Fishbone Features</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>
              • <strong>Hierarchical Structure:</strong> Clear cause-effect relationships
            </li>
            <li>
              • <strong>Rib Separation:</strong> Customizable spacing between branches
            </li>
            <li>
              • <strong>Polyline Edges:</strong> Official G6 pattern for fishbone
            </li>
            <li>
              • <strong>Root Cause Analysis:</strong> Perfect for problem-solving workflows
            </li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>• Rib separation: {ribSep()}px</li>
            <li>• Node size: {nodeSize()}px radius</li>
            <li>• Font size: {fontSize()}px</li>
            <li>• Detail level: {showSubCategories() ? "Full details" : "Main categories only"}</li>
            <li>• Total nodes: {fishboneData()?.nodes?.length || 0}</li>
          </ul>
        </div>
      </div>

      {/* Problem Analysis Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🔍 Root Cause Analysis Hierarchy</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              {
                depth: 0,
                color: "#ff4d4f",
                label: "Root Problem",
                description: "Main issue to solve",
              },
              {
                depth: 1,
                color: "#1890ff",
                label: "Main Categories",
                description: "Primary cause areas",
              },
              {
                depth: 2,
                color: "#52c41a",
                label: "Subcategories",
                description: "Specific problem areas",
              },
            ]}
          >
            {(item) => (
              <div class="flex items-start text-xs bg-white rounded border p-2">
                <div
                  class="w-3 h-3 rounded-full mr-2 flex-shrink-0 mt-0.5"
                  style={{ "background-color": item.color }}
                />
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-900">{item.label}</span>
                  <span class="text-gray-600">{item.description}</span>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Use Cases */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">💡 Perfect For</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              { icon: "🔧", title: "Quality Control", desc: "Manufacturing defect analysis" },
              { icon: "🚨", title: "Incident Response", desc: "System failure investigation" },
              { icon: "📊", title: "Business Analysis", desc: "Performance problem solving" },
              { icon: "🏥", title: "Risk Assessment", desc: "Healthcare & safety analysis" },
              { icon: "🎯", title: "Project Management", desc: "Delivery issue identification" },
              { icon: "🧠", title: "Team Brainstorming", desc: "Structured problem exploration" },
            ]}
          >
            {(useCase) => (
              <div class="flex items-start text-xs bg-gray-50 rounded p-2">
                <span class="mr-2 text-base">{useCase.icon}</span>
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-900">{useCase.title}</span>
                  <span class="text-gray-600">{useCase.desc}</span>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Code Example */}
      <div>
        <h5 class="text-xs font-semibold text-gray-900 mb-2">📄 Code Example</h5>
        <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
          <code>{`import { treeToGraphData, type TreeDataGetter } from "@dsnchz/solid-g6";

// Basic usage
const fishboneData = treeToGraphData({
  id: "quality",
  label: "Website Performance",
  children: [
    { id: "server", label: "Server" },
    { id: "code", label: "Code" },
    // ... more categories
  ]
});

// Advanced usage with custom getter
const customGetter: TreeDataGetter = {
  getNodeData: (datum, depth) => ({
    id: datum.id,
    data: { 
      label: datum.label,
      depth,
      category: depth === 0 ? 'root' : 'branch'
    }
  }),
  getEdgeData: (source, target) => ({
    source: source.id,
    target: target.id,
    data: { weight: 1 }
  })
};

const customFishboneData = treeToGraphData(treeData, customGetter);

<Graph
  data={fishboneData}
  layout={{
    type: "fishbone",
    getRibSep: () => ${ribSep()},        // Spacing between ribs/branches
  }}
  node={{
    style: (d) => ({
      fill: getDepthColor(d.data?.depth),
      radius: ${nodeSize()},
      labelText: d.data?.label,
      labelFontSize: ${fontSize()},
    })
  }}
  edge={{
    type: "polyline",             // Required for fishbone
    style: {
      stroke: "#1890ff",
      lineWidth: 3,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
