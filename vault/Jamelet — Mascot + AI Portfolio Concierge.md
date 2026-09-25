# Jamelet — Mascot + AI Portfolio Concierge

> 📌 **Phase 1 — Brand & conversation design** (in progress)
> - [[Jamelet/00 Brand — Appearance & Pronunciation]]
> - [[Jamelet/01 Personality Guide]]
> - [[Jamelet/02 Voice Examples (English & Taglish)]]
> - [[Jamelet/03 System Instructions]]
> - [[Jamelet/04 Allowed & Disallowed]]
> - Structured knowledge source: `my-portfolio/shared/portfolio.ts` (used by site + chatbot)

## 1. Product concept

Jamelet is a tiny purple terminal robot and James's friendly digital sidekick.

> "Hi! I'm Jamelet, James's little tech sidekick. Ask me about his skills, projects, or availability."

The chatbot should feel like a portfolio concierge and lightweight recruiting assistant, not a claim that James is personally available in real time.

You do not need to train a model. The custom AI comes from:
- A defined personality
- Verified portfolio knowledge
- Carefully written instructions
- A controlled conversation interface
- Safe server-side access to an AI provider

## 2. Recommended first release

### Mascot

A rounded, compact robot using the portfolio's existing colors:
- Dark plum body
- Royal-purple shell
- Soft-purple highlights
- Black glass face with luminous eyes
- Small antenna shaped like a terminal cursor
- A subtle J or > motif instead of generic robot details

Keep it original and vector-based. Avoid photorealistic or overly anime styling.

### Animation states

1. **Idle** — floating movement and occasional blinking
2. **Greeting** — waves when the visitor opens chat
3. **Thinking** — focused eyes and typing indicator
4. **Responding** — smiling, blinking, or nodding while text streams
5. **Fallback** — confused expression followed by a contact suggestion

Animations should use the existing Framer Motion setup and respect reduced-motion preferences.

## 3. Portfolio placement

### Hero appearance
- Place Jamelet on the lower-right side of the hero on desktop.
- On mobile, place a smaller version beneath the introduction.
- Add a short speech bubble such as: *"Ask me about James's projects!"*
- Clicking the hero mascot should open the same chat as the floating version.

Because the current hero is centered, Jamelet should complement the text rather than compete with it.

### Floating companion
- Small circular launcher in the bottom-right corner
- Approximately 80–96px wide
- Opens a 360–540px glass-style chat panel
- Mobile version becomes a near-full-screen sheet or bottom drawer
- Show the invitation bubble only once per session, not repeatedly

The mascot should never obstruct navigation, the contact form, or important buttons.

## 4. Chatbot behavior

### Initial suggested questions
- "Who is James?"
- "What are James's skills?"
- "Tell me about the capstone project."
- "Is James available for opportunities?"
- "How can I contact James?"

### Supported capabilities

Jamelet can:
- Explain James's background and education
- Summarize technical skills accurately
- Describe the capstone project
- Discuss general role fit without making guarantees
- Navigate visitors to Projects, Skills, or Contact
- Open the GitHub profile
- Recognize and respond to English or natural Taglish
- Say when information is unavailable rather than inventing it

### Personality rules
- Friendly, curious, concise, and encouraging
- Uses the visitor's language
- Keeps Taglish light and natural
- Usually answers in 2–4 short paragraphs or a few bullets
- Uses playful phrases sparingly
- Clearly identifies itself as an AI assistant
- Never claims to be James
- Redirects unsupported questions back to James's portfolio

Example fallback:
> "I don't have that detail yet, but I can show you James's project, summarize his skills, or help you contact him."

## 5. Verified knowledge source

Create one structured portfolio data file used by both the website and chatbot. This prevents Jamelet from contradicting the visible portfolio.

It should contain:
- Identity
- Education and location
- Skills
- Capstone project
- Work preferences and availability
- GitHub and contact links
- Suggested visitor actions
- Conversation boundaries

The chatbot should never infer employment history, project completion dates, salary, availability dates, or qualifications that are not explicitly listed.

The system prompt should contain the personality and rules, while factual information stays in the structured data.

## 6. Technical architecture

```
Jamelet SVG + animations
          │
          ▼
React chat widget
          │ POST /api/chat
          ▼
Vercel serverless function
          │
          ├── Validate and rate-limit input
          ├── Add personality instructions
          ├── Add verified portfolio data
          ├── Call a small hosted AI model
          └── Stream a safe response
```

### Suggested project structure

```
my-portfolio/
├── api/
│   └── chat.ts
├── shared/
│   └── portfolio.ts
└── src/
    ├── components/
    │   ├── mascot/
    │   │   ├── Jamelet.tsx
    │   │   └── JameletHero.tsx
    │   └── chat/
    │       ├── ChatWidget.tsx
    │       └── ChatMessage.tsx
    └── hooks/
        └── useJameletChat.ts
```

### AI provider
Use a thin provider abstraction—potentially Vercel's AI tooling—with a small hosted model as the first implementation. This prevents changing the mascot or chat UI if you later switch providers.

The provider key must:
- Be stored in Vercel environment variables
- Never use a VITE_ variable
- Never appear in frontend code or the production bundle
- Have a provider-side spending limit

## 7. Response safety

The API should return text plus optional whitelisted actions, such as:
- `view-projects`
- `view-skills`
- `contact-james`
- `open-github`

The frontend maps those IDs to real links. The model should never generate arbitrary HTML or URLs.

Additional safeguards:
- Maximum message length
- Limited conversation history per request
- Input validation
- Basic abuse/rate limiting
- Safe Markdown rendering with raw HTML disabled
- No database or chat-history retention in version one
- No collection of sensitive visitor information
- Graceful offline state if the API or provider is unavailable

## 8. Implementation phases

### Phase 1 — Brand and conversation design
- Finalize Jamelet's appearance and pronunciation
- Write a short mascot personality guide
- Define English/Taglish voice examples
- Create the structured portfolio knowledge
- Write the chatbot system instructions
- Define allowed and disallowed behavior

### Phase 2 — Mascot production
- Create a silhouette and visual direction
- Produce a clean layered SVG
- Create the face and expression states
- Add responsive sizing
- Add idle, greeting, thinking, responding, and fallback motion
- Check reduced-motion behavior

### Phase 3 — Portfolio integration
- Add Jamelet to the hero
- Add the floating launcher
- Add the responsive chat panel
- Connect suggested prompts and section navigation
- Ensure keyboard and screen-reader accessibility

### Phase 4 — AI integration
- Add the Vercel chat endpoint
- Add provider configuration
- Connect the verified portfolio data
- Stream responses
- Sync mascot states with the request lifecycle
- Add timeouts, error handling, and rate limits

### Phase 5 — Testing and deployment
- Test desktop and mobile layouts
- Test keyboard navigation and reduced motion
- Test English and Taglish questions
- Test unsupported and invented-information questions
- Test API failure and provider-limit scenarios
- Confirm that no secret is exposed in the browser
- Run the existing build and lint checks
- Deploy to Vercel

## 9. Acceptance criteria

The first release is ready when:
- Jamelet feels like part of the existing portfolio rather than an added widget
- The mascot and chatbot share one recognizable personality
- The hero and floating versions work together
- Answers match the visible portfolio information
- Jamelet admits uncertainty instead of hallucinating
- English and Taglish both feel natural
- Mobile users can comfortably use the full conversation
- Keyboard and reduced-motion users have an equivalent experience
- The AI key is server-only
- Conversations are not stored by default
- API failures still provide useful portfolio links

## 10. Explicitly postpone

These are useful later, but should not complicate the first release:
- Custom-trained model
- Voice input or speech
- 3D or real-time rendering
- Long-term visitor memory
- Multiple chatbot personalities
- Full resume/document retrieval
- Lead scoring and CRM integration
- Detailed conversation analytics
- Automatic job applications

The best first milestone is therefore: original animated SVG mascot, portfolio concierge, English/Taglish responses, streaming chat, Vercel API, and no persistent tracking. Once this plan is approved, switch to an implementation agent to begin Phase 1.