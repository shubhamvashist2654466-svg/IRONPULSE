import Blog from '../models/Blog.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get all published blog posts with search and category filtering
 * @route   GET /api/v1/blogs
 * @access  Public
 */
export const getBlogs = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    return paginatedResponse(res, 200, 'Blog posts retrieved', blogs, Number(page), Number(limit), total);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single blog post by slug or ID
 * @route   GET /api/v1/blogs/:id
 * @access  Public
 */
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let blog;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id.toLowerCase() });
    }

    if (!blog) {
      return errorResponse(res, 404, 'Article not found');
    }

    // Increment view counter
    blog.views += 1;
    await blog.save();

    return successResponse(res, 200, 'Article details retrieved', { blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new blog post
 * @route   POST /api/v1/blogs
 * @access  Private (Admin only)
 */
export const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    return successResponse(res, 201, 'Blog article published successfully', { blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update blog post
 * @route   PUT /api/v1/blogs/:id
 * @access  Private (Admin only)
 */
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return errorResponse(res, 404, 'Article not found');
    }

    return successResponse(res, 200, 'Blog article updated', { blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete blog post
 * @route   DELETE /api/v1/blogs/:id
 * @access  Private (Admin only)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return errorResponse(res, 404, 'Article not found');
    }

    await blog.deleteOne();
    return successResponse(res, 200, 'Blog article removed');
  } catch (error) {
    next(error);
  }
};
