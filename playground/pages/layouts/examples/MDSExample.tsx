import { createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const MDSExample = () => {
  // Interactive controls
  const [linkDistance, setLinkDistance] = createSignal(100);
  const [centerX, setCenterX] = createSignal(300);
  const [centerY, setCenterY] = createSignal(300);
  const [nodeCount, setNodeCount] = createSignal(25);
  const [edgeCount, setEdgeCount] = createSignal(20);
  const [showLabels, setShowLabels] = createSignal(true);
  const [nodeSize, setNodeSize] = createSignal(32);

  // Generate data based on current settings
  const generateData = () => {
    const nodeCountValue = nodeCount();
    const edgeCountValue = Math.min(edgeCount(), nodeCountValue * 2); // Reasonable limit

    // Generate nodes with simulated high-dimensional data
    const nodes = Array.from({ length: nodeCountValue }, (_, i) => ({
      id: `data-point-${i}`,
      data: {
        // Simulate multi-dimensional data points
        dimension1: Math.random() * 100,
        dimension2: Math.random() * 100,
        dimension3: Math.random() * 100,
        category: Math.floor(Math.random() * 4), // 4 categories for color coding
        value: Math.random() * 100,
        label: `Point ${i + 1}`,
      },
    }));

    // Generate edges to create similarity relationships
    const edges = Array.from({ length: edgeCountValue }, (_, i) => {
      let source: string, target: string;

      // Ensure no self-loops and no duplicate edges
      do {
        source = `data-point-${Math.floor(Math.random() * nodeCountValue)}`;
        target = `data-point-${Math.floor(Math.random() * nodeCountValue)}`;
      } while (source === target);

      return {
        id: `similarity-${i}`,
        source,
        target,
        data: {
          weight: Math.random(),
          similarity: 0.5 + Math.random() * 0.5, // 0.5 to 1.0 similarity
        },
      };
    });

    return { nodes, edges };
  };

  // Color scheme for different categories
  const getCategoryColor = (category: number) => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"];
    return colors[category % colors.length];
  };

  // Create a signal to trigger data regeneration
  const [dataKey, setDataKey] = createSignal(0);

  // Create reactive data that regenerates when signals change
  const data = () => {
    dataKey(); // Subscribe to the trigger signal
    return createGraphData(generateData());
  };

  return (
    <div class="mt-6 bg-gray-50 rounded-lg p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          🧮 MDS (Multidimensional Scaling) Layout
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          MDS projects high-dimensional data into 2D space while preserving relative distances
          between data points. Perfect for data analysis and similarity visualization.
        </p>
      </div>

      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn more about MDS layout configuration options, algorithm details, and advanced
          examples for high-dimensional data visualization.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/mds-layout"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 MDS Layout Guide
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">
            Link Distance: {linkDistance()}px
          </label>
          <input
            type="range"
            min="30"
            max="200"
            step="10"
            value={linkDistance()}
            onInput={(e) => setLinkDistance(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Center X: {centerX()}</label>
          <input
            type="range"
            min="200"
            max="400"
            step="10"
            value={centerX()}
            onInput={(e) => setCenterX(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Center Y: {centerY()}</label>
          <input
            type="range"
            min="200"
            max="400"
            step="10"
            value={centerY()}
            onInput={(e) => setCenterY(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Node Size: {nodeSize()}px</label>
          <input
            type="range"
            min="16"
            max="48"
            step="4"
            value={nodeSize()}
            onInput={(e) => setNodeSize(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Data Points: {nodeCount()}</label>
          <input
            type="range"
            min="10"
            max="50"
            step="5"
            value={nodeCount()}
            onInput={(e) => setNodeCount(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-medium text-gray-700">Connections: {edgeCount()}</label>
          <input
            type="range"
            min="5"
            max="40"
            step="5"
            value={edgeCount()}
            onInput={(e) => setEdgeCount(parseInt(e.currentTarget.value))}
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="show-labels"
            checked={showLabels()}
            onChange={(e) => setShowLabels(e.currentTarget.checked)}
            class="mr-2"
          />
          <label for="show-labels" class="text-xs font-medium text-gray-700">
            Show Labels
          </label>
        </div>

        <button
          onClick={() => {
            setDataKey((prev) => prev + 1); // Trigger data regeneration
          }}
          class="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
        >
          🎲 Regenerate Data
        </button>
      </div>

      {/* Graph Visualization */}
      <div class="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
        <Graph
          data={data()}
          width={600}
          height={400}
          autoFit="view"
          layout={{
            type: "mds",
            center: [centerX(), centerY()],
            linkDistance: linkDistance(),
          }}
          node={{
            style: {
              size: nodeSize(),
              fill: (d) => getCategoryColor(d.data?.category ?? 0),
              stroke: "#fff",
              strokeWidth: 2,
              labelText: showLabels() ? (d) => d.data?.label || d.id : "",
              labelFill: "#333",
              labelFontSize: 10,
              labelBackground: true,
              labelBackgroundFill: "rgba(255, 255, 255, 0.8)",
              labelBackgroundRadius: 4,
              labelPadding: [2, 4],
            },
          }}
          edge={{
            style: {
              stroke: "#e0e0e0",
              strokeWidth: 1,
              strokeOpacity: 0.6,
              endArrow: false,
            },
          }}
          behaviors={["drag-element", "drag-canvas", "zoom-canvas"]}
        />
      </div>

      {/* Legend */}
      <div class="mt-4 flex items-center gap-4 text-xs">
        <span class="font-medium text-gray-700">Categories:</span>
        <For each={[0, 1, 2, 3]}>
          {(category) => (
            <div class="flex items-center gap-1">
              <div
                class="w-3 h-3 rounded-full"
                style={{ "background-color": getCategoryColor(category) }}
              />
              <span class="text-gray-600">Category {category + 1}</span>
            </div>
          )}
        </For>
      </div>

      {/* Use Cases & Documentation */}
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 class="font-semibold text-gray-900 mb-3">📊 Perfect Use Cases</h4>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Data Analysis:</strong> Visualize high-dimensional datasets
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Similarity Analysis:</strong> Show relationships between data points
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Market Research:</strong> Customer segmentation visualization
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Scientific Data:</strong> Genomic, chemical, or survey data
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-500">•</span>
              <span>
                <strong>Machine Learning:</strong> Feature space visualization
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 mb-3">⊕ Key Features</h4>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Distance Preservation:</strong> Maintains relative distances
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Dimensionality Reduction:</strong> Projects high-D to 2D
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Clustering Visualization:</strong> Natural grouping emergence
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Configurable Center:</strong> Adjustable layout origin
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-500">✓</span>
              <span>
                <strong>Link Distance Control:</strong> Spacing optimization
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
            <h5 class="text-sm font-medium text-gray-800 mb-2">Basic MDS Layout</h5>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
              <code>{`import { Graph, createGraphData } from "@dschz/solid-g6";

const data = createGraphData({
  nodes: [
    { id: "point-1", data: { value: 85.2, category: 0 } },
    { id: "point-2", data: { value: 76.8, category: 1 } },
    // ... more data points
  ],
  edges: [
    { id: "sim-1", source: "point-1", target: "point-2" },
    // ... similarity connections
  ]
});

export const MDSVisualization = () => (
  <Graph
    data={data}
    width={600}
    height={400}
    layout={{
      type: "mds",
      center: [300, 200],
      linkDistance: 100,
    }}
    node={{
      style: {
        size: 32,
        fill: "#4ecdc4",
        labelText: (d) => d.data?.label,
      }
    }}
    behaviors={["drag-element", "zoom-canvas"]}
  />
);`}</code>
            </pre>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-800 mb-2">Advanced Configuration</h5>
            <pre class="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
              <code>{`// Dynamic MDS with custom distance calculation
const mdsLayout = createGraphLayout({
  type: "mds",
  center: () => [width() / 2, height() / 2],
  linkDistance: (d) => d.data?.similarity * 150,
});

// With data preprocessing
const preprocessData = (rawData) => {
  // Calculate distance matrix from high-dimensional features
  const distances = calculateDistanceMatrix(rawData);
  
  return {
    nodes: rawData.map(item => ({
      id: item.id,
      data: {
        ...item,
        distanceMetric: distances[item.id]
      }
    })),
    edges: generateSimilarityEdges(distances)
  };
};`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Algorithm Information */}
      <div class="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <span class="text-blue-400 text-lg">🔬</span>
          </div>
          <div class="ml-3">
            <h4 class="text-blue-800 font-semibold mb-2">How MDS Works</h4>
            <p class="text-blue-800 text-sm">
              MDS constructs a distance matrix between all node pairs and uses optimization to
              position nodes in 2D space such that Euclidean distances approximate the original
              high-dimensional distances. The algorithm iteratively minimizes stress (difference
              between original and projected distances).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
