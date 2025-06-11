import { createMemo, createSignal, For } from "solid-js";

import { createGraphData, Graph } from "../../../../src";

export const D3ForceExample = () => {
  // Interactive controls for different forces
  const [linkDistance, setLinkDistance] = createSignal(80);
  const [linkStrength, setLinkStrength] = createSignal(0.5);
  const [manyBodyStrength, setManyBodyStrength] = createSignal(-50);
  const [centerStrength, setCenterStrength] = createSignal(0.1);
  const [collideRadius, setCollideRadius] = createSignal(20);
  const [collideStrength, setCollideStrength] = createSignal(0.8);
  const [enableRadial, setEnableRadial] = createSignal(false);
  const [radialRadius, setRadialRadius] = createSignal(100);
  const [radialStrength, setRadialStrength] = createSignal(0.3);

  // Layout configuration
  const [iterations, setIterations] = createSignal(300);
  const [alpha, setAlpha] = createSignal(1);

  // Demo scenarios
  const [scenario, setScenario] = createSignal<"teams" | "social" | "molecules">("teams");

  // Generate different demo scenarios
  const createScenarioData = () => {
    switch (scenario()) {
      case "teams":
        return createGraphData({
          nodes: [
            // Team A - Frontend
            { id: "A1", data: { label: "Frontend Lead", team: "A", size: 35, isLeader: true } },
            { id: "A2", data: { label: "React Dev", team: "A", size: 25, isLeader: false } },
            { id: "A3", data: { label: "Vue Dev", team: "A", size: 25, isLeader: false } },
            { id: "A4", data: { label: "UI Designer", team: "A", size: 20, isLeader: false } },

            // Team B - Backend
            { id: "B1", data: { label: "Backend Lead", team: "B", size: 35, isLeader: true } },
            { id: "B2", data: { label: "API Dev", team: "B", size: 25, isLeader: false } },
            { id: "B3", data: { label: "DB Admin", team: "B", size: 25, isLeader: false } },
            { id: "B4", data: { label: "DevOps", team: "B", size: 20, isLeader: false } },

            // Team C - Data Science
            { id: "C1", data: { label: "Data Lead", team: "C", size: 35, isLeader: true } },
            { id: "C2", data: { label: "ML Engineer", team: "C", size: 25, isLeader: false } },
            { id: "C3", data: { label: "Data Analyst", team: "C", size: 25, isLeader: false } },
            { id: "C4", data: { label: "Researcher", team: "C", size: 20, isLeader: false } },

            // Cross-functional roles
            { id: "PM", data: { label: "Product Manager", team: "X", size: 30, isLeader: true } },
            { id: "QA", data: { label: "QA Lead", team: "X", size: 25, isLeader: false } },
          ],
          edges: [
            // Team A internal connections
            { source: "A1", target: "A2" },
            { source: "A1", target: "A3" },
            { source: "A1", target: "A4" },
            { source: "A2", target: "A3" },

            // Team B internal connections
            { source: "B1", target: "B2" },
            { source: "B1", target: "B3" },
            { source: "B1", target: "B4" },
            { source: "B2", target: "B3" },

            // Team C internal connections
            { source: "C1", target: "C2" },
            { source: "C1", target: "C3" },
            { source: "C1", target: "C4" },
            { source: "C2", target: "C3" },

            // Cross-team leadership connections
            { source: "PM", target: "A1" },
            { source: "PM", target: "B1" },
            { source: "PM", target: "C1" },

            // Cross-team working connections
            { source: "A2", target: "B2" }, // Frontend-Backend API integration
            { source: "B3", target: "C2" }, // Database-ML data pipeline
            { source: "QA", target: "A1" },
            { source: "QA", target: "B1" },
          ],
        });

      case "social":
        return createGraphData({
          nodes: [
            // Influencers
            {
              id: "inf1",
              data: { label: "Tech Influencer", team: "influencer", size: 40, isLeader: true },
            },
            {
              id: "inf2",
              data: { label: "Design Guru", team: "influencer", size: 35, isLeader: true },
            },

            // Tech Community
            { id: "dev1", data: { label: "Senior Dev", team: "tech", size: 30, isLeader: false } },
            { id: "dev2", data: { label: "Junior Dev", team: "tech", size: 20, isLeader: false } },
            {
              id: "dev3",
              data: { label: "Startup Founder", team: "tech", size: 35, isLeader: true },
            },
            { id: "dev4", data: { label: "Open Source", team: "tech", size: 25, isLeader: false } },

            // Design Community
            {
              id: "des1",
              data: { label: "UX Designer", team: "design", size: 25, isLeader: false },
            },
            {
              id: "des2",
              data: { label: "Visual Artist", team: "design", size: 20, isLeader: false },
            },
            {
              id: "des3",
              data: { label: "Design Lead", team: "design", size: 30, isLeader: true },
            },
            {
              id: "des4",
              data: { label: "Illustrator", team: "design", size: 20, isLeader: false },
            },

            // Business Community
            { id: "biz1", data: { label: "CEO", team: "business", size: 35, isLeader: true } },
            {
              id: "biz2",
              data: { label: "Marketing Dir", team: "business", size: 25, isLeader: false },
            },
            {
              id: "biz3",
              data: { label: "Sales Rep", team: "business", size: 20, isLeader: false },
            },
          ],
          edges: [
            // Influencer connections
            { source: "inf1", target: "dev1" },
            { source: "inf1", target: "dev3" },
            { source: "inf1", target: "dev4" },
            { source: "inf2", target: "des1" },
            { source: "inf2", target: "des3" },

            // Tech community
            { source: "dev1", target: "dev2" },
            { source: "dev1", target: "dev4" },
            { source: "dev3", target: "dev1" },
            { source: "dev3", target: "biz1" },

            // Design community
            { source: "des3", target: "des1" },
            { source: "des3", target: "des2" },
            { source: "des1", target: "des4" },

            // Business community
            { source: "biz1", target: "biz2" },
            { source: "biz2", target: "biz3" },

            // Cross-community bridges
            { source: "dev1", target: "des1" },
            { source: "des3", target: "biz2" },
            { source: "inf1", target: "inf2" },
          ],
        });

      case "molecules":
        return createGraphData({
          nodes: [
            // Molecule center
            {
              id: "center",
              data: { label: "Central Atom", team: "center", size: 40, isLeader: true },
            },

            // Inner ring atoms
            { id: "inner1", data: { label: "O", team: "inner", size: 25, isLeader: false } },
            { id: "inner2", data: { label: "N", team: "inner", size: 25, isLeader: false } },
            { id: "inner3", data: { label: "C", team: "inner", size: 25, isLeader: false } },
            { id: "inner4", data: { label: "S", team: "inner", size: 25, isLeader: false } },

            // Outer ring atoms
            { id: "outer1", data: { label: "H", team: "outer", size: 15, isLeader: false } },
            { id: "outer2", data: { label: "H", team: "outer", size: 15, isLeader: false } },
            { id: "outer3", data: { label: "H", team: "outer", size: 15, isLeader: false } },
            { id: "outer4", data: { label: "H", team: "outer", size: 15, isLeader: false } },
            { id: "outer5", data: { label: "H", team: "outer", size: 15, isLeader: false } },
            { id: "outer6", data: { label: "H", team: "outer", size: 15, isLeader: false } },
          ],
          edges: [
            // Center to inner ring
            { source: "center", target: "inner1" },
            { source: "center", target: "inner2" },
            { source: "center", target: "inner3" },
            { source: "center", target: "inner4" },

            // Inner ring connections
            { source: "inner1", target: "inner2" },
            { source: "inner2", target: "inner3" },
            { source: "inner3", target: "inner4" },
            { source: "inner4", target: "inner1" },

            // Inner to outer ring
            { source: "inner1", target: "outer1" },
            { source: "inner1", target: "outer2" },
            { source: "inner2", target: "outer3" },
            { source: "inner3", target: "outer4" },
            { source: "inner4", target: "outer5" },
            { source: "inner4", target: "outer6" },
          ],
        });

      default:
        return createGraphData({ nodes: [], edges: [] });
    }
  };

  const scenarioData = createMemo(() => createScenarioData());

  // Get team colors
  const getTeamColor = (team: string) => {
    const colors: Record<string, string> = {
      A: "#ff4d4f", // Red - Team A
      B: "#1890ff", // Blue - Team B
      C: "#52c41a", // Green - Team C
      X: "#faad14", // Orange - Cross-functional
      influencer: "#722ed1", // Purple - Influencers
      tech: "#ff4d4f", // Red - Tech
      design: "#1890ff", // Blue - Design
      business: "#52c41a", // Green - Business
      center: "#ff4d4f", // Red - Center
      inner: "#1890ff", // Blue - Inner ring
      outer: "#52c41a", // Green - Outer ring
    };
    return colors[team] || "#8c8c8c";
  };

  return (
    <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Documentation Link */}
      <div class="bg-indigo-50 rounded-lg p-3 mb-4">
        <h5 class="text-xs font-semibold text-indigo-900 mb-1">Official Documentation</h5>
        <p class="text-xs text-indigo-800 mb-2">
          Learn about D3 Force simulation with five different force types, alpha energy system, and
          real-time interactions for dynamic network layouts.
        </p>
        <a
          href="https://g6.antv.antgroup.com/en/manual/layout/build-in/d3-force-layout"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-medium"
        >
          📖 G6 D3 Force Layout Guide
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

      {/* Scenario Selector */}
      <div class="mb-4 p-3 bg-gray-50 rounded">
        <label class="text-xs font-medium text-gray-700 mb-2 block">Demo Scenario</label>
        <select
          value={scenario()}
          onChange={(e) => setScenario(e.target.value as "teams" | "social" | "molecules")}
          class="w-full px-2 py-1 border border-gray-300 rounded text-xs"
        >
          <option value="teams">Team Clustering</option>
          <option value="social">Social Network</option>
          <option value="molecules">Molecular Structure</option>
        </select>
      </div>

      {/* Force Controls */}
      <div class="space-y-4 mb-4 p-3 bg-gray-50 rounded">
        {/* Link Force */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">
            🔗 Link Force (Connection Strength)
          </h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Distance: {linkDistance()}
              </label>
              <input
                type="range"
                min="30"
                max="150"
                step="10"
                value={linkDistance()}
                onInput={(e) => setLinkDistance(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Strength: {linkStrength()}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={linkStrength()}
                onInput={(e) => setLinkStrength(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Many-Body & Center Forces */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">⚡ Repulsion & Gravity</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Many-Body: {manyBodyStrength()}
              </label>
              <input
                type="range"
                min="-200"
                max="50"
                step="10"
                value={manyBodyStrength()}
                onInput={(e) => setManyBodyStrength(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Center: {centerStrength()}
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={centerStrength()}
                onInput={(e) => setCenterStrength(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Collision Force */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">
            💥 Collision (Overlap Prevention)
          </h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Radius: {collideRadius()}
              </label>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={collideRadius()}
                onInput={(e) => setCollideRadius(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Strength: {collideStrength()}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={collideStrength()}
                onInput={(e) => setCollideStrength(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Radial Force */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">
            🎯 Radial Force (Circular Pattern)
          </h6>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-center">
              <label class="flex items-center text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={enableRadial()}
                  onChange={(e) => setEnableRadial(e.target.checked)}
                  class="mr-2"
                />
                Enable Radial
              </label>
            </div>
            {enableRadial() && (
              <>
                <div class="flex flex-col">
                  <label class="text-xs font-medium text-gray-700 mb-1">
                    Radius: {radialRadius()}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="10"
                    value={radialRadius()}
                    onInput={(e) => setRadialRadius(parseInt(e.target.value))}
                    class="text-xs"
                  />
                </div>
                <div class="flex flex-col">
                  <label class="text-xs font-medium text-gray-700 mb-1">
                    Strength: {radialStrength()}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={radialStrength()}
                    onInput={(e) => setRadialStrength(parseFloat(e.target.value))}
                    class="text-xs"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Algorithm Controls */}
        <div>
          <h6 class="text-xs font-semibold text-gray-800 mb-2">⚙️ Algorithm Parameters</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Iterations: {iterations()}
              </label>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={iterations()}
                onInput={(e) => setIterations(parseInt(e.target.value))}
                class="text-xs"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xs font-medium text-gray-700 mb-1">
                Alpha (Energy): {alpha()}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={alpha()}
                onInput={(e) => setAlpha(parseFloat(e.target.value))}
                class="text-xs"
              />
            </div>
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
              type: "d3-force",
              link: {
                distance: linkDistance(),
                strength: linkStrength(),
              },
              manyBody: {
                strength: manyBodyStrength(),
              },
              center: {
                strength: centerStrength(),
              },
              collide: {
                radius: collideRadius(),
                strength: collideStrength(),
              },
              ...(enableRadial() && {
                radial: {
                  radius: radialRadius(),
                  strength: radialStrength(),
                },
              }),
              iterations: iterations(),
              alpha: alpha(),
            }}
            node={{
              style: (d) => ({
                fill: getTeamColor((d.data?.team as string) || "default"),
                stroke: (d.data?.isLeader as boolean) ? "#000000" : "#ffffff",
                lineWidth: (d.data?.isLeader as boolean) ? 3 : 2,
                radius: (d.data?.size as number) || 20,
                labelText: d.data?.label as string,
                labelFill: "#333333",
                labelFontSize: 9,
                labelFontWeight: (d.data?.isLeader as boolean) ? "bold" : "normal",
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
              },
            }}
            behaviors={["drag-canvas", "zoom-canvas", "drag-element-force"]}
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
            <h4 class="text-blue-800 font-semibold mb-2">How D3 Force Simulation Works</h4>
            <p class="text-blue-800 text-sm">
              D3 Force simulates a physical system with five forces: Link (connections), Many-Body
              (repulsion/attraction), Center (gravity), Collision (overlap prevention), and Radial
              (circular patterns). The alpha value represents system energy - starting high and
              gradually decreasing until nodes settle into stable positions.
            </p>
          </div>
        </div>
      </div>

      {/* Force Types */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <For
          each={[
            {
              icon: "🔗",
              title: "Link Force",
              desc: "Connects related nodes with springs",
              color: "blue",
            },
            {
              icon: "⚡",
              title: "Many-Body Force",
              desc: "Creates repulsion between all nodes",
              color: "red",
            },
            {
              icon: "🎯",
              title: "Center Force",
              desc: "Pulls all nodes toward center",
              color: "green",
            },
            {
              icon: "💥",
              title: "Collision Force",
              desc: "Prevents nodes from overlapping",
              color: "yellow",
            },
            {
              icon: "🌀",
              title: "Radial Force",
              desc: "Attracts nodes to circular pattern",
              color: "purple",
            },
          ]}
        >
          {(force) => (
            <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h5 class="text-xs font-semibold text-gray-900 mb-2">
                {force.icon} {force.title}
              </h5>
              <p class="text-xs text-gray-700">{force.desc}</p>
            </div>
          )}
        </For>
      </div>

      {/* Current Configuration */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-green-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-green-900 mb-2">⚙️ Current Setup</h5>
          <ul class="text-xs text-green-800 space-y-1">
            <li>
              • Scenario:{" "}
              {scenario() === "teams"
                ? "Team Clustering"
                : scenario() === "social"
                  ? "Social Network"
                  : "Molecular Structure"}
            </li>
            <li>• Link Distance: {linkDistance()}</li>
            <li>• Many-Body: {manyBodyStrength()}</li>
            <li>• Iterations: {iterations()}</li>
            <li>• Alpha: {alpha()}</li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-lg p-3">
          <h5 class="text-xs font-semibold text-purple-900 mb-2">🎮 Interaction Tips</h5>
          <ul class="text-xs text-purple-800 space-y-1">
            <li>• Drag nodes to see real-time force adjustments</li>
            <li>• Leaders have stronger repulsion (black border)</li>
            <li>• Same team connections are stronger</li>
            <li>• Enable radial force for circular patterns</li>
            <li>• Adjust alpha to control animation speed</li>
          </ul>
        </div>
      </div>

      {/* Use Cases */}
      <div class="mb-4">
        <h5 class="text-xs font-semibold text-gray-900 mb-2">💡 Perfect For</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <For
            each={[
              {
                icon: "👥",
                title: "Team Dynamics",
                desc: "Organizational structures and team clustering",
              },
              {
                icon: "🌐",
                title: "Social Networks",
                desc: "Community detection and influence mapping",
              },
              {
                icon: "🧪",
                title: "Scientific Models",
                desc: "Molecular structures and particle systems",
              },
              {
                icon: "🎮",
                title: "Interactive Graphs",
                desc: "Real-time manipulation and exploration",
              },
              {
                icon: "📊",
                title: "Network Analysis",
                desc: "Relationship strength visualization",
              },
              { icon: "🔄", title: "Dynamic Systems", desc: "Animated and evolving networks" },
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

// Create team-based network data
const teamData = createGraphData({
  nodes: [
    { id: "leader1", data: { team: "A", size: 35, isLeader: true } },
    { id: "member1", data: { team: "A", size: 25, isLeader: false } },
    { id: "leader2", data: { team: "B", size: 35, isLeader: true } },
    // ... more nodes
  ],
  edges: [
    { source: "leader1", target: "member1" },
    { source: "leader1", target: "leader2" },
    // ... more edges
  ]
});

export const D3ForceNetwork = () => (
  <Graph
    data={teamData}
    width={700}
    height={500}
    autoFit="center"
    layout={{
      type: "d3-force",
      link: {
        distance: ${linkDistance()},           // Ideal edge length
        strength: ${linkStrength()},           // Link spring strength
      },
      manyBody: {
        strength: ${manyBodyStrength()},       // Repulsion between nodes
      },
      center: {
        strength: ${centerStrength()},         // Gravity toward center
      },
      collide: {
        radius: ${collideRadius()},            // Collision detection radius
        strength: ${collideStrength()},        // Collision response strength
      },${
        enableRadial()
          ? `
      radial: {
        radius: ${radialRadius()},             // Target radius for circular pattern
        strength: ${radialStrength()},         // Radial force strength
      },`
          : ""
      }
      iterations: ${iterations()},             // Number of iterations per frame
      alpha: ${alpha()},                       // Initial energy level
    }}
    node={{
      style: (d) => ({
        fill: getTeamColor(d.data?.team),
        stroke: d.data?.isLeader ? "#000" : "#fff",
        radius: d.data?.size,
        labelText: d.data?.label,
      })
    }}
    behaviors={["drag-canvas", "zoom-canvas", "drag-element-force"]}
  />
);`}</code>
        </pre>
      </div>
    </div>
  );
};
