export const DEFAULT_PASWORD = '123456';

export const USERS = {
    level: {
        super_admin: 1,
        admin: 2,
        user: 3
    },
    is_confirm_account: {
        true: 1,
        false: 2
    }
}

export const STORAGE_PATHS = {
    importUsers: './storage/users/imports/',
    uploadAvatarUser: './storage/users/avatars/'
}

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
}

export const JOB_QUEUES = {
    userImports: 'user-imports'
}