import React from "react";
import { Figure, Flow, Lanes, Stack } from "./Diagram";

const blogData = [
  {
    id: "page-load-optimization",
    title: "How I Reduced Page Load Times from 48s to 8s in a Production Angular App",
    date: "October 2025",
    readTime: "8 min read",
    tags: ["Performance", "Angular", "MySQL", "Optimization"],
    summary:
      "A deep dive into how I diagnosed and fixed catastrophic page load times in a marine procurement system serving real users and real transactions.",
    role: "Diagnosis, query rewrites, API consolidation and frontend deferral. No infrastructure changes.",
    period: "Sep 2025 — ongoing",
    stack: ["MySQL", "Sequelize", "Node.js", "Angular", "RxJS"],
    questions: [
      "How did you verify the JSON aggregation returned identical results to the subquery version?",
      "What did you measure, and how did you isolate each step's contribution?",
      "When would a cache actually have been the right answer here?",
      "Which index did you add for the sort and pagination path, and why that one?",
      "How would you stop these screens from regressing again?",
    ],
    content: (
      <>
        <h2>The Problem</h2>
        <p>
          When I joined Varuna Sentinels as a Software Engineer, one of the first things I noticed was that several critical screens in our marine procurement system were painfully slow. The <strong>Supplier Quotation page took 48 seconds</strong> to load. The Supplier RFQ screen? <strong>35 seconds.</strong> Buyer RFQ? <strong>40 seconds.</strong>
        </p>
        <p>
          For a system handling real procurement operations — where buyers and suppliers are negotiating quotes, issuing purchase orders, and managing invoices — this was unacceptable.
        </p>

        <h2>Diagnosing the Root Cause</h2>
        <p>I started by profiling the network tab and backend logs. The issues fell into three categories:</p>
        <h3>1. Redundant API Calls</h3>
        <p>Multiple components on the same page were independently fetching overlapping data. The quotation page alone was firing 12+ API calls on mount, many fetching the same supplier/RFQ data with slight variations.</p>
        <h3>2. Bloated SQL Queries</h3>
        <p>The stored procedures were joining every related table regardless of whether the frontend needed the data. One query was joining <code className="blog-inline-code">freightForwarder</code>, <code className="blog-inline-code">vessel</code>, <code className="blog-inline-code">portAgent</code>, and 6 other tables when the list view only needed 5 columns.</p>
        <h3>3. No Lazy Loading</h3>
        <p>Every component and its data loaded eagerly on page mount, even sections below the fold that the user hadn't scrolled to yet.</p>

        <h2>The Request Path, Before and After</h2>
        <Figure caption="Same screen, same data, same infrastructure. The difference is the amount of work being requested.">
          <Lanes
            lanes={[
              {
                name: "Before",
                tone: "dim",
                verdict: "48s",
                steps: [
                  "Screen mounts, 12 requests fire from independent components",
                  "Each hits a read procedure joining 9 tables",
                  "A correlated subquery runs once per parent row",
                  "Every below-the-fold panel and chart renders eagerly",
                ],
              },
              {
                name: "After",
                tone: "accent",
                verdict: "8s",
                steps: [
                  "Screen mounts, 3 consolidated requests fire",
                  "Procedures project only the columns the view draws",
                  "Related rows return in one pass via JSON aggregation",
                  "Below-the-fold content defers until it enters the viewport",
                ],
              },
            ]}
          />
        </Figure>

        <h2>The Fix</h2>
        <h3>Step 1: API Consolidation</h3>
        <p>I audited every API call on each slow screen and merged redundant calls. Instead of 12 separate requests, I reduced the quotation page to 3 targeted API calls.</p>
        <h3>Step 2: Query Optimization</h3>
        <p>I rewrote the stored procedures to <strong>select only required columns</strong> and removed unnecessary joins. I replaced complex subqueries with optimized <code className="blog-inline-code">JSON_ARRAYAGG</code> and <code className="blog-inline-code">COALESCE</code> patterns:</p>
        <pre className="blog-code-block"><code>{`-- Before: O(M*N) subquery complexity
SELECT *, (SELECT ... FROM quotes WHERE ...) as quoteData
FROM rfq_documents rd
LEFT JOIN freightForwarder ff ON ...
LEFT JOIN vessel v ON ...
-- 8 more joins

-- After: O(M+N) with JSON aggregation
SELECT rd.id, rd.refNo, rd.status,
  COALESCE(JSON_ARRAYAGG(
    JSON_OBJECT('quoteId', q.id, 'status', q.status)
  ), '[]') as quotes
FROM rfq_documents rd
LEFT JOIN quotes q ON q.rfqId = rd.id
GROUP BY rd.id`}</code></pre>

        <h3>Step 3: Lazy Loading</h3>
        <p>I implemented Angular's lazy loading for below-the-fold sections and deferred chart rendering using <code className="blog-inline-code">IntersectionObserver</code> — charts only render when they scroll into view.</p>

        <h2>The Results</h2>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr><th>Screen</th><th>Before</th><th>After</th><th>Improvement</th></tr>
            </thead>
            <tbody>
              <tr><td>Supplier Quotation</td><td>48s</td><td>8s</td><td><strong>83% faster</strong></td></tr>
              <tr><td>Supplier RFQ</td><td>35s</td><td>10s</td><td><strong>71% faster</strong></td></tr>
              <tr><td>Buyer RFQ</td><td>40s</td><td>14s</td><td><strong>65% faster</strong></td></tr>
              <tr><td>Buyer Quotation</td><td>40s</td><td>15s</td><td><strong>62% faster</strong></td></tr>
            </tbody>
          </table>
        </div>

        <h2>Engineering Decisions &amp; Trade-offs</h2>
        <p>The most important decisions here were about what <em>not</em> to build.</p>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr><th>Option</th><th>Why I rejected it</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Add a Redis cache in front of the slow queries</td>
                <td>Would have improved the numbers while leaving the defect in place. Caching a query that joins nine tables to render five columns means paying for that mistake forever, plus inheriting cache-invalidation complexity on data that changes constantly.</td>
              </tr>
              <tr>
                <td>Add a read replica</td>
                <td>The bottleneck was query cost per request, not connection contention. A replica would have spread the same wasted work across more hardware.</td>
              </tr>
              <tr>
                <td>Paginate harder / cap page size</td>
                <td>Hides the symptom from the first screenful and pushes the cost onto anyone who scrolls. It also would not have helped the queries that were slow at any size.</td>
              </tr>
              <tr>
                <td><strong>Reduce the work being requested</strong> (chosen)</td>
                <td>No new infrastructure, no invalidation logic, and the improvement holds for every caller of those procedures rather than just the screens I touched.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Going Back for the Rest</h2>
        <p>Once the method was proven, the same class of defect was worth hunting rather than waiting for:</p>
        <ul>
          <li>Recursive CTEs used for date-series generation in dashboard analytics were replaced with non-recursive equivalents — after which I audited every remaining procedure for unsafe recursion rather than assuming the ones I had seen were the only ones.</li>
          <li>Roughly <strong>56 search predicates</strong> were failing at runtime on collation mismatches between differently-configured columns. Resolved with explicit collation at the comparison, which stabilised search across both portals.</li>
          <li>Bulk imports were hitting gateway timeouts on large files. Reworking them into batched transactions removed the timeout ceiling without changing the request path.</li>
        </ul>

        <h2>What I'd Do Differently</h2>
        <p>
          I fixed these reactively, after users felt them. The honest critique is that none of it was caught by instrumentation, because there wasn't any — no query timing baselines, no performance budgets in CI, no alerting on regression. The screens got slow gradually and nothing objected.
        </p>
        <p>
          Given the same system again, I'd put timing on the read paths <em>before</em> optimising a single one of them, so the next regression announces itself instead of waiting to be noticed.
        </p>

        <h2>Key Takeaways</h2>
        <ol>
          <li><strong>Profile before optimizing</strong> — the bottleneck is rarely where you think it is.</li>
          <li><strong>Only fetch what you display</strong> — removing unused JOINs had the single biggest impact.</li>
          <li><strong>Lazy load aggressively</strong> — if it's below the fold, defer it.</li>
          <li><strong>Consolidate API calls</strong> — fewer round trips beat faster individual requests.</li>
        </ol>
        <p>These optimizations didn't require any infrastructure changes — no caching layer, no CDN, no database migration. Just disciplined engineering.</p>
      </>
    ),
  },
  {
    id: "jwt-hmac-token-auth",
    title: "Building a Secure Token-Based Guest Access System with JWT + HMAC-SHA256",
    date: "January 2026",
    readTime: "10 min read",
    tags: ["Security", "JWT", "Node.js", "Authentication"],
    summary:
      "How I designed a secure, stateless authentication system that lets suppliers access purchase orders and RFQs via email links — without needing an account.",
    role: "Designed and built end to end — schema, token derivation, middleware, APIs and the guest interface.",
    period: "Oct 2025 — Feb 2026",
    stack: ["Node.js", "Express", "JWT", "HMAC-SHA256", "MySQL", "Angular", "AWS SES"],
    questions: [
      "What stops someone replaying a forwarded link before it expires?",
      "Why HMAC rather than a random token, given you store a row either way?",
      "How would you handle rate limiting on the exchange endpoint?",
      "What is the revocation latency, and what would you change to shorten it?",
      "How do you keep the guest and authenticated endpoints from drifting apart over time?",
    ],
    content: (
      <>
        <h2>The Challenge</h2>
        <p>In our marine procurement system, buyers send RFQs (Request for Quotations) to suppliers. But not all suppliers have portal accounts. We needed a way for <strong>unregistered suppliers to securely view and respond to RFQs directly from email links</strong> — without compromising security.</p>
        <p>The requirements were strict:</p>
        <ul>
          <li>Token must be <strong>short enough</strong> to look clean in emails (no 500-char JWT URLs)</li>
          <li>Access must be <strong>scoped</strong> to a specific RFQ only</li>
          <li>Tokens must <strong>expire</strong> (48-hour window)</li>
          <li>The system must be <strong>stateless</strong> at the middleware layer</li>
        </ul>

        <h2>Why the Obvious Approaches Don't Work</h2>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr><th>Approach</th><th>Why I rejected it</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Put a signed JWT directly in the URL</td>
                <td>Hundreds of characters of base64 in an email link, and the claims are readable by anyone who copies it. Worse, it can't be revoked — a leaked link stays valid until expiry.</td>
              </tr>
              <tr>
                <td>Random opaque token, checked against the DB on every request</td>
                <td>Revocable and short, but it puts a database round-trip in front of every single API call in the guest flow, including product search and autocomplete.</td>
              </tr>
              <tr>
                <td>Send a one-time link that silently creates an account</td>
                <td>Solves authentication by defeating the purpose. The supplier still ends up with an account they never asked for.</td>
              </tr>
              <tr>
                <td><strong>Two-token system</strong> (chosen)</td>
                <td>One database lookup at entry, stateless afterwards, and revocable at the point that matters.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>The Architecture</h2>
        <p>I designed a <strong>two-token system</strong>: a short token for email URLs and a full JWT for session management. The link and the session have genuinely different requirements — the link needs to be short, opaque and revocable; the session needs to be cheap to verify on every request. One token can't be both.</p>

        <Figure caption="The database is touched once, at redemption. Every request after that verifies statelessly — and the final step overwrites client-supplied identifiers rather than validating them.">
          <Flow
            title="Issue"
            nodes={[
              { label: "RFQ sent", sub: "one recipient" },
              { label: "Derive short token", sub: "HMAC-SHA256 + secret", tone: "accent" },
              { label: "Persist", sub: "context + expiry" },
              { label: "Email link", sub: "opaque, short" },
            ]}
          />
          <Flow
            title="Redeem"
            nodes={[
              { label: "Link opened" },
              { label: "Resolve + check", sub: "expiry, revocation", tone: "accent" },
              { label: "Issue scoped JWT", sub: "short-lived", tone: "accent" },
              { label: "Verify session", sub: "stateless, per request" },
              { label: "Inject scope", sub: "ids from token, not client", tone: "pos" },
              { label: "Scoped API" },
            ]}
          />
        </Figure>

        <h3>Short Token Generation</h3>
        <p>When a buyer sends an RFQ to a supplier, the system generates a deterministic short token:</p>
        <pre className="blog-code-block"><code>{`const crypto = require('crypto');

function generateShortToken(rfqId, supplierEmail, buyerId) {
  const payload = \`\${rfqId}:\${supplierEmail}:\${buyerId}:\${Date.now()}\`;
  const hmac = crypto.createHmac('sha256', process.env.MAGIC_LINK_SECRET);
  hmac.update(payload);
  return hmac.digest('hex').substring(0, 16); // 16-char readable token
}`}</code></pre>

        <h3>Token Verification Flow</h3>
        <p>When a supplier clicks the email link:</p>
        <ol>
          <li><strong>Short token resolves</strong> — Database lookup maps short token to full context</li>
          <li><strong>Expiry check</strong> — If past 48 hours, reject with clear message</li>
          <li><strong>JWT issuance</strong> — System issues a short-lived JWT scoped to that specific RFQ</li>
          <li><strong>Cookie-based session</strong> — JWT is set as an httpOnly cookie for subsequent requests</li>
        </ol>

        <h3>Middleware Enforcement</h3>
        <p>Every API route in the token-access flow passes through two middleware layers:</p>
        <pre className="blog-code-block"><code>{`// 1. Verify the JWT exists and is valid
function ensurePoSession(req, res, next) {
  const token = req.cookies.rfqAccessToken;
  if (!token) return res.status(401).json({ error: 'No session' });
  try {
    req.tokenContext = jwt.verify(token, process.env.MAGIC_LINK_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }
}

// 2. Enforce that the request matches the token's scope
function enforcePoScope(req, res, next) {
  const { rfqId } = req.tokenContext;
  if (req.params.rfqId && req.params.rfqId !== String(rfqId)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  req.body.rfqId = rfqId;
  req.body.supplierId = req.tokenContext.supplierId;
  next();
}`}</code></pre>
        <p>
          The detail that matters most is on the last two lines: the middleware <strong>assigns</strong> the identifiers rather than merely comparing them. Whatever the client sent is discarded. Validation can be bypassed by a request shape you didn't anticipate; injection cannot.
        </p>

        <h2>Security Measures</h2>
        <ul>
          <li><strong>HMAC-SHA256</strong> ensures tokens can't be forged</li>
          <li><strong>Short-lived JWTs</strong> (2 hours) limit the blast radius if a token leaks</li>
          <li><strong>Scope enforcement</strong> prevents horizontal privilege escalation</li>
          <li><strong>Database-backed resolution</strong> means tokens can be revoked server-side</li>
          <li><strong>No sensitive data in URL</strong> — the short token is opaque</li>
        </ul>

        <h2>A Production Incident Worth Keeping</h2>
        <p>
          The flow worked in development and failed in production with a signing error: the secret was defined in one environment's configuration and missing from the others. Nothing was wrong with the code. The token system had a hard dependency on a config value, and nothing verified that dependency existed before traffic hit it.
        </p>
        <p>
          I traced it, added the missing configuration across environments, and verified guest submission end to end in each. The durable lesson wasn't about secrets management — it was that a security feature which fails closed will fail closed <em>in production too</em>, and config parity deserves the same review attention as the code that depends on it.
        </p>

        <h2>What I'd Do Differently</h2>
        <p>
          Guest parity meant every endpoint the logged-in quoting flow touched needed a token-scoped twin — product search, currency lookup, tax profiles, drafts, attachments. That's a lot of surface, and today the two sets are kept aligned by discipline rather than by anything structural. I'd factor the shared handlers so scope is a parameter rather than a parallel implementation, which would make drift impossible instead of merely unlikely.
        </p>

        <h2>Key Takeaways</h2>
        <ol>
          <li><strong>Two-token systems</strong> bridge the gap between email-friendly URLs and secure sessions.</li>
          <li><strong>Scope enforcement at middleware</strong> is non-negotiable — never trust client-provided IDs when a token context exists.</li>
          <li><strong>Deterministic HMAC hashing</strong> gives you reproducible, verifiable tokens without storing secrets in the URL.</li>
          <li><strong>Design for the unhappy path</strong> — expired tokens, revoked access, and scope mismatches should all produce clear error messages.</li>
        </ol>
      </>
    ),
  },
  {
    id: "ai-chatbot-gemini",
    title: "Building an AI-Powered Analytics Chatbot with Google Gemini for Enterprise Dashboards",
    date: "November 2025",
    readTime: "9 min read",
    tags: ["AI", "Google Gemini", "Angular", "Node.js"],
    summary:
      "How I built a production chatbot from scratch that lets buyers and suppliers query their dashboard data using natural language — with role-based context and quick actions.",
    role: "Architecture and implementation across the tool layer, retrieval, orchestration and the interface.",
    period: "Nov 2025 — Present",
    stack: ["Node.js", "Google Gemini", "Angular", "MySQL", "TypeScript"],
    questions: [
      "How do you defend against prompt injection through user-generated content the tools return?",
      "What stops the model requesting a tool outside its role manifest?",
      "How would you evaluate tool-selection accuracy as the manifest grows?",
      "What is the latency budget, and where does it actually go?",
      "Why read-only? What would it take to safely allow writes?",
    ],
    content: (
      <>
        <h2>Why a Chatbot?</h2>
        <p>Our marine procurement system had rich dashboards with charts, metrics, and tables. But users kept asking the same questions: <em>"How many RFQs did I receive this month?"</em>, <em>"Which supplier has the best response time?"</em>, <em>"What's my spending trend?"</em></p>
        <p>Instead of building more UI, I proposed a <strong>natural language interface</strong> — an AI chatbot powered by Google Gemini that understands the user's role and data context.</p>

        <h2>The Constraint That Shaped Everything</h2>
        <p>
          This platform has three roles — buyer, supplier, administrator — and buyers and suppliers are <strong>commercial counterparties negotiating against each other</strong>. A supplier learning what a buyer paid a competitor isn't a bad answer. It's a data breach with a conversational interface in front of it.
        </p>
        <p>
          So correctness was never the hard constraint — <strong>isolation</strong> was. A wrong answer is embarrassing; a correct answer drawn from the wrong tenant's data is a commercial incident. The architecture had to make cross-role access structurally impossible rather than prompt-discouraged.
        </p>

        <h2>Architecture Overview</h2>
        <Figure caption="The security boundary lives in registration and execution, so isolation never depends on the model behaving well.">
          <Stack
            layers={[
              {
                name: "Orchestration",
                detail:
                  "Routes the request, invokes the model, selects a fallback, assembles the reply.",
              },
              {
                name: "Registration",
                detail:
                  "Builds the tool manifest for this role. A supplier session is never offered buyer tools, so the model cannot call what it was never shown.",
              },
              {
                name: "Execution",
                detail:
                  "Validates arguments, clamps ranges, and filters fields down to the tool's allowlist before anything returns.",
              },
              {
                name: "Retrieval",
                detail:
                  "Queries the data layer, always parameterised by the identity resolved from the authenticated session.",
              },
            ]}
            aside={{
              name: "The model",
              detail:
                "Proposes which tool to call and with what filters. It never supplies identity, never writes, and never sees a field outside the allowlist.",
            }}
          />
        </Figure>

        <h2>Three Rules That Make It Safe</h2>
        <ol>
          <li><strong>Identity comes from the session, never the model.</strong> The model can propose which tool to call and with what filters, but it can never supply the identifier that determines whose data is read — that's injected server-side. A hallucinated or injected identifier has nowhere to land.</li>
          <li><strong>Tools are read-only.</strong> The assistant reports on orders, approvals and compliance state; it cannot approve, reject, cancel or pay. This bounds the worst case: the maximum damage from a fully successful prompt injection is an incorrect sentence.</li>
          <li><strong>Fields are allowlisted, not denylisted.</strong> Each tool declares which fields may leave it, so banking details and counterparty pricing never enter model context in the first place — not because a prompt asked the model to avoid them.</li>
        </ol>

        <h2>Role-Based Context</h2>
        <p>The key insight was that <strong>buyers and suppliers need completely different chatbot experiences</strong>. A buyer asking "How are my orders?" expects procurement analytics. A supplier asking the same expects fulfillment metrics.</p>
        <pre className="blog-code-block"><code>{`function buildBuyerContext(dashboardData) {
  return \`You are an AI assistant for a buyer on a marine procurement platform.
  Current metrics:
  - Total RFQs sent: \${dashboardData.rfqCount}
  - Active orders: \${dashboardData.orderCount}
  - This month's spend: \${dashboardData.currency} \${dashboardData.revenue}
  - Top supplier: \${dashboardData.topSupplier}
  Answer questions about procurement, spending, and supplier performance.
  Be concise and data-driven.\`;
}`}</code></pre>

        <h2>Quick Actions</h2>
        <p>Not every interaction needs AI. For common tasks, I built <strong>quick action buttons</strong> that map to predefined routes:</p>
        <ul>
          <li><strong>"View unactioned RFQs"</strong> — Routes directly to filtered RFQ list</li>
          <li><strong>"Track my orders"</strong> — Opens PO list with status filters</li>
          <li><strong>"Create new RFQ"</strong> — Guided step-by-step flow with product CTAs</li>
          <li><strong>"Evaluate suppliers"</strong> — Triggers AI analysis of supplier performance</li>
        </ul>
        <p>They're faster, they can't hallucinate, and they cost nothing to run. Not every question deserves inference.</p>

        <h2>Fallback System</h2>
        <p>AI services can fail. I built a <strong>comprehensive fallback system</strong> that provides useful responses even without Gemini:</p>
        <ul>
          <li><strong>Dashboard summaries</strong> — Pre-computed from API data with trends, counts, and peak days</li>
          <li><strong>Notification overviews</strong> — Aggregated from the notification service</li>
          <li><strong>Performance metrics</strong> — Calculated from stored procedure results</li>
        </ul>
        <p>The user gets a helpful response regardless of whether Gemini is available. The difference between the two paths is a phrasing difference, not a functionality cliff.</p>

        <h2>Trade-offs</h2>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr><th>Decision</th><th>Cost accepted</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Explicit tools instead of open retrieval across the schema</td>
                <td>Every new capability needs a hand-written tool, so it's slower to extend. But open retrieval cannot guarantee isolation, and isolation was the requirement.</td>
              </tr>
              <tr>
                <td>Read-only surface</td>
                <td>Users can't act from the conversation, only navigate to where they can. Loses convenience; bounds the blast radius of any successful injection to a wrong sentence.</td>
              </tr>
              <tr>
                <td>Field allowlists per tool</td>
                <td>More upfront declaration and stricter review when fields change. In exchange, sensitive values are structurally absent from model context.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Getting It Running</h2>
        <p>
          The integration path was less tidy than the architecture. Authentication against the managed model endpoint failed repeatedly on credential formatting; after enough time lost to it I moved to the direct client library, which fixed authentication and introduced a module-format problem in its place — the library ships as ESM into a CommonJS service, handled with a dynamic import at the boundary.
        </p>
        <p>
          Both were integration friction rather than design flaws, but they were the honest majority of the elapsed time. The design settled in a day; making it run across three environments took considerably longer.
        </p>

        <h2>What I'd Do Differently</h2>
        <p>
          Tool selection is verified by hand today. There's no regression suite proving a prompt still routes to the right tool after a manifest change, which means every extension carries a risk I'm eyeballing rather than measuring. An evaluation set — fixed prompts with expected tool calls, run in CI — is the first thing I'd add.
        </p>

        <h2>Key Takeaways</h2>
        <ol>
          <li><strong>Not everything needs AI</strong> — quick actions that route directly are faster and more reliable.</li>
          <li><strong>Always build fallbacks</strong> — AI services will fail; your UX shouldn't.</li>
          <li><strong>Role-based prompts are essential</strong> — generic prompts produce generic answers.</li>
          <li><strong>Start with the data</strong> — the AI is only as good as the context you feed it.</li>
        </ol>
      </>
    ),
  },
  {
    id: "websocket-chat-system",
    title: "Designing a Real-Time Buyer-Supplier Chat System with WebSockets and AWS",
    date: "September 2025",
    readTime: "8 min read",
    tags: ["WebSockets", "AWS Lambda", "Real-time", "Node.js"],
    summary:
      "How I architected a production real-time messaging system between buyers and suppliers using WebSockets, AWS Lambda, API Gateway, and DynamoDB.",
    role: "Architecture and implementation across connection handling, persistence, delivery and the client.",
    period: "Aug 2025 — Jul 2026",
    stack: ["AWS API Gateway", "AWS Lambda", "Serverless Framework", "Node.js", "Angular"],
    questions: [
      "How do you handle a message sent while the recipient is mid-reconnect?",
      "What happens if persistence succeeds but every delivery attempt fails?",
      "How would you add read receipts without doubling the write volume?",
      "Why key connections by user rather than by connection identifier?",
      "At what scale would the serverless choice stop making sense?",
    ],
    content: (
      <>
        <h2>The Requirement</h2>
        <p>In our marine procurement platform, buyers and suppliers needed to communicate about RFQs, negotiate terms, and clarify specifications — all within the platform. Email was too slow. We needed <strong>real-time, contextual messaging</strong> tied to specific RFQs.</p>

        <h2>Architecture Decision: Serverless WebSockets</h2>
        <p>Instead of running a persistent WebSocket server, I chose <strong>AWS API Gateway WebSockets + Lambda</strong>. The reasoning cuts both ways, and it's worth being explicit about what that costs:</p>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr><th>Gained</th><th>Given up</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>No connection server to operate, scale or keep alive — the platform already ran serverless, so this added no new infrastructure.</td>
                <td>Connection state can't live in memory. Every connection must be externalised to storage, turning an in-process lookup into a network call.</td>
              </tr>
              <tr>
                <td>Cost tracks messages rather than uptime, which suits traffic that is bursty and mostly idle.</td>
                <td>No in-process broadcast. Fan-out means iterating stored connections and posting to each individually.</td>
              </tr>
              <tr>
                <td>Connection lifecycle handled by the platform rather than by my code.</td>
                <td>Cold starts sit in the delivery path, so latency is less predictable than a warm dedicated server.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>For a negotiation thread between two parties, where messages arrive seconds apart and conversations are small, those costs are cheap. For a high-fanout chat room they wouldn't be, and I'd have made the other call.</p>

        <h2>The Delivery Model</h2>
        <Figure caption="Persistence happens before delivery is attempted, so a failed push costs latency rather than a message.">
          <Flow
            title="Send"
            nodes={[
              { label: "Sender emits" },
              { label: "$default route", sub: "Lambda handler" },
              { label: "Persist message", sub: "durable, server clock", tone: "pos" },
              { label: "Look up connections", sub: "by user, not connection id" },
              { label: "Push to each", sub: "best effort", tone: "accent" },
            ]}
          />
          <Flow
            title="When delivery fails"
            nodes={[
              { label: "Push rejected", sub: "stale or absent" },
              { label: "Drop the record", sub: "not an error" },
              { label: "Message still stored", sub: "seen on next load", tone: "pos" },
            ]}
          />
        </Figure>

        <h2>The Implementation</h2>
        <h3>Serverless Configuration</h3>
        <p>I configured three WebSocket routes in <code className="blog-inline-code">serverless.yml</code>:</p>
        <pre className="blog-code-block"><code>{`functions:
  websocketConnect:
    handler: handler.connect
    events:
      - websocket:
          route: $connect
  websocketDisconnect:
    handler: handler.disconnect
    events:
      - websocket:
          route: $disconnect
  websocketDefault:
    handler: handler.defaultHandler
    events:
      - websocket:
          route: $default`}</code></pre>

        <h3>Connection Management</h3>
        <p>When a user connects, the handler registers their <code className="blog-inline-code">connectionId</code> with their <code className="blog-inline-code">userId</code>:</p>
        <pre className="blog-code-block"><code>{`async function connect(event) {
  const { connectionId } = event.requestContext;
  const { userId, rfqId } = event.queryStringParameters;

  await db.put({
    TableName: 'ws-connections',
    Item: { connectionId, userId, rfqId, connectedAt: Date.now() }
  });

  return { statusCode: 200 };
}`}</code></pre>

        <h3>Online/Offline Delivery</h3>
        <p>The critical challenge: <strong>what happens when the recipient is offline?</strong></p>
        <pre className="blog-code-block"><code>{`async function handleMessage(senderConnectionId, body) {
  const { recipientId, message, rfqId } = body;

  // Always persist the message first
  await saveMessage({ rfqId, senderId, recipientId, message });

  // Try to deliver in real-time
  const conn = await getConnection(recipientId, rfqId);
  if (conn) {
    await apiGateway.postToConnection({
      ConnectionId: conn.connectionId,
      Data: JSON.stringify({ type: 'message', ...body })
    });
  }
  // Offline — message is persisted, they'll see it on next load
}`}</code></pre>

        <h2>Challenges Solved</h2>
        <ol>
          <li><strong>Connection ID volatility</strong> — AWS assigns new IDs on reconnect. I used userId-based lookups instead of relying on connection IDs.</li>
          <li><strong>Typing indicators</strong> — Debounced typing events to avoid flooding the WebSocket with every keystroke.</li>
          <li><strong>Message ordering</strong> — Used server-side timestamps (not client) to ensure consistent ordering across time zones.</li>
          <li><strong>Security</strong> — JWT validation on <code className="blog-inline-code">$connect</code> ensures only authenticated users can establish WebSocket connections.</li>
          <li><strong>Stale connections</strong> — A client that vanishes without a clean disconnect leaves a record pointing at a connection that no longer exists, so delivery failures are treated as a signal to remove the record rather than an error to report.</li>
        </ol>

        <h2>Consolidation</h2>
        <p>
          The pattern got reused, and reuse produced its own problem. Conversations ended up originating from three different parts of the product, each with its own entry point — so users had three places to check and no single indication that any of them had something waiting.
        </p>
        <p>
          I merged them into one inbox: conversations grouped by source, unread counts aggregated across all three, category filters to narrow back down. The underlying threads didn't change; the surface stopped being three surfaces.
        </p>

        <h2>What I'd Do Differently</h2>
        <p>
          Delivery is currently at-most-once past the persistence boundary: if a push fails the message is safe in storage, but nothing retries the push — the recipient sees it on their next load. That's acceptable for negotiation threads, where a few seconds of latency changes nothing. It wouldn't be acceptable for anything time-critical, and the fix is an outbox the delivery path drains rather than a fire-and-forget push.
        </p>

        <h2>Key Takeaways</h2>
        <ol>
          <li><strong>Serverless WebSockets</strong> are production-ready — API Gateway handles the heavy lifting.</li>
          <li><strong>Always persist first, deliver second</strong> — never lose a message because delivery failed.</li>
          <li><strong>Context matters</strong> — tying chat to RFQs made conversations actionable, not just conversational.</li>
          <li><strong>Plan for offline</strong> — most users won't be online simultaneously, so offline-first design is essential.</li>
        </ol>
      </>
    ),
  },
];

export default blogData;
