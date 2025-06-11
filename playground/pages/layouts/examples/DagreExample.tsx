import { createSignal } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const DagreExample = () => {
  const [rankdir, setRankdir] = createSignal<"TB" | "BT" | "LR" | "RL">("TB");
  const [nodesep, setNodesep] = createSignal(50);
  const [ranksep, setRanksep] = createSignal(80);

  // Sample hierarchical data for dagre
  const dagreData = createGraphData({
    nodes: [
      { id: "root", data: { label: "CEO" } },
      { id: "cto", data: { label: "CTO" } },
      { id: "cfo", data: { label: "CFO" } },
      { id: "cmo", data: { label: "CMO" } },
      { id: "dev1", data: { label: "Frontend\nTeam" } },
      { id: "dev2", data: { label: "Backend\nTeam" } },
      { id: "devops", data: { label: "DevOps\nTeam" } },
      { id: "qa", data: { label: "QA\nTeam" } },
      { id: "finance", data: { label: "Finance\nTeam" } },
      { id: "marketing", data: { label: "Marketing\nTeam" } },
    ],
    edges: [
      { source: "root", target: "cto" },
      { source: "root", target: "cfo" },
      { source: "root", target: "cmo" },
      { source: "cto", target: "dev1" },
      { source: "cto", target: "dev2" },
      { source: "cto", target: "devops" },
      { source: "cto", target: "qa" },
      { source: "cfo", target: "finance" },
      { source: "cmo", target: "marketing" },
    ],
  });

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">🔧 Interactive Dagre Example</h4>

      {/* Documentation Link */}
      <div class="mb-4">
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              <span class="text-indigo-600 text-lg">📚</span>
            </div>
            <div class="flex-1">
              <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
              <p class="text-xs text-indigo-800 mb-2">
                Learn more about dagre layout configuration options, advanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/dagre-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 Dagre Layout Documentation</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Direction</label>
          <select
            value={rankdir()}
            onChange={(e) => setRankdir(e.target.value as "TB" | "BT" | "LR" | "RL")}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="TB">Top to Bottom</option>
            <option value="BT">Bottom to Top</option>
            <option value="LR">Left to Right</option>
            <option value="RL">Right to Left</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Node Separation: {nodesep()}
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="10"
            value={nodesep()}
            onInput={(e) => setNodesep(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Rank Separation: {ranksep()}
          </label>
          <input
            type="range"
            min="40"
            max="120"
            step="10"
            value={ranksep()}
            onInput={(e) => setRanksep(parseInt(e.target.value))}
            class="w-full"
          />
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={dagreData}
            width={500}
            height={350}
            layout={{
              type: "dagre",
              rankdir: rankdir(),
              nodesep: nodesep(),
              ranksep: ranksep(),
            }}
            node={{
              style: {
                fill: "#e6f7ff",
                stroke: "#1890ff",
                lineWidth: 2,
                radius: 6,
                labelText: (d) => d.data?.label,
                labelFill: "#333333",
                labelFontSize: 11,
                labelFontWeight: "bold",
              },
            }}
            edge={{
              style: {
                stroke: "#666666",
                lineWidth: 2,
                endArrow: true,
                endArrowSize: 8,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas"]}
          />
        </div>
      </div>

      {/* Code Example */}
      <div>
        <h5 class="text-xs font-semibold text-gray-900 mb-2">📄 Code Example</h5>
        <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
          <code>{`<Graph
  data={orgChartData}
  layout={{
    type: "dagre",
    rankdir: "${rankdir()}", // Direction: TB, BT, LR, RL
    nodesep: ${nodesep()},        // Space between nodes at same level
    ranksep: ${ranksep()},        // Space between different levels
  }}
  node={{
    style: {
      fill: "#e6f7ff",
      stroke: "#1890ff",
      labelText: (d) => d.data?.label,
    }
  }}
  edge={{
    style: {
      endArrow: true,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
