import req from '@/utlis/request.js';
// 获取搜索结果
export function getSearchResult(q, page, per_page) {
  return req({
    url: '/search',
    params: {
      q,
      page,
      per_page,
    },
  });
}

// 获取联想建议（自动补全）
export function getSearchSuggest(value) {
  return req({
    url: '/suggestion',
    params: {
      q: value,
    },
  });
}

// 对文章不喜欢
export function dislikeArticle(id) {
  return req({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target: id,
    },
  });
}
