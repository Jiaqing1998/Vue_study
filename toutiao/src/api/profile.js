import req from './request';

// 编辑用户个人资料
export function editUserProfile(data) {
  return req({
    url: '/user/profile',
    method: 'PATCH',
    data,
  });
}
