# 🏨 ADC Hotel Management System API

![ADC Hotel](https://raw.githubusercontent.com/ibayjimwell/adc-hotel-app/refs/heads/main/public/app-image.png)

A full-featured **Hotel Management System REST API** built for **ADC Hotel**.
This API handles guests, rooms, reservations, stays, billing, payments, and hotel services.

Designed for real-world hotel operations including **check-ins, reservations, invoicing, and room management**.

🌐 **Live Frontend Demo:** [https://adc-hotel-app.vercel.app/](https://adc-hotel-app.vercel.app/)

---

## 🚀 Tech Stack

* **Node.js + Express.js** — Backend framework
* **Drizzle ORM** — Type-safe database ORM
* **PostgreSQL** — Relational database

---

## 📌 Base URL

```
http://localhost:4000/api/v1
```

---

## ✨ Core Features

✔ Guest Management
✔ Room & Room Type Management
✔ Reservation System (Single & Multiple Rooms)
✔ Check-in / Check-out System
✔ Stay Tracking
✔ Invoice Generation
✔ Payment Processing
✔ Hotel Services Management
✔ Room Status Control (available, occupied, maintenance)

---

# 📚 API Routes

---

## 👤 Guests

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/guests`                  | Create new guest                |
| POST   | `/guests?updateExist=true` | Create or update existing guest |
| GET    | `/guests`                  | Get all guests                  |
| GET    | `/guests?search=keyword`   | Search guests                   |
| GET    | `/guests/:id`              | Get guest by ID                 |
| PUT    | `/guests/:id`              | Update guest                    |

---

## 🛏 Room Types

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/rooms/types`     | Create room type   |
| GET    | `/rooms/types`     | Get all room types |
| PUT    | `/rooms/types/:id` | Update room type   |

---

## 🚪 Rooms

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| POST   | `/rooms`            | Create room                  |
| GET    | `/rooms`            | Get all rooms with type info |
| PATCH  | `/rooms/:id/status` | Update room status           |

**Room Status Options**

```
available
occupied
maintenance
```

---

## 📅 Reservations

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/reservations`            | Create reservation   |
| GET    | `/reservations`            | Get all reservations |
| PATCH  | `/reservations/:id/cancel` | Cancel reservation   |

---

## 🏨 Stays (Check-in / Check-out)

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| POST   | `/stays/checkin`          | Check-in guest (create stay) |
| PATCH  | `/stays/:stayId/checkout` | Check-out guest              |

---

## 🧾 Invoices

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| POST   | `/invoices/generate/:stayId` | Generate invoice for stay |
| GET    | `/invoices/stay/:stayId`     | Get invoice by stay       |

---

## 💳 Payments

| Method | Endpoint               | Description |
| ------ | ---------------------- | ----------- |
| POST   | `/payments/:invoiceId` | Pay invoice |

---

## 🛎 Services

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| POST   | `/services`     | Create service |
| GET    | `/services`     | List services  |
| PUT    | `/services/:id` | Update service |

---

# 🧪 Example Request

### Create Guest

```http
POST /api/v1/guests
Content-Type: application/json
```

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "+639171234567",
  "idType": "National ID",
  "idNumber": "725519999247742"
}
```

---

# ⚙️ Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/adc_hotel
PORT=4000
```

### 4️⃣ Run Database Migrations (Drizzle)

```bash
npx drizzle-kit push
```

### 5️⃣ Start Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:4000
```

---

# 🔮 Future Improvements

* Authentication & Role-based Access
* Reporting & Analytics
* Discounts & Promotions
* Housekeeping Module
* Multi-branch hotel support

---

# 👨‍💻 Author

**Jimwell Ibay**
- Developer and Maintainer
