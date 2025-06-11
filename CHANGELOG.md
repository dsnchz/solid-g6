# @dschz/solid-g6

## 0.1.0

**🎉 Initial release of solid-g6** - A comprehensive graph visualization library for SolidJS built on top of AntV G6

### ✨ Features

#### Core Components

- **`Graph`** - Main graph visualization component with full G6 integration
- **`useGraph`** - SolidJS hook for accessing graph context and methods within child components

#### Type-Safe Utility Functions

- **`createGraphData`** - Create type-safe graph data structures with full TypeScript inference
- **`createGraphOptions`** - Configure complete graph options with enhanced type safety
- **`createGraphLayout`** - Set up layout algorithms with automatic type inference
- **`createGraphBehaviors`** - Define interaction behaviors with proper typing
- **`createGraphNodeOptions`** - Configure node styling and behavior with data type inference
- **`createGraphEdgeOptions`** - Configure edge styling and behavior with data type inference
- **`createGraphComboOptions`** - Configure combo (group) styling and behavior with data type inference

#### Enhanced Type System

- **Generic Type Support** - Full generics and data type inference that extends G6's TypeScript foundation
- **Cross-field Type Inference** - Automatic type inference across data structures and configurations
- **Type-Safe Event Handling** - Comprehensive event system with proper TypeScript integration
- **Enhanced IntelliSense** - Improved autocomplete and type checking for custom data shapes

#### Event System

- **36+ Event Types** - Complete coverage of node, edge, canvas, and graph lifecycle events
- **Type-Safe Event Handlers** - Properly typed event handlers with full IDE support
- **Real-time Event Logging** - Built-in event tracking and debugging capabilities

#### Developer Experience

- **Zero Runtime Overhead** - All utilities are compile-time only with no bundle size impact
- **Comprehensive JSDoc** - Detailed documentation with examples for every function and type
- **SolidJS Integration** - Leverages SolidJS reactivity for optimal performance
- **Composition-Friendly** - Easy to compose and reuse configurations across applications

#### Documentation & Examples

- **Interactive Playground** - Comprehensive playground with 13+ layout algorithm examples
- **Complete API Documentation** - Detailed documentation for all components, hooks, and utilities
- **Real-world Examples** - Practical examples covering common use cases and patterns
- **Type Reference** - Full TypeScript type definitions and interfaces

#### Supported Features

- **13+ Layout Algorithms** - Force-directed, hierarchical, circular, grid-based, and specialized layouts
- **Interactive Controls** - Real-time parameter adjustment with immediate visual feedback
- **Physics Simulation** - Advanced force-directed layouts with customizable parameters
- **Clustering Support** - Built-in clustering capabilities for organizing related nodes
- **Responsive Design** - Mobile-friendly layouts that adapt to different screen sizes
- **Performance Optimized** - Efficient rendering for large graphs with thousands of nodes

### 🛠️ Technical Highlights

- **TypeScript First** - Built with TypeScript from the ground up with comprehensive type definitions
- **SolidJS Reactive** - Optimized for SolidJS's fine-grained reactivity system
- **G6 Integration** - Seamless integration with AntV G6's powerful graph visualization engine
- **Tree Shakeable** - Modular architecture allowing for optimal bundle sizes
- **Extensible** - Easy to extend with custom layouts, behaviors, and components

### 📦 Package Information

- **Package Name**: `@dschz/solid-g6`
- **Version**: `0.1.0`
- **License**: MIT
- **Peer Dependencies**: `@antv/g6 >=5.0.0`, `solid-js >=1.6.0`
- **Bundle Size**: Optimized with zero runtime overhead for utilities
