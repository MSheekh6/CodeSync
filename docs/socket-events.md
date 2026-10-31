# Socket events

All socket connections use the server URL from `REACT_APP_SERVER_URL` and send cookies with `withCredentials: true`.

## Client to server

### `join-room`

Payload:

```json
{ "roomId": "room-name" }
```

The server validates the room ID and uses the authenticated cookie identity or a generated guest identity. Client-supplied usernames are ignored.

### `code-change`

Payload:

```json
{ "roomId": "room-name", "fileName": "html", "code": "<h1>Hello</h1>" }
```

The sender must already be in the room. Valid file names are `html`, `css`, and `js`.

### `leave-room`

No payload. Removes the current socket from its room and updates presence.

## Server to client

### `room-joined`

Sent only to the joining socket:

```json
{
  "roomId": "room-name",
  "files": { "html": "...", "css": "...", "js": "..." },
  "userCount": 1,
  "currentUser": {
    "userId": "guest-socket-id",
    "username": "Guest-1234",
    "color": "#ff6b6b",
    "isGuest": true
  }
}
```

### `code-update`

Sent to every other socket in the room, never back to the sender:

```json
{ "fileName": "html", "code": "<h1>Updated</h1>" }
```

### `presence-update`

Sent to every socket in the room after join, leave, room switch, or disconnect:

```json
[
  {
    "userId": "guest-socket-id",
    "username": "Guest-1234",
    "color": "#ff6b6b",
    "isGuest": true
  }
]
```

### `socket-error`

Sent to the affected socket for invalid room or join input:

```json
{ "error": "Invalid room ID." }
```

### Socket connection errors

When `ALLOW_GUESTS=false` and a connection has no valid JWT, Socket.io rejects the connection with the `unauthorized` error. The client redirects to `/login`.
