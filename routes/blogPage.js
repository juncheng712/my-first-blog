const express = require('express');
const router = express.Router();
const { 
    blog_get,
    blog_post, 
    blog_getOneBlogPost, 
    blog_delete, 
    blog_update, 
    blog_images_upload,
    cover_image_upload,
    blog_main_image_upload
} = require("../controllers/blog")
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
});



router.route("/").get(blog_get);

router.post("/", upload.any(), blog_post);

router.route("/:id").get(blog_getOneBlogPost);

router.route("/:id").delete(blog_delete);

router.patch("/:id", blog_update);

router.post("/:id/cover-image", upload.single("coverImage"), cover_image_upload);

router.post("/:id/blog-image", upload.single("blogImage"), blog_main_image_upload);

router.post("/:id/images", upload.single("image"), blog_images_upload);

module.exports = router;