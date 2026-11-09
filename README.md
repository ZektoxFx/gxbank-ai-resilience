# 🚀 GX.AI Context Engine

**Live demo:** https://gxbank-ai-resilience.vercel.app

**Team:** Let Me Solo It
**Members:** Muhammad Ikhwan
**Institution:** UiTM
**Event:** UTMxHackathon '26
**Category:** Finance & Fintech

---

## 💡 The Problem
Traditional banking applications act as a rearview mirror—they only show users the money they have *already* lost. For Malaysian youth struggling to build financial resilience, passive tracking is not enough. To build sustainable wealth, banking needs to be active, predictive, and contextual.

## 🎯 Our Solution
**GX.AI Context Engine** is a financial resilience companion designed for the GXBank ecosystem. Instead of passive tracking, it reads the customer's spending context and suggests one concrete move, in ringgit, *before* financial stress builds up.

## ✨ Features
* 🧠 **GX.AI resilience engine:** Three checks on the Home screen, each answered by Claude with one specific action:
  * **Weekend spending:** flags heavy food-delivery spend and suggests topping up the Emergency Fund to protect the savings streak.
  * **Subscription audit:** finds subscriptions unused for 60+ days and shows what cancelling them frees up each month.
  * **Route my salary:** splits a new salary with the 50/30/20 rule and says how much to move into Pockets.
* 🏦 **Home:** total balance, main account and Pockets, May spending by category, and searchable recent transactions.
* 🐷 **Pockets:** savings goals with progress, earning 3.55% p.a., plus this month's interest.
* 💸 **Transfer:** recent recipients, with checks on account format, available balance and the RM 5,000 daily limit.
* 🎁 **Rewards:** claim vouchers with GXPoints, with soon-to-expire vouchers highlighted.
* 🎨 **GXBank look:** a night-mode UI in the GXBank palette that works on desktop and phone.

All account figures are sample data in `ai-agency/lib/data.ts`. Transfers and voucher claims are simulated in the browser; no real money moves.

## 🛠️ Tech Stack
* **Framework:** Next.js 16 (App Router, React 19)
* **Styling:** Tailwind CSS 4
* **AI:** Claude Haiku 5.5 via the Anthropic TypeScript SDK
* **Icons:** lucide-react
* **Hosting:** Vercel

## 🧭 How GX.AI works
* `GET /api/nudge/[scenario]` (`weekend`, `audit` or `salary`) sends that check's facts to Claude and returns `{ text, source }`.
* **Cost cap:** the facts for each check are fixed, so each answer is generated once and served to everyone from Vercel's cache for an hour. Claude is called at most three times an hour, whatever the traffic.
* **Offline answers:** if Claude can't be reached (for example, no API key), the route returns a built-in answer and the app labels it "Offline answer".

## 📁 Project Structure
```
ai-agency/
├── app/
│   ├── page.tsx                      # Home
│   ├── pockets/  transfer/  rewards/ # Other screens
│   ├── nav.tsx                       # Top bar (desktop) / tab bar (phone)
│   ├── api/nudge/[scenario]/route.ts # GX.AI → Claude
│   └── globals.css                   # GXBank colour tokens
├── lib/data.ts                       # Sample account data and GX.AI facts
└── vercel.json                       # Tells Vercel this is a Next.js app
```

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

Without a key, GX.AI still works, using the offline answers.

## ☁️ Deploying
The repo is connected to Vercel: every push to `main` deploys to production, and every pull request gets a preview URL.
* **Root directory:** `ai-agency`
* **Environment variable:** `ANTHROPIC_API_KEY` for Production and Preview. After changing it, redeploy so the new value takes effect.
