import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const SnakeExample = () => {
  // Interactive controls
  const [clockwise, setClockwise] = createSignal(true);
  const [cols, setCols] = createSignal(4);
  const [colGap, setColGap] = createSignal(30);
  const [rowGap, setRowGap] = createSignal(30);
  const [padding, setPadding] = createSignal(15);
  const [nodeSize, setNodeSize] = createSignal(30);
  const [workflowType, setWorkflowType] = createSignal<
    "approval" | "production" | "api" | "simple"
  >("approval");

  // Generate workflow data based on selected type
  const generateWorkflowData = () => {
    const workflows = {
      simple: {
        title: "Simple Sequential Process",
        steps: Array.from({ length: 16 }, (_, i) => ({
          id: `step-${i}`,
          label: `Step ${i + 1}`,
          category: "process",
          description: `Process step ${i + 1}`,
        })),
      },
      approval: {
        title: "Document Approval Workflow",
        steps: [
          {
            id: "submit",
            label: "Submit\nRequest",
            category: "start",
            description: "Initial document submission",
          },
          {
            id: "validate",
            label: "Validate\nForm",
            category: "validation",
            description: "Check form completeness",
          },
          {
            id: "dept-review",
            label: "Department\nReview",
            category: "review",
            description: "Department head review",
          },
          {
            id: "legal-check",
            label: "Legal\nReview",
            category: "review",
            description: "Legal compliance check",
          },
          {
            id: "finance-check",
            label: "Finance\nReview",
            category: "review",
            description: "Budget approval",
          },
          {
            id: "manager-approve",
            label: "Manager\nApproval",
            category: "approval",
            description: "Direct manager approval",
          },
          {
            id: "director-approve",
            label: "Director\nApproval",
            category: "approval",
            description: "Director level approval",
          },
          {
            id: "ceo-approve",
            label: "CEO\nApproval",
            category: "approval",
            description: "Final executive approval",
          },
          {
            id: "process-docs",
            label: "Process\nDocuments",
            category: "processing",
            description: "Document processing",
          },
          {
            id: "notify-team",
            label: "Notify\nTeam",
            category: "processing",
            description: "Team notification",
          },
          {
            id: "archive",
            label: "Archive\nRecord",
            category: "processing",
            description: "Record archival",
          },
          { id: "complete", label: "Complete", category: "end", description: "Process completion" },
        ],
      },
      production: {
        title: "Manufacturing Production Line",
        steps: [
          {
            id: "raw-materials",
            label: "Raw\nMaterials",
            category: "input",
            description: "Material intake",
          },
          {
            id: "quality-input",
            label: "Input\nQuality Check",
            category: "quality",
            description: "Material quality inspection",
          },
          {
            id: "preparation",
            label: "Material\nPreparation",
            category: "process",
            description: "Material preparation",
          },
          {
            id: "stage1",
            label: "Assembly\nStage 1",
            category: "assembly",
            description: "Initial assembly",
          },
          {
            id: "stage2",
            label: "Assembly\nStage 2",
            category: "assembly",
            description: "Secondary assembly",
          },
          {
            id: "stage3",
            label: "Assembly\nStage 3",
            category: "assembly",
            description: "Final assembly",
          },
          {
            id: "quality-mid",
            label: "Mid-Process\nQC",
            category: "quality",
            description: "Mid-process quality control",
          },
          {
            id: "testing",
            label: "Product\nTesting",
            category: "testing",
            description: "Product functionality testing",
          },
          {
            id: "calibration",
            label: "Calibration",
            category: "testing",
            description: "Precision calibration",
          },
          {
            id: "quality-final",
            label: "Final\nQuality Check",
            category: "quality",
            description: "Final quality inspection",
          },
          {
            id: "packaging",
            label: "Packaging",
            category: "output",
            description: "Product packaging",
          },
          {
            id: "labeling",
            label: "Labeling\n& Marking",
            category: "output",
            description: "Product labeling",
          },
          {
            id: "shipping",
            label: "Shipping\nPrep",
            category: "output",
            description: "Shipping preparation",
          },
          { id: "dispatch", label: "Dispatch", category: "end", description: "Product dispatch" },
        ],
      },
      api: {
        title: "API Request Processing Chain",
        steps: [
          {
            id: "client",
            label: "Client\nRequest",
            category: "start",
            description: "Initial client request",
          },
          {
            id: "load-balancer",
            label: "Load\nBalancer",
            category: "routing",
            description: "Request routing",
          },
          {
            id: "api-gateway",
            label: "API\nGateway",
            category: "routing",
            description: "Gateway processing",
          },
          {
            id: "auth",
            label: "Authentication",
            category: "security",
            description: "User authentication",
          },
          {
            id: "authorization",
            label: "Authorization",
            category: "security",
            description: "Permission validation",
          },
          {
            id: "rate-limit",
            label: "Rate\nLimiting",
            category: "security",
            description: "Rate limit check",
          },
          {
            id: "validation",
            label: "Input\nValidation",
            category: "validation",
            description: "Request validation",
          },
          {
            id: "business-logic",
            label: "Business\nLogic",
            category: "processing",
            description: "Core business logic",
          },
          {
            id: "database",
            label: "Database\nQuery",
            category: "data",
            description: "Data persistence",
          },
          {
            id: "cache",
            label: "Cache\nOperation",
            category: "data",
            description: "Cache management",
          },
          {
            id: "response-format",
            label: "Format\nResponse",
            category: "processing",
            description: "Response formatting",
          },
          {
            id: "logging",
            label: "Audit\nLogging",
            category: "monitoring",
            description: "Request logging",
          },
          {
            id: "metrics",
            label: "Metrics\nCollection",
            category: "monitoring",
            description: "Performance metrics",
          },
          {
            id: "response",
            label: "Client\nResponse",
            category: "end",
            description: "Final response",
          },
        ],
      },
    };

    const workflow = workflows[workflowType()];
    const nodes = workflow.steps.map((step) => ({
      id: step.id,
      data: {
        label: step.label,
        category: step.category,
        description: step.description,
        workflow: workflow.title,
      },
    }));

    const edges = workflow.steps.slice(0, -1).map((step, i) => ({
      id: `edge-${i}`,
      source: step.id,
      target: workflow.steps[i + 1]?.id ?? "",
      data: {
        step: i + 1,
        flow: "sequential",
      },
    }));

    return { nodes, edges, title: workflow.title };
  };

  // Create a signal to trigger data regeneration
  const [dataKey, setDataKey] = createSignal(0);

  // Create reactive data that regenerates when workflow type changes
  const data = () => {
    dataKey(); // Subscribe to the trigger signal
    return createGraphData(generateWorkflowData());
  };

  // Color scheme for different categories
  const getCategoryColor = (category: string) => {
    const colors = {
      start: "#52c41a", // Green
      end: "#ff4d4f", // Red
      process: "#1890ff", // Blue
      approval: "#722ed1", // Purple
      review: "#fa8c16", // Orange
      validation: "#13c2c2", // Cyan
      quality: "#eb2f96", // Magenta
      assembly: "#2f54eb", // Blue variant
      testing: "#faad14", // Gold
      output: "#52c41a", // Green variant
      routing: "#1890ff", // Blue
      security: "#ff4d4f", // Red variant
      processing: "#722ed1", // Purple variant
      data: "#13c2c2", // Cyan variant
      monitoring: "#fa8c16", // Orange variant
      input: "#52c41a", // Green
    };
    return colors[category as keyof typeof colors] || "#8c8c8c"; // Default gray
  };

  const currentWorkflowData = createMemo(() => generateWorkflowData());

  return (
    <div class="mt-6 bg-gray-50 rounded-lg p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">🐍 Snake Layout</h3>
        <p class="text-gray-600 text-sm mb-4">
          Snake layout efficiently displays long sequential processes in limited space using an
          S-shaped arrangement. Perfect for workflows, process chains, and linear hierarchies.
        </p>
      </div>

      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn more about Snake layout configuration options, clockwise arrangements, and examples
          for sequential process visualization.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/snake"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 Snake Layout Guide
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

      {/* Algorithm Information */}
      <div class="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span class="text-blue-400 text-lg">🔄</span>
          </div>
          <div class="ml-3">
            <h4 class="text-blue-800 font-semibold mb-2">How Snake Layout Works</h4>
            <p class="text-blue-800 text-sm">
              Snake layout arranges nodes in an S-shaped pattern: the first row flows left-to-right,
              the second row flows right-to-left, and so on. This creates a continuous serpentine
              path that maximizes space efficiency while maintaining the sequential relationship
              between connected nodes. The clockwise parameter controls the starting direction.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Type Selector */}
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Choose Workflow Scenario:
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <For
            each={[
              { key: "simple", label: "Simple Process", icon: "🔢", desc: "16-step sequence" },
              { key: "approval", label: "Approval Flow", icon: "📋", desc: "Document approval" },
              { key: "production", label: "Production Line", icon: "🏭", desc: "Manufacturing" },
              { key: "api", label: "API Processing", icon: "🔗", desc: "Request pipeline" },
            ]}
          >
            {(workflow) => (
              <button
                onClick={() => {
                  setWorkflowType(workflow.key as "approval" | "production" | "api" | "simple");
                  setDataKey((prev) => prev + 1);
                }}
                class={`p-2 text-xs border rounded-lg transition-colors ${
                  workflowType() === workflow.key
                    ? "bg-blue-100 border-blue-300 text-blue-800"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div class="text-center">
                  <div class="text-lg mb-1">{workflow.icon}</div>
                  <div class="font-semibold">{workflow.label}</div>
                  <div class="text-gray-600">{workflow.desc}</div>
                </div>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Interactive Controls */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-3 bg-white rounded border">
        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Columns: {cols()}</label>
          <input
            type="range"
            min="2"
            max="8"
            step="1"
            value={cols()}
            onInput={(e) => setCols(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Column Gap: {colGap()}px</label>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={colGap()}
            onInput={(e) => setColGap(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Row Gap: {rowGap()}px</label>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={rowGap()}
            onInput={(e) => setRowGap(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Padding: {padding()}px</label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={padding()}
            onInput={(e) => setPadding(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Node Size: {nodeSize()}px</label>
          <input
            type="range"
            min="20"
            max="50"
            step="2"
            value={nodeSize()}
            onInput={(e) => setNodeSize(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="clockwise"
            checked={clockwise()}
            onChange={(e) => setClockwise(e.currentTarget.checked)}
            class="mr-2"
          />
          <label for="clockwise" class="text-xs font-medium text-gray-700">
            Clockwise Direction
          </label>
        </div>
      </div>

      {/* Current Workflow Info */}
      <div class="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
        <h4 class="text-sm font-semibold text-blue-900 mb-1">
          Current Workflow: {currentWorkflowData()?.title}
        </h4>
        <div class="text-xs text-blue-800">
          <span class="font-medium">{currentWorkflowData()?.nodes.length} steps</span> •
          <span class="ml-1">
            Arranged in <strong>{cols()} columns</strong>
          </span>{" "}
          •
          <span class="ml-1">
            Direction: <strong>{clockwise() ? "Clockwise (↘)" : "Counter-clockwise (↙)"}</strong>
          </span>
        </div>
      </div>

      {/* Graph Visualization */}
      <div class="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
        <Graph
          data={data()}
          width={700}
          height={500}
          autoFit="center"
          layout={{
            type: "snake",
            clockwise: clockwise(),
            cols: cols(),
            colGap: colGap(),
            rowGap: rowGap(),
            padding: padding(),
            nodeSize: nodeSize(),
          }}
          node={{
            style: {
              size: nodeSize(),
              fill: (d) => getCategoryColor(d.data?.category ?? "process"),
              stroke: "#fff",
              strokeWidth: 2,
              labelText: (d) => d.data?.label || d.id,
              labelFill: "#fff",
              labelFontSize: 9,
              labelFontWeight: "bold",
              labelPlacement: "center",
            },
          }}
          edge={{
            style: {
              stroke: "#8c8c8c",
              strokeWidth: 2,
              endArrow: true,
              endArrowSize: 8,
              strokeOpacity: 0.8,
            },
          }}
          behaviors={["drag-canvas", "zoom-canvas"]}
        />
      </div>

      {/* Legend */}
      <div class="mt-4 text-xs">
        <span class="font-medium text-gray-700 block mb-2">Process Categories:</span>
        <div class="flex flex-wrap gap-2">
          <For each={Array.from(new Set(currentWorkflowData()?.nodes.map((n) => n.data.category)))}>
            {(category) => (
              <div class="flex items-center gap-1">
                <div
                  class="w-3 h-3 rounded-full"
                  style={{ "background-color": getCategoryColor(category) }}
                />
                <span class="text-gray-600 capitalize">{category.replace("-", " ")}</span>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Use Cases & Features */}
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 class="font-semibold text-gray-900 mb-3">🎯 Perfect Use Cases</h4>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Long Process Flows:</strong> Approval workflows, production pipelines
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Sequential Operations:</strong> Manufacturing steps, API processing chains
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Space-Constrained Layouts:</strong> Compact visualization of linear
                hierarchies
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Timeline Visualization:</strong> Project phases, process stages
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Directory Trees:</strong> File system hierarchies, dependency chains
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-3">⚡ Key Features</h4>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>S-Shaped Arrangement:</strong> Efficient space utilization
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Clockwise/Counter-clockwise:</strong> Flexible direction control
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Column Configuration:</strong> Adjustable grid structure
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Gap Control:</strong> Customizable spacing between elements
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Linear Chain Support:</strong> Maintains sequential flow clarity
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <div class="mt-6">
        <h4 class="font-semibold text-gray-900 mb-3">💻 Code Examples</h4>

        <div class="space-y-4">
          <div>
            <h5 class="text-sm font-medium text-gray-800 mb-2">Basic Snake Layout</h5>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
              <code>{`import { Graph, createGraphData } from "@dschz/solid-g6";

// Create sequential data (linear chain)
const workflowData = createGraphData({
  nodes: [
    { id: "start", data: { label: "Start Process" } },
    { id: "step1", data: { label: "Step 1" } },
    { id: "step2", data: { label: "Step 2" } },
    // ... more sequential steps
    { id: "end", data: { label: "Complete" } }
  ],
  edges: [
    { source: "start", target: "step1" },
    { source: "step1", target: "step2" },
    // ... sequential connections
  ]
});

export const SnakeWorkflow = () => (
  <Graph
    data={workflowData}
    width={600}
    height={400}
    layout={{
      type: "snake",
      clockwise: true,
      cols: 4,
      colGap: 30,
      rowGap: 30,
      nodeSize: 32,
    }}
    node={{
      style: {
        labelText: (d) => d.data?.label,
        labelPlacement: "center",
      }
    }}
    behaviors={["drag-canvas", "zoom-canvas"]}
  />
);`}</code>
            </pre>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-800 mb-2">Advanced Configuration</h5>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
              <code>{`// Dynamic snake layout with responsive columns
const responsiveSnakeLayout = () => ({
  type: "snake",
  clockwise: screenWidth() > 768 ? true : false,
  cols: Math.floor(screenWidth() / 150), // Responsive columns
  colGap: screenWidth() > 768 ? 40 : 20,
  rowGap: screenWidth() > 768 ? 40 : 20,
  padding: [20, 40, 20, 40], // [top, right, bottom, left]
  nodeSize: (node) => node.data?.priority === "high" ? 40 : 30,
});

// Category-based styling
const getCategoryStyle = (category) => ({
  fill: categoryColors[category],
  stroke: "#fff",
  strokeWidth: 2,
  labelFill: category === "critical" ? "#fff" : "#333",
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
