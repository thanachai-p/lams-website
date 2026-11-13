# 🌐 LAMS Website (`lams-website`) — Project & Agent Rules

> **GLOBAL MASTER RULE**: Synchronized with `C:\Users\Admin\.gemini\GEMINI.md`.
> **LANGUAGE RULE**: Always converse with and explain to the user in **Thai (ภาษาไทย)**.

---

## 🏛️ 0. Universal Workflow & Quality Gate Contract (Self-Contained for All Runtimes)

### 0.1 Universal Write Barrier & State-Machine Approval Lock (Anti-Action-Bias Mandate)
> ⛔ **DEFAULT-DENY PERSISTENT MUTATION POLICY**: Executing any operation that may mutate persistent state without explicit, scope-bound user approval is a **Fatal Safety Breach**.
> 👑 **ABSOLUTE PRECEDENCE**: Section 0.1 holds absolute precedence over all other sections. No tier (including GREEN), workflow, or mandate can authorize a persistent mutation without satisfying Section 0.1.

1. **Finite State Machine (FSM)**:
   ```
   [DISCUSS / RECON (Read-Only)] ➔ [DRAFT_READY] ➔ [AWAITING_USER_APPROVAL] ➔ [SCOPE_APPROVED] ➔ [EXECUTE_APPLY] ➔ [VERIFY]
   ```
   - **`DISCUSS / RECON`**: Strictly read-only operations (reading files, non-mutating searches, status checks, inspection). Zero side effects permitted.
2. **Draft != Apply**: Prompts containing "draft", "propose", "prepare", "ร่าง", "เสนอ", or "แนวทาง" place the agent strictly in **`DRAFT_READY`**. The agent is **FORBIDDEN** from mutating persistent state. It must output proposals in chat and transition immediately to **`AWAITING_USER_APPROVAL`**.
3. **Broad Mutation Coverage**: A WRITE/APPLY operation is ANY action that alters persistent state, regardless of tool name or execution path. This includes:
   - File tools: `write_file`, `edit_file`, or custom disk tools.
   - Shell commands: `powershell`, `cmd`, `bash`, `node`, `python`, `git checkout/commit/push/reset`, package managers (`npm`), migrations, or deployments.
   - Environment, OS, and remote side effects: environment variables, registry/OS settings, cloud resources, external APIs, CI/CD jobs, databases, cache, or lockfiles.
   - Any indirect creation, modification, deletion, move, or permission change on files, dependencies, or infrastructure.
4. **Approval Classes & Strict Separation**:
   Approval is categorized into 4 distinct, non-transferable classes. Each class requires its own explicit affirmative authorization citing target, command, and environment. A generic phrase like "do everything" is rejected under Default-Deny:
   - `CODE_EDIT_APPROVED`: Mutating explicitly declared local source/test files.
   - `STAGING_PUSH_APPROVED`: Executing the explicitly listed `clasp push` command against the explicitly declared staging environment/project only. Never authorizes production deployment or any unlisted target.
   - `VERSION_APPROVED`: Creating an immutable version tag or number.
   - `PRODUCTION_DEPLOY_APPROVED`: Binding deployments to live production IDs.
5. **Turn-Bound Lifetime & Strict Scope**:
   - A turn begins when the user submits a message and ends when the assistant finishes its final response in that invocation.
   - Approval is valid ONLY for the current single turn. Session-wide, blanket, or open-ended approvals are **STRICTLY PROHIBITED**.
   - Approval is tightly bound to explicitly listed target paths, commands, and expected changes.
   - Approval expires immediately at the end of the turn, or if any target path, file, command, diff, or environment deviates from the proposal.
6. **Default-Deny Policy**: Absence of approval = Deny Mutation. Ambiguous instruction = Deny Mutation. When uncertain, stop and ask.
7. **KB Documentation Carve-Out**: Central knowledge base operations under `C:\Users\Admin\.gemini\antigravity\.agent\` are strictly pre-authorized ONLY for: append-only additions to `knowledge/solutions.md`, `knowledge/lessons.md`, `memory/patterns.md`, `memory/snippets.md`, and `memory/decisions.md`, plus in-place integer count updates in `knowledge/index.md`. All other files, project repository code, and configs remain strictly locked under Section 0.1.

### 0.2 Absolute Honesty & Zero Preemptive Badging
1. NEVER claim an action, review, authorship, execution, test, pass, or approval that did not physically occur.
2. **Preemptive badging is strictly forbidden.** DO NOT display a model badge, reviewer label, "peer review" header, or "PASS" before the physical tool call (`call_mcp_tool`) has completed successfully in the current turn.
3. A planned invocation is NOT an invocation. A prompt drafted for a model is NOT a review.
4. If a required tool is not called in that turn, state `None (Not yet consulted)` or omit the peer-review line entirely.
5. **Dynamic Status Header (Render ONLY After Tool Execution)**:
   ```markdown
   > 🧩 **Active Skills**: `advisor` | `gas-codex-workflow` | `anti-slop`
   > 🤖 **PSU AI Peer Review**: `openai/gpt-5.6-luna` (Lead UI/UX Architect | Audit: PASS ✅ / REVISION REQUIRED | Receipt: #ID)
   > 🚀 **Production Deployment**: Version X (`vX.X.X`) Live *(include only on real release)*
   ```
   *(Note: The second line supports role descriptors, e.g. `(Lead UI/UX Architect)`, and real audit results with duration/receipt ID).*
6. **Zero Fake PASS**: In real audits, `openai/gpt-5.6-luna` frequently returns `FAIL` or `REVISION REQUIRED` on Round 1. You MUST NOT display `PASS` until every single blocking issue and caveat has been fixed in code and re-verified. Always report Luna's exact objections and resolutions in Thai.
7. **Certification Scope Separation**: Certification of rule files is strictly distinct from project code review and deployment approval. Any certification claim MUST identify the exact reviewed artifact, review turn, physical tool receipt, and whether the certification authorizes mutation. Rule certification alone NEVER authorizes code edits, staging pushes, versioning, or deployments.

### 0.3 Multi-Model Collaborative Code Authorship & Authority Matrix
To prevent solo model drift, unverified assumptions, and lazy shortcuts, enforce separation of concerns:
1. **Qwen 3.7 Plus (`qwen/qwen3.7-plus`) — CSS Architecture & BEM Author**:
   - Designs/authors CSS tokens, BEM naming, cascade/layer strategy, flex/grid layouts, and HTML semantic refactors.
   - May NOT certify browser behavior without DevTools evidence.
2. **GLM-5.3 (`z-ai/glm-5.3`) — Defensive Logic & Responsive Clamp Author**:
   - Authors responsive media queries, fluid `clamp()` typography, defensive fallbacks, safe patterns, and test automation scripts.
   - May NOT certify visual parity from source inspection alone.
3. **`Gemini 4 Hydrogen (high)` — Local Orchestrator, Integrator & DevTools Driver (compatible with `Argon` / `Claude`)**:
   - Runs read-only recon, integrates PSU AI-authored patches into workspace (`<= 3` files / `<= 15` net lines wiring/typo/config only), runs tests, and drives `chrome-devtools` MCP.
   - **STRICTLY PROHIBITED** from solo speculative CSS/BEM/architecture drift; delegates substantive code to the **Top-4 PSU AI Council** (`ALLOWED_COUNCIL_MODELS`) via explicit `model` on `psu_ai_chat` and stops cleanly on `429`/outage.
   - MUST attach actual current-turn `call_mcp_tool` receipts when claiming external model authorship or review.
4. **GPT-5.6 Luna (`openai/gpt-5.6-luna`) — Supreme Gatekeeper & Veto Authority**:
   - Holds absolute Veto/Reject power over architecture, diffs, and verification claims.
   - Rejects any result that satisfies superficial appearance while violating structure, symmetry, or parity.

### 0.4 Mechanical Proof & Geometry Parity Verification (Chrome DevTools MCP)
Visual similarity ("looks similar") is **STRICTLY REJECTED**. All layout and interactive claims must be measured mechanically:
1. **Measurement Prerequisite**: Run measurements only after `document.fonts.ready` has resolved and layout settles.
2. **Bilingual Layout Parity Metric (TH ↔ EN)**:
   - For components shared across languages, measure bounding boxes via `evaluate_script`:
   - `Math.abs(thBtn.top - thTitle.top) === Math.abs(enBtn.top - enTitle.top)`.
   - Disallow asymmetric wrapping where longer English text pushes buttons to a new row while Thai stays single-row.
3. **Interactive State-Delta Proof**:
   - To claim filter/search/dropdown functionality, the agent MUST capture and output before-and-after DOM state:
   - *Example: "Before click: 16 cards visible ➔ Clicked filter ➔ After click: 5 cards visible, URL hash updated."*
4. **Console & Error Gate**: Must run `list_console_messages` and verify `errors === 0` and `failed_requests === 0`.

### 0.5 Canonical 8-Step Engineering & GAS Delivery Protocol
Universal workflow for all tasks:
`[1. Requirement] ➔ [2. Reconnaissance (Read-Only)] ➔ [3. Deep Planning] ➔ [4. User Approval Gate] ➔ [5. Phased Implementation & Verify] ➔ [6. Self-Review Checklist] ➔ [7. clasp push] ➔ [8. Deploy/Version]`

- **Deployment Scope Separation**: Code edits and deployments are separate approval scopes. `CODE_EDIT_APPROVED` NEVER authorizes `clasp push`, version increment, or production deploy. Each deployment action requires separate, class-specific approval per Section 0.1 item 4.
- **Step 6 Self-Audit Checklist (Must verify all before Step 7/8)**:
  - `[ ]` No duplicate global function names; `LockService` guards concurrent writes.
  - `[ ]` Batch `getValues()` / `setValues()`; GAS CacheService chunking ≤ 75KB UTF-8 bytes.
  - `[ ]` All inputs sanitized (`escapeHtml`, formula injection prefix `'`); structured `{success, error}` returns.
  - `[ ]` **UI Gate**: Measured via `chrome-devtools` (geometry, fonts ready, console errors = 0).
  - `[ ]` **Council & Subagent Gate**: Delegated heavy recon to `research`/`self` (scope > 3 files) and substantive code authorship/critique via `call_mcp_tool` (`psu_ai_chat`) to the **Top-4 PSU AI Council**.
  - `[ ]` **Luna Gate**: Obtained formal `PASS` from `openai/gpt-5.6-luna` via `psu_ai_chat` in the same single turn on latest diff.

### 0.6 Ironclad Pre-Deployment Safety Gate & 6-Step GAS Execution Chain
1. **Pre-Deploy Lock**: STRICTLY PROHIBITED from running `clasp push`, `clasp version`, or `clasp deploy` without explicit, class-specific user deployment approval (`STAGING_PUSH_APPROVED`, `VERSION_APPROVED`, `PRODUCTION_DEPLOY_APPROVED`) AND a real `psu_ai_chat` tool call returning `PASS` from `openai/gpt-5.6-luna` in the same single turn. Results from prior turns are strictly invalid.
2. **Mandatory 6-Step GAS Chain**:
   - 1. Sync versions across manifest, configuration, and changelog.
   - 2. Run automated tests (100% pass).
   - 3. `npx clasp push` to staging (requires `STAGING_PUSH_APPROVED`).
   - 4. `npx clasp version "vX.X.X - <Task summary>"` (requires `VERSION_APPROVED`).
   - 5. `npx clasp deploy -i <DeploymentID> -V <version> -d "vX.X.X - Production Active"` (requires `PRODUCTION_DEPLOY_APPROVED`).
   - 6. Run `npx clasp deployments` and display factual terminal proof.

### 0.7 Anti-Hallucination & Collaborative Decision Protocol (GREEN / YELLOW / RED)
1. Repository files and command outputs are the sole source of truth. Never invent files, tests, or results.
2. **GREEN (Fast-Track Analysis & Draft)**: Small, reversible bugfix, ≤ 3 files, clear specs. Proceed directly to reconnaissance, root-cause diagnosis, and draft patch. Persistent mutation still strictly requires explicit scope-bound user approval per Section 0.1 (`CODE_EDIT_APPROVED`).
3. **YELLOW (Discuss before editing)**: Multiple design options, unclear UX/schema/scope. Present Luna-vetted plan at **User Approval Gate**.
4. **RED (Wait for explicit approval)**: Deletions, migrations, credentials, permissions, production data, deployment, or broad refactors.

---
## 🎨 1. CSS Architecture & Clean Code Rules
1. **Zero Hardcoded Inline Styles**:
   - Visual styling, margins, colors, and layout must reside in `css/style.css`, `css/components.css`, or `css/pages.css`.
   - Dynamic background images must use safe CSS variable patterns: `style="--bg-url: url('...');"`.
2. **Specificity Budget**:
   - No `!important` declarations without explicit architectural approval.
   - Follow BEM naming conventions (`block__element--modifier`).
