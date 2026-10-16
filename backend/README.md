# Guild & Grain — Medusa Backend

Medusa V2 backend for Guild & Grain. Local infra runs via Docker Compose at the **repo root**.

## Prerequisites

- Node.js 20+ / 22+
- Docker + Docker Compose

## 1. Start Postgres + Redis

From the **repository root** (`gandg_website/`):

```bash
docker compose up -d
docker compose ps
```

| Service  | Container        | Host port | Credentials                          |
|----------|------------------|-----------|--------------------------------------|
| Postgres | `gandg-postgres` | `5432`    | user/pass/db: `medusa` / `medusa` / `medusa` |
| Redis    | `gandg-redis`    | `6380`    | `redis://localhost:6380`             |

Redis uses host port **6380** because **6379** is often already taken by a system Redis.

## 2. Configure env

```bash
cp .env.template .env
# defaults already point at the Docker services
```

## 3. Migrate & run

```bash
npm run dev
# or separately:
npx medusa db:migrate
npx medusa user -e admin@example.com -p supersecret
npm run dev
```

- API / Admin: http://localhost:9000  
- Admin UI: http://localhost:9000/app  

## Useful commands

```bash
# Infra
docker compose up -d          # start db + redis
docker compose down           # stop (keeps volumes)
docker compose down -v        # stop + wipe data volumes

# Backend
npm run dev                   # develop (hot reload)
npm run build && npm start    # production-style
npm run seed                  # demo seed script (optional)
```
