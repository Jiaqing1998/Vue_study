import req from '@/utlis/request.js';

// 获取评论或评论回复
export const getComments = params => {
  return req({
    url: 'comments',
    params,
  });
};

// 对评论或评论回复点赞
export function likeComment (commentId) {
  return req({
    url: '/comment/likings',
    method: 'post',
    data: {
      target: commentId,
    },
  });
}
// 取消对评论或评论回复点赞
export function unlikeComment (commentId) {
  return req({
    url: `/comment/likings/${commentId}`,
    method: 'delete',
  });
}

// 对文章或者评论进行评论
export function postComment (id, message, art_id) {
  return req({
    url: '/comments',
    method: 'post',
    data: {
      target: id,
      content: message,
      art_id,
    }
  });
}
