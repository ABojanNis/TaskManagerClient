const requireModule = require.context(".", true, /\.js$/);
const modules = [];
var repos = {};
requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js" || fileName === "./Repo.js") return;

  const path = fileName.replace(/(\.\/|\.js)/g, "");
  const [moduleName] = path.split("/");

  modules.push(requireModule(fileName).default);
  repos[moduleName] = new (requireModule(fileName).default)();
});

export default repos;
