import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

interface NodeData {
  cluster?: string;
  label: string;
  size?: number;
  type?: string;
}

export const ForceExample = () => {
  // Physics controls
  const [gravity, setGravity] = createSignal(10);
  const [edgeStrength, setEdgeStrength] = createSignal(50);
  const [nodeStrength, setNodeStrength] = createSignal(1000);
  const [linkDistance, setLinkDistance] = createSignal(200);
  const [coulombDisScale, setCoulombDisScale] = createSignal(0.005);
  const [damping, setDamping] = createSignal(0.9);

  // Layout controls
  const [preventOverlap, setPreventOverlap] = createSignal(true);
  const [nodeSpacing, setNodeSpacing] = createSignal(10);
  const [maxSpeed, setMaxSpeed] = createSignal(200);
  const [interval, setInterval] = createSignal(0.02);

  // Clustering controls
  const [clustering, setClustering] = createSignal(false);
  const [leafCluster, setLeafCluster] = createSignal(false);
  const [clusterNodeStrength, setClusterNodeStrength] = createSignal(20);

  // Demo scenarios
  const [scenario, setScenario] = createSignal<"basic" | "cluster" | "hierarchy">("basic");

  // Generate different demo scenarios
  const createScenarioData = () => {
    switch (scenario()) {
      case "basic":
        // Simple network for basic force demonstration
        return createGraphData({
          nodes: [
            { id: "center", data: { label: "Central Hub", size: 40, type: "hub" } },
            { id: "node1", data: { label: "Node 1", size: 25, type: "regular" } },
            { id: "node2", data: { label: "Node 2", size: 25, type: "regular" } },
            { id: "node3", data: { label: "Node 3", size: 25, type: "regular" } },
            { id: "node4", data: { label: "Node 4", size: 25, type: "regular" } },
            { id: "node5", data: { label: "Node 5", size: 25, type: "regular" } },
            { id: "sub1", data: { label: "Sub 1", size: 20, type: "leaf" } },
            { id: "sub2", data: { label: "Sub 2", size: 20, type: "leaf" } },
            { id: "sub3", data: { label: "Sub 3", size: 20, type: "leaf" } },
            { id: "sub4", data: { label: "Sub 4", size: 20, type: "leaf" } },
          ],
          edges: [
            { source: "center", target: "node1" },
            { source: "center", target: "node2" },
            { source: "center", target: "node3" },
            { source: "center", target: "node4" },
            { source: "center", target: "node5" },
            { source: "node1", target: "sub1" },
            { source: "node2", target: "sub2" },
            { source: "node3", target: "sub3" },
            { source: "node4", target: "sub4" },
            { source: "node1", target: "node2" },
            { source: "node3", target: "node4" },
          ],
        });

      case "cluster":
        // Network with distinct clusters
        return createGraphData({
          nodes: [
            // Research cluster
            {
              id: "r1",
              data: { cluster: "research", label: "Lead Researcher", size: 35, type: "leader" },
            },
            {
              id: "r2",
              data: { cluster: "research", label: "Data Scientist", size: 25, type: "member" },
            },
            {
              id: "r3",
              data: { cluster: "research", label: "ML Engineer", size: 25, type: "member" },
            },
            {
              id: "r4",
              data: { cluster: "research", label: "Statistician", size: 20, type: "member" },
            },

            // Engineering cluster
            {
              id: "e1",
              data: { cluster: "engineering", label: "Tech Lead", size: 35, type: "leader" },
            },
            {
              id: "e2",
              data: { cluster: "engineering", label: "Backend Dev", size: 25, type: "member" },
            },
            {
              id: "e3",
              data: { cluster: "engineering", label: "Frontend Dev", size: 25, type: "member" },
            },
            {
              id: "e4",
              data: { cluster: "engineering", label: "DevOps", size: 20, type: "member" },
            },

            // Product cluster
            {
              id: "p1",
              data: { cluster: "product", label: "Product Manager", size: 35, type: "leader" },
            },
            {
              id: "p2",
              data: { cluster: "product", label: "UX Designer", size: 25, type: "member" },
            },
            {
              id: "p3",
              data: { cluster: "product", label: "Business Analyst", size: 25, type: "member" },
            },
            {
              id: "p4",
              data: { cluster: "product", label: "Market Research", size: 20, type: "member" },
            },
          ],
          edges: [
            // Research cluster internal
            { source: "r1", target: "r2" },
            { source: "r1", target: "r3" },
            { source: "r1", target: "r4" },
            { source: "r2", target: "r3" },

            // Engineering cluster internal
            { source: "e1", target: "e2" },
            { source: "e1", target: "e3" },
            { source: "e1", target: "e4" },
            { source: "e2", target: "e3" },

            // Product cluster internal
            { source: "p1", target: "p2" },
            { source: "p1", target: "p3" },
            { source: "p1", target: "p4" },
            { source: "p2", target: "p3" },

            // Cross-cluster connections
            { source: "r1", target: "e1" }, // Research-Engineering collaboration
            { source: "e1", target: "p1" }, // Engineering-Product collaboration
            { source: "r2", target: "p3" }, // Data Science-Business Analysis
          ],
        });

      case "hierarchy":
        // Hierarchical network with leaf clustering
        return createGraphData({
          nodes: [
            // Root
            { id: "ceo", data: { cluster: "executive", label: "CEO", size: 50, type: "root" } },

            // Department heads
            {
              id: "vp_eng",
              data: {
                cluster: "engineering",
                label: "VP Engineering",
                size: 40,
                type: "department",
              },
            },
            {
              id: "vp_sales",
              data: { cluster: "sales", label: "VP Sales", size: 40, type: "department" },
            },
            {
              id: "vp_marketing",
              data: { cluster: "marketing", label: "VP Marketing", size: 40, type: "department" },
            },

            // Engineering team
            {
              id: "eng_mgr1",
              data: { cluster: "engineering", label: "Eng Manager 1", size: 30, type: "manager" },
            },
            {
              id: "eng_mgr2",
              data: { cluster: "engineering", label: "Eng Manager 2", size: 30, type: "manager" },
            },
            {
              id: "eng1",
              data: { cluster: "engineering", label: "Senior Engineer", size: 20, type: "leaf" },
            },
            {
              id: "eng2",
              data: { cluster: "engineering", label: "Engineer", size: 20, type: "leaf" },
            },
            {
              id: "eng3",
              data: { cluster: "engineering", label: "Junior Engineer", size: 20, type: "leaf" },
            },

            // Sales team
            {
              id: "sales_mgr",
              data: { cluster: "sales", label: "Sales Manager", size: 30, type: "manager" },
            },
            {
              id: "sales1",
              data: { cluster: "sales", label: "Sales Rep 1", size: 20, type: "leaf" },
            },
            {
              id: "sales2",
              data: { cluster: "sales", label: "Sales Rep 2", size: 20, type: "leaf" },
            },
            {
              id: "sales3",
              data: { cluster: "sales", label: "Sales Rep 3", size: 20, type: "leaf" },
            },

            // Marketing team
            {
              id: "mkt_mgr",
              data: { cluster: "marketing", label: "Marketing Manager", size: 30, type: "manager" },
            },
            {
              id: "mkt1",
              data: { cluster: "marketing", label: "Content Writer", size: 20, type: "leaf" },
            },
            {
              id: "mkt2",
              data: { cluster: "marketing", label: "Designer", size: 20, type: "leaf" },
            },
          ],
          edges: [
            // Hierarchy
            { source: "ceo", target: "vp_eng" },
            { source: "ceo", target: "vp_sales" },
            { source: "ceo", target: "vp_marketing" },

            // Engineering
            { source: "vp_eng", target: "eng_mgr1" },
            { source: "vp_eng", target: "eng_mgr2" },
            { source: "eng_mgr1", target: "eng1" },
            { source: "eng_mgr1", target: "eng2" },
            { source: "eng_mgr2", target: "eng3" },

            // Sales
            { source: "vp_sales", target: "sales_mgr" },
            { source: "sales_mgr", target: "sales1" },
            { source: "sales_mgr", target: "sales2" },
            { source: "sales_mgr", target: "sales3" },

            // Marketing
            { source: "vp_marketing", target: "mkt_mgr" },
            { source: "mkt_mgr", target: "mkt1" },
            { source: "mkt_mgr", target: "mkt2" },

            // Cross-department collaboration
            { source: "eng_mgr1", target: "mkt_mgr" },
            { source: "sales_mgr", target: "mkt_mgr" },
          ],
        });

      default:
        return createGraphData({ nodes: [], edges: [] });
    }
  };

  const scenarioData = createMemo(() => createScenarioData());

  // Get node colors based on type and cluster
  const getNodeColor = (data: NodeData) => {
    if (scenario() === "basic") {
      const typeColors = {
        hub: "#722ed1", // Purple - Hub
        regular: "#1890ff", // Blue - Regular
        leaf: "#52c41a", // Green - Leaf
      };
      return typeColors[data.type as keyof typeof typeColors] || "#8c8c8c";
    }

    // Cluster-based coloring
    const clusterColors: Record<string, string> = {
      research: "#ff4d4f", // Red - Research
      engineering: "#1890ff", // Blue - Engineering
      product: "#52c41a", // Green - Product
      executive: "#722ed1", // Purple - Executive
      sales: "#faad14", // Orange - Sales
      marketing: "#eb2f96", // Pink - Marketing
    };
    return clusterColors[data.cluster || ""] || "#8c8c8c";
  };

  return (
    <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn about the classic Force layout with physics simulation, clustering support,
          collision detection, and flexible parameter control for network visualization.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/force-layout"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 Force Layout Guide
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

      {/* Scenario Selector */}
      <div class="mb-4 p-3 bg-gray-50 rounded">
        <label class="text-xs font-medium text-gray-700 mb-2 block">Demo Scenario</label>
        <select
          value={scenario()}
          onChange={(e) => setScenario(e.target.value as "basic" | "cluster" | "hierarchy")}
          class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
        >
          <option value="basic">Basic Force Network</option>
          <option value="cluster">Team Clusters</option>
          <option value="hierarchy">Organizational Hierarchy</option>
        </select>
      </div>

      {/* Interactive Controls */}
      <div class="space-y-4 mb-4 p-3 bg-gray-50 rounded">
        {/* Physics Forces */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">⚡ Physics Forces</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Gravity (Central Force): {gravity()}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={gravity()}
                onInput={(e) => setGravity(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Edge Strength: {edgeStrength()}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={edgeStrength()}
                onInput={(e) => setEdgeStrength(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Node Strength: {nodeStrength()}
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={nodeStrength()}
                onInput={(e) => setNodeStrength(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Link Distance: {linkDistance()}
              </label>
              <input
                type="range"
                min="50"
                max="400"
                step="25"
                value={linkDistance()}
                onInput={(e) => setLinkDistance(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Repulsion: {coulombDisScale()}
              </label>
              <input
                type="range"
                min="0.001"
                max="0.02"
                step="0.001"
                value={coulombDisScale()}
                onInput={(e) => setCoulombDisScale(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">Damping: {damping()}</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={damping()}
                onInput={(e) => setDamping(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Layout Controls */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">🎛️ Layout Controls</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="flex items-center">
              <label class="flex items-center text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={preventOverlap()}
                  onChange={(e) => setPreventOverlap(e.target.checked)}
                  class="mr-2"
                />
                Prevent Overlap
              </label>
            </div>

            {preventOverlap() && (
              <div class="flex flex-col">
                <label class="text-xs font-medium text-gray-700 mb-1">
                  Node Spacing: {nodeSpacing()}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={nodeSpacing()}
                  onInput={(e) => setNodeSpacing(parseInt(e.target.value))}
                  class="text-xs"
                />
              </div>
            )}

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">Max Speed: {maxSpeed()}</label>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={maxSpeed()}
                onInput={(e) => setMaxSpeed(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">Interval: {interval()}</label>
              <input
                type="range"
                min="0.01"
                max="0.1"
                step="0.01"
                value={interval()}
                onInput={(e) => setInterval(parseFloat(e.target.value))}
                class="text-xs"
              />
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

            <div class="flex items-center">
              <label class="flex items-center text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={leafCluster()}
                  onChange={(e) => setLeafCluster(e.target.checked)}
                  class="mr-2"
                />
                Cluster Leaf Nodes
              </label>
            </div>

            {(clustering() || leafCluster()) && (
              <div class="flex flex-col">
                <label class="text-xs font-medium text-gray-700 mb-1">
                  Cluster Strength: {clusterNodeStrength()}
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={clusterNodeStrength()}
                  onInput={(e) => setClusterNodeStrength(parseInt(e.target.value))}
                  class="text-xs"
                />
              </div>
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
              type: "force",
              gravity: gravity(),
              edgeStrength: edgeStrength(),
              nodeStrength: nodeStrength(),
              linkDistance: linkDistance(),
              coulombDisScale: coulombDisScale(),
              damping: damping(),
              preventOverlap: preventOverlap(),
              nodeSpacing: nodeSpacing(),
              maxSpeed: maxSpeed(),
              interval: interval(),
              clustering: clustering(),
              leafCluster: leafCluster(),
              nodeClusterBy: "cluster",
              clusterNodeStrength: clusterNodeStrength(),
            }}
            node={{
              style: (d) => ({
                fill: getNodeColor(d.data as NodeData),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: (d.data as NodeData)?.size || 20,
                labelText: (d.data as NodeData)?.label,
                labelFill: "#333333",
                labelFontSize: 9,
                labelFontWeight:
                  (d.data as NodeData)?.type === "leader" || (d.data as NodeData)?.type === "root"
                    ? "bold"
                    : "normal",
                labelBackground: true,
                labelBackgroundFill: "rgba(255, 255, 255, 0.9)",
                labelBackgroundRadius: 2,
                labelPadding: [1, 3],
              }),
            }}
            edge={{
              style: {
                stroke: "#666666",
                lineWidth: 1.5,
                strokeOpacity: 0.6,
                endArrow: scenario() === "hierarchy",
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
            <h4 class="text-blue-800 font-semibold mb-2">How Force Layout Works</h4>
            <p class="text-blue-800 text-sm">
              The Force layout simulates physical forces to position nodes naturally. Gravity pulls
              nodes toward the center, edge forces attract connected nodes, node forces provide
              repulsion, and collision detection prevents overlap. Clustering enables grouping by
              data attributes with additional centripetal forces.
            </p>
          </div>
        </div>
      </div>

      {/* Features & Configuration */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">✨ Force Layout Features</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>
              • <strong>Physics Simulation:</strong> Realistic force-based positioning
            </li>
            <li>
              • <strong>Collision Detection:</strong> Prevents node overlap automatically
            </li>
            <li>
              • <strong>Clustering Support:</strong> Groups nodes by data attributes
            </li>
            <li>
              • <strong>Flexible Forces:</strong> Configurable attraction and repulsion
            </li>
            <li>
              • <strong>Performance Control:</strong> Speed and damping parameters
            </li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-purple-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-purple-800 space-y-1">
            <li>
              • Scenario:{" "}
              {scenario() === "basic"
                ? "Basic Network"
                : scenario() === "cluster"
                  ? "Team Clusters"
                  : "Organizational Hierarchy"}
            </li>
            <li>• Gravity: {gravity()}</li>
            <li>• Edge Strength: {edgeStrength()}</li>
            <li>• Link Distance: {linkDistance()}</li>
            <li>• Clustering: {clustering() ? "Enabled" : "Disabled"}</li>
            <li>• Leaf Clustering: {leafCluster() ? "Enabled" : "Disabled"}</li>
            <li>• Total Nodes: {scenarioData()?.nodes?.length || 0}</li>
          </ul>
        </div>
      </div>

      {/* Type/Cluster Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🎨 Legend</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={
              scenario() === "basic"
                ? [
                    { color: "#722ed1", label: "Hub Nodes", desc: "Central connection points" },
                    { color: "#1890ff", label: "Regular Nodes", desc: "Standard network nodes" },
                    { color: "#52c41a", label: "Leaf Nodes", desc: "End-point connections" },
                  ]
                : scenario() === "cluster"
                  ? [
                      { color: "#ff4d4f", label: "Research", desc: "Data science team" },
                      { color: "#1890ff", label: "Engineering", desc: "Technical team" },
                      { color: "#52c41a", label: "Product", desc: "Product team" },
                    ]
                  : [
                      { color: "#722ed1", label: "Executive", desc: "Leadership level" },
                      { color: "#1890ff", label: "Engineering", desc: "Technical department" },
                      { color: "#faad14", label: "Sales", desc: "Sales department" },
                      { color: "#eb2f96", label: "Marketing", desc: "Marketing department" },
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

      {/* Use Cases */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">💡 Perfect For</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              {
                icon: "🌐",
                title: "General Networks",
                desc: "Versatile layout for most network types",
              },
              {
                icon: "👥",
                title: "Social Networks",
                desc: "Friend connections and communities",
              },
              {
                icon: "🏢",
                title: "Organization Charts",
                desc: "Company structure with clustering",
              },
              {
                icon: "💼",
                title: "Business Networks",
                desc: "Partnership and collaboration maps",
              },
              {
                icon: "🔗",
                title: "Dependency Graphs",
                desc: "Software or process dependencies",
              },
              {
                icon: "📊",
                title: "Interactive Exploration",
                desc: "Draggable nodes for analysis",
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

// Create network data with clustering
const networkData = createGraphData({
  nodes: [
    { id: "hub", data: { cluster: "center", label: "Hub", size: 40 } },
    { id: "node1", data: { cluster: "group1", label: "Node 1", size: 25 } },
    { id: "node2", data: { cluster: "group1", label: "Node 2", size: 25 } },
    { id: "node3", data: { cluster: "group2", label: "Node 3", size: 25 } },
    // ... more nodes
  ],
  edges: [
    { source: "hub", target: "node1" },
    { source: "hub", target: "node2" },
    { source: "node1", target: "node2" },
    // ... more edges
  ]
});

export const ForceNetwork = () => (
  <Graph
    data={networkData}
    width={700}
    height={500}
    autoFit="center"
    layout={{
      type: "force",
      gravity: ${gravity()},                      // Central attraction force
      edgeStrength: ${edgeStrength()},            // Connection strength
      nodeStrength: ${nodeStrength()},            // Node repulsion/attraction
      linkDistance: ${linkDistance()},            // Ideal edge length
      coulombDisScale: ${coulombDisScale()},      // Repulsion coefficient
      damping: ${damping()},                      // Speed decay factor
      preventOverlap: ${preventOverlap()},        // Collision detection
      nodeSpacing: ${nodeSpacing()},              // Minimum node spacing
      maxSpeed: ${maxSpeed()},                    // Maximum movement speed
      interval: ${interval()},                    // Movement speed per iteration
      clustering: ${clustering()},                // Enable data-based clustering
      leafCluster: ${leafCluster()},              // Cluster leaf nodes separately
      nodeClusterBy: "cluster",                   // Field for clustering
      clusterNodeStrength: ${clusterNodeStrength()}, // Cluster centripetal force
    }}
    node={{
      style: (d) => ({
        fill: getClusterColor(d.data?.cluster),
        radius: d.data?.size || 20,
        labelText: d.data?.label,
        labelBackground: true,
        labelBackgroundFill: "rgba(255, 255, 255, 0.9)",
      })
    }}
    edge={{
      style: {
        stroke: "#666666",
        strokeOpacity: 0.6,
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
