import req from '@/utlis/request.js';
export function login(data) {
  return req({
    method: 'POST',
    url: '/authorizations',
    data,
  });
}

// 获取用户关注列表
export function getFollowings() {
  return req({
    url: '/user/followings',
    params: {
      page: 1,
      per_page: 10,
    },
  });
}

// 获取用户粉丝列表
export function getFollowers() {
  return req({
    url: '/user/followers',
    params: {
      page: 1,
      per_page: 10,
    },
  });
}

// 获取用户信息
export function getUserInfo() {
  return req({
    url: '/user',
  });
}

//  获取用户个人资料
export function getUserProfile() {
  return req({
    url: '/user/profile',
  });
}

// 关注用户
export function follow(userId) {
  return req({
    method: 'POST',
    url: '/user/followings',
    data: { target: userId },
  });
}

// 取消关注用户
export function unfollow(userId) {
  return req({
    method: 'DELETE',
    url: `/user/followings/${userId}`,
  });
}


