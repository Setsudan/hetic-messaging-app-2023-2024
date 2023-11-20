
import 'package:flutter/material.dart';
import 'package:mobile_v2/screens/auth/login.dart';
import 'package:mobile_v2/screens/auth/register.dart';
import 'package:mobile_v2/screens/home/home_screen.dart';
import 'common/pocket.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Call the checkUserSession function to determine the initial route
    String initialRoute = checkUserSession() ? '/home' : '/login';

    return MaterialApp(
      title: 'My App',
      initialRoute: initialRoute,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true
      ),
      routes: {
        '/home': (context) => HomeScreen(),
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegisterScreen(),
      },
    );
  }

  bool checkUserSession() {
    return isSessionValid();
  }
}