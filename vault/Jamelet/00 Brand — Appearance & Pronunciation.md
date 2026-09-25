# 00 — Brand: Appearance & Pronunciation

> Phase 1 deliverable. Finalizes who Jamelet is, how the name is said, and the visual direction that Phase 2 (mascot SVG production) will follow.

## Name & pronunciation

- **Name:** Jamelet
- **Pronunciation:** **/ˈdʒeɪm.lət/ "JAYM-let"** — like "James" + "-let": *little James*. Rhymes loosely with *pamphlet* only if read fast; the intended reading keeps the long A of *James*.
- **Meaning:** James's tiny digital sidekick — the friendly, miniature version of him.
- **Never:** JAM-let (like Hamlet), jay-muh-LET, ja-MAY-let.
- **Formal line (Chinese/Western friendly):** "JAYM-let".

## Positioning (one sentence)

> Jamelet is a tiny purple terminal robot — James's portfolio concierge: friendly, curious, and honest, here to show visitors around instead of selling them anything.

## Palette (reuses the portfolio tokens)

| Element            | Token / hex        | Note                              |
| ------------------ | ------------------ | --------------------------------- |
| Body / main form   | `#1A0B24` (dark plum) | base silhouette                  |
| Shell / armor plates | `#6D28D9` (royal purple) | main accent panels            |
| Highlights / rims  | `#8B5CF6` `#A78BFA` (soft purple) | glow, edges, light sources |
| Backdrop shadow    | `#100718`          | drops to match hero background    |
| Face glass         | very dark, near `#0B0510` | black glass visor            |
| Eyes (luminous)    | `#A78BFA` with glow | primary "alive" signal            |
| Speech bubble      | `#21102E` bg, `#F5F3FF` text | matches card / modal tokens   |
| Muted support      | `#A9A1B5`          | secondary lines, off-state        |

## Silhouette & shape language

- Rounded, compact body (roughly: head + torso in one bubble, or head + small body). **No limbs** in version 1 — motion comes from floating, hover-bob, and facial expressions. Simpler = cuter + cheaper to animate.
- **Head ≈ 60%** of overall height; slight egg shape (wider bottom), not a perfect circle.
- **Terminal-cursor antenna:** a small vertical stem on top ending in a blinking `▮`-style cursor block (`#A78BFA`). Blinks on idle.
- **Face:** one continuous black-glass visor (rounded) with two luminous eyes inside. Eyes are the only facial animation surface.
- **Motif:** a subtle `>` prompt on the chest or visor corner (or a stylized `J` on the shell). Keeps it "terminal robot", not a generic robo-friend.
- **Style guardrails:** original, vector, flat with soft gradients. No photorealism, no anime eyes, no human features, no generic sci-fi greebles.

## Expression states (maps to the 5 animation states)

1. **Idle** — neutral eyes, slow float (y ±8px), antenna cursor blinking, occasional blink (every 4–6 s).
2. **Greeting** — one-arm wave OR antenna-dip bow + happy squint eyes; shown when chat opens.
3. **Thinking** — eyes shift to focused dots or up-left `^ ^` gaze; a `…` typing indicator appears in the chat bubble.
4. **Responding** — squint-smile eyes, gentle nod or bob while text streams; blink every few seconds.
5. **Fallback** — confused tilt (eyes `? ?` or one raised brow line), then a soft sad blink before the contact suggestion bubble.

## Motion rules

- Use the existing **Framer Motion** setup (`motion` + `AnimatePresence`).
- Respect `useReducedMotion()`: swap to static pose + CSS-only opacity changes; no float/marquee loops.
- All loops slow and gentle (5–8 s cycles); nothing that scroll-spams or distracts from reading.

## Voice in one line

> "Friendly, curious, concise, encouraging — a helpful little sidekick who never makes things up."

See **01 — Personality Guide** for the full persona and voice rules.