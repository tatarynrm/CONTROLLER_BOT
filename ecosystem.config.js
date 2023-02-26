module.exports = {
  apps: [
    {
      name: "My super application",
      script: "index.js",
      node_args: "-r esm --experimental-modules",
    },
  ],
};
