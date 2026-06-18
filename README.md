# ◊ FallClaim · sovereign case management + UK quantum engine for claims firms

**v1.0.0 · prime 811 · MIT · single-file**

One HTML file. Multi-firm, multi-adviser, multi-client, multi-case management for UK claims firms (1–10 people) — PI, RTA, EL, PL, clinical negligence, housing disrepair, financial mis-selling, data breach, trip. Embedded Judicial College Guideline quantum corpus + Civil Liability Act 2018 whiplash tariff + Ogden multiplier tables + pre-action protocol trackers + Part 36 register + limitation calculator. Runs offline. Data never leaves the device.

---

## Two audiences

### If you run a claims firm

Open `index.html`. First launch walks you through:

1. **Firm** — name, regulator type (FCA CMR or SRA solicitor), CMR firm ref or SRA roll, AML supervisor, PI insurer, ATE insurer.
2. **First adviser** — name, role (caseworker / paralegal / solicitor / partner / COLP-equiv), CMR or SRA ref.
3. **First client** — name, contact, referral source.
4. **First case** — type (RTA / PI / EL / PL / clinical neg / etc.), incident date, defendant, limitation auto-calculated.

After that, the daily workflow:

- **Cases** sidebar — every case with limitation-urgency colouring (red ≤30d, amber ≤90d, black overdue).
- **Liability** tab — admitted? · contributory %? · defendants list (name, insurer, ref).
- **Quantum** tab — lookup PSLA bracket from the embedded JC corpus by body part + severity. Add special damages (medical, lost earnings, travel, care, aids, property, future loss with Ogden multipliers). Statutory interest. Contributory deduction. Total claim value.
- **Protocol** tab — case-type-driven workflow (RTA portal · EL/PL portal · pre-action PI · pre-action clinical neg · housing disrepair). Letter-of-Claim sent · response due date · next step.
- **Fees** tab — CFA (success fee, LASPO 25% damages cap), DBA (50% cap PI / 25% in court), hourly, fixed, legal aid. ATE premium + insurer.
- **Part 36** — log offers (from you, from them) with expiry dates. Cost-consequence flags.
- **Documents** — track filed documents (linked from FallClaimPaper when present).
- **Timeline** — chronological event log per case.
- **Outcome** — settled / discontinued / won / lost · settlement amount · payment received date.

**Ask box (Ctrl+K)** — answers 14 canned UK claims-law questions offline (limitation rules, date of knowledge, whiplash tariff, MOJ portal brackets, Part 36, Bolitho test, contributory negligence, ADR, etc.). Plug a BYOK Anthropic/OpenAI key in Settings for T3 free-form Q&A.

Data is stored in your browser's IndexedDB. Nothing leaves the device unless you export JSON.

### If you build sovereign tools

- Single HTML file, < 500 KB (corpus pushes it close).
- IndexedDB primary, localStorage fallback.
- KONOMI shim · `fall-signal` mesh handshake · `fall-claim` mesh for case/client/adviser/firm sync.
- PWA manifest via `data:` URL · installable.
- Vanilla JS · no framework · no build step · no CDN dependencies in core shell.
- Audit chain (sha256 prevHash) on by default · 6-year FCA CMR retention.
- 14-pt sovereign gate · compliant with the FallBrief / FallAdviser doctrine.

## Bundle mesh

FallClaim is the anchor of the **claims bundle** (`fall-claim` channel):

| Tool | Prime | Role |
|---|---|---|
| **fallclaim** | **811** | case management + JC quantum engine (this) |
| fallclaimonboard | 821 | client intake · FCA CMR cooling-off · AML · conflict |
| fallclaimpaper | 823 | Letter of Claim · Part 36 · CFA · DBA documents |
| fallclaimpractice | 827 | fee ledger · escrow · CFA accruals · FCA CMR reporting |

All four tools open `BroadcastChannel('fall-claim')` and exchange `client.*`, `adviser.*`, `firm.*`, `case.*`, `part36.recorded`, `escrow.entry`, `complaint.recorded`, and `sync.request|snapshot` messages. The first tool open with a populated IDB responds to sync requests with its full snapshot; later wins by `updatedAt`.

## Quantum corpus

Embedded brackets (Judicial College Guidelines, 17th-edition-equivalent figures; verify against the current edition before pleading):

- **Civil Liability Act 2018 whiplash tariff** — RTA, 7 duration bands (3 / 6 / 9 / 12 / 15 / 18 / 24 months), fixed sums, with-and-without-PSI variants.
- **PSLA general** — 12 body categories (head/brain · neck · back · shoulder · arm · hand · leg · foot · eye · hearing · internal · psychiatric) × 3–4 severity bands. ~140 bracket rows total.
- **Ogden multipliers** — top-level age-banded multipliers for loss of earnings + future care (discount rate −0.25%, current Lord Chancellor).
- **Statutory interest** — 8% on past special damages (Judgments Act 1838 / s.69 County Courts Act 1984).
- **Contributory negligence** — Law Reform (Contributory Negligence) Act 1945 s.1.

The corpus is a research aid, not a substitute for the current published Guidelines. Always cross-check against the live edition. Brackets refresh on roughly a 3-year cadence.

## Pre-action protocols

| Case type | Protocol | Key windows |
|---|---|---|
| RTA (£1k–£25k) | MOJ RTA portal | CNF → 15 working days liability response → settlement window → court |
| EL/PL (£1k–£25k) | MOJ EL/PL portal | CNF → 30 days liability response |
| PI (general) | Pre-action PI protocol | Letter of Claim → 21 days acknowledgment → 3 months substantive response |
| Clinical neg | Pre-action clinical neg protocol | Letter of Notification → Letter of Claim → 4 months response |
| Housing disrepair | Housing Conditions protocol | Letter of Claim → 20 working days response → expert inspection |
| Financial mis-selling | FOS / firm complaint route | 8 weeks firm response → FOS referral 6 months |

## Limitation

Auto-calculated on case creation; override on `date of knowledge`.

- **Personal injury** — 3 years (Limitation Act 1980 s.11)
- **Clinical negligence** — 3 years from date of knowledge (s.11 / s.14)
- **Contract** — 6 years (s.5)
- **Housing disrepair** — 6 years (contract) / 3 years (personal injury caused by disrepair)
- **Defamation** — 1 year (s.4A)
- **Data breach (DPA)** — 6 years (or 1 year for defamation overlap)
- **Financial mis-selling** — typically 6 years from event, 3 from knowledge

## Disclaimer

> FallClaim is a tool for UK claims firms (CMC and solicitor practices). It assists with case management, fee tracking, regulated document generation, and FCA CMR / SRA compliance. It is not court filing software; pleadings and submissions remain the firm's responsibility. The embedded Judicial College Guideline corpus is a research aid, not a substitute for the current published Guidelines. Verify all brackets, tariffs, and limitation dates against primary sources before relying on them. Sovereign — client data never leaves the device unless exported.

## License

MIT. See `LICENSE`.

## Constants

```
TOOLNAME  fallclaim
VERSION   1.0.0
PRIME     811
CHANNEL   fall-claim · fall-signal
IDB       firms · advisers · clients · cases · valuationCorpus · audit · settings
```
