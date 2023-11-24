
import 'package:dynamic_color/dynamic_color.dart';
import 'package:flutter/material.dart';
import 'package:mobile_v2/screens/auth/login.dart';
import 'package:mobile_v2/screens/auth/register.dart';
import 'package:mobile_v2/screens/home/home_screen.dart';
import 'common/pocket.dart';
void main() {
  runApp(MyApp());
}


class MyApp extends StatelessWidget {
  static final _defaultLightColorScheme = ColorScheme.fromSwatch(primarySwatch: Colors.blue);
  static final _defaultDarkColorScheme =
      ColorScheme.fromSwatch(primarySwatch: Colors.blue, brightness: Brightness.dark);

  @override
  Widget build(BuildContext context) {
    // Call the checkUserSession function to determine the initial route
    String initialRoute = checkUserSession() ? '/home' : '/login';

    return DynamicColorBuilder(builder: (lightColorScheme, darkColorScheme) {
      return MaterialApp(
        title: 'My App',
        initialRoute: initialRoute,
        theme: ThemeData(colorScheme: lightColorScheme ?? _defaultLightColorScheme, useMaterial3: true),
        darkTheme: ThemeData(
          colorScheme: darkColorScheme ?? _defaultDarkColorScheme,
          useMaterial3: true,
        ),
        themeMode: ThemeMode.system, // Set theme mode to adapt to the device's theme
        routes: {
          '/home': (context) => HomeScreen(),
          '/login': (context) => LoginScreen(),
          '/register': (context) => RegisterScreen(),
        },
      );
    });
  }

  bool checkUserSession() {
    return isSessionValid();
  }
}