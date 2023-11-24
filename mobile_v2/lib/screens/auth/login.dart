import 'package:flutter/material.dart';
import 'package:mobile_v2/common/pocket.dart' show login;

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool showPassword = false;
  String identity = '';
  String password = '';

  void handleLogin() {
    // login needs identity and password
    login(identity: identity, password: password).then((value) => {
      if (value['success']) {
        Navigator.pushNamed(context, '/home')
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(value['data'])))
      }
    });
  }

  void goToRegisterPage() {
    Navigator.pushNamed(context, '/register');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Identity',
              ),
              onChanged: (value) {
                setState(() {
                  identity = value;
                });
              },
            ),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Password',
                suffixIcon: IconButton(
                  icon: Icon(showPassword ? Icons.visibility_off : Icons.visibility),
                  onPressed: () {
                    setState(() {
                      showPassword = !showPassword;
                    });
                  },
                ),
              ),
              obscureText: !showPassword,
              onChanged: (value) {
                setState(() {
                  password = value;
                });
              },
            ),
            ElevatedButton(
              child: Text('Login'),
              onPressed: () {
                handleLogin();
              },
            ),
            TextButton(
              onPressed: () {
                goToRegisterPage();
              },
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
