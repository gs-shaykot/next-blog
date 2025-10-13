# 🌐 BlogCraft

> **An AI-powered, next-generation blogging platform**  
> built for creators, editors, and readers — with intelligent content generation powered by **Gemini 2.5 Flash** and stunning visuals from **Pollinations.ai**.

---

## 🧠 Overview

**BlogCraft** is a modern, full-stack blogging platform that seamlessly combines human creativity with AI assistance.  
Admins and moderators can generate, refine, and publish articles and images effortlessly — while readers enjoy a smooth, responsive, and personalized reading experience.

---

## 🚀 Key Features

### ✨ AI-Assisted Content Creation
- Generate blog articles using **Gemini 2.5 Flash** prompts.  
- Create visually engaging thumbnails via **Pollinations.ai**.  
- Edit or refine AI-generated drafts manually.

---

### 🧾 Guide: Generating an AI Article

Here’s how to generate an AI-powered article inside **BlogCraft**:

1. **Go to the “Generate Article” Section** in your admin or moderator dashboard.  
2. **Enter a prompt or topic idea** — for example:  
   > _“Write a blog about the future of AI-driven education.”_
3. **Click on “Generate with AI”** — the system will use **Gemini 2.5 Flash** to produce:
   - 🏷 **Title** → Appears **at the top** of the AI response.  
   - 📜 **Full Article** → Displayed **in the middle section**.  
   - 🔖 **Hashtags** → Shown **at the bottom**.
4. **Copy and paste**:
   - The **title** into the **Title field** of your article editor.  
   - The **hashtags** into the **Tags/Hashtags field**.
5. Make any **manual edits or refinements** as needed.  
6. Finally, click **“Publish”** or **“Save as Draft”**.

> 💡 *Tip:* AI outputs are fully editable — you can tweak tone, length, or structure before publishing.

---

### 📰 Blog Management
- Create, preview, edit, and publish posts.  
- Categorize and tag blogs with advanced filters.  
- Highlight **featured** and **trending** posts dynamically.

### 👥 User Roles
| Role | Capabilities |
|------|---------------|
| **Admin** | Manage users, approve & publish content, access analytics |
| **Moderator** | Edit & approve AI-generated articles |
| **Reader** | Browse, like, comment, and share posts |

### 🔐 Authentication
- Secure login/signup via **NextAuth (Google, Email)**  
- Role-based access control with **JWT**

### 📊 Admin Dashboard
- Real-time analytics: views, engagement, AI performance  
- Insights to improve publishing strategy

### 💬 User Engagement
- Like, share, and comment on posts  
- Related article recommendations  
- Smooth reading experience with light/dark theme toggle

---

## 🧩 Planned Integrations
> BlogCraft is built for scalability and future expansion.

- **State Management**: Redux Toolkit  
- **Database**: MongoDB  
- **Backend**: Node.js + Express  
- **Rendering**: SSR + CSR hybrid (Next.js)  
- **Deployment**: Vercel (frontend + backend)  
- **Security**: JWT, CSRF/XSS protection  
- **Performance Goal**: 50K+ monthly active users

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js (React, Tailwind CSS, Framer Motion) |
| **State Management** | Redux Toolkit |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | NextAuth (JWT, OAuth) |
| **AI Integration** | Gemini 2.5 Flash (text) + Pollinations.ai (images) |
| **Hosting** | Vercel |

---

## 🔮 Future Enhancements
- SEO-optimized title & keyword suggestions  
- Graph-based analytics dashboard  
- Monetization options (ads, premium posts)  
- PWA support for offline reading  

---

## 📷 AI Showcase

> **Example AI Flow:**
> 1. ✍️ Generate Article → *Gemini 2.5 Flash*  
> 2. 🎨 Generate Thumbnail → *Pollinations.ai*  
> 3. 📰 Publish Instantly → *BlogCraft Dashboard*

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/BlogCraft.git

# Move into the project folder
cd BlogCraft

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
