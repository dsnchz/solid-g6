import { A } from "@solidjs/router";

export const Navbar = () => {
  return (
    <nav class="bg-gray-800 text-white p-2 flex items-center">
      <div class="text-lg font-semibold mr-6">Playground</div>
      <div>
        <A href="/" class="hover:text-gray-300">
          Home
        </A>
      </div>
    </nav>
  );
};
