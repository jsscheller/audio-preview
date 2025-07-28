import * as serdev from "serdev";

serdev.serve({
  components: [
    {
      dir: ".",
      build: "node scripts/build.js",
      watch: ["src"],
    },
  ],
  routes: {
    "/examples/*rest": (x) => `examples/${x.rest}`,
    "/*rest": [".", (x) => `out/${x.rest}`],
  },
});
