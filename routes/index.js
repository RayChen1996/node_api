// import express from "express";
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const express = require("express");

const HttpControllers = require("../controllers/http");
const PostsControllers = require("../controllers/post");
// const routes = async (req, res) => {
//   const { url, method } = req;
//   let body = "";

//   req.on("data", (chunk) => {
//     body += chunk;
//   });

//   req.on("end", () => {
//     console.log(`url= ${url}`);
//     if (url === "/posts" && method === "GET") {
//       PostsControllers.getPosts(req, res);
//     } else if (url === "/posts" && method === "POST") {
//       console.log(`url posts = ${url}`);
//       req.body = body ? JSON.parse(body) : {};
//       PostsControllers.createPosts(req, res);
//     } else if (url === "/posts" && method === "DELETE") {
//       PostsControllers.deleteAll(req, res);
//     } else if (url.startsWith("/posts/") && method === "DELETE") {
//       PostsControllers.deleteOne(req, res);
//     } else if (url.startsWith("/posts/") && method === "PATCH") {
//       req.body = body ? JSON.parse(body) : {};
//       PostsControllers.updatePost(req, res);
//     } else if (method === "OPTIONS") {
//       HttpControllers.cors(req, res);
//     } else {
//       HttpControllers.notFound(req, res);
//     }
//   });

//   req.on("error", (err) => {
//     console.error(`Request error: ${err}`);
//     HttpControllers.serverError(req, res);
//   });
// };

const router = express.Router();

// GET home page.
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

// Routes handling
router.get("/posts", (req, res) => {
  PostsControllers.getPosts(req, res);
});

router.post("/posts", (req, res) => {
  console.log("POST /posts called");
  console.log("Request body:", req.body);
  PostsControllers.createPosts(req, res);
});

router.delete("/posts", (req, res) => {
  PostsControllers.deleteAll(req, res);
});

router.delete("/posts/:id", (req, res) => {
  PostsControllers.deleteOne(req, res);
});

router.patch("/posts/:id", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    req.body = body ? JSON.parse(body) : {};
    PostsControllers.updatePost(req, res);
  });
});

// Handle OPTIONS requests
router.options("*", (req, res) => {
  HttpControllers.cors(req, res);
});

// Handle not found
router.use((req, res) => {
  HttpControllers.notFound(req, res);
});

// Handle errors
router.use((err, req, res, next) => {
  console.error(`Request error: ${err}`);
  HttpControllers.serverError(req, res);
});

module.exports = router;
