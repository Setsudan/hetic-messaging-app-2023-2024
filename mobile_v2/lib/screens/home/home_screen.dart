import 'package:flutter/material.dart';
import 'package:mobile_v2/common/pocket.dart';
import 'package:mobile_v2/screens/settings/settings_screen.dart';

class HomeScreen extends StatelessWidget {
   @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text('Pocket Mess'),
        actions: [
          IconButton(
            icon: CircleAvatar(backgroundImage: NetworkImage(getUserAvatar(pb.authStore.model))),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SettingsScreen()),
              );
            },
          ),
        ],
      ),
      body: FutureBuilder(
        future: getConversations(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator(); // Add loading indicator while fetching data
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
            // Display conversations in a ListView
            List<Widget> conversationList = List.generate(
              snapshot.data.length,
              (index) => ListTile(
                title: Text(snapshot.data[index]['id']),
                onTap: () {
                  // Handle conversation tap
                },
              ),
            );

            return ListView(
              children: conversationList,
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your action here
        },
        child: Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}