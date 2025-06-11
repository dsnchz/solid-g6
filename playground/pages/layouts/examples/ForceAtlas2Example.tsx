import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const ForceAtlas2Example = () => {
  // Interactive controls
  const [kr, setKr] = createSignal(20);
  const [kg, setKg] = createSignal(1);
  const [preventOverlap, setPreventOverlap] = createSignal(true);
  const [mode, setMode] = createSignal<"normal" | "linlog">("normal");
  const [dissuadeHubs, setDissuadeHubs] = createSignal(false);
  const [networkType, setNetworkType] = createSignal<"social" | "knowledge" | "system">("social");

  // Generate different network types for demonstration
  const createNetworkData = () => {
    switch (networkType()) {
      case "social":
        return createGraphData({
          nodes: [
            // Community 1 - Tech Leaders
            { id: "tech-leader", data: { label: "Tech Leader", community: 1, influence: 10 } },
            { id: "developer-1", data: { label: "Senior Dev", community: 1, influence: 7 } },
            { id: "developer-2", data: { label: "Frontend Dev", community: 1, influence: 5 } },
            { id: "developer-3", data: { label: "Backend Dev", community: 1, influence: 6 } },
            { id: "designer", data: { label: "UI Designer", community: 1, influence: 4 } },

            // Community 2 - Data Science
            { id: "data-lead", data: { label: "Data Lead", community: 2, influence: 9 } },
            { id: "data-scientist-1", data: { label: "ML Engineer", community: 2, influence: 6 } },
            { id: "data-scientist-2", data: { label: "Data Analyst", community: 2, influence: 5 } },
            { id: "researcher", data: { label: "Researcher", community: 2, influence: 4 } },

            // Community 3 - Business
            { id: "ceo", data: { label: "CEO", community: 3, influence: 10 } },
            {
              id: "product-manager",
              data: { label: "Product Manager", community: 3, influence: 7 },
            },
            { id: "marketing-lead", data: { label: "Marketing Lead", community: 3, influence: 6 } },
            { id: "sales-rep", data: { label: "Sales Rep", community: 3, influence: 4 } },

            // Bridges between communities
            { id: "devops", data: { label: "DevOps Lead", community: 1, influence: 8 } },
            { id: "product-owner", data: { label: "Product Owner", community: 2, influence: 6 } },
          ],
          edges: [
            // Tech community connections
            { source: "tech-leader", target: "developer-1" },
            { source: "tech-leader", target: "developer-2" },
            { source: "tech-leader", target: "developer-3" },
            { source: "developer-1", target: "developer-2" },
            { source: "developer-1", target: "developer-3" },
            { source: "developer-2", target: "designer" },
            { source: "tech-leader", target: "devops" },

            // Data science community
            { source: "data-lead", target: "data-scientist-1" },
            { source: "data-lead", target: "data-scientist-2" },
            { source: "data-scientist-1", target: "data-scientist-2" },
            { source: "data-scientist-1", target: "researcher" },
            { source: "data-lead", target: "product-owner" },

            // Business community
            { source: "ceo", target: "product-manager" },
            { source: "ceo", target: "marketing-lead" },
            { source: "product-manager", target: "sales-rep" },
            { source: "marketing-lead", target: "sales-rep" },

            // Cross-community bridges
            { source: "tech-leader", target: "data-lead" },
            { source: "product-manager", target: "tech-leader" },
            { source: "product-owner", target: "product-manager" },
            { source: "devops", target: "data-scientist-1" },
            { source: "ceo", target: "data-lead" },
          ],
        });

      case "knowledge":
        return createGraphData({
          nodes: [
            // Core concepts
            {
              id: "machine-learning",
              data: { label: "Machine\nLearning", community: 1, influence: 10 },
            },
            { id: "deep-learning", data: { label: "Deep\nLearning", community: 1, influence: 8 } },
            {
              id: "neural-networks",
              data: { label: "Neural\nNetworks", community: 1, influence: 7 },
            },
            {
              id: "nlp",
              data: { label: "Natural Language\nProcessing", community: 1, influence: 6 },
            },

            // Data domain
            { id: "data-science", data: { label: "Data\nScience", community: 2, influence: 9 } },
            { id: "statistics", data: { label: "Statistics", community: 2, influence: 8 } },
            { id: "data-mining", data: { label: "Data\nMining", community: 2, influence: 6 } },
            { id: "big-data", data: { label: "Big Data", community: 2, influence: 7 } },

            // Computer Science
            { id: "algorithms", data: { label: "Algorithms", community: 3, influence: 8 } },
            { id: "programming", data: { label: "Programming", community: 3, influence: 7 } },
            { id: "databases", data: { label: "Databases", community: 3, influence: 6 } },
            {
              id: "cloud-computing",
              data: { label: "Cloud\nComputing", community: 3, influence: 5 },
            },
          ],
          edges: [
            { source: "machine-learning", target: "deep-learning" },
            { source: "deep-learning", target: "neural-networks" },
            { source: "machine-learning", target: "nlp" },
            { source: "machine-learning", target: "data-science" },
            { source: "data-science", target: "statistics" },
            { source: "data-science", target: "data-mining" },
            { source: "data-mining", target: "big-data" },
            { source: "algorithms", target: "machine-learning" },
            { source: "programming", target: "algorithms" },
            { source: "databases", target: "data-science" },
            { source: "big-data", target: "cloud-computing" },
            { source: "programming", target: "databases" },
          ],
        });

      case "system":
        return createGraphData({
          nodes: [
            // Frontend Layer
            { id: "web-app", data: { label: "Web App", community: 1, influence: 8 } },
            { id: "mobile-app", data: { label: "Mobile App", community: 1, influence: 7 } },
            { id: "cdn", data: { label: "CDN", community: 1, influence: 6 } },

            // API Layer
            { id: "api-gateway", data: { label: "API Gateway", community: 2, influence: 9 } },
            { id: "auth-service", data: { label: "Auth Service", community: 2, influence: 7 } },
            { id: "user-service", data: { label: "User Service", community: 2, influence: 6 } },
            { id: "order-service", data: { label: "Order Service", community: 2, influence: 6 } },

            // Data Layer
            { id: "primary-db", data: { label: "Primary DB", community: 3, influence: 8 } },
            { id: "cache", data: { label: "Redis Cache", community: 3, influence: 7 } },
            { id: "search-engine", data: { label: "Search Engine", community: 3, influence: 5 } },

            // Infrastructure
            { id: "load-balancer", data: { label: "Load Balancer", community: 4, influence: 9 } },
            { id: "monitoring", data: { label: "Monitoring", community: 4, influence: 6 } },
          ],
          edges: [
            { source: "web-app", target: "cdn" },
            { source: "web-app", target: "load-balancer" },
            { source: "mobile-app", target: "load-balancer" },
            { source: "load-balancer", target: "api-gateway" },
            { source: "api-gateway", target: "auth-service" },
            { source: "api-gateway", target: "user-service" },
            { source: "api-gateway", target: "order-service" },
            { source: "user-service", target: "primary-db" },
            { source: "order-service", target: "primary-db" },
            { source: "user-service", target: "cache" },
            { source: "order-service", target: "search-engine" },
            { source: "monitoring", target: "api-gateway" },
            { source: "monitoring", target: "primary-db" },
          ],
        });

      default:
        return createGraphData({ nodes: [], edges: [] });
    }
  };

  const networkData = createMemo(() => createNetworkData());

  // Get community colors
  const getCommunityColor = (community: number) => {
    const colors = ["#ff4d4f", "#1890ff", "#52c41a", "#faad14", "#722ed1", "#eb2f96"];
    return colors[community - 1] || "#8c8c8c";
  };

  const getInfluenceSize = (influence: number) => {
    return Math.max(6, influence * 1.2);
  };

  return (
    <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn about ForceAtlas2 algorithm parameters, clustering modes, and performance
          optimization for large-scale network visualization and community detection.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/force-atlas2-layout"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 ForceAtlas2 Layout Guide
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
          <label class="text-xs font-medium text-gray-700 mb-1">Network Type</label>
          <select
            value={networkType()}
            onChange={(e) => setNetworkType(e.target.value as "social" | "knowledge" | "system")}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="social">Social Network</option>
            <option value="knowledge">Knowledge Graph</option>
            <option value="system">System Architecture</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Repulsion (kr): {kr()}</label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={kr()}
            onInput={(e) => setKr(parseInt(e.target.value))}
            class="text-xs"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Gravity (kg): {kg()}</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={kg()}
            onInput={(e) => setKg(parseFloat(e.target.value))}
            class="text-xs"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-medium text-gray-700 mb-1">Clustering Mode</label>
          <select
            value={mode()}
            onChange={(e) => setMode(e.target.value as "normal" | "linlog")}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="normal">Normal</option>
            <option value="linlog">LinLog (Compact)</option>
          </select>
        </div>
      </div>

      {/* Additional Controls */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded">
        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={preventOverlap()}
              onChange={(e) => setPreventOverlap(e.target.checked)}
              class="mr-2"
            />
            Prevent Node Overlap
          </label>
        </div>

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={dissuadeHubs()}
              onChange={(e) => setDissuadeHubs(e.target.checked)}
              class="mr-2"
            />
            Hub Mode (Center High-Degree Nodes)
          </label>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={networkData()}
            width={700}
            height={500}
            autoFit="center"
            layout={{
              type: "force-atlas2",
              kr: kr(),
              kg: kg(),
              preventOverlap: preventOverlap(),
              mode: mode(),
              dissuadeHubs: dissuadeHubs(),
              barnesHut: true, // Enable for better performance
            }}
            node={{
              style: (d) => ({
                fill: getCommunityColor((d.data?.community as number) || 1),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: getInfluenceSize((d.data?.influence as number) || 5),
                labelText: d.data?.label as string,
                labelFill: "#333333",
                labelFontSize: 10,
                labelFontWeight: "bold",
                labelBackground: true,
                labelBackgroundFill: "rgba(255, 255, 255, 0.8)",
                labelBackgroundRadius: 2,
                labelPadding: [2, 4],
              }),
            }}
            edge={{
              style: {
                stroke: "#666666",
                lineWidth: 1.5,
                strokeOpacity: 0.6,
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
            <span class="text-blue-400 text-lg">⚡</span>
          </div>
          <div class="ml-3">
            <h4 class="text-blue-800 font-semibold mb-2">How ForceAtlas2 Works</h4>
            <p class="text-blue-800 text-sm">
              ForceAtlas2 simulates physical forces between nodes: repulsion keeps nodes apart while
              attraction pulls connected nodes together. The algorithm excels at revealing community
              structures and can handle large networks efficiently. Higher repulsion (kr) spreads
              nodes out, while higher gravity (kg) pulls everything toward the center.
            </p>
          </div>
        </div>
      </div>

      {/* Layout Features */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">🌐 ForceAtlas2 Features</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>
              • <strong>Community Detection:</strong> Naturally clusters related nodes
            </li>
            <li>
              • <strong>Scalable Performance:</strong> Barnes-Hut optimization for large graphs
            </li>
            <li>
              • <strong>Hub Mode:</strong> Centers high-degree nodes when enabled
            </li>
            <li>
              • <strong>LinLog Mode:</strong> Creates more compact clusters
            </li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">⚙️ Current Configuration</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>
              • Network:{" "}
              {networkType() === "social"
                ? "Social Network"
                : networkType() === "knowledge"
                  ? "Knowledge Graph"
                  : "System Architecture"}
            </li>
            <li>• Repulsion (kr): {kr()}</li>
            <li>• Gravity (kg): {kg()}</li>
            <li>• Mode: {mode() === "linlog" ? "LinLog (Compact)" : "Normal"}</li>
            <li>• Overlap prevention: {preventOverlap() ? "Enabled" : "Disabled"}</li>
          </ul>
        </div>
      </div>

      {/* Network Analysis */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🔍 Network Analysis Features</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              {
                color: "#ff4d4f",
                label: "Community 1",
                desc:
                  networkType() === "social"
                    ? "Tech Team"
                    : networkType() === "knowledge"
                      ? "AI/ML Domain"
                      : "Frontend Layer",
              },
              {
                color: "#1890ff",
                label: "Community 2",
                desc:
                  networkType() === "social"
                    ? "Data Science"
                    : networkType() === "knowledge"
                      ? "Data Domain"
                      : "API Layer",
              },
              {
                color: "#52c41a",
                label: "Community 3",
                desc:
                  networkType() === "social"
                    ? "Business"
                    : networkType() === "knowledge"
                      ? "Computer Science"
                      : "Data Layer",
              },
              {
                color: "#faad14",
                label: "Community 4",
                desc: networkType() === "system" ? "Infrastructure" : "Cross-domain",
              },
            ]}
          >
            {(community) => (
              <div class="flex items-start text-xs bg-white rounded border p-2">
                <div
                  class="w-3 h-3 rounded-full mr-2 flex-shrink-0 mt-0.5"
                  style={{ "background-color": community.color }}
                />
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-900">{community.label}</span>
                  <span class="text-gray-600">{community.desc}</span>
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
              { icon: "👥", title: "Social Networks", desc: "User relationships and communities" },
              { icon: "🧠", title: "Knowledge Graphs", desc: "Concept relationships and domains" },
              { icon: "🏗️", title: "System Architecture", desc: "Component dependencies" },
              {
                icon: "🔬",
                title: "Research Networks",
                desc: "Citation and collaboration analysis",
              },
              { icon: "💼", title: "Organization Charts", desc: "Team structures and reporting" },
              { icon: "🌐", title: "Network Analysis", desc: "Large-scale network visualization" },
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

// Create network data with community structure
const networkData = createGraphData({
  nodes: [
    { id: "node1", data: { community: 1, influence: 8 } },
    { id: "node2", data: { community: 1, influence: 6 } },
    { id: "node3", data: { community: 2, influence: 9 } },
    // ... more nodes
  ],
  edges: [
    { source: "node1", target: "node2" },
    { source: "node2", target: "node3" },
    // ... more edges
  ]
});

export const ForceAtlas2Network = () => (
  <Graph
    data={networkData}
    width={700}
    height={500}
    autoFit="center"
    layout={{
      type: "force-atlas2",
      kr: ${kr()},                    // Repulsion coefficient (5-50)
      kg: ${kg()},                    // Gravity coefficient (0.1-5)
      mode: "${mode()}",              // "normal" or "linlog" for clustering
      preventOverlap: ${preventOverlap()},     // Prevent node overlap
      dissuadeHubs: ${dissuadeHubs()},         // Hub mode for high-degree nodes
      barnesHut: true,              // Enable for better performance
    }}
    node={{
      style: (d) => ({
        fill: getCommunityColor(d.data?.community),
        radius: getInfluenceSize(d.data?.influence),
        labelText: d.data?.label,
        labelBackground: true,
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
