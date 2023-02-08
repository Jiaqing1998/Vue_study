import req from '@/utlis/request';
// 获取新闻详情
export const getArticle = (id) => {
  return req.get(`articles/${id}`);
};
// 对文章点赞
export function getArticleLike(id) {
  return req(
    {
      url: 'article/likings',
      method: 'post',
      data: {
        target: id,
      }
    }
  );
}
// 取消文章点赞
export function getArticleDisLike(id) {
  return req(
    {
      url: 'article/likings/' + id,
      method: 'delete',
    }
  );
}

// 收藏文章
export function getArticleCollect(id) {
  return req(
    {
      url: 'article/collections',
      method: 'post',
      data: {
        target: id,
      }
    }
  );
}


// 取消收藏文章
export function getArticleDisCollect(target) {
  return req(
    {
      url: 'article/collections/' + target,
      method: 'delete',
    }
  );
}


