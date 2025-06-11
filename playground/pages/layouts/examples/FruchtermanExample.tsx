import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

interface NodeData {
  cluster: string;
  label: string;
  size?: number;
}

export const FruchtermanExample = () => {
  // Interactive controls
  const [gravity, setGravity] = createSignal(6);
  const [speed, setSpeed] = createSignal(5);
  const [clustering, setClustering] = createSignal(true);
  const [clusterGravity, setClusterGravity] = createSignal(3);
  const [nodeClusterBy, setNodeClusterBy] = createSignal("cluster");

  // Layout mode selector
  const [layoutMode, setLayoutMode] = createSignal<"cluster" | "uniform" | "network">("cluster");

  // Generate different demo scenarios
  const createScenarioData = () => {
    switch (layoutMode()) {
      case "cluster":
        // Using the exact data from the user's example
        return createGraphData({
          nodes: [
            { id: "0", data: { cluster: "a", label: "a-0" } },
            { id: "1", data: { cluster: "a", label: "a-1" } },
            { id: "2", data: { cluster: "a", label: "a-2" } },
            { id: "3", data: { cluster: "a", label: "a-3" } },
            { id: "4", data: { cluster: "a", label: "a-4" } },
            { id: "5", data: { cluster: "b", label: "b-5" } },
            { id: "6", data: { cluster: "b", label: "b-6" } },
            { id: "7", data: { cluster: "b", label: "b-7" } },
            { id: "8", data: { cluster: "c", label: "c-8" } },
            { id: "9", data: { cluster: "c", label: "c-9" } },
            { id: "10", data: { cluster: "c", label: "c-10" } },
          ],
          edges: [
            { source: "0", target: "1" },
            { source: "0", target: "2" },
            { source: "0", target: "4" },
            { source: "0", target: "6" },
            { source: "2", target: "3" },
            { source: "2", target: "4" },
            { source: "3", target: "4" },
            { source: "5", target: "6" },
            { source: "6", target: "7" },
            { source: "7", target: "8" },
            { source: "8", target: "9" },
            { source: "8", target: "10" },
          ],
        });

      case "uniform":
        // Simple uniform distribution example
        return createGraphData({
          nodes: [
            { id: "0", data: { cluster: "all", label: "Node 0" } },
            { id: "1", data: { cluster: "all", label: "Node 1" } },
            { id: "2", data: { cluster: "all", label: "Node 2" } },
            { id: "3", data: { cluster: "all", label: "Node 3" } },
            { id: "4", data: { cluster: "all", label: "Node 4" } },
            { id: "5", data: { cluster: "all", label: "Node 5" } },
            { id: "6", data: { cluster: "all", label: "Node 6" } },
            { id: "7", data: { cluster: "all", label: "Node 7" } },
            { id: "8", data: { cluster: "all", label: "Node 8" } },
            { id: "9", data: { cluster: "all", label: "Node 9" } },
            { id: "10", data: { cluster: "all", label: "Node 10" } },
          ],
          edges: [
            { source: "0", target: "1" },
            { source: "0", target: "2" },
            { source: "0", target: "3" },
            { source: "0", target: "4" },
            { source: "0", target: "7" },
            { source: "0", target: "8" },
            { source: "0", target: "9" },
            { source: "0", target: "10" },
            { source: "2", target: "3" },
            { source: "4", target: "5" },
            { source: "4", target: "6" },
            { source: "5", target: "6" },
            { source: "9", target: "10" },
          ],
        });

      case "network":
        // More complex network with departments
        return createGraphData({
          nodes: [
            { id: "ceo", data: { cluster: "executive", label: "CEO", size: 40 } },
            { id: "cto", data: { cluster: "executive", label: "CTO", size: 35 } },
            { id: "cfo", data: { cluster: "executive", label: "CFO", size: 35 } },

            { id: "eng1", data: { cluster: "engineering", label: "Senior Engineer", size: 30 } },
            { id: "eng2", data: { cluster: "engineering", label: "Frontend Dev", size: 25 } },
            { id: "eng3", data: { cluster: "engineering", label: "Backend Dev", size: 25 } },
            { id: "eng4", data: { cluster: "engineering", label: "DevOps", size: 25 } },

            { id: "des1", data: { cluster: "design", label: "Design Lead", size: 30 } },
            { id: "des2", data: { cluster: "design", label: "UX Designer", size: 25 } },
            { id: "des3", data: { cluster: "design", label: "UI Designer", size: 25 } },

            { id: "mkt1", data: { cluster: "marketing", label: "Marketing Dir", size: 30 } },
            { id: "mkt2", data: { cluster: "marketing", label: "Content Writer", size: 20 } },
            { id: "mkt3", data: { cluster: "marketing", label: "Social Media", size: 20 } },

            { id: "fin1", data: { cluster: "finance", label: "Accountant", size: 25 } },
            { id: "fin2", data: { cluster: "finance", label: "Analyst", size: 20 } },
          ],
          edges: [
            // Executive connections
            { source: "ceo", target: "cto" },
            { source: "ceo", target: "cfo" },
            { source: "ceo", target: "mkt1" },

            // Engineering team
            { source: "cto", target: "eng1" },
            { source: "eng1", target: "eng2" },
            { source: "eng1", target: "eng3" },
            { source: "eng1", target: "eng4" },
            { source: "eng2", target: "eng3" },

            // Design team
            { source: "cto", target: "des1" },
            { source: "des1", target: "des2" },
            { source: "des1", target: "des3" },

            // Marketing team
            { source: "mkt1", target: "mkt2" },
            { source: "mkt1", target: "mkt3" },

            // Finance team
            { source: "cfo", target: "fin1" },
            { source: "fin1", target: "fin2" },

            // Cross-department collaboration
            { source: "eng2", target: "des2" }, // Frontend-UX collaboration
            { source: "des1", target: "mkt1" }, // Design-Marketing collaboration
          ],
        });

      default:
        return createGraphData({ nodes: [], edges: [] });
    }
  };

  const scenarioData = createMemo(() => createScenarioData());

  // Get cluster colors
  const getClusterColor = (cluster: string) => {
    const colors: Record<string, string> = {
      a: "#ff4d4f", // Red - Cluster A
      b: "#1890ff", // Blue - Cluster B
      c: "#52c41a", // Green - Cluster C
      all: "#8c8c8c", // Gray - Uniform
      executive: "#722ed1", // Purple - Executive
      engineering: "#ff4d4f", // Red - Engineering
      design: "#1890ff", // Blue - Design
      marketing: "#52c41a", // Green - Marketing
      finance: "#faad14", // Orange - Finance
    };
    return colors[cluster] || "#8c8c8c";
  };

  return (
    <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn about Fruchterman force-directed algorithm with clustering support, gravity
          parameters, and equilibrium-based positioning for aesthetic graph layouts.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/fruchterman-layout"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 Fruchterman Layout Guide
          <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      {/* Layout Mode Selector */}
      <div class="mb-4 p-3 bg-gray-50 rounded">
        <label class="text-xs font-medium text-gray-700 mb-2 block">Layout Scenario</label>
        <select
          value={layoutMode()}
          onChange={(e) => setLayoutMode(e.target.value as "cluster" | "uniform" | "network")}
          class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
        >
          <option value="cluster">Cluster Layout (A, B, C Groups)</option>
          <option value="uniform">Uniform Distribution</option>
          <option value="network">Company Organization</option>
        </select>
      </div>

      {/* Interactive Controls */}
      <div class="space-y-4 mb-4 p-3 bg-gray-50 rounded">
        {/* Basic Forces */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">⚡ Force Parameters</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Gravity (Central Force): {gravity()}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={gravity()}
                onInput={(e) => setGravity(parseInt(e.target.value))}
                class="text-xs"
              />
              <span class="text-xs text-gray-500 mt-1">
                Higher values create more compact layouts
              </span>
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Speed (Movement Rate): {speed()}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={speed()}
                onInput={(e) => setSpeed(parseInt(e.target.value))}
                class="text-xs"
              />
              <span class="text-xs text-gray-500 mt-1">
                Controls how fast nodes move per iteration
              </span>
            </div>
          </div>
        </div>

        {/* Clustering Controls */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">🎯 Clustering Options</h6>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center">
              <label class="flex items-center text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={clustering()}
                  onChange={(e) => setClustering(e.target.checked)}
                  class="mr-2"
                />
                Enable Clustering
              </label>
            </div>

            {clustering() && (
              <>
                <div class="flex flex-col">
                  <label class="text-xs font-medium text-gray-700 mb-1">
                    Cluster Gravity: {clusterGravity()}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={clusterGravity()}
                    onInput={(e) => setClusterGravity(parseFloat(e.target.value))}
                    class="text-xs"
                  />
                  <span class="text-xs text-gray-500 mt-1">Force within clusters</span>
                </div>

                <div class="flex flex-col">
                  <label class="text-xs font-medium text-gray-700 mb-1">Cluster Field</label>
                  <select
                    value={nodeClusterBy()}
                    onChange={(e) => setNodeClusterBy(e.target.value)}
                    class="px-2 py-1 border border-gray-300 rounded text-xs"
                  >
                    <option value="cluster">cluster</option>
                    <option value="group">group</option>
                    <option value="category">category</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={scenarioData()}
            width={700}
            height={500}
            autoFit="center"
            layout={{
              type: "fruchterman",
              gravity: gravity(),
              speed: speed(),
              clustering: clustering(),
              nodeClusterBy: nodeClusterBy(),
              clusterGravity: clusterGravity(),
            }}
            node={{
              style: (d) => ({
                fill: getClusterColor((d.data?.cluster as string) || "default"),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: (d.data as NodeData)?.size || 20,
                labelText: d.data?.label as string,
                labelFill: "#ffffff",
                labelFontSize: 10,
                labelFontWeight: "bold",
                labelPlacement: "center",
              }),
            }}
            edge={{
              style: {
                stroke: "#666666",
                lineWidth: 1.5,
                strokeOpacity: 0.6,
                endArrow: layoutMode() === "network",
                endArrowSize: 8,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Algorithm Information */}
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span class="text-blue-400 text-lg">🔬</span>
          </div>
          <div class="ml-3">
            <h4 class="text-blue-800 font-semibold mb-2">How Fruchterman Algorithm Works</h4>
            <p class="text-blue-800 text-sm">
              The Fruchterman-Reingold algorithm simulates physical forces between nodes to reach
              aesthetic equilibrium. Gravity pulls all nodes toward the center, while repulsive and
              attractive forces balance node spacing. When clustering is enabled, additional cluster
              gravity keeps related nodes grouped together.
            </p>
          </div>
        </div>
      </div>

      {/* Features & Configuration */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">✨ Fruchterman Features</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>
              • <strong>Force-Directed:</strong> Physics-based node positioning
            </li>
            <li>
              • <strong>Clustering Support:</strong> Groups nodes by data attributes
            </li>
            <li>
              • <strong>Aesthetic Balance:</strong> Optimized for visual appeal
            </li>
            <li>
              • <strong>Stable Equilibrium:</strong> Reaches minimal energy state
            </li>
            <li>
              • <strong>Flexible Parameters:</strong> Gravity and speed control
            </li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-purple-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-purple-800 space-y-1">
            <li>
              • Mode:{" "}
              {layoutMode() === "cluster"
                ? "Cluster Layout"
                : layoutMode() === "uniform"
                  ? "Uniform Distribution"
                  : "Company Network"}
            </li>
            <li>• Gravity: {gravity()}</li>
            <li>• Speed: {speed()}</li>
            <li>• Clustering: {clustering() ? "Enabled" : "Disabled"}</li>
            {clustering() && <li>• Cluster Gravity: {clusterGravity()}</li>}
            <li>• Total Nodes: {scenarioData()?.nodes?.length || 0}</li>
          </ul>
        </div>
      </div>

      {/* Cluster Legend */}
      {layoutMode() !== "uniform" && (
        <div class="mb-4">
          <h5 class="text-xs font-semibold text-gray-900 mb-2">🎨 Cluster Legend</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <For
              each={
                layoutMode() === "cluster"
                  ? [
                      { cluster: "a", color: "#ff4d4f", label: "Cluster A", desc: "Group A nodes" },
                      { cluster: "b", color: "#1890ff", label: "Cluster B", desc: "Group B nodes" },
                      { cluster: "c", color: "#52c41a", label: "Cluster C", desc: "Group C nodes" },
                    ]
                  : [
                      {
                        cluster: "executive",
                        color: "#722ed1",
                        label: "Executive",
                        desc: "Leadership team",
                      },
                      {
                        cluster: "engineering",
                        color: "#ff4d4f",
                        label: "Engineering",
                        desc: "Technical team",
                      },
                      {
                        cluster: "design",
                        color: "#1890ff",
                        label: "Design",
                        desc: "Creative team",
                      },
                      {
                        cluster: "marketing",
                        color: "#52c41a",
                        label: "Marketing",
                        desc: "Growth team",
                      },
                      {
                        cluster: "finance",
                        color: "#faad14",
                        label: "Finance",
                        desc: "Business ops",
                      },
                    ]
              }
            >
              {(item) => (
                <div class="flex items-start text-xs bg-white rounded border p-2">
                  <div
                    class="w-3 h-3 rounded-full mr-2 flex-shrink-0 mt-0.5"
                    style={{ "background-color": item.color }}
                  />
                  <div class="flex flex-col">
                    <span class="font-semibold text-gray-900">{item.label}</span>
                    <span class="text-gray-600">{item.desc}</span>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      )}

      {/* Use Cases */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">💡 Perfect For</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              {
                icon: "🌐",
                title: "Network Topology",
                desc: "Clear visualization of network connections",
              },
              {
                icon: "🧠",
                title: "Knowledge Graphs",
                desc: "Concept relationships and semantic networks",
              },
              {
                icon: "👥",
                title: "Community Detection",
                desc: "Social groups and cluster visualization",
              },
              {
                icon: "🏢",
                title: "Organization Charts",
                desc: "Department clustering and hierarchies",
              },
              {
                icon: "📊",
                title: "Academic Papers",
                desc: "Clean, publication-ready layouts",
              },
              {
                icon: "🔬",
                title: "Scientific Models",
                desc: "Biological and chemical networks",
              },
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
          <code>{`import { Graph, createGraphData } from "@dschz/solid-g6";

// Create cluster-based data (from G6 docs example)
const clusterData = createGraphData({
  nodes: [
    { id: "0", data: { cluster: "a", label: "a-0" } },
    { id: "1", data: { cluster: "a", label: "a-1" } },
    { id: "2", data: { cluster: "a", label: "a-2" } },
    { id: "5", data: { cluster: "b", label: "b-5" } },
    { id: "6", data: { cluster: "b", label: "b-6" } },
    { id: "8", data: { cluster: "c", label: "c-8" } },
    // ... more nodes
  ],
  edges: [
    { source: "0", target: "1" },
    { source: "0", target: "2" },
    { source: "5", target: "6" },
    // ... more edges
  ]
});

export const FruchtermanCluster = () => (
  <Graph
    data={clusterData}
    width={700}
    height={500}
    autoFit="center"
    layout={{
      type: "fruchterman",
      gravity: ${gravity()},                    // Central attraction force
      speed: ${speed()},                        // Node movement speed per iteration
      clustering: ${clustering()},              // Enable cluster layout
      nodeClusterBy: "${nodeClusterBy()}",      // Field name for clustering
      clusterGravity: ${clusterGravity()},      // Within-cluster attraction
    }}
    node={{
      style: (d) => ({
        fill: getClusterColor(d.data?.cluster),
        labelText: d.data?.label,
        labelFill: "#fff",
        labelFontWeight: "bold",
        labelPlacement: "center",
      })
    }}
    edge={{
      style: {
        stroke: "#666666",
        endArrow: true,                        // Show direction arrows
      }
    }}
    behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
  />
);`}</code>
        </pre>
      </div>
    </div>
  );
};
