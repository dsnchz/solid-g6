import type { IEvent } from "@antv/g6";
import { createSignal, For, Show } from "solid-js";

import { createGraphData, Graph } from "../../src";
import type { G6EventsMap } from "../../src/types/graph";

interface EventLog {
  id: string;
  timestamp: string;
  type: string;
  category: string;
  targetId?: string;
  details: Record<string, unknown>;
}

export const Events = () => {
  const [eventLogs, setEventLogs] = createSignal<EventLog[]>([]);
  const [_maxLogs, _setMaxLogs] = createSignal(50);
  const [selectedCategory, setSelectedCategory] = createSignal<string>("all");

  // Sample graph data for event demonstrations
  const graphData = createGraphData({
    nodes: [
      { id: "node1", data: { label: "Sales", type: "department" }, style: { x: 150, y: 100 } },
      { id: "node2", data: { label: "Marketing", type: "department" }, style: { x: 350, y: 100 } },
      {
        id: "node3",
        data: { label: "Engineering", type: "department" },
        style: { x: 250, y: 200 },
      },
      { id: "node4", data: { label: "John Doe", type: "person" }, style: { x: 100, y: 300 } },
      { id: "node5", data: { label: "Jane Smith", type: "person" }, style: { x: 200, y: 300 } },
      { id: "node6", data: { label: "Bob Johnson", type: "person" }, style: { x: 300, y: 300 } },
      { id: "node7", data: { label: "Alice Brown", type: "person" }, style: { x: 400, y: 300 } },
    ],
    edges: [
      { id: "edge1", source: "node1", target: "node4", data: { relationship: "manages" } },
      { id: "edge2", source: "node2", target: "node5", data: { relationship: "manages" } },
      { id: "edge3", source: "node3", target: "node6", data: { relationship: "manages" } },
      { id: "edge4", source: "node3", target: "node7", data: { relationship: "manages" } },
      { id: "edge5", source: "node1", target: "node2", data: { relationship: "collaborates" } },
      { id: "edge6", source: "node2", target: "node3", data: { relationship: "collaborates" } },
      { id: "edge7", source: "node4", target: "node5", data: { relationship: "peers" } },
    ],
  });

  // Event categories and their available events
  const eventCategories = [
    {
      name: "Node Events",
      category: "node",
      icon: "🔷",
      description: "Events related to node interactions",
      events: [
        { name: "node:click", description: "Node is clicked" },
        { name: "node:dblclick", description: "Node is double-clicked" },
        { name: "node:pointerenter", description: "Pointer enters node area" },
        { name: "node:pointerleave", description: "Pointer leaves node area" },
        { name: "node:pointerover", description: "Pointer moves over node" },
        { name: "node:pointermove", description: "Pointer moves within node" },
        { name: "node:pointerdown", description: "Pointer pressed down on node" },
        { name: "node:pointerup", description: "Pointer released on node" },
        { name: "node:dragstart", description: "Node drag starts" },
        { name: "node:drag", description: "Node is being dragged" },
        { name: "node:dragend", description: "Node drag ends" },
      ],
    },
    {
      name: "Edge Events",
      category: "edge",
      icon: "🔗",
      description: "Events related to edge interactions",
      events: [
        { name: "edge:click", description: "Edge is clicked" },
        { name: "edge:dblclick", description: "Edge is double-clicked" },
        { name: "edge:pointerenter", description: "Pointer enters edge area" },
        { name: "edge:pointerleave", description: "Pointer leaves edge area" },
        { name: "edge:pointerover", description: "Pointer moves over edge" },
        { name: "edge:pointermove", description: "Pointer moves within edge" },
        { name: "edge:pointerdown", description: "Pointer pressed down on edge" },
        { name: "edge:pointerup", description: "Pointer released on edge" },
      ],
    },
    {
      name: "Canvas Events",
      category: "canvas",
      icon: "🖼️",
      description: "Events related to canvas interactions",
      events: [
        { name: "canvas:click", description: "Canvas background is clicked" },
        { name: "canvas:dblclick", description: "Canvas background is double-clicked" },
        { name: "canvas:pointerenter", description: "Pointer enters canvas" },
        { name: "canvas:pointerleave", description: "Pointer leaves canvas" },
        { name: "canvas:pointermove", description: "Pointer moves on canvas" },
        { name: "canvas:pointerdown", description: "Pointer pressed down on canvas" },
        { name: "canvas:pointerup", description: "Pointer released on canvas" },
        { name: "canvas:dragstart", description: "Canvas drag starts" },
        { name: "canvas:drag", description: "Canvas is being dragged" },
        { name: "canvas:dragend", description: "Canvas drag ends" },
        { name: "canvas:wheel", description: "Mouse wheel on canvas" },
      ],
    },
    {
      name: "Graph Events",
      category: "graph",
      icon: "📊",
      description: "Events related to graph lifecycle and operations",
      events: [
        { name: "beforerender", description: "Before graph renders" },
        { name: "afterrender", description: "After graph renders" },
        { name: "beforelayout", description: "Before layout execution" },
        { name: "afterlayout", description: "After layout execution" },
        { name: "viewportchange", description: "Viewport transformation changes" },
        { name: "resize", description: "Graph container is resized" },
      ],
    },
  ];

  // Create event handlers
  const createEventHandler = (eventType: string, category: string) => {
    // eslint-disable-next-line solid/reactivity
    return (e: IEvent) => {
      const eventData = e as unknown as Record<string, unknown>;
      const target = eventData.target as Record<string, unknown> | undefined;
      const canvas = eventData.canvas as Record<string, unknown> | undefined;

      const newLog: EventLog = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: eventType,
        category,
        targetId: target?.id as string | undefined,
        details: {
          x: eventData.x || canvas?.x,
          y: eventData.y || canvas?.y,
          data: target?.data,
        },
      };

      setEventLogs((prev) => [newLog, ...prev.slice(0, _maxLogs() - 1)]);
    };
  };

  // Generate events object for Graph component
  const events = (): G6EventsMap => {
    const eventsObj: G6EventsMap = {};

    eventCategories.forEach((category) => {
      category.events.forEach((event) => {
        eventsObj[event.name as keyof G6EventsMap] = createEventHandler(
          event.name,
          category.category,
        );
      });
    });

    return eventsObj;
  };

  const clearLogs = () => setEventLogs([]);

  const filteredLogs = () => {
    if (selectedCategory() === "all") return eventLogs();
    return eventLogs().filter((log) => log.category === selectedCategory());
  };

  const getCategoryCount = (category: string) => {
    if (category === "all") return eventLogs().length;
    return eventLogs().filter((log) => log.category === category).length;
  };

  return (
    <div class="min-h-full bg-gray-50 p-8">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Graph Events</h1>
          <p class="text-lg text-gray-600">
            Comprehensive showcase of all event types supported by the graph visualization library
          </p>
        </div>

        <div class="grid lg:grid-cols-4 gap-8">
          {/* Event Categories Documentation */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Event Categories</h3>

              <div class="space-y-4">
                <For each={eventCategories}>
                  {(category) => (
                    <div class="border rounded-lg p-4">
                      <h4 class="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span class="text-lg">{category.icon}</span>
                        {category.name}
                      </h4>
                      <p class="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div class="text-xs text-gray-500">
                        {category.events.length} events available
                      </div>
                    </div>
                  )}
                </For>
              </div>

              <div class="mt-6 pt-6 border-t">
                <h4 class="font-semibold text-gray-800 mb-3">Instructions</h4>
                <div class="text-sm text-gray-600 space-y-2">
                  <p>• Click on nodes and edges</p>
                  <p>• Hover over elements</p>
                  <p>• Drag nodes around</p>
                  <p>• Use mouse wheel to zoom</p>
                  <p>• Click on empty canvas</p>
                  <p>• Double-click on elements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graph Visualization */}
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-4 border-b bg-gray-50">
                <h3 class="text-lg font-semibold text-gray-900">Interactive Graph</h3>
                <p class="text-sm text-gray-600">Interact with the graph to trigger events</p>
              </div>
              <div class="relative">
                <Graph
                  data={graphData}
                  width={600}
                  height={500}
                  layout={{
                    type: "grid",
                    cols: 3,
                    rows: 3,
                  }}
                  node={{
                    style: (d) => ({
                      fill: d.data?.type === "department" ? "#4F46E5" : "#10B981",
                      stroke: "#374151",
                      lineWidth: 2,
                      r: d.data?.type === "department" ? 25 : 20,
                    }),
                  }}
                  edge={{
                    style: {
                      stroke: "#6B7280",
                      lineWidth: 2,
                      endArrow: true,
                      endArrowSize: 8,
                    },
                  }}
                  behaviors={["drag-canvas", "zoom-canvas", "drag-element", "hover-activate"]}
                  events={events()}
                />
              </div>
            </div>
          </div>

          {/* Event Logs */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md">
              <div class="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Event Log</h3>
                <div class="flex gap-2">
                  <button
                    onClick={clearLogs}
                    class="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div class="border-b">
                <nav class="flex">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    class={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selectedCategory() === "all"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    All ({getCategoryCount("all")})
                  </button>
                  <For each={eventCategories}>
                    {(category) => (
                      <button
                        onClick={() => setSelectedCategory(category.category)}
                        class={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                          selectedCategory() === category.category
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                        title={category.description}
                      >
                        {category.icon} ({getCategoryCount(category.category)})
                      </button>
                    )}
                  </For>
                </nav>
              </div>

              {/* Event List */}
              <div class="max-h-96 overflow-y-auto">
                <Show
                  when={filteredLogs().length > 0}
                  fallback={
                    <div class="p-4 text-center text-gray-500">
                      <p class="text-sm">No events yet</p>
                      <p class="text-xs mt-1">Interact with the graph to see events</p>
                    </div>
                  }
                >
                  <For each={filteredLogs()}>
                    {(log) => (
                      <div class="border-b last:border-b-0 p-3 hover:bg-gray-50">
                        <div class="flex items-start justify-between mb-1">
                          <span class="text-sm font-medium text-gray-900">{log.type}</span>
                          <span class="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                        <Show when={log.targetId}>
                          <div class="text-xs text-blue-600 mb-1">Target: {log.targetId}</div>
                        </Show>
                        <Show when={log.details.x !== undefined && log.details.y !== undefined}>
                          <div class="text-xs text-gray-500">
                            Position: ({Math.round(Number(log.details.x) || 0)},{" "}
                            {Math.round(Number(log.details.y) || 0)})
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </Show>
              </div>
            </div>
          </div>
        </div>

        {/* Event Reference Table */}
        <div class="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 border-b bg-gray-50">
            <h3 class="text-xl font-semibold text-gray-900">Complete Event Reference</h3>
            <p class="text-gray-600 mt-1">All available events organized by category</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <For each={eventCategories}>
                  {(category) => (
                    <For each={category.events}>
                      {(event, index) => (
                        <tr class={index() === 0 ? "border-t-2 border-gray-300" : ""}>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <Show when={index() === 0}>
                              <div class="flex items-center">
                                <span class="text-lg mr-2">{category.icon}</span>
                                <span class="text-sm font-medium text-gray-900">
                                  {category.name}
                                </span>
                              </div>
                            </Show>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <code class="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {event.name}
                            </code>
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-600">{event.description}</td>
                        </tr>
                      )}
                    </For>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
