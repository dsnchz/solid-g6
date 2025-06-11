import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const AntvDagreExample = () => {
  const [rankdir, setRankdir] = createSignal<"TB" | "BT" | "LR" | "RL">("TB");
  const [align, setAlign] = createSignal<"UL" | "UR" | "DL" | "DR">("UL");
  const [nodesep, setNodesep] = createSignal(40);
  const [ranksep, setRanksep] = createSignal(50);
  const [edgeLabelSpace, setEdgeLabelSpace] = createSignal(true);
  const [controlPoints, setControlPoints] = createSignal(false);
  const [sortByCombo, setSortByCombo] = createSignal(false);
  const [customOrdering, setCustomOrdering] = createSignal(false);

  // Streamlined software development workflow with edge labels and priorities
  const antvDagreData = createGraphData({
    nodes: [
      // Planning Phase
      { id: "requirements", data: { label: "Requirements", phase: "planning", priority: 1 } },
      { id: "design", data: { label: "Design", phase: "planning", priority: 2 } },

      // Development Phase
      { id: "backend", data: { label: "Backend\nDev", phase: "development", priority: 1 } },
      { id: "frontend", data: { label: "Frontend\nDev", phase: "development", priority: 2 } },
      { id: "api", data: { label: "API\nIntegration", phase: "development", priority: 3 } },

      // Testing Phase
      { id: "testing", data: { label: "Testing", phase: "testing", priority: 1 } },

      // Deployment Phase
      { id: "staging", data: { label: "Staging", phase: "deployment", priority: 1 } },
      { id: "production", data: { label: "Production", phase: "deployment", priority: 2 } },
    ],
    edges: [
      // Planning flow
      { source: "requirements", target: "design", data: { label: "approved", weight: 1 } },

      // Development dependencies
      { source: "design", target: "backend", data: { label: "specs", weight: 2 } },
      { source: "design", target: "frontend", data: { label: "mockups", weight: 1 } },
      { source: "backend", target: "api", data: { label: "endpoints", weight: 2 } },
      { source: "frontend", target: "api", data: { label: "integration", weight: 1 } },

      // Testing dependencies
      { source: "api", target: "testing", data: { label: "ready", weight: 2 } },

      // Deployment flow
      { source: "testing", target: "staging", data: { label: "validated", weight: 3 } },
      { source: "staging", target: "production", data: { label: "tested", weight: 3 } },
    ],
  });

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "planning":
        return "#722ed1"; // Purple
      case "development":
        return "#1890ff"; // Blue
      case "testing":
        return "#fa8c16"; // Orange
      case "deployment":
        return "#52c41a"; // Green
      default:
        return "#8c8c8c";
    }
  };

  const getEdgeColor = (weight: number) => {
    switch (weight) {
      case 1:
        return "#d9d9d9"; // Light gray - normal dependency
      case 2:
        return "#595959"; // Dark gray - important dependency
      case 3:
        return "#f5222d"; // Red - critical dependency
      default:
        return "#bfbfbf";
    }
  };

  // Custom node ordering for when enabled
  const customNodeOrder = [
    "requirements",
    "design",
    "architecture",
    "database",
    "backend",
    "frontend",
    "api",
    "unit-test",
    "integration",
    "e2e-test",
    "staging",
    "production",
    "monitoring",
  ];

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">⚡ Interactive AntV Dagre Example</h4>

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
                Learn more about AntV Dagre layout configuration options, enhanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/antv-dagre-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 AntV Dagre Layout Documentation</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
          <label class="block text-xs font-medium text-gray-700 mb-1">Alignment</label>
          <select
            value={align()}
            onChange={(e) => setAlign(e.target.value as "UL" | "UR" | "DL" | "DR")}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="UL">Upper Left</option>
            <option value="UR">Upper Right</option>
            <option value="DL">Down Left</option>
            <option value="DR">Down Right</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Node Separation: {nodesep()}
          </label>
          <input
            type="range"
            min="20"
            max="80"
            step="5"
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
            min="30"
            max="100"
            step="5"
            value={ranksep()}
            onInput={(e) => setRanksep(parseInt(e.target.value))}
            class="w-full"
          />
        </div>
      </div>

      {/* Enhanced Features Controls */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={edgeLabelSpace()}
              onChange={(e) => setEdgeLabelSpace(e.target.checked)}
              class="mr-2"
            />
            Edge Label Space
          </label>
        </div>

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={controlPoints()}
              onChange={(e) => setControlPoints(e.target.checked)}
              class="mr-2"
            />
            Control Points
          </label>
        </div>

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={sortByCombo()}
              onChange={(e) => setSortByCombo(e.target.checked)}
              class="mr-2"
            />
            Sort by Combo
          </label>
        </div>

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={customOrdering()}
              onChange={(e) => setCustomOrdering(e.target.checked)}
              class="mr-2"
            />
            Custom Node Order
          </label>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={antvDagreData}
            width={700}
            height={500}
            layout={{
              type: "antv-dagre",
              rankdir: rankdir(),
              align: align(),
              nodesep: nodesep(),
              ranksep: ranksep(),
              edgeLabelSpace: edgeLabelSpace(),
              controlPoints: controlPoints(),
              sortByCombo: sortByCombo(),
              ...(customOrdering() && { nodeOrder: customNodeOrder }),
            }}
            node={{
              style: (d) => ({
                fill: getPhaseColor(d.data?.phase || "default"),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: 8,
                labelText: d.data?.label,
                labelFill: "#333333",
                labelFontSize: 10,
                labelFontWeight: "bold",
                labelPlacement: "center",
              }),
            }}
            edge={{
              style: (d) => ({
                stroke: getEdgeColor(d.data?.weight || 1),
                lineWidth: d.data?.weight || 1,
                endArrow: true,
                endArrowSize: 8,
                labelText: edgeLabelSpace() ? d.data?.label : undefined,
                labelFill: "#666666",
                labelFontSize: 8,
                labelBackgroundFill: "#ffffff",
                labelBackgroundFillOpacity: 0.8,
                labelPadding: [1, 2],
              }),
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Enhanced Features Info */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-purple-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-purple-900 mb-2">⚡ Enhanced Features</h5>
          <ul class="text-xs text-purple-800 space-y-1">
            <li>
              • <strong>Edge Label Space:</strong> Reserves space for edge labels
            </li>
            <li>
              • <strong>Custom Node Order:</strong> Control node positioning in ranks
            </li>
            <li>
              • <strong>Control Points:</strong> Maintains edge routing points
            </li>
            <li>
              • <strong>Combo Sorting:</strong> Prevents combo overlap
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>
              • Direction: {rankdir()} (
              {rankdir() === "TB"
                ? "Top→Bottom"
                : rankdir() === "BT"
                  ? "Bottom→Top"
                  : rankdir() === "LR"
                    ? "Left→Right"
                    : "Right→Left"}
              )
            </li>
            <li>• Alignment: {align()}</li>
            <li>• Node spacing: {nodesep()}px</li>
            <li>• Rank spacing: {ranksep()}px</li>
            <li>• Custom ordering: {customOrdering() ? "ON" : "OFF"}</li>
          </ul>
        </div>
      </div>

      {/* Workflow Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🚀 Development Workflow Phases</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <For
            each={[
              {
                phase: "planning",
                color: "#722ed1",
                label: "Planning",
                description: "Requirements & Design",
              },
              {
                phase: "development",
                color: "#1890ff",
                label: "Development",
                description: "Frontend, Backend, API",
              },
              {
                phase: "testing",
                color: "#fa8c16",
                label: "Testing",
                description: "Unit, Integration, E2E",
              },
              {
                phase: "deployment",
                color: "#52c41a",
                label: "Deployment",
                description: "Staging → Production",
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

      {/* Dependency Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🔗 Dependency Types</h5>
        <div class="flex flex-wrap gap-3">
          <For
            each={[
              { weight: 1, color: "#d9d9d9", label: "Normal", description: "Standard dependency" },
              { weight: 2, color: "#595959", label: "Important", description: "Key dependency" },
              {
                weight: 3,
                color: "#f5222d",
                label: "Critical",
                description: "Blocking dependency",
              },
            ]}
          >
            {(item) => (
              <div class="flex items-center text-xs bg-white rounded border p-2">
                <div
                  class="w-8 h-1 mr-2 flex-shrink-0"
                  style={{ "background-color": item.color, height: `${item.weight}px` }}
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

      {/* Code Example */}
      <div>
        <h5 class="text-xs font-semibold text-gray-900 mb-2">📄 Code Example</h5>
        <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
          <code>{`<Graph
  data={workflowData}
  layout={{
    type: "antv-dagre",
    rankdir: "${rankdir()}",           // Layout direction
    align: "${align()}",               // Node alignment
    nodesep: ${nodesep()},                   // Node separation
    ranksep: ${ranksep()},                   // Rank separation
    edgeLabelSpace: ${edgeLabelSpace()},     // Reserve space for edge labels
    controlPoints: ${controlPoints()},       // Keep edge control points
    sortByCombo: ${sortByCombo()},         // Sort by combo to prevent overlap${
      customOrdering()
        ? `\n    nodeOrder: [             // Custom node ordering
      "requirements", "design", "architecture",
      "database", "backend", "frontend", "api",
      // ... rest of custom order
    ],`
        : ""
    }
  }}
  node={{
    style: (d) => ({
      fill: getPhaseColor(d.data?.phase),
      labelText: d.data?.label,
      labelPlacement: "center",
    })
  }}
  edge={{
    style: (d) => ({
      stroke: getEdgeColor(d.data?.weight),
      lineWidth: d.data?.weight,
      endArrow: true,${edgeLabelSpace() ? `\n      labelText: d.data?.label,` : ""}
    })
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
