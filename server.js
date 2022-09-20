const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(`${__dirname}/dist`));

app.use(
    "/blocks",
    createProxyMiddleware({
        target: process.env.BASE_URL,
        changeOrigin: true,
        secure: false,
    })
);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});

app.listen(process.env.PORT || 8000, () => {
    process.stdout.write(`Listening on port ${port}`);
});
