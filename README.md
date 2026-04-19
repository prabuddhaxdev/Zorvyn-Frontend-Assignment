# 💸 FinSync AI — Full Stack AI Finance Platform

## 🚀 Overview

**FinSync AI** is a modern, AI-powered personal finance platform designed to help users **track, analyze, and optimize their spending** with beautiful data visualizations and real-time insights.

From smart transaction categorization to automated budget alerts and AI-powered receipt scanning, FinSync transforms raw financial data into **actionable intelligence**. Built with a powerful full-stack architecture, it combines performance, scalability, and a sleek user experience.

Whether you're managing daily expenses, tracking investments, or analyzing spending patterns — **FinSync gives you clarity and control over your money.**

---

## ✨ Features

### 📊 Stunning Financial Visualizations

* Interactive charts powered by **Recharts**
* Monthly expense breakdown (Pie Charts)
* Income vs Expense trends (Bar Graphs)
* Real-time financial insights at a glance

### 🤖 AI Receipt Scanner

* Scan receipts using AI
* Auto-extract amount, category, and date
* Eliminates manual entry
* Fast and accurate parsing

### 💰 Smart Budget Tracking

* Set monthly budgets per account
* Visual progress bars for spending
* Budget alerts when limits are exceeded
* Real-time usage tracking

### 📁 Transaction Management

* Add, edit, and delete transactions
* Categorize expenses (food, travel, utilities, etc.)
* Search, filter, and sort transactions
* Bulk actions and export (CSV, PDF, Excel)

### 🔁 Recurring Transactions

* Automate repeated expenses/income
* Custom schedules (daily, monthly, etc.)
* Hands-free financial tracking

### 📤 Export Transactions (CSV / PDF / Excel)

* Export transactions in CSV, PDF, and Excel formats
* One-click bulk export for selected entries
* Apply filters before exporting (date, type, category, recurring)
* Clean, structured data ready for analysis
* Perfect for reporting, accounting, and audits

### 🏦 Multi-Account Support

* Manage multiple accounts (Savings, Personal, etc.)
* Switch between accounts seamlessly
* Track balances independently

### ⚡ Real-Time Dashboard

* Live financial overview
* Recent transactions preview
* Net balance, income, and expenses
* Clean and minimal UI

### 📬 Automated Reports & Alerts

* Monthly financial reports via email
* Budget alerts using background jobs
* Event-driven workflows with Inngest

### 🛡️ Authentication & Security

* Secure authentication with Clerk
* Protected routes and sessions
* Rate limiting using Arcjet

### 📱 Responsive UI

* Fully responsive across devices
* Dark mode optimized design
* Smooth animations and transitions

---

## 🧩 Use Cases

💸 Personal expense tracking
📊 Financial analytics & insights
🧾 Receipt-based expense logging
📈 Budget planning & optimization
🏦 Multi-account money management
📬 Automated financial reporting

---

## 🛠️ Tech Stack

### 🎨 Frontend

* **Next.js**
* **React JS**
* **JavaScript**
* **Tailwind CSS**
* **Recharts (Data Visualization)**
* **React Hook Form + Zod**

### ⚙️ Backend

* **Next.js Server Actions**
* **Prisma ORM**
* **Supabase (Database + Storage)**

### 🔐 Authentication

* **Clerk Auth**

### ⚡ Background Jobs & Automation

* **Inngest** (CRON jobs, workflows, async tasks)
* **Resend** (Monthly email reports, Budget alerts)

### 🛡️ Security & Rate Limiting

* **Arcjet**

---

## 📸 UI Highlights

* ✨ Clean dark-themed dashboard
* 📊 Insightful charts and analytics
* 🧾 AI-powered receipt scanning UI
* 📁 Advanced transaction table with filters
* 💡 Smooth and modern UX

---

## ⚙️ Installation

```bash
git clone https://github.com/prabuddhaxdev/FinSync.git
cd finsync
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
ARCJET_KEY=
ARCJET_ENV=
DATABASE_URL=""
GEMINI_API_KEY=
RESEND_API_KEY=

---

## 🧪 Run Locally

```bash
npm run dev
```

For background jobs:

```bash
npm run inngest:dev
```

---

## 📦 Build

```bash
npm run build
npm start
```

---

## 📈 Future Enhancements

* 🤖 AI financial insights & recommendations
* 📊 Advanced analytics dashboard
* 🌍 Multi-currency support
* 📱 Mobile app (React Native)
* 🔔 Push notifications




