# Aljon Bacani AI Portfolio

An AI-native portfolio inspired by Toukoum's conversational avatar format, customized for Aljon Bacani, AI Automation Specialist in Pampanga, PH.

The site has no static portfolio sections. Visitors discover bio, projects, skills, experience, contact, and collaboration details by chatting with Aljon's AI avatar.

## Stack

- Next.js App Router
- Vercel AI SDK
- Groq Llama 3.1 70B by default
- OpenAI GPT-4o mini fallback
- Framer Motion
- lucide-react
- Animated SVG avatar

## Setup

```bash
npm install
```

Create `.env.local`:

```bash
GROQ_API_KEY=your_groq_api_key
```

Or use OpenAI instead:

```bash
OPENAI_API_KEY=your_openai_api_key
```

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Important Files

- `app/page.tsx` - main avatar chat experience
- `components/Avatar.tsx` - animated character component
- `app/api/chat/route.ts` - streaming AI route
- `lib/prompt.ts` - system prompt and portfolio knowledge base
- `app/globals.css` - visual system, layout, animation, responsive behavior

## Updating Portfolio Knowledge

Edit `lib/prompt.ts` with confirmed resume details, project results, tools, client proof, and contact links.

Replace these placeholders before deploying:

- `[your calendly link or cal.com link]`
- `[your@email.com]`
- the `mailto:your@email.com` link in `app/page.tsx`
- the `https://cal.com/` booking link in `app/page.tsx`

## Deploy To Vercel

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add `GROQ_API_KEY` or `OPENAI_API_KEY` in Project Settings.
4. Deploy.

## Deploy To Render

1. Create a new Render Web Service from the GitHub repo.
2. Use these settings:
   - Build command: `npm install && npm run build`
   - Start command: `npm run start`
3. Add `GROQ_API_KEY` or `OPENAI_API_KEY` in Environment.
4. Deploy.

## Notes

Node.js and npm must be installed locally to run or build this project. This workspace did not have `node` or `npm` available on PATH during generation, so dependencies were not installed here.
