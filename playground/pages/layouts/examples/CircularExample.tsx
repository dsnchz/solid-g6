import { createSignal } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const CircularExample = () => {
  const [radius, setRadius] = createSignal(120);
  const [startAngle, setStartAngle] = createSignal(0);
  const [endAngle, setEndAngle] = createSignal(360);
  const [ordering, setOrdering] = createSignal<"topology" | "degree" | null>(null);

  // Sample data for circular layout - software development lifecycle
  const circularData = createGraphData({
    nodes: [
      { id: "planning", data: { label: "Planning" } },
      { id: "design", data: { label: "Design" } },
      { id: "development", data: { label: "Development" } },
      { id: "testing", data: { label: "Testing" } },
      { id: "deployment", data: { label: "Deployment" } },
      { id: "monitoring", data: { label: "Monitoring" } },
      { id: "feedback", data: { label: "Feedback" } },
      { id: "iteration", data: { label: "Iteration" } },
    ],
    edges: [
      { source: "planning", target: "design" },
      { source: "design", target: "development" },
      { source: "development", target: "testing" },
      { source: "testing", target: "deployment" },
      { source: "deployment", target: "monitoring" },
      { source: "monitoring", target: "feedback" },
      { source: "feedback", target: "iteration" },
      { source: "iteration", target: "planning" },
      // Some cross-connections to show flexibility
      { source: "testing", target: "development" },
      { source: "feedback", target: "design" },
    ],
  });

  return (
    <div class="mt-4 border-t border-gray-200 pt-4">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">🔄 Interactive Circular Example</h4>

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
                Learn more about circular layout configuration options, advanced features, and
                additional examples.
              </p>
              <a
                href="https://g6.antv.antgroup.com/en/manual/layout/build-in/circular-layout"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-xs text-indigo-700 hover:text-indigo-900 underline font-medium"
              >
                <span>G6 Circular Layout Documentation</span>
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Radius: {radius()}</label>
          <input
            type="range"
            min="80"
            max="200"
            step="10"
            value={radius()}
            onInput={(e) => setRadius(parseInt(e.target.value))}
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

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">
            End Angle: {endAngle()}°
          </label>
          <input
            type="range"
            min="90"
            max="360"
            step="15"
            value={endAngle()}
            onInput={(e) => setEndAngle(parseInt(e.target.value))}
            class="w-full"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Ordering</label>
          <select
            value={ordering() || ""}
            onChange={(e) =>
              setOrdering(e.target.value === "" ? null : (e.target.value as "topology" | "degree"))
            }
            class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          >
            <option value="">Default</option>
            <option value="topology">Topology</option>
            <option value="degree">By Degree</option>
          </select>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <div class="bg-white rounded border shadow-sm">
          <Graph
            data={circularData}
            width={500}
            height={400}
            layout={{
              type: "circular",
              radius: radius(),
              startAngle: (startAngle() * Math.PI) / 180,
              endAngle: (endAngle() * Math.PI) / 180,
              ...(ordering() && { ordering: ordering() }),
            }}
            node={{
              style: {
                fill: "#ff7875",
                stroke: "#ffffff",
                lineWidth: 2,
                radius: 25,
                labelText: (d) => d.data?.label,
                labelFill: "#333333",
                labelFontSize: 10,
                labelFontWeight: "bold",
                labelPlacement: "center",
              },
            }}
            edge={{
              style: {
                stroke: "#666666",
                lineWidth: 2,
                endArrow: true,
                endArrowSize: 6,
                opacity: 0.7,
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element"]}
          />
        </div>
      </div>

      {/* Configuration Info */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-blue-900 mb-2">💡 Layout Tips</h5>
          <ul class="text-xs text-blue-800 space-y-1">
            <li>• Perfect for cyclical processes</li>
            <li>• Shows equal node importance</li>
            <li>• Partial circles highlight segments</li>
            <li>• Try different orderings for clarity</li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">🎯 Current Config</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>• Circle size: {radius()}px radius</li>
            <li>
              • Arc span: {endAngle() - startAngle()}°
              {endAngle() - startAngle() < 360 ? " (partial)" : " (full)"}
            </li>
            <li>• Node ordering: {ordering() || "default"}</li>
            <li>• 8 nodes in cycle</li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <div>
        <h5 class="text-xs font-semibold text-gray-900 mb-2">📄 Code Example</h5>
        <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
          <code>{`<Graph
  data={cyclicalData}
  layout={{
    type: "circular",
    radius: ${radius()},                    // Circle size in pixels
    startAngle: ${((startAngle() * Math.PI) / 180).toFixed(2)},    // Start position (radians)
    endAngle: ${((endAngle() * Math.PI) / 180).toFixed(2)},        // End position (radians)${
      ordering() ? `\n    ordering: "${ordering()}",           // Node ordering method` : ""
    }
  }}
  node={{
    style: {
      fill: "#ff7875",
      radius: 25,
      labelText: (d) => d.data?.label,
      labelPlacement: "center",
    }
  }}
  edge={{
    style: {
      endArrow: true,
      opacity: 0.7,
    }
  }}
/>`}</code>
        </pre>
      </div>
    </div>
  );
};
