# How to websocket

Dans la théorie on peut faire ça comme ça. Dans la pratique j'ai pas ton code et
je veux pas y toucher au cas où c'est pas fini

```
import wsServer from '../../index.ts'; // Import the WebSocket server instance

router.post('/send', (req, res) => {
  // TODO: Recup l'utilisateur associé au websocket
  const user = getUserForSocketConnection(req.socket);

  // Check si le message est pour l'utilisateur
  if (user && messageIsForUser(req.body, user)) {
    // Envoyer le msg à l'utilisateur en utilisant WebSocket
    wsServer.clients.forEach(client => {
      if (client.user === user) {
        client.send(JSON.stringify({ message: req.body.message }));
      }
      // ... Mechanique pour sauvegarder le msg
    });
  }

  res.status(200).send('Message processed.');
});
```
