export const Home = () => {
  return (
    <div class="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div class="max-w-4xl mx-auto">
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">Solid G6 Playground</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive showcase of graph visualization capabilities powered by
            <span class="font-semibold text-blue-600"> @antv/g6</span> and
            <span class="font-semibold text-blue-600"> SolidJS</span>
          </p>
        </div>

        {/* Getting Started */}
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <p class="text-gray-600 mb-6">
            Welcome to the Solid G6 playground! This is a fresh start where we'll build up examples
            incrementally, showcasing the power of reactive graph visualizations.
          </p>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-blue-800 text-sm">
              <strong>First Example:</strong> Check out our
              <a href="/node-types" class="underline font-medium hover:text-blue-900">
                {" "}
                Node Types showcase
              </a>
              to see different node shapes in action with reactive updates.
            </p>
          </div>
        </div>

        {/* Library Info */}
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">About Solid G6</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  SolidJS reactive graph components
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Full @antv/g6 feature integration
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  TypeScript support with proper type inference
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Performance optimized for large graphs
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Use Cases</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Network analysis and visualization
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Organizational charts and hierarchies
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Flow diagrams and processes
                </li>
                <li class="flex items-center">
                  <span class="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Social network analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
