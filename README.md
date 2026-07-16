

**EasyStay** is a full-featured hotel reservation platform built for real-world booking scenarios — not just a demo. It's designed to handle the messy realities of hotel bookings: overlapping searches, simultaneous reservations, and real money changing hands, all without breaking a sweat.

On the guest side, users can search available rooms by date, filter by type and price, and complete a reservation with real payment processing — no mock transactions, no placeholder checkout. Once booked, guests can revisit their account to view, modify, or cancel reservations, giving them full control over their stay long after the initial booking.

On the other side of the platform, hotel staff manage room inventory and pricing through the same underlying data layer that powers the guest experience. That shared data layer is what keeps everything honest — when staff update pricing or availability, guests see it reflected instantly, and when a guest books a room, staff see the updated inventory in real time. There's no lag, no stale data, no disconnect between what guests are shown and what's actually available.

At its core, EasyStay was built to solve a problem that's easy to overlook until it breaks something in production: making sure two guests can never book the same room for the same dates, and making sure payments only ever go through once a reservation has been verified. It's a small requirement to state, but a demanding one to build correctly — and it's the foundation everything else in EasyStay sits on top of.

Whether you're a guest planning a trip or a hotel team managing day-to-day operations, EasyStay is built to feel simple on the surface while staying rock-solid underneath.

## Recommended Project Structure

```text
easystay/
├─ apps/
│  ├─ web/                 # React + Next.js frontend
│  └─ api/                 # Node.js + Express backend
├─ packages/
│  ├─ shared-types/        # Shared DTOs and domain types
│  ├─ eslint-config/       # Optional shared lint config
│  └─ tsconfig/            # Optional shared TS config
├─ infra/                  # Docker, deployment, and environment assets
├─ .github/
│  └─ workflows/           # CI pipelines
├─ docs/
│  └─ PROJECT_STRUCTURE.md # Detailed production scaffold
└─ README.md
```

See `docs/PROJECT_STRUCTURE.md` for the full tree and placement notes for booking integrity, payments, and auth flows.

