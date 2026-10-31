# Authentication API testing

Run the server from `/server` with `MONGODB_URI` and `JWT_SECRET` configured.

## Sign up

```bash
curl -i -c cookies.txt -H "Content-Type: application/json" \
  -d "{\"username\":\"demo_user\",\"email\":\"demo@example.com\",\"password\":\"password123\"}" \
  http://localhost:5000/api/auth/signup
```

## Check the session

```bash
curl -i -b cookies.txt http://localhost:5000/api/auth/me
```

## Log out

```bash
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:5000/api/auth/logout
```

## Log in

```bash
curl -i -c cookies.txt -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@example.com\",\"password\":\"password123\"}" \
  http://localhost:5000/api/auth/login
```

The same requests can be run from the VS Code REST Client extension. Use a request file and keep the cookie returned by signup/login when testing `/api/auth/me`.
