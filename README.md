# Todo List Manager

## Enpoints

### POST /login – login

#### Request

```json
{
  "username": "string",
  "password": "string"
}
```

#### Response

```json
{
  "id": "number",
  "username": "string"
}, 200
```

### `DELETE /logout` – logout

#### Response

* HTTP 204 No Content

### `POST /register` - register

#### Request

```json
{
  "username": "string",
  "password": "string"
}
```

#### Response

```json
{
  "id": "number",
  "username": "string"
}, 201
```