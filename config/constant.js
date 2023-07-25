export const DEFAULT_PASWORD = '123456';

export const USERS = {
  level: {
    super_admin: 1,
    admin: 2,
    user: 3,
  },
  is_confirm_account: {
    true: 1,
    false: 2,
  },
};

export const STORAGE_PATHS = {
  importUsers: './storage/users/imports/',
  uploadAvatarUser: './storage/users/avatars/',
};

export const USER_IMPORTS = {
  status: {
    pending: 1,
    processing: 2,
    done: 3,
  },
  has_errors: {
    true: 1,
    false: 2,
  },
};

export const JOB_QUEUES = {
  userImports: 'user-imports',
};

export const PAGINATE_OPTIONS = {
  page: 1,
  limit: 20,
  sort: {
    created_at: -1,
  },
};

export const ACTION_LOGS = {
  name: {
    none: 'Không xác định',
    admin_create_new_user: 'Admin tạo mới user',
  },
  type: {
    none: 0,
    admin_create_new_user: 1,
  },
};

export const NOTIFICATIONS = {
  status: {
    active: 1,
    in_active: 2,
  }
}

export const NOTIFICATION_TEMPLATES = {
  status: {
    active: 1,
    in_active: 2,
  },
  tags: {
    adminName: '@admin_name',
    userName: '@user_name',
  },
  types: {
    adminCreateNewUser: 'admin_create_new_user',
  },
}

export const ROOMS = {
  type: {
    oneToOne: 1,
    group: 2
  },
};

export const USER_ROOMS = {
  role: {
    admin: 1,
    member: 2,
  },
};

export const MESSAGES = {
  type: {
    text: 1,
    sticker: 2,
    call: 3,
  },
};