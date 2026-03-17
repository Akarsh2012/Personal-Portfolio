import React from "react";

const blogData = [
  {
    id: "page-load-optimization",
    title: "How I Reduced Page Load Times from 48s to 8s in a Production Angular App",
    date: "October 2025",
    readTime: "8 min read",
    tags: ["Performance", "Angular", "MySQL", "Optimization"],
    summary:
      "A deep dive into how I diagnosed and fixed catastrophic page load times in a marine procurement system serving real users and real transactions.",
    content: (
      <>
        <h2>The Problem</h2>
        <p>
          When I joined Varuna Sentinels as a Software Engineer, one of the first things I noticed was that several critical screens in our marine procurement system (VS-MPS) were painfully slow. The <strong>Supplier Quotation page took 48 seconds</strong> to load. The Supplier RFQ screen? <strong>35 seconds.</strong> Buyer RFQ? <strong>40 seconds.</strong>
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

        <h2>The Architecture</h2>
        <p>I designed a <strong>two-token system</strong>: a short token for email URLs and a full JWT for session management.</p>

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

        <h2>Security Measures</h2>
        <ul>
          <li><strong>HMAC-SHA256</strong> ensures tokens can't be forged</li>
          <li><strong>Short-lived JWTs</strong> (2 hours) limit the blast radius if a token leaks</li>
          <li><strong>Scope enforcement</strong> prevents horizontal privilege escalation</li>
          <li><strong>Database-backed resolution</strong> means tokens can be revoked server-side</li>
          <li><strong>No sensitive data in URL</strong> — the short token is opaque</li>
        </ul>

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
    content: (
      <>
        <h2>Why a Chatbot?</h2>
        <p>Our marine procurement system had rich dashboards with charts, metrics, and tables. But users kept asking the same questions: <em>"How many RFQs did I receive this month?"</em>, <em>"Which supplier has the best response time?"</em>, <em>"What's my spending trend?"</em></p>
        <p>Instead of building more UI, I proposed a <strong>natural language interface</strong> — an AI chatbot powered by Google Gemini that understands the user's role and data context.</p>

        <h2>Architecture Overview</h2>
        <p>The chatbot has three layers:</p>
        <ol>
          <li><strong>Frontend (Angular)</strong> — Draggable chat widget with typing indicators, quick actions, and message rendering</li>
          <li><strong>Backend (Node.js)</strong> — Role-aware prompt builder, Gemini API integration, and fallback logic</li>
          <li><strong>Data Layer</strong> — Dashboard APIs that provide real-time context for AI prompts</li>
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

        <h2>Fallback System</h2>
        <p>AI services can fail. I built a <strong>comprehensive fallback system</strong> that provides useful responses even without Gemini:</p>
        <ul>
          <li><strong>Dashboard summaries</strong> — Pre-computed from API data with trends, counts, and peak days</li>
          <li><strong>Notification overviews</strong> — Aggregated from the notification service</li>
          <li><strong>Performance metrics</strong> — Calculated from stored procedure results</li>
        </ul>
        <p>The user gets a helpful response regardless of whether Gemini is available.</p>

        <h2>The Chat UI</h2>
        <p>The frontend features:</p>
        <ul>
          <li><strong>Draggable widget</strong> with edge snapping</li>
          <li><strong>Typing indicator</strong> with animated dots</li>
          <li><strong>Message timestamps</strong> with relative formatting</li>
          <li><strong>Auto-scroll</strong> to latest message</li>
          <li><strong>ContentEditable composer</strong> with auto-expand</li>
          <li><strong>Visibility gating</strong> — only shown to authenticated users</li>
        </ul>

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
    content: (
      <>
        <h2>The Requirement</h2>
        <p>In our marine procurement platform, buyers and suppliers needed to communicate about RFQs, negotiate terms, and clarify specifications — all within the platform. Email was too slow. We needed <strong>real-time, contextual messaging</strong> tied to specific RFQs.</p>

        <h2>Architecture Decision: Serverless WebSockets</h2>
        <p>Instead of running a persistent WebSocket server, I chose <strong>AWS API Gateway WebSockets + Lambda</strong> for several reasons:</p>
        <ul>
          <li><strong>Auto-scaling</strong> — handles 10 or 10,000 concurrent connections</li>
          <li><strong>Cost-efficient</strong> — pay per message, not per server hour</li>
          <li><strong>No infrastructure management</strong> — AWS handles connection lifecycle</li>
        </ul>

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
        </ol>

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
