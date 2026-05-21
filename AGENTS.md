# Walker Landing Project Context

Walker-landing is the public marketing/education site for Walker, built as a Vite React single-page app.

## Product Direction

Walker is a wellness incentive platform:

```text
1 step = 1 credit
```

Credits are wellness incentives, not money. Keep all copy away from financial, crypto, cash, stored-value, investment, or reward-market framing. Health data can be faked, so do not imply credits have monetary value or regulatory-grade trust.

The landing page should explain two connected Walker experiences:

- Consumer: the iOS app syncs Apple HealthKit steps into credits and uses local Screen Time / Family Controls so users can earn intentional access to selected distracting apps.
- Partner/developer: partner apps use hosted Walker consent, a connection token, the JS SDK, and explicit chunk credit deductions.

## Current App Shape

- Framework: Vite + React 19.
- Styling: Tailwind CSS utility classes, with global dark defaults in `src/index.css`.
- Icons: `lucide-react`.
- Entry point: `src/main.jsx`.
- Main app: `src/App.jsx`.
- Main visual asset: `src/assets/walker-logo.png`, imported by `WalkerLogo`.
- Build output goes to `dist/`; do not hand-edit generated files.
- There is currently no README in `main`, so this `AGENTS.md` is the main repo-local Codex handoff.

## Commands

From the `Walker-landing` repo root:

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run preview` uses Vite preview with `--host 0.0.0.0`. `vite.config.js` allows the deployed host:

```text
walker-landing.onrender.com
```

There is no test script currently. Use `npm run build` as the baseline validation command after landing-page code changes.

## Current Page Structure

`src/App.jsx` is a single large component with local UI state:

- `steps`: drives the interactive step/credit simulator.
- `activeAppTab`: switches the "Walker iOS App" and "Walker API Suite" product panels.
- `consentStep`, `isConsenting`, and `consentSuccess`: drive the simulated hosted consent walkthrough.
- `copiedText`: handles SDK example copy feedback.

Major sections:

- Sticky dark nav with Walker logo and anchors.
- Hero section with the "1 Step = 1 Credit" positioning.
- Interactive step simulator showing credits, Screen Time allowance, and partner-example deductions.
- Dual product section with iOS app and API suite tabs.
- Static SDK reference and code example.
- Behavior/design principles.
- FAQ.
- Footer with simulated email signup.

## Implementation Details To Preserve

- `SCREEN_TIME_CREDITS_PER_MINUTE` is currently `10` for the landing-page simulator. This is presentation copy only and must not be mistaken for a backend or iOS rule.
- `PARTNER_DEMO_DEDUCTIONS` uses illustrative values for mindfulness and language-learning examples. These are not backend partner pricing rules.
- `SDK_EXAMPLE_CODE` should mirror the real SDK/backend flow: `createWalkerConnectUrl`, `WalkerClient`, `getBalance`, `listTransactions`, and `spendCredits` with an `idempotencyKey`.
- The consent walkthrough is simulated UI. It should illustrate hosted `/connect` consent and connection-token return, not attempt real OAuth or live API calls.
- The footer email signup is simulated and currently uses `alert`; there is no email service or backend submission.
- The current page uses direct anchor links, not React Router.

## Copy Guardrails

Use language like:

- wellness incentives
- credits
- wallet balance
- steps
- HealthKit sync
- Screen Time / Family Controls
- hosted consent
- partner integrations
- explicit credit deduction
- idempotency key

Avoid language like:

- money
- cash
- payout
- crypto
- investment
- stored value
- guaranteed rewards
- real-time webhooks, unless that feature actually exists in the backend
- cryptographically signed transaction payloads, unless implemented in the backend/SDK

Be careful with claims about privacy. The current product direction is that detailed HealthKit data and selected Screen Time app tokens stay local to iOS, while aggregated activity readings and wallet transactions sync to Walker.

## Design Direction

- Keep the site as a polished public landing page, not an operational dashboard.
- Preserve the dark, premium visual language: black background, neutral cards, white typography, soft gray secondary text, subtle borders, and the Walker raster logo.
- Avoid financial-app cues that make credits feel like cash or a bank balance.
- Use the real logo asset instead of recreating it as text or SVG.
- The landing page is allowed to be more editorial and illustrative than the admin/SDK tools, but the content must stay truthful to current product capabilities.
- When adding UI, keep text responsive and avoid cramped card layouts on mobile.

## Related Repositories

- `Walker`: FastAPI/Postgres backend and hosted `/connect` consent page.
- `Walker-ios`: native iOS app with HealthKit, wallet, and Screen Time behavior.
- `Walker-sdk-js`: TypeScript SDK for partner apps.
- `Walker-partner-demo`: deployed partner connect-and-spend demo.
- `Walker-admin`: standalone admin console.

## Validation

For documentation-only changes:

```bash
git diff --check -- AGENTS.md
```

For app or styling changes:

```bash
npm run build
```

After meaningful visual changes, run the dev server and inspect desktop/mobile layouts in browser. Watch especially for text overflow in simulator cards, code blocks, nav links, and the iOS/API tab controls.
