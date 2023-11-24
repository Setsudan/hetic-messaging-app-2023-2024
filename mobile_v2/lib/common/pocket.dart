import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('http://143.110.168.44/');

// is session valid
bool isSessionValid() {
  return pb.authStore.isValid;
}

// login
Future<dynamic> login({required String identity, required String password}) async {
  print('login');
  try {
    final rec = await pb.collection('users').authWithPassword(identity, password);
    print(rec);
    if (pb.authStore.isValid) {
      return {'success': true, 'data': rec};
    } else {
      return {'success': false, 'data': 'Invalid login'};
    }
  } catch (e) {
    return {'success': false, 'data': 'Error: $e'};
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

dynamic getUserDataById(String id) async {
  try {
    final rec = await pb.collection('users').getOne(id);
    return rec;
  } catch (e) {
    return 'Error: $e';
  }
}

String getFileUrl(RecordModel rec, String filename) {
  // return pb.getFileUrl(rec, filename) need to convert to string
  return pb.getFileUrl(rec, filename).toString();
}

// get User Avatar
String getUserAvatar(dynamic rec) {
  print('getUserAvatar');
  print(rec);
  // check if rec is null
  if (rec == null) {
    return '';
  } else {
    // check if rec has avatar
    if (rec.data['avatar'] != null) {
      return getFileUrl(rec, rec.data['avatar']);
    } else {
      return '';
    }
  }
}

// CONVERSATIONS

// get conversations where user is in participants
Future<dynamic> getConversations() async {
  try {
    final rec = await pb.collection('conversations').getList(filter: 'participants ~ ${pb.authStore.model.id}');
    print(rec);
    return rec;
  } catch (e) {
    return 'Error: $e';
  }
}
