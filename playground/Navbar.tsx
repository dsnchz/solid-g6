import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";

import { NAV_STRUCTURE } from "./App";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen());
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar - Mobile only */}
      <header class="md:hidden bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div class="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <A href="/" class="flex items-center" onClick={closeMobileMenu}>
            <h1 class="text-xl font-bold text-gray-900">Solid G6</h1>
            <span class="text-sm text-gray-500 ml-2 hidden sm:inline">Playground</span>
          </A>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav class="hidden md:flex items-center space-x-1">
            <For each={NAV_STRUCTURE}>
              {(category) => (
                <For each={category.pages}>
                  {(page) => (
                    <A
                      href={page.path}
                      class="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      activeClass="bg-blue-50 text-blue-700"
                      end={page.path === "/"}
                    >
                      <span class="text-base mr-2">{page.icon}</span>
                      <span class="font-medium">{page.name}</span>
                    </A>
                  )}
                </For>
              )}
            </For>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            class="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div class="space-y-1.5">
              <div
                class={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                  isMobileMenuOpen() ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <div
                class={`w-6 h-0.5 bg-gray-600 transition-opacity duration-200 ${
                  isMobileMenuOpen() ? "opacity-0" : ""
                }`}
              />
              <div
                class={`w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                  isMobileMenuOpen() ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div
        class={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div class="absolute inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu} />

        {/* Slide-out Panel */}
        <div
          class={`absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen() ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Navigation */}
          <nav class="p-4 overflow-y-auto flex-1">
            <ul class="space-y-1">
              <For each={NAV_STRUCTURE}>
                {(category) => (
                  <li>
                    <div class="space-y-1">
                      <For each={category.pages}>
                        {(page) => (
                          <A
                            href={page.path}
                            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
                            activeClass="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            end={page.path === "/"}
                            onClick={closeMobileMenu}
                          >
                            <span class="text-lg mr-3">{page.icon}</span>
                            <span class="font-medium">{page.name}</span>
                          </A>
                        )}
                      </For>
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div class="p-4 border-t border-gray-200 flex-shrink-0">
            <div class="text-xs text-gray-500">
              <p>Built with</p>
              <div class="flex items-center mt-1 space-x-2">
                <span class="font-medium">SolidJS</span>
                <span>+</span>
                <span class="font-medium">G6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div class="hidden md:flex w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200 z-30 flex-col">
        {/* Desktop Logo/Header */}
        <div class="p-6 border-b border-gray-200 flex-shrink-0">
          <A href="/" class="block">
            <h1 class="text-xl font-bold text-gray-900">Solid G6</h1>
            <p class="text-sm text-gray-500 mt-1">Playground</p>
          </A>
        </div>

        {/* Navigation */}
        <nav class="p-4 overflow-y-auto flex-1">
          <ul class="space-y-1">
            <For each={NAV_STRUCTURE}>
              {(category) => (
                <li>
                  <div class="space-y-1">
                    <For each={category.pages}>
                      {(page) => (
                        <A
                          href={page.path}
                          class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
                          activeClass="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          end={page.path === "/"}
                        >
                          <span class="text-lg mr-3">{page.icon}</span>
                          <span class="font-medium">{page.name}</span>
                        </A>
                      )}
                    </For>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </nav>

        {/* Desktop Footer */}
        <div class="p-4 border-t border-gray-200 flex-shrink-0">
          <div class="text-xs text-gray-500">
            <p>Built with</p>
            <div class="flex items-center mt-1 space-x-2">
              <span class="font-medium">SolidJS</span>
              <span>+</span>
              <span class="font-medium">G6</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Keep the old export name for backward compatibility
export const Sidebar = Navbar;
