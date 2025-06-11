import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const GridExample = () => {
  const [cols, setCols] = createSignal(4);
  const [rows, setRows] = createSignal(4);
  const [nodeSize, setNodeSize] = createSignal(30);
  const [preventOverlap, setPreventOverlap] = createSignal(true);
  const [condense, setCondense] = createSignal(false);
  const [sortBy, setSortBy] = createSignal<"value" | "category" | null>(null);

  // Sample data for grid layout - dashboard metrics
  const gridData = createGraphData({
    nodes: [
      { id: "sales", data: { label: "Sales", value: 95, category: "revenue" } },
      { id: "marketing", data: { label: "Marketing", value: 78, category: "revenue" } },
      { id: "support", data: { label: "Support", value: 88, category: "operations" } },
      { id: "engineering", data: { label: "Engineering", value: 92, category: "operations" } },
      { id: "hr", data: { label: "HR", value: 71, category: "management" } },
      { id: "finance", data: { label: "Finance", value: 85, category: "management" } },
      { id: "product", data: { label: "Product", value: 90, category: "development" } },
      { id: "design", data: { label: "Design", value: 83, category: "development" } },
      { id: "qa", data: { label: "QA", value: 87, category: "development" } },
      { id: "devops", data: { label: "DevOps", value: 89, category: "operations" } },
      { id: "legal", data: { label: "Legal", value: 76, category: "management" } },
      { id: "security", data: { label: "Security", value: 91, category: "operations" } },
      { id: "analytics", data: { label: "Analytics", value: 86, category: "development" } },
      { id: "content", data: { label: "Content", value: 79, category: "revenue" } },
      { id: "operations", data: { label: "Operations", value: 84, category: "operations" } },
      { id: "research", data: { label: "Research", value: 77, category: "development" } },
    ],
    edges: [
      // Some logical connections between departments
      { source: "sales", target: "marketing" },
      { source: "product", target: "engineering" },
      { source: "design", target: "product" },
      { source: "qa", target: "engineering" },
      { source: "devops", target: "engineering" },
      { source: "hr", target: "operations" },
      { source: "finance", target: "operations" },
      { source: "legal", target: "hr" },
      { source: "security", target: "devops" },
      { source: "analytics", target: "product" },
      { source: "content", target: "marketing" },
      { source: "research", target: "analytics" },
    ],
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "revenue":
        return "#52c41a";
      case "operations":
        return "#1890ff";
      case "management":
        return "#fa8c16";
      case "development":
        return "#722ed1";
      default:
        return "#8c8c8c";
    }
  };

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">🔲 Interactive Grid Example</h4>

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
                Learn more about grid layout configuration options, advanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/grid-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 Grid Layout Documentation</span>
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
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Columns: {cols()}</label>
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={cols()}
            onInput={(e) => setCols(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Rows: {rows()}</label>
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={rows()}
            onInput={(e) => setRows(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Node Size: {nodeSize()}
          </label>
          <input
            type="range"
            min="20"
            max="50"
            step="5"
            value={nodeSize()}
            onInput={(e) => setNodeSize(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

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

        <div class="flex items-center">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={condense()}
              onChange={(e) => setCondense(e.target.checked)}
              class="mr-2"
            />
            Condense Layout
          </label>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy() || ""}
            onChange={(e) =>
              setSortBy(e.target.value === "" ? null : (e.target.value as "value" | "category"))
            }
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="">Default Order</option>
            <option value="value">By Performance</option>
            <option value="category">By Category</option>
          </select>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={gridData}
            width={600}
            height={450}
            layout={{
              type: "grid",
              cols: cols(),
              rows: rows(),
              preventOverlap: preventOverlap(),
              nodeSize: nodeSize(),
              condense: condense(),
              ...(sortBy() && { sortBy: sortBy() }),
            }}
            node={{
              style: (d) => ({
                fill: getCategoryColor(d.data?.category || "default"),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: nodeSize() / 2,
                labelText: `${d.data?.label}\n${d.data?.value}%`,
                labelFill: "#333333",
                labelFontSize: 9,
                labelFontWeight: "bold",
                labelPlacement: "center",
              }),
            }}
            edge={{
              style: {
                stroke: "#d9d9d9",
                lineWidth: 1,
                opacity: 0.4,
                strokeDasharray: [2, 2],
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Configuration Info */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">📊 Layout Benefits</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>• Perfect for matrix and table data</li>
            <li>• Consistent spacing and alignment</li>
            <li>• Easy to scan and compare</li>
            <li>• Supports custom positioning</li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>
              • Grid size: {cols()} × {rows()}
            </li>
            <li>• Node size: {nodeSize()}px</li>
            <li>• Overlap prevention: {preventOverlap() ? "ON" : "OFF"}</li>
            <li>• Layout style: {condense() ? "Condensed" : "Full canvas"}</li>
            <li>• Sort order: {sortBy() || "Default"}</li>
          </ul>
        </div>
      </div>

      {/* Department Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🏢 Department Categories</h5>
        <div class="flex flex-wrap gap-3">
          <For
            each={[
              { category: "revenue", color: "#52c41a", label: "Revenue" },
              { category: "operations", color: "#1890ff", label: "Operations" },
              { category: "management", color: "#fa8c16", label: "Management" },
              { category: "development", color: "#722ed1", label: "Development" },
            ]}
          >
            {(item) => (
              <div class="flex items-center text-xs">
                <div class="w-3 h-3 rounded-full mr-2" style={{ "background-color": item.color }} />
                <span class="text-gray-700">{item.label}</span>
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
  data={dashboardData}
  layout={{
    type: "grid",
    cols: ${cols()},                      // Number of columns
    rows: ${rows()},                      // Number of rows
    preventOverlap: ${preventOverlap()},         // Prevent node overlap
    nodeSize: ${nodeSize()},                   // Node size for collision detection
    condense: ${condense()},              // Use minimum space${
      sortBy() ? `\n    sortBy: "${sortBy()}",             // Sort nodes by property` : ""
    }
  }}
  node={{
    style: (d) => ({
      fill: getCategoryColor(d.data?.category),
      radius: ${nodeSize() / 2},
      labelText: \`\${d.data?.label}\\n\${d.data?.value}%\`,
      labelPlacement: "center",
    })
  }}
  edge={{
    style: {
      stroke: "#d9d9d9",
      strokeDasharray: [2, 2],
      opacity: 0.4,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
