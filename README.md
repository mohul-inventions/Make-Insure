# 🛡️ Make Insure (AI Fraud Auditor)
**Real-Time Insurance Verification & User Ecosystem**

Make Insure is a full-stack, AI-driven platform designed to solve the dual-sided failure of modern insurance: catching fraudulent claims *before* payout, while fast-tracking genuine claims to ensure legitimate patients and vehicle owners are never collateral damage. 

Originally built as a single-page prototype, **Version 2.0** expands the AI Engine into a complete Super-App ecosystem featuring dynamic dashboards, personalized policy offers, and interactive user profiles.

---

## 🚀 The Architecture

This project is built using a decoupled Full-Stack architecture:

### 1. The React Super-App (Frontend)
Built with React, Vite, and React Router, the frontend simulates a production-ready user ecosystem.
* **Smart Dashboard:** Reads historical audit logs from persistent `LocalStorage` to dynamically display "Total Claims," "Fraud Prevented," and "Pending Audits."
* **The AI Auditor:** A context-aware claim form that adapts its UI dynamically based on the selected domain (Health vs. Vehicle).
* **Interactive Offers:** Curated policy packages featuring state-driven expandable UI cards to reveal key benefits.
* **User Profile:** An interactive settings hub using inline panel rendering for Security, UPI integration, and an Insurance Document Vault.

### 2. The AI Risk Engine (Backend)
A Node.js REST API that intercepts multi-part form data in real-time.
* **Intelligent Ratio Analysis:** Calculates the exact ratio between the claimed amount and the industry standard. Severe deviations (e.g., 500% over limit) trigger an instant 100% Risk Score.
* **Multi-Modal Verification:** Intercepts uploaded files (X-Rays, Damage Photos) using `multer` and simulates metadata integrity checks to catch forged or recycled evidence.
* **Real-Time Triage:** Instantly returns a JSON verdict (`Auto-Approved`, `Manual Audit`, or `Total Fraud`) without requiring a page reload.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, React-Router-Dom, Axios, CSS3 (Animations & Layout)
* **Backend:** Node.js, Express.js, Cors, Multer (File Handling)
* **Storage:** Browser LocalStorage (for persistent, session-spanning audit ledgers)

---

## ⚙️ Local Setup & Installation

To run this project locally, you must run the Frontend and Backend concurrently using two separate terminal windows.

### 1. Start the Backend AI Engine
```bash
cd backend
npm install
node server.js
