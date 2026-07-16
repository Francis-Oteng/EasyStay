# EasyStay Recommended Monorepo Structure

```text
easystay/
├─ apps/
│  ├─ web/                                   # Next.js (guest + staff UI)
│  │  ├─ public/
│  │  ├─ src/
│  │  │  ├─ app/                             # App Router pages/layouts
│  │  │  │  ├─ (guest)/
│  │  │  │  │  ├─ search/page.tsx
│  │  │  │  │  ├─ checkout/page.tsx
│  │  │  │  │  └─ reservations/page.tsx
│  │  │  │  ├─ (staff)/
│  │  │  │  │  ├─ dashboard/page.tsx
│  │  │  │  │  ├─ rooms/page.tsx
│  │  │  │  │  └─ bookings/page.tsx
│  │  │  │  ├─ auth/
│  │  │  │  │  ├─ login/page.tsx
│  │  │  │  │  └─ register/page.tsx
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ components/
│  │  │  │  ├─ booking/
│  │  │  │  ├─ payment/
│  │  │  │  └─ staff/
│  │  │  ├─ lib/
│  │  │  │  ├─ api-client.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  └─ date.ts
│  │  │  ├─ hooks/
│  │  │  ├─ store/
│  │  │  └─ types/
│  │  ├─ next.config.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  │
│  └─ api/                                   # Express API + business logic
│     ├─ src/
│     │  ├─ server.ts
│     │  ├─ app.ts
│     │  ├─ config/
│     │  │  ├─ env.ts
│     │  │  ├─ db.ts
│     │  │  ├─ paystack.ts
│     │  │  └─ jwt.ts
│     │  ├─ modules/
│     │  │  ├─ auth/
│     │  │  │  ├─ auth.controller.ts
│     │  │  │  ├─ auth.service.ts
│     │  │  │  ├─ auth.routes.ts
│     │  │  │  └─ token.service.ts
│     │  │  ├─ rooms/
│     │  │  │  ├─ rooms.controller.ts
│     │  │  │  ├─ rooms.service.ts
│     │  │  │  ├─ rooms.repo.ts
│     │  │  │  └─ rooms.routes.ts
│     │  │  ├─ availability/
│     │  │  │  ├─ availability.service.ts
│     │  │  │  └─ availability.repo.ts
│     │  │  ├─ bookings/
│     │  │  │  ├─ bookings.controller.ts
│     │  │  │  ├─ bookings.service.ts
│     │  │  │  ├─ bookings.repo.ts
│     │  │  │  └─ bookings.routes.ts
│     │  │  └─ payments/
│     │  │     ├─ paystack.service.ts
│     │  │     ├─ payments.controller.ts
│     │  │     ├─ payments.routes.ts
│     │  │     └─ webhook.controller.ts
│     │  ├─ middleware/
│     │  │  ├─ auth.middleware.ts
│     │  │  ├─ role.middleware.ts
│     │  │  └─ error.middleware.ts
│     │  ├─ db/
│     │  │  ├─ migrations/
│     │  │  ├─ seeds/
│     │  │  └─ queries/
│     │  ├─ utils/
│     │  └─ tests/
│     │     ├─ unit/
│     │     └─ integration/
│     ├─ package.json
│     └─ tsconfig.json
│
├─ packages/
│  ├─ shared-types/
│  │  ├─ src/
│  │  │  ├─ auth.ts
│  │  │  ├─ booking.ts
│  │  │  └─ room.ts
│  │  └─ package.json
│  ├─ eslint-config/                         # Optional shared lint rules
│  └─ tsconfig/                              # Optional shared TS presets
│
├─ infra/
│  ├─ docker/
│  │  ├─ Dockerfile.web
│  │  ├─ Dockerfile.api
│  │  └─ docker-compose.yml
│  ├─ nginx/
│  └─ deploy/
│
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ deploy.yml
│
├─ .env.example
├─ package.json                              # Workspace root
├─ pnpm-workspace.yaml
└─ turbo.json
```

## Placement Notes

- **Booking transaction logic**: `apps/api/src/modules/bookings/bookings.service.ts` should orchestrate transactional reservation creation/cancellation and DB locking.
- **Availability overlap checks**: `apps/api/src/modules/availability/availability.service.ts` should centralize date-range overlap detection before confirming any booking.
- **Paystack webhook handling**: `apps/api/src/modules/payments/webhook.controller.ts` should verify Paystack signatures/events and update booking/payment status idempotently.
- **JWT + refresh-token logic**: keep access/refresh token issuing, rotation, revocation, and refresh-token persistence in `apps/api/src/modules/auth/` (`auth.service.ts`, `token.service.ts`) with request checks in `apps/api/src/middleware/auth.middleware.ts`.
