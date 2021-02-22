const chokidar = require("chokidar");

const watcher2 = chokidar.watch(["../user/jinja2/!**", "../web/jinja2/!**"], {
  ignoreInitial: true,
});

const djangoPlugin = () => ({
  name: "configure-server",
  configureServer(server) {
    // console.log(server.watcher)

    watcher2.on("change", (filePath) => {
      console.log("Changed: " + filePath);
      /*watcher.send({
        type: 'full-reload', path: '/'
      })*/
    });

    /*server.app.use((req, res, next) => {
      // custom handle request...

    })*/
  },
});

module.exports = djangoPlugin;
