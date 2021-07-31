const ErrorResponse = require('../utils/errorResponse');
const Blog = require("../models/Blog");
const { Storage } = require('@google-cloud/storage');

// google cloud storage
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

exports.blog_get = async (req, res, next) => {
    const blog = await Blog.find();
    res.send(blog);
}

exports.blog_getOneBlogPost = async (req, res, next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id)
  res.send(blog);
}

exports.blog_post = async (req, res, next) => {
  const title = "New Blog";
  const coverImageLink = "https://firebasestorage.googleapis.com/v0/b/my-first-blog-jun.appspot.com/o/1346680.jpg?alt=media";
  const blogImageLink = "https://firebasestorage.googleapis.com/v0/b/my-first-blog-jun.appspot.com/o/images.png?alt=media";
      let blog = new Blog({
        title: title,
        coverImage: coverImageLink,
        blogImage: blogImageLink,
        category: req.body.category,
      })
        blog
        .save()
        .then(result => {
          res.status(201).json({
            message: `${result.title} has been created successfully`,
            blog: blog
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.blog_delete = async (req, res, next) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(201).json({
        message: `${deletedBlog._id} has been deleted!`
    })
}

exports.blog_update = (req, res, next) => {
  
  const updateOps = {};
  const id = req.params.id;
  var today  = new Date();
  // updateOps["lastModified"] = today.toLocaleString();

  try {
    if (req.body.title) {
      updateOps['title'] = req.body.title
    }

    if (req.body.blogContent) {
      updateOps['blogContent'] = req.body.blogContent
    }

    if (req.body.coverImage) {
      updateOps['coverImage'] = req.body.coverImage
    }

    if (req.body.blogImage) {
      updateOps['blogImage'] = req.body.blogImage
    }

    Blog.updateOne({ _id: id }, { $set: updateOps }, function (err) {console.log(err)})
    res.status(201).json({
      message: "Blog is Updated"
    })
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
}

exports.blog_images_upload = (req, res, next) => {

  let file = req.file
  const blob = bucket.file(file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });
  blobWriter.on('error', (err) => next(err));
  blobWriter.on('finish', () => {
      const imageLink = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
      res.status(201).json({
        imageLink: imageLink
      })
  })
  blobWriter.end(file.buffer);
}

exports.blog_main_image_upload = (req, res, next) => {
  let file = req.file
  const blob = bucket.file(file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });
  blobWriter.on('error', (err) => next(err));
  blobWriter.on('finish', () => {
      const blogImageLink = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
      res.status(201).json({
        imageLink: blogImageLink
      })
  })
  blobWriter.end(file.buffer);
}

exports.cover_image_upload = (req, res, next) => {
  let file = req.file
  const blob = bucket.file(file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });
  blobWriter.on('error', (err) => next(err));
  blobWriter.on('finish', () => {
      const coverImageLink = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
      res.status(201).json({
        imageLink: coverImageLink
      })
  })
  blobWriter.end(file.buffer);
}