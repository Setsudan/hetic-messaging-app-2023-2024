import PocketBase from 'pocketbase';

const url = 'http://143.110.168.44';

export const filesUrl = url + 'api/files/_pb_users_auth_/';
export const convFilesUrl = url + 'api/files/';

export const pb = new PocketBase(url);
