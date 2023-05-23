const { createProxyMiddleware } = require("http-proxy-middleware");
const API_BASE_URL = "http://182.163.101.173:49029";
const px = createProxyMiddleware({ target: API_BASE_URL, changeOrigin: true });

module.exports = (app) => {
  app.use("/product-crud/*", px);
};
