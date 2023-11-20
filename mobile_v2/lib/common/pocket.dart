import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('https://7d45-77-132-153-46.ngrok-free.app');

// is session valid
bool isSessionValid() {
  return pb.authStore.isValid;
}

// login
Future<dynamic> login({required String identity, required String password}) async {
  try {
    final rec = await pb.collection('users').authWithPassword(identity, password);
    if (pb.authStore.isValid) {
      print(rec);
      return rec;
    } else {
      return 'Invalid login';
    }
  } catch (e) {
    return 'Error: $e';
  }
}

// register
Future<dynamic> register(
    {required String username, required String password, required String passwordConfirm, required String name}) async {
  var body = <String, dynamic>{
    "username": username,
    "email": '',
    "emailVisibility": false,
    "password": password,
    "passwordConfirm": passwordConfirm,
    "name": name
  };
  try {
    final rec = await pb.collection('users').create(body: body);
    if (pb.authStore.isValid) {
      return rec;
    } else {
      return 'Invalid login';
    }
  } catch (e) {
    return 'Error: $e';
  }
}

// return user data with pb.authStore.model
dynamic getUserData() {
  return pb.authStore.model;
}
