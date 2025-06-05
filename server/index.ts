const server = Bun.serve({
  port: 8000,

  routes: {
    "/api/status": new Response("OK"),
  },

  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running on ${server.url}`);
