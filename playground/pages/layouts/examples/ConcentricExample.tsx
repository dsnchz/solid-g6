import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const ConcentricExample = () => {
  const [sortBy, setSortBy] = createSignal<"level" | "importance" | "degree">("level");
  const [clockwise, setClockwise] = createSignal(false);
  const [equidistant, setEquidistant] = createSignal(false);
  const [preventOverlap, setPreventOverlap] = createSignal(true);
  const [nodeSize, setNodeSize] = createSignal(32);
  const [nodeSpacing, setNodeSpacing] = createSignal(10);
  const [startAngle, setStartAngle] = createSignal(270); // degrees, converted to radians

  // Sample data for concentric layout - security clearance system
  const concentricData = createGraphData({
    nodes: [
      // Level 0 - Top Secret (Center)
      { id: "ceo", data: { label: "CEO", level: 0, importance: 100, clearance: "Top Secret" } },

      // Level 1 - Secret
      { id: "cto", data: { label: "CTO", level: 1, importance: 90, clearance: "Secret" } },
      { id: "ciso", data: { label: "CISO", level: 1, importance: 95, clearance: "Secret" } },
      { id: "cfo", data: { label: "CFO", level: 1, importance: 85, clearance: "Secret" } },

      // Level 2 - Confidential
      {
        id: "dev-lead",
        data: { label: "Dev Lead", level: 2, importance: 75, clearance: "Confidential" },
      },
      {
        id: "sec-arch",
        data: { label: "Security\nArchitect", level: 2, importance: 80, clearance: "Confidential" },
      },
      {
        id: "fin-ctrl",
        data: {
          label: "Financial\nController",
          level: 2,
          importance: 70,
          clearance: "Confidential",
        },
      },
      {
        id: "sys-admin",
        data: { label: "System\nAdmin", level: 2, importance: 78, clearance: "Confidential" },
      },
      {
        id: "data-sci",
        data: { label: "Data\nScientist", level: 2, importance: 72, clearance: "Confidential" },
      },

      // Level 3 - Public/General Access
      {
        id: "frontend",
        data: { label: "Frontend\nDev", level: 3, importance: 60, clearance: "Public" },
      },
      {
        id: "backend",
        data: { label: "Backend\nDev", level: 3, importance: 65, clearance: "Public" },
      },
      {
        id: "designer",
        data: { label: "UI/UX\nDesigner", level: 3, importance: 55, clearance: "Public" },
      },
      { id: "qa", data: { label: "QA\nEngineer", level: 3, importance: 58, clearance: "Public" } },
      {
        id: "support",
        data: { label: "Customer\nSupport", level: 3, importance: 50, clearance: "Public" },
      },
      {
        id: "marketing",
        data: { label: "Marketing\nSpec", level: 3, importance: 52, clearance: "Public" },
      },
      { id: "sales", data: { label: "Sales\nRep", level: 3, importance: 48, clearance: "Public" } },
      { id: "intern", data: { label: "Intern", level: 3, importance: 40, clearance: "Public" } },
    ],
    edges: [
      // CEO connections
      { source: "ceo", target: "cto" },
      { source: "ceo", target: "ciso" },
      { source: "ceo", target: "cfo" },

      // CTO connections
      { source: "cto", target: "dev-lead" },
      { source: "cto", target: "sys-admin" },
      { source: "cto", target: "data-sci" },

      // CISO connections
      { source: "ciso", target: "sec-arch" },
      { source: "ciso", target: "sys-admin" },

      // CFO connections
      { source: "cfo", target: "fin-ctrl" },

      // Dev lead connections
      { source: "dev-lead", target: "frontend" },
      { source: "dev-lead", target: "backend" },
      { source: "dev-lead", target: "qa" },

      // Other connections
      { source: "sys-admin", target: "backend" },
      { source: "sec-arch", target: "qa" },
      { source: "data-sci", target: "backend" },
      { source: "fin-ctrl", target: "support" },
      { source: "designer", target: "frontend" },
      { source: "marketing", target: "sales" },
      { source: "support", target: "sales" },
    ],
  });

  const getClearanceColor = (clearance: string) => {
    switch (clearance) {
      case "Top Secret":
        return "#f5222d"; // Red
      case "Secret":
        return "#fa8c16"; // Orange
      case "Confidential":
        return "#fadb14"; // Yellow
      case "Public":
        return "#52c41a"; // Green
      default:
        return "#8c8c8c";
    }
  };

  const getLevelSize = (level: number) => {
    const baseSize = nodeSize();
    switch (level) {
      case 0:
        return baseSize + 8; // CEO larger
      case 1:
        return baseSize + 4; // Executives
      case 2:
        return baseSize + 2; // Managers
      case 3:
        return baseSize; // Staff
      default:
        return baseSize;
    }
  };

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">🎯 Interactive Concentric Example</h4>

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
                Learn more about concentric layout configuration options, advanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/concentric-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 Concentric Layout Documentation</span>
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
          <label class="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy()}
            onChange={(e) => setSortBy(e.target.value as "level" | "importance" | "degree")}
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="level">Clearance Level</option>
            <option value="importance">Importance Score</option>
            <option value="degree">Connection Degree</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Node Size: {nodeSize()}
          </label>
          <input
            type="range"
            min="20"
            max="50"
            step="2"
            value={nodeSize()}
            onInput={(e) => setNodeSize(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Ring Spacing: {nodeSpacing()}
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={nodeSpacing()}
            onInput={(e) => setNodeSpacing(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            Start Angle: {startAngle()}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={startAngle()}
            onInput={(e) => setStartAngle(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={clockwise()}
              onChange={(e) => setClockwise(e.target.checked)}
              class="mr-2"
            />
            Clockwise
          </label>
          <label class="flex items-center text-xs text-gray-700">
            <input
              type="checkbox"
              checked={equidistant()}
              onChange={(e) => setEquidistant(e.target.checked)}
              class="mr-2"
            />
            Equal Distance
          </label>
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
            data={concentricData}
            width={600}
            height={500}
            layout={{
              type: "concentric",
              sortBy: sortBy(),
              clockwise: clockwise(),
              equidistant: equidistant(),
              preventOverlap: preventOverlap(),
              nodeSize: nodeSize(),
              nodeSpacing: nodeSpacing(),
              startAngle: (startAngle() * Math.PI) / 180,
            }}
            node={{
              style: (d) => ({
                fill: getClearanceColor(d.data?.clearance || "Public"),
                stroke: "#ffffff",
                lineWidth: 2,
                radius: getLevelSize(d.data?.level || 3) / 2,
                labelText: d.data?.label,
                labelFill: "#333333",
                labelFontSize: 9,
                labelFontWeight: "bold",
                labelPlacement: "center",
              }),
            }}
            edge={{
              style: {
                stroke: "#bfbfbf",
                lineWidth: 1.5,
                opacity: 0.6,
                endArrow: true,
                endArrowSize: 6,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Configuration Info */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-red-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-red-900 mb-2">🔒 Security Features</h5>
          <ul class="text-xs text-red-800 space-y-1">
            <li>• Center = Highest security clearance</li>
            <li>• Outer rings = Lower access levels</li>
            <li>• Natural hierarchy visualization</li>
            <li>• Quick security assessment</li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>• Sort method: {sortBy()}</li>
            <li>• Direction: {clockwise() ? "Clockwise" : "Counter-clockwise"}</li>
            <li>• Ring spacing: {equidistant() ? "Equal" : "Variable"}</li>
            <li>• Start position: {startAngle()}° angle</li>
          </ul>
        </div>
      </div>

      {/* Clearance Legend */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">🏛️ Security Clearance Levels</h5>
        <div class="flex flex-wrap gap-3">
          <For
            each={[
              { level: "Top Secret", color: "#f5222d", description: "CEO Level - Ultimate Access" },
              {
                level: "Secret",
                color: "#fa8c16",
                description: "Executive Level - Strategic Access",
              },
              {
                level: "Confidential",
                color: "#fadb14",
                description: "Management Level - Operational Access",
              },
              { level: "Public", color: "#52c41a", description: "Staff Level - General Access" },
            ]}
          >
            {(item) => (
              <div class="flex items-center text-xs bg-white rounded border p-2">
                <div
                  class="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ "background-color": item.color }}
                />
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-900">{item.level}</span>
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
  data={securityData}
  layout={{
    type: "concentric",
    sortBy: "${sortBy()}",           // Property to sort by (higher = center)
    clockwise: ${clockwise()},              // Layout direction
    equidistant: ${equidistant()},          // Equal ring spacing
    preventOverlap: ${preventOverlap()},    // Collision detection
    nodeSize: ${nodeSize()},                     // Base node size
    nodeSpacing: ${nodeSpacing()},                   // Ring separation
    startAngle: ${((startAngle() * Math.PI) / 180).toFixed(2)},      // Starting angle (radians)
  }}
  node={{
    style: (d) => ({
      fill: getClearanceColor(d.data?.clearance),
      radius: getLevelSize(d.data?.level),
      labelText: d.data?.label,
      labelPlacement: "center",
    })
  }}
  edge={{
    style: {
      stroke: "#bfbfbf",
      endArrow: true,
      opacity: 0.6,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
