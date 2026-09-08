# College Backend API

A simple, beginner-friendly Django REST Framework backend for a **College CRUD**
mobile application. It provides JWT-authenticated APIs for managing students,
and is designed to be consumed by a React Native + TypeScript app using Axios.

---

## 1. Project Overview

This backend lets an authenticated user:

- Register and log in (JWT authentication)
- Create, read, update, and delete student records

The request flow for every endpoint is intentionally simple and predictable:

```
request → URL → View → Serializer → Model → Database
```

---

## 2. Technologies

| Purpose               | Technology                          |
|------------------------|-------------------------------------|
| Web framework          | Django                              |
| REST API               | Django REST Framework (DRF)         |
| Database                | MySQL                               |
| Authentication          | JWT (djangorestframework-simplejwt) |
| API documentation       | drf-spectacular (Swagger / ReDoc)   |
| Cross-origin requests   | django-cors-headers                 |
| Environment variables   | python-dotenv                       |
| MySQL driver             | mysqlclient                         |

---

## 3. Folder Structure

```
college_backend/
│
├── manage.py
├── requirements.txt
├── README.md
├── .env.example
├── .gitignore
│
├── config/                 # Django project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── students/                # Main app: auth + student CRUD
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── urls.py
    ├── views.py
    ├── migrations/
    │   └── __init__.py
    └── tests.py
```

---

## 4. Requirements

- Python 3.10+
- MySQL Server 8.x (or MariaDB)
- pip

---

## 5. MySQL Installation

Install MySQL Server for your OS:

- **Windows**: https://dev.mysql.com/downloads/installer/
- **macOS**: `brew install mysql`
- **Linux (Debian/Ubuntu)**: `sudo apt install mysql-server`

Start the MySQL service, and make sure you know your root (or app) username
and password — you'll need them for the `.env` file.

---

## 6. Database Creation

Log into MySQL and create a database for this project:

```sql
CREATE DATABASE college_db CHARACTER SET utf8mb4;
```

You can name it anything, as long as it matches `DB_NAME` in your `.env` file.

---

## 7. Virtual Environment Setup

From inside the `college_backend/` folder:

```bash
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

---

## 8. Install Dependencies

```bash
pip install -r requirements.txt
```

> **Note on mysqlclient (Windows):** if `mysqlclient` fails to build, install
> the "Microsoft C++ Build Tools" or download a precompiled wheel matching
> your Python version from https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient

---

## 9. Configure Environment Variables

Copy the example file and fill in your own values:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `.env`:

```
SECRET_KEY=your-secret-key
DEBUG=True

DB_NAME=college_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

`settings.py` never hardcodes these values — they are always loaded from
`.env` using `python-dotenv`.

---

## 10. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

This creates all required tables, including the `students_student` table.

---

## 11. Create a Superuser

Needed to log into the Django admin panel:

```bash
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password.

---

## 12. Run the Server

```bash
python manage.py runserver
```

By default the API is available at:

```
http://127.0.0.1:8000/
```

To make the server reachable from a phone/emulator on the same network,
run it on all interfaces:

```bash
python manage.py runserver 0.0.0.0:8000
```

---

## 13. Swagger Documentation

Once the server is running:

| Tool        | URL                                  |
|-------------|---------------------------------------|
| Swagger UI  | http://127.0.0.1:8000/api/docs/       |
| ReDoc       | http://127.0.0.1:8000/api/redoc/      |
| Raw schema  | http://127.0.0.1:8000/api/schema/     |

**How to test protected endpoints in Swagger UI:**

1. Open `/api/docs/`.
2. Expand `POST /api/auth/register/` and create a user (or use an existing one).
3. Expand `POST /api/auth/login/`, run it with your username/password, and
   copy the `access` token from the response.
4. Click the **Authorize** button (top right, lock icon).
5. Enter: `Bearer <access_token>` (or just the token, depending on your
   Swagger UI version) and click **Authorize**.
6. Now try any `Students` endpoint — it will send the token automatically.

---

## 14. JWT Authentication Flow

1. **Register** — `POST /api/auth/register/` creates a user account.
2. **Login** — `POST /api/auth/login/` returns an `access` token and a
   `refresh` token.
3. **Use the access token** — send it on every request to a protected
   endpoint as a header:
   ```
   Authorization: Bearer <access_token>
   ```
4. **Access token expires** (after 30 minutes) — use the `refresh` token to
   get a new access token:
   ```
   POST /api/auth/token/refresh/
   { "refresh": "<refresh_token>" }
   ```
5. **Refresh token expires** after 7 days — the user must log in again.

These lifetimes are configured in `config/settings.py` under `SIMPLE_JWT`:

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}
```

---

## 15. API Endpoints

### Authentication

| Method | Endpoint                     | Auth required | Description              |
|--------|-------------------------------|:--------------:|---------------------------|
| POST   | `/api/auth/register/`         | No             | Create a new user account |
| POST   | `/api/auth/login/`            | No             | Get access + refresh tokens |
| POST   | `/api/auth/token/refresh/`    | No             | Get a new access token    |
| GET    | `/api/auth/me/`               | Yes            | Get the current user      |

### Students

| Method | Endpoint                  | Auth required | Description          |
|--------|-----------------------------|:--------------:|------------------------|
| GET    | `/api/students/`            | Yes            | List all students     |
| POST   | `/api/students/`            | Yes            | Create a student      |
| GET    | `/api/students/{id}/`       | Yes            | Retrieve one student  |
| PUT    | `/api/students/{id}/`       | Yes            | Full update           |
| PATCH  | `/api/students/{id}/`       | Yes            | Partial update        |
| DELETE | `/api/students/{id}/`       | Yes            | Delete a student      |

### Example: Register

Request:
```json
{
    "username": "student1",
    "email": "student1@gmail.com",
    "password": "password123",
    "password2": "password123"
}
```

Response (`201 Created`):
```json
{
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "username": "student1",
        "email": "student1@gmail.com"
    }
}
```

### Example: Login

Request:
```json
{
    "username": "student1",
    "password": "password123"
}
```

Response (`200 OK`):
```json
{
    "access": "...",
    "refresh": "...",
    "user": {
        "id": 1,
        "username": "student1",
        "email": "student1@gmail.com"
    }
}
```

### Example: Create Student

Request (`POST /api/students/`, requires `Authorization: Bearer <token>`):
```json
{
    "name": "John",
    "email": "john@gmail.com",
    "phone": "9876543210",
    "department": "Computer Science",
    "year": 3
}
```

Response (`201 Created`):
```json
{
    "id": 1,
    "name": "John",
    "email": "john@gmail.com",
    "phone": "9876543210",
    "department": "Computer Science",
    "year": 3,
    "created_at": "2026-08-22T10:00:00Z",
    "updated_at": "2026-08-22T10:00:00Z"
}
```

---

## 16. HTTP Status Codes

| Code | Meaning       | When it happens                              |
|------|----------------|------------------------------------------------|
| 200  | OK             | Successful GET, PUT, PATCH                     |
| 201  | Created        | Successful POST (register, create student)     |
| 204  | No Content     | Successful DELETE                               |
| 400  | Bad Request    | Validation errors (bad email, missing field...) |
| 401  | Unauthorized   | Missing/invalid/expired JWT token               |
| 404  | Not Found      | Student with given id doesn't exist             |

---

## 17. Postman Testing

1. **Register**
   `POST http://127.0.0.1:8000/api/auth/register/`
   Body (JSON): username, email, password, password2

2. **Login**
   `POST http://127.0.0.1:8000/api/auth/login/`
   Body (JSON): username, password
   → copy the `access` token from the response.

3. **Set the Authorization header** on all following requests:
   - Key: `Authorization`
   - Value: `Bearer <access_token>`

   (In Postman you can also use the "Authorization" tab → type "Bearer Token"
   and paste just the token.)

4. **Create student** — `POST /api/students/` with the student JSON body.
5. **Get all students** — `GET /api/students/`
6. **Get one student** — `GET /api/students/1/`
7. **Update student** — `PUT` (full) or `PATCH` (partial) `/api/students/1/`
8. **Delete student** — `DELETE /api/students/1/`

### Refresh token flow in Postman

When the access token expires (after 30 minutes):

```
POST http://127.0.0.1:8000/api/auth/token/refresh/
Body: { "refresh": "<refresh_token>" }
```

Response:
```json
{ "access": "<new_access_token>" }
```

Use this new `access` token in the `Authorization` header going forward.

---

## 18. Running Tests

```bash
python manage.py test
```

This runs the tests in `students/tests.py`, covering registration, login,
the current-user endpoint, and the full student CRUD flow (including
that unauthenticated requests are rejected).

---

## 19. React Native Integration

This backend is ready to be consumed from a React Native app using
**Axios**. Example login call:

```ts
import axios from "axios";

const response = await axios.post(
  "http://YOUR_IP:8000/api/auth/login/",
  {
    username,
    password,
  }
);

const { access, refresh, user } = response.data;
```

Example authenticated request (fetching students):

```ts
const response = await axios.get("http://YOUR_IP:8000/api/students/", {
  headers: {
    Authorization: `Bearer ${access}`,
  },
});
```

### Important: `127.0.0.1` won't work from a phone or emulator

`127.0.0.1` always refers to the device itself, not your computer:

- **Android Emulator**: use `10.0.2.2` instead of `127.0.0.1`
  (this is a special alias the emulator maps to your computer's `localhost`).
- **Physical device (Expo Go, USB, or Wi-Fi)**: use your computer's local
  network IP address, e.g. `192.168.1.5`. Find it with:
  - Windows: `ipconfig` (look for "IPv4 Address")
  - macOS/Linux: `ifconfig` or `ip addr`
- Make sure your phone and computer are on the **same Wi-Fi network**, and
  that the server is started with `python manage.py runserver 0.0.0.0:8000`
  so it accepts connections from other devices.

A common pattern is to put the base URL in a single config file/constant so
it's easy to change:

```ts
// api/config.ts
export const API_BASE_URL = "http://192.168.1.5:8000/api";
```

---

## 20. Security Notes

This project follows basic Django security practices:

- Passwords are never stored in plain text — Django's `create_user()` hashes
  them automatically.
- `SECRET_KEY` and database credentials are loaded from environment
  variables (`.env`), never hardcoded in `settings.py`.
- `.env` is excluded from version control via `.gitignore`.
- `DEBUG` is controlled via an environment variable and **must be set to
  `False` in production**.

### Before deploying to production

- Set `DEBUG=False` in `.env`.
- Set `ALLOWED_HOSTS` in `config/settings.py` to your actual domain(s),
  instead of `['*']`.
- Set `CORS_ALLOW_ALL_ORIGINS = False` and configure `CORS_ALLOWED_ORIGINS`
  with the specific origins your frontend is served from.
- Use a strong, unique `SECRET_KEY` and never commit it to source control.
- Serve the app over HTTPS.
