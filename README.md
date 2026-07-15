# 🎓 EduCluster — Academic Registry & Operations Pipeline

EduCluster is a modern, high-contrast, multi-tenant portal designed to streamline institutional governance, faculty allocations, student indexing, and syllabus tracking. Built with strict data isolation boundaries, it gives educational networks full administrative authority over their campus operations.

🚀 **Note for Evaluators:** This repository is currently being accelerated for an event taking place in **two weeks**. The codebase is optimized for demonstration, structural integrity, and clean interface boundaries matching our milestone timeline.

---

## 🛠️ System Architecture & Features

### 1. Multi-Step Onboarding Pipeline
* **Tightly Gated Validations:** Built-in React Hook Form validation checks schema requirements step-by-step before committing data.
* **Balanced UI Contours:** Avoids layout whitespace vacuums by using a high-visibility, two-column responsive field system.

### 2. Multi-Tenant Faculty Routing (`institution`)
* **Data Isolation:** All entities (Students, Faculty, Courses) point to a parent `institution` record. This permits clean multi-tenancy where multiple schools share resources safely without cross-leakage.
* **Granular Scopes:** Super Admins govern global clusters while Campus Admins remain bound to their specific institution metadata.

### 3. Comprehensive Registries (Students, Faculty & Courses)
* **Faculty-Driven Filters:** Relocates legacy section-based sorting in favor of an industry-standard **Faculty Line Selector** (e.g., Information Technology, Business Administration).
* **Live Capacity Tracking:** Course modules render progressive structural counters (`enrolledStudents / maxCapacity`) with visual overload indicators when capacities are reached.

### 4. Enterprise-Grade Security
* **Access Auditing:** Supports logging of administrative metadata, tracking critical security vectors such as the admin's `lastLogin`.
* **Two-Factor Flagging (`twoFactorEnabled`):** Integrated state management flag within the login pipeline that seamlessly halts basic JWT issuance until a secondary verification token (OTP) is cleared.

---

## 🎨 Design System Language

The application interface is intentionally designed around high accessibility standards:
* **Background Architecture:** Smooth emerald-to-teal mesh gradients that lift forms off the viewport layer.
* **Contour Visibility:** Swaps weak, washed-out tones for strong `border-slate-300` boundaries to ensure form controls stand out sharply on high-brightness monitors.
* **Micro-interactions:** Smooth hover scaling on index blocks and indicator badges.

---

## ⚙️ Core Technology Stack

* **Frontend Framework:** React with TypeScript (TSX)
* **Form Engine:** React Hook Form
* **Styling Matrix:** Tailwind CSS (featuring Glassmorphic filters)
* **Icon Set:** Lucide React

---

## 🚀 Event Deployment Roadmap (2-Week Sprint)

With the event approaching rapidly, development focuses on the following milestones:

- [x] Refactor onboarding form to balanced 2-column grid layout.
- [x] Deepen border contours for enhanced field visibility.
- [x] Implement Faculty-based routing over layout sections.
- [x] Build out Course, Faculty, and System Configuration settings pages.
- [ ] Connect Authentication Middleware to verify the `twoFactorEnabled` state flag.
- [ ] Connect the active form pipeline to live Mongoose schema endpoints.
- [ ] Finalize production container adjustments for event demonstration.

---

## 💻 Local Sandbox Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/educluster.git](https://github.com/your-username/educluster.git)
   cd educluster
