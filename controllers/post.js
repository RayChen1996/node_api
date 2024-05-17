const Post = require("../models/post");

const handleSuccess = require("../handler/handleSuccess");
const handleError = require("../handler/handleError");
require("../dbConn/index");
const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
  },
  async createPosts({ req, res, body }) {
    try {
      const data = body;
      if (data.content !== undefined) {
        const newPost = await Post.create({
          content: data.content.trim(),
          name: data.name,
          tags: data.tags,
          likes: data.likes,
          comment: data.comment,
        });
        handleSuccess(res, newPost);
      } else {
        handleError(res, "Content is undefined");
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async deleteAll(req, res) {
    await Post.deleteMany({});
    handleSuccess(res, []);
  },
  async deleteOne(req, res) {
    try {
      const id = req.url.split("/").pop();
      console.log("Request  id  :", id);
      const isExist = await Post.findById(id);
      if (isExist) {
        await Post.findByIdAndDelete(id);
        let message = id + " has been deleted";
        handleSuccess(res, message);
        res.end();
      } else {
        handleError(res);
      }
    } catch (error) {
      handleError(res, error);
    }
  },
  async updatePost(req, res, body) {
    try {
      const id = req.url.split("/").pop();
      console.log("Request  id  :", id);
      const data = req.body;

      const isExist = await Post.findById(id);
      console.log("Request  body  :", req.body);
      if (data !== undefined && isExist) {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            content: data.content.trim(),
            name: data.name,
            tags: data.tags,
            likes: data.likes,
            comment: data.comment,
          },
          { new: true }
        );
        handleSuccess(res, updatedPost);
      } else {
        handleError(res, "Post not found or data is undefined");
      }
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = posts;
