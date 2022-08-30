export enum UserAuthorities {
  USER_READ = "user:read",
  USER_DELETE = "user:delete",
  USER_EDIT = "user:edit"
}

export enum UserManageAuthorities {
  USER_MANAGE_USERS = "user:manage_users",
  USER_MANAGE_RANK = "user:manage_rank",
  USER_MANAGE_TROPHY = "user:manage_trophy",
  USER_MANAGE_PERMISSION = "user:manage_permission",
  USER_MANAGE_WATCHED = "user:manage_watched"
}

export enum MovieAuthorities {
  MOVIE_READ = "movie:read",
  MOVIE_DELETE = "movie:delete",
  MOVIE_CREATE = "movie:create",
}

export enum MovieManageAuthorities {
  MOVIE_MANAGE = "movie:manage"
}
