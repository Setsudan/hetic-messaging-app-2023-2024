import PocketBase from 'pocketbase';

const url = 'https://3eea-77-132-153-46.ngrok-free.app/';

export const filesUrl = url + 'api/files/_pb_users_auth_/';
export const convFilesUrl = url + 'api/files/';

export const pb = new PocketBase(url);
