import chalk from "chalk";
import chokidar from "chokidar";
import path from "path";

function getShortPath(file, root) {
  console.log(path.posix.relative(root, file));
  return file.startsWith(root + "/") ? path.posix.relative(root, file) : file;
}

export default (paths, config = { log: true }) => ({
  name: "external-watch",
  configureServer({ ws, config: { root, logger } }) {
    const reload = (path) => {
      //reload vue root page
      ws.send({ type: "full-reload", path: "/" });
      if (config.log) {
        logger.info(
          chalk.green(`external page reload `) +
            chalk.dim(getShortPath(path, root)),
          { clear: true, timestamp: true }
        );
      }
    };
    chokidar
      .watch(paths, { cwd: root, ignoreInitial: true, ...config })
      .on("add", reload)
      .on("change", reload);
  },
});
