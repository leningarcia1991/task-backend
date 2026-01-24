
# task-backend

Backend servless for tasks management, built with Node.js, TypeScript, Express and Firebase Cloud Functions, following clean/hexagonal architecture principles.
## Tech Stack

* **Runtime:** Node.js 24
* **Language:** TypeScript
* **Framework:** Express
* **Serverless:** Firebase Cloud Functions
* **Database:** Firestore
* **Auth:** JWT Authentication
* **Validation:** class-validator / class-transformer
* **Linting:** ESLint
* **CI/CD:** GitHub Actions (CI/CD)
## Project structure

task-backend/
├── functions/
│   ├── src/
│   │   ├── application/
│   │   │   ├── dtos/
│   │   │   │   ├── task/
│   │   │   │   ├── user/
│   │   │   │   └── common/
│   │   │   └── use-cases/
│   │   │   │   ├── task-use-cases/
│   │   │   │   ├── user-use-cases/
│   │   ├── domain/
│   │   │   ├── auth/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── errors/
│   │   ├── infrastructure/
│   │   │   ├── controllers/
│   │   │   ├── factories/
│   │   │   ├── firebase/
│   │   │   ├── middlewares/
│   │   │   ├── repositories/
│   │   │   └── utils/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── lib/               # build output
│   ├── package.json
│   └── tsconfig.json
├── .github/workflows/
│   └── firebase.yml       # CI/CD
├── .firebaserc
├── firebase.json
└── README.md

## Architecture

The project follows a hexagonal architecture (Clean architecture), the domain layer is framework-agnostic and does not depend on Firebase or Express.

- **Domain:** Entries, contracts and business errors.
- **Application:** Use cases and DTO.
- **Infrastructure:** Controllers, middleware, contracts implementations, Firebase and factories.
- **Routes:** Definition of HTTP endpoints.

This allows for:
- Loose coupling
- Easy testing
- Scalability
- Framework independence
## Authentication

* JWT-based Authentication
* For endpoints marked as private (JWT), is necessary include the token in the request headers.
## API endpoints

| Method | Endpoint | Description  | Authentication  |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check the server status | Public |
| `POST` | `/api/auth` | JWT Login and Delivery | Public |
| `POST` | `/api/users` | Registration of new users | **Private (JWT)** |
| `GET` | `/api/users` | Gets a user information | **Private (JWT)** |
| `POST` | `/api/tasks` | Create a new task | **Private (JWT)** |
| `GET` | `/api/tasks/:email` | It retrieves all user tasks. | **Private (JWT)** |
| `PUT` | `/api/tasks/:id` | Update an existing task | **Private (JWT)** |
| `DELETE` | `/api/tasks/:id` | Delete a task | **Private (JWT)** |

## Installation and deploy

1. Install dependencies:

```bash
  cd functions
  npm install
```

2. Run emulator:

```bash
  npm run serve
```

3. API available:

```bash
  http://localhost:5001/<project-id>/us-central1/api
```

4. Manual deploy
```bash
  npm run deploy
```

5. GitHub Actions is automatically deployed when you push to main, workflow located in:
```bash
  .github/workflows/firebase.yml
```

5. Configure environment variables:
```bash
  #Firebase
  firebase functions:secrets:set JWT_SECRET <your-secret>
  firebase functions:secrets:set JWT_EXPIRES_IN <ej:4h>
```