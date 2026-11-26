import CommunityPost from '../models/CommunityPost.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get community posts feed with pagination and optional tag filter
 * @route   GET /api/v1/community
 * @access  Public
 */
export const getFeed = async (req, res, next) => {
  try {
    const { tag, page = 1, limit = 15 } = req.query;
    const query = {};

    if (tag && tag !== 'All') {
      query.tag = tag;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await CommunityPost.countDocuments(query);

    const posts = await CommunityPost.find(query)
      .populate('user', 'name avatar role membership')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return paginatedResponse(res, 200, 'Community feed fetched', posts, Number(page), Number(limit), total);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new community milestone / PR post
 * @route   POST /api/v1/community
 * @access  Private
 */
export const createPost = async (req, res, next) => {
  try {
    const { title, content, tag, image, workoutShare } = req.body;

    const post = await CommunityPost.create({
      user: req.user.id,
      title,
      content,
      tag: tag || 'General',
      image: image || null,
      workoutShare: workoutShare || null,
    });

    const populatedPost = await CommunityPost.findById(post._id).populate('user', 'name avatar role');

    return successResponse(res, 201, 'Milestone published to community feed!', { post: populatedPost });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user's own post
 * @route   PUT /api/v1/community/:id
 * @access  Private
 */
export const updatePost = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, 'Post not found');
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to modify another athlete’s post');
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.tag = req.body.tag || post.tag;
    if (req.body.image !== undefined) post.image = req.body.image;

    await post.save();

    return successResponse(res, 200, 'Post updated successfully', { post });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user's own post
 * @route   DELETE /api/v1/community/:id
 * @access  Private
 */
export const deletePost = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, 'Post not found');
    }

    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized');
    }

    await post.deleteOne();
    return successResponse(res, 200, 'Post removed successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Like / unlike a post
 * @route   POST /api/v1/community/:id/like
 * @access  Private
 */
export const toggleLike = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, 'Post not found');
    }

    const hasLiked = post.likes.some((id) => id.toString() === req.user.id);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();

    return successResponse(res, 200, hasLiked ? 'Post unliked' : 'Post liked', {
      likesCount: post.likes.length,
      hasLiked: !hasLiked,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add comment to a post
 * @route   POST /api/v1/community/:id/comments
 * @access  Private
 */
export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return errorResponse(res, 400, 'Comment text is required');
    }

    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, 'Post not found');
    }

    post.comments.push({
      user: req.user.id,
      text: text.trim(),
    });

    await post.save();

    const updated = await CommunityPost.findById(req.params.id).populate('comments.user', 'name avatar');
    const newComment = updated.comments[updated.comments.length - 1];

    return successResponse(res, 201, 'Comment added', { comment: newComment });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete comment
 * @route   DELETE /api/v1/community/:id/comments/:commentId
 * @access  Private
 */
export const deleteComment = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return errorResponse(res, 404, 'Post not found');
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return errorResponse(res, 404, 'Comment not found');
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to delete this comment');
    }

    comment.deleteOne();
    await post.save();

    return successResponse(res, 200, 'Comment removed');
  } catch (error) {
    next(error);
  }
};
