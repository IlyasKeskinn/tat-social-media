export const API_URL = import.meta.env.VITE_BASE_API_URL;

export const API_AUTH_ROUTES = {
  LOGIN: `${API_URL}/user/login`,
  REGISTER: `${API_URL}/user/register`,
  LOGOUT: `${API_URL}/user/logout`,
};

export const API_POST_ROUTES = {
  FEED_POSTS: (pageParam, limit = 10) =>
    `${API_URL}/post/feedPosts?page=${pageParam}&limit=${limit}`,
  MAKE_POST: `${API_URL}/post/createpost`,
  GET_POSTS: (page) => `${API_URL}/post/getposts?page=${page}`,
  GET_POST: (postId) => `${API_URL}/post/getpost/${postId}`,
  GET_POSTS_BY_USER: (userId) => `${API_URL}/post/getuserPost/${userId}`,
  LIKE_UNLIKE_POST: (postId) => `${API_URL}/post/likeunlikepost/${postId}`,
  DELETE_POST: (postId) => `${API_URL}/post/deletepost/${postId}`,
  UPDATE_POST: (postId) => `${API_URL}/post/updatepost/${postId}`,
};

export const API_USER_ROUTES = {
  FOLLOW_UNFOLLOW: (userId) => `${API_URL}/user/followUnfollow/${userId}`,
  GET_PROFILE: (identifier) => `${API_URL}/user/profile/${identifier}`,
  SEARCH_USER: (query, pageParam) =>
    `${API_URL}/user/searchuser?query=${query}&page=${pageParam}`,
  BLOCK_UNBLOCK: (userId) => `${API_URL}/user/blockUnblock/${userId}`,
  GET_BLOCKED_USERS: `${API_URL}/user/getBlockedUsers`,
  SUGGEST_USERS: `${API_URL}/user/suggestUsers`,
  FETCH_LIKED_USERS: `${API_URL}/user/fetchlikeduser`,
  UPDATE_USER: (userId) => `${API_URL}/user/update/${userId}`,
  SET_ACCOUNT_PRIVACY: `${API_URL}/profilePrivacy/setProfilePrivate`,
  GET_PRIVACY_STATUS: `${API_URL}/profilePrivacy/getPrivacyStatus`,
};

export const API_COMMENT_ROUTES = {
  MAKE_COMMENT: (postId) => `${API_URL}/post/makecomment/${postId}`,
  FETCH_COMMENTS: (postId) => `${API_URL}/post/getcomments/${postId}`,
  UPDATE_COMMENT: (postId, commentId) => `${API_URL}/post/updatecomment/${postId}/${commentId}`,
  LIKE_UNLIKE_COMMENT: (postId, commentId) => `${API_URL}/post/likeunlikecomment/${postId}/${commentId}`,
  DELETE_COMMENT: (postId, commentId) => `${API_URL}/post/deletecomment/${postId}/${commentId}`,
};

export const API_REPLY_ROUTES = {
  FETCH_REPLIES: (commentId) => `${API_URL}/post/getreplies/${commentId}`,
  LIKE_UNLIKE_REPLY: (postId, commentId, replyId) =>
    `${API_URL}/post/replylikeunlike/${postId}/${commentId}/${replyId}`,
};

export const API_BOOKMARK_ROUTES = {
  FETCH_SAVED_POSTS: (pageParam, limit = 10) => `${API_URL}/bookmarks/getsavedPost?page=${pageParam}&limit=${limit}`,
  BOOKMARK_POST: (postId) => `${API_URL}/bookmarks/postBookmark/${postId}`,
};


export const API_NOTIFICATION_ROUTES = {
  GET_NOTIFICATIONS: (pageParam, limit = 10) => `${API_URL}/notifications/getnotifications?page=${pageParam}&limit=${limit}`,
  GET_UNREAD_NOTIFICATIONS:  `${API_URL}/notifications/getUnreadNotificationCount`,
};

export const API_FOLLOW_REQUEST_ROUTES = {
  ACCEPT_REQUEST: (requestId) => `${API_URL}/followRequest/acceptFollowRequest/${requestId}`,
  REJECT_REQUEST: (requestId) => `${API_URL}/followRequest/rejectFollowRequest/${requestId}`,
};

export const API_CONVERSATION_ROUTES = {
    GET_CONVERSATIONS: `${API_URL}/conversation/conversations`,
    GET_MESSAGES: (conversationId) => `${API_URL}/conversation/messages/${conversationId}`,
    SEND_MESSAGE: `${API_URL}/conversation/message`,
};