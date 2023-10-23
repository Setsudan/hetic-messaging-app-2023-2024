export type SignUpBody = {
    display_name: string,
    username: string,
    password: string,
    phone_number?: string,
    email: string,
}
export type UserData = {
    uid: string,
    profile_picture: string,
    display_name: string,
    username: string,
    password: string,
    phone_number: string,
    email: string,
    about: string,
}