import PocketBase from 'pocketbase';

const url = 'https://5571-77-132-153-46.ngrok-free.app';

export const filesUrl = url + '/api/files/_pb_users_auth_/';

export const pb = new PocketBase(url);
