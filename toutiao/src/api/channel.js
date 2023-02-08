import req from '@/utlis/request.js';

// 获取所有频道列表
export function getAllChannels() {
  return req({
    url: '/channels',
  });
}

// 获取用户频道列表
export function getUserChannels() {
  return req({
    url: '/user/channels',
  });
}

// 删除指定用户频道
export function deleteUserChannel(id) {
  return req({
    method: 'DELETE',
    url: `/user/channels/${id}`,
  });
}

// 设置用户的频道（部分覆盖）
export function setUserChannels(data) {
  return req({
    method: 'PATCH',
    url: '/user/channels',
    data,
  });
}

// 获取文章新闻推荐
export function getArticleRecommend(id, temp) {
  return req({
    url: '/articles',
    params: {
      channel_id: id,
      timestamp: temp,
    },
  });
}

