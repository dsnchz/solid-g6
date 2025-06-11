import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const RadialExample = () => {
  const [unitRadius, setUnitRadius] = createSignal(80);
  const [linkLength, setLinkLength] = createSignal(100);
  const [maxIteration, setMaxIteration] = createSignal(1000);
  const [preventOverlap, setPreventOverlap] = createSignal(true);
  const [focusNode, setFocusNode] = createSignal("grandparent");

  // Sample family tree data for radial layout
  const familyData = createGraphData({
    nodes: [
      // Grandparents (root level)
      { id: "grandparent", data: { label: "Grandparents", level: 0 } },

      // Parents (level 1)
      { id: "parent1", data: { label: "Parent 1", level: 1 } },
      { id: "parent2", data: { label: "Parent 2", level: 1 } },
      { id: "aunt", data: { label: "Aunt", level: 1 } },
      { id: "uncle", data: { label: "Uncle", level: 1 } },

      // Children (level 2)
      { id: "child1", data: { label: "Child 1", level: 2 } },
      { id: "child2", data: { label: "Child 2", level: 2 } },
      { id: "child3", data: { label: "Child 3", level: 2 } },
      { id: "cousin1", data: { label: "Cousin 1", level: 2 } },
      { id: "cousin2", data: { label: "Cousin 2", level: 2 } },
      { id: "cousin3", data: { label: "Cousin 3", level: 2 } },

      // Grandchildren (level 3)
      { id: "grandchild1", data: { label: "Grandchild 1", level: 3 } },
      { id: "grandchild2", data: { label: "Grandchild 2", level: 3 } },
      { id: "grandchild3", data: { label: "Grandchild 3", level: 3 } },
    ],
    edges: [
      // Grandparent to parents
      { source: "grandparent", target: "parent1" },
      { source: "grandparent", target: "parent2" },
      { source: "grandparent", target: "aunt" },
      { source: "grandparent", target: "uncle" },

      // Parents to children
      { source: "parent1", target: "child1" },
      { source: "parent1", target: "child2" },
      { source: "parent2", target: "child3" },
      { source: "aunt", target: "cousin1" },
      { source: "aunt", target: "cousin2" },
      { source: "uncle", target: "cousin3" },

      // Children to grandchildren
      { source: "child1", target: "grandchild1" },
      { source: "child2", target: "grandchild2" },
      { source: "cousin1", target: "grandchild3" },
    ],
  });

  const availableNodes = [
    { id: "grandparent", label: "Grandparents" },
    { id: "parent1", label: "Parent 1" },
    { id: "parent2", label: "Parent 2" },
    { id: "aunt", label: "Aunt" },
    { id: "child1", label: "Child 1" },
  ];

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">🌳 Interactive Radial Example</h4>

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
                Learn more about radial layout configuration options, advanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/radial-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 Radial Layout Documentation</span>
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
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Unit Radius: {unitRadius()}
          </label>
          <input
            type="range"
            min="40"
            max="120"
            step="10"
            value={unitRadius()}
            onInput={(e) => setUnitRadius(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Link Length: {linkLength()}
          </label>
          <input
            type="range"
            min="50"
            max="150"
            step="10"
            value={linkLength()}
            onInput={(e) => setLinkLength(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Max Iterations: {maxIteration()}
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={maxIteration()}
            onInput={(e) => setMaxIteration(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Focus Node</label>
          <select
            value={focusNode()}
            onChange={(e) => setFocusNode(e.target.value)}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <For each={availableNodes}>
              {(node) => <option value={node.id}>{node.label}</option>}
            </For>
          </select>
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
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={familyData}
            width={600}
            height={450}
            layout={{
              type: "radial",
              focusNode: focusNode(),
              unitRadius: unitRadius(),
              linkLength: linkLength(),
              maxIteration: maxIteration(),
              preventOverlap: preventOverlap(),
            }}
            node={{
              style: {
                fill: "#ff4d4f",
                stroke: "#ffffff",
                lineWidth: 2,
                radius: 25,
                labelText: (d) => d.data?.label,
                labelFill: "#333333",
                labelFontSize: 10,
                labelFontWeight: "bold",
              },
            }}
            edge={{
              style: {
                stroke: "#8c8c8c",
                lineWidth: 2,
                opacity: 0.6,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Configuration Info */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-emerald-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-emerald-900 mb-2">🌳 Layout Features</h5>
          <ul class="text-xs text-emerald-800 space-y-1">
            <li>• Hierarchical tree structure</li>
            <li>• Nodes radiate from center outward</li>
            <li>• Distance shows relationship depth</li>
            <li>• Great for family trees & org charts</li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-purple-900 mb-2">🎯 Current Setup</h5>
          <ul class="text-xs text-purple-800 space-y-1">
            <li>• Focus: {availableNodes.find((n) => n.id === focusNode())?.label}</li>
            <li>• Unit radius: {unitRadius()}px per level</li>
            <li>• Link length: {linkLength()}px</li>
            <li>• Overlap prevention: {preventOverlap() ? "ON" : "OFF"}</li>
          </ul>
        </div>
      </div>

      {/* Level Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🎨 Family Tree Levels</h5>
        <div class="flex flex-wrap gap-3">
          <For
            each={[
              { level: 0, color: "#ff4d4f", label: "Grandparents" },
              { level: 1, color: "#fa8c16", label: "Parents/Aunts/Uncles" },
              { level: 2, color: "#fadb14", label: "Children/Cousins" },
              { level: 3, color: "#52c41a", label: "Grandchildren" },
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
  data={familyTreeData}
  layout={{
    type: "radial",
    center: "${focusNode()}",              // Root node ID
    unitRadius: ${unitRadius()},                 // Distance between levels
    linkLength: ${linkLength()},                 // Edge length
    maxIteration: ${maxIteration()},             // Layout iterations
    preventOverlap: ${preventOverlap()},         // Prevent node overlap
  }}
  node={{
    style: (d) => ({
      fill: getColorByLevel(d.data?.level),
      radius: getLevelSize(d.data?.level),
      labelText: d.data?.label,
      labelPlacement: "center",
    })
  }}
  edge={{
    style: {
      stroke: "#8c8c8c",
      lineWidth: 2,
      opacity: 0.6,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
