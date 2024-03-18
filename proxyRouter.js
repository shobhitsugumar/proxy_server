const express = require("express");
const router = express.Router();

const apicache = require("apicache");
const { createProxyMiddleware } = require("http-proxy-middleware");

const options = {
  target: "https://jsonplaceholder.typicode.com/user",
  changeOrigin: true,
  pathRewrite: {
    "^/api/users/all": "",
  },
};

router.get("/all", cacheMiddleware(), createProxyMiddleware(options));

function cacheMiddleware() {
  const cacheoptions = {
    statusCodes: { include: [200] },
    defaultDuration: 300000,
    //appendkey here we are handling different http method from the server
    appendKey: function (req, res) {
      return req.method;
    },
  };
  let cacheMiddleware = apicache.options(cacheoptions).middleware();
  return cacheMiddleware;
}

module.exports = router;
