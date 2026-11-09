# 🚀 GX.AI Context Engine 

**Team:** Let Me Solo It 
**Members:** Muhammad Ikhwan
**Institution:** UiTM
**Event:** UTMxHackathon '26  
**Category:** Finance & Fintech  

---

## 💡 The Problem
Traditional banking applications act as a rearview mirror—they only show users the money they have *already* lost. For Malaysian youth struggling to build financial resilience, passive tracking is not enough. To build sustainable wealth, banking needs to be active, predictive, and contextual.

## 🎯 Our Solution
**GX.AI Context Engine** is an autonomous financial resilience dashboard designed as a seamless integration for the GXBank ecosystem. Instead of passive tracking, it uses LLM-powered context analysis to monitor spending velocity in real-time and intervene *before* financial stress occurs.

## ✨ Key Features
* 🧠 **Context-Aware AI:** Integrates with Anthropic's Claude AI to analyze user spending patterns and issue dynamic, personalized behavioral nudges.
* 🚨 **Function 01 (Velocity Nudges):** Detects high weekend spending and automatically diverts micro-funds to Emergency Pockets to protect savings streaks.
* 🔍 **Function 02 (Subscription Audits):** Identifies dormant accounts and initiates cancellation protocols, re-routing wasted funds to high-yield investments.
* ⚡ **Function 03 (Auto-Routing):** Processes salary inflows instantly using the 50/30/20 rule without requiring user friction or manual transfers.
* 🎨 **GXBank UI:** A night-mode banking app in the GXBank palette with Home, Pockets, Transfer and Rewards screens that work on desktop and phone.

## 🛠️ Tech Stack
* **Framework:** Next.js 16 (App Router, React 19)
* **Styling:** Tailwind CSS 4
* **AI Integration:** Claude Haiku 5.5 via the Anthropic TypeScript SDK (`app/api/nudge/[scenario]/route.ts`). Answers are cached for an hour, so Claude is called at most once per check per hour.
* **Icons:** lucide-react

All account figures are sample data in `ai-agency/lib/data.ts`. Transfers and voucher claims are simulated in the browser.

## 🚀 Getting Started (Local Development)

```bash
git clone https://github.com/ZektoxFx/gxbank-ai-resilience.git
cd gxbank-ai-resilience/ai-agency
npm install
```

Put your Anthropic API key in `ai-agency/.env.local`. It is git-ignored:

```bash
ANTHROPIC_API_KEY=your-key-here
```

Then run the app at http://localhost:3000:

```bash
npm run dev
```

Without a key, GX.AI still answers, using built-in offline answers labelled "Offline answer".
