import { useState } from "react";

// ── colour tokens ──────────────────────────────────────────────────────────
const C = {
  navy:    "#0A1628",
  navyMid: "#122040",
  slate:   "#1E3050",
  steel:   "#2A4570",
  accent:  "#0F7AFF",
  accentL: "#3D9BFF",
  teal:    "#0DBFB0",
  amber:   "#F5A623",
  red:     "#E53E3E",
  green:   "#22C55E",
  text:    "#E8EEF8",
  textDim: "#7A95BE",
  border:  "#1E3050",
  card:    "#0F1E35",
  cardHov: "#142440",
};

// principle badge colours
const PILL = {
  PROTECT:  { bg: "#1A1040", border: "#7C3AED", text: "#A78BFA" },
  IMPROVE:  { bg: "#0A2030", border: "#0284C7", text: "#38BDF8" },
  EMPOWER:  { bg: "#0A2820", border: "#059669", text: "#34D399" },
  INNOVATE: { bg: "#2A1800", border: "#D97706", text: "#FCD34D" },
};

// ── helpers ────────────────────────────────────────────────────────────────
function PrinciplePill({ name, size = "sm" }) {
  const s = PILL[name] || PILL.PROTECT;
  const pad = size === "sm" ? "2px 7px" : "4px 12px";
  const fs  = size === "sm" ? 10 : 12;
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`,
      color: s.text, borderRadius: 4, padding: pad,
      fontSize: fs, fontWeight: 600, letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>{name}</span>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Not Started":        { bg: "#1A2438", color: C.textDim },
    "In Progress":        { bg: "#0A2A50", color: C.accentL },
    "Evidence Required":  { bg: "#2A1800", color: "#FCD34D" },
    "Review Required":    { bg: "#1A1A00", color: "#FACC15" },
    "Approved":           { bg: "#0A2A18", color: C.green },
    "Blocked":            { bg: "#2A0A0A", color: C.red },
  };
  const s = map[status] || map["Not Started"];
  return (
    <span style={{
      background: s.bg, color: s.color,
      borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600,
    }}>{status}</span>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>
        {children}
      </h2>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 13, color: C.textDim }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 8, padding: 20, ...style,
    }}>{children}</div>
  );
}

function PhaseBar({ phases, current, onSelect }) {
  const statusColor = {
    "Not Started": C.textDim,
    "In Progress": C.accent,
    "Approved": C.green,
    "Blocked": C.red,
    "Evidence Required": C.amber,
  };
  return (
    <div style={{
      display: "flex", gap: 0, overflowX: "auto",
      background: C.navyMid, borderRadius: 8,
      border: `1px solid ${C.border}`, padding: "6px 8px",
    }}>
      {phases.map((p, i) => (
        <button key={p.id}
          onClick={() => onSelect(p.id)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: current === p.id ? C.slate : "transparent",
            border: "none", borderRadius: 6, padding: "6px 10px",
            cursor: "pointer", color: current === p.id ? C.text : C.textDim,
            fontSize: 12, fontWeight: current === p.id ? 700 : 400,
            whiteSpace: "nowrap", transition: "all 0.15s",
          }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: statusColor[p.status] || C.textDim, flexShrink: 0,
          }} />
          <span style={{ fontSize: 10, opacity: 0.6 }}>{String(i + 1).padStart(2, "0")}</span>
          <span>{p.name}</span>
          {i < phases.length - 1 && (
            <span style={{ color: C.border, marginLeft: 4 }}>›</span>
          )}
        </button>
      ))}
    </div>
  );
}

function ProgressRing({ pct, size = 60, stroke = 6, color = C.accent }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" />
      <text x={size/2} y={size/2 + 1} fill={C.text} fontSize={size * 0.22}
        textAnchor="middle" dominantBaseline="middle"
        transform={`rotate(90 ${size/2} ${size/2})`}
        fontWeight="700">{pct}%</text>
    </svg>
  );
}

// ── nav items ──────────────────────────────────────────────────────────────
const NAV = [
  { id: "home",       label: "Home",            icon: "⬡" },
  { id: "discover",   label: "Discover",         icon: "◎" },
  { id: "ai-fit",     label: "AI Fit",           icon: "◈" },
  { id: "requirements",label: "Requirements",   icon: "≡" },
  { id: "data",       label: "Data Readiness",   icon: "⬡" },
  { id: "design",     label: "System Design",    icon: "⬢" },
  { id: "evaluation", label: "Evaluation Lab",   icon: "◉" },
  { id: "buildbuy",   label: "Build vs Buy",     icon: "⊞" },
  { id: "governance", label: "Governance",       icon: "◈" },
  { id: "mlops",      label: "MLOps",            icon: "⟳" },
  { id: "deploy",     label: "Deployment",       icon: "↑" },
  { id: "monitor",    label: "Monitoring",       icon: "⬡" },
  { id: "reports",    label: "Reports",          icon: "⊟" },
];

const PHASES = [
  { id: "discover",   name: "Discover",      status: "Approved" },
  { id: "define",     name: "Define",        status: "Approved" },
  { id: "ai-fit",     name: "Assess AI Fit", status: "Approved" },
  { id: "design",     name: "Design",        status: "In Progress" },
  { id: "select",     name: "Select Tech",   status: "In Progress" },
  { id: "evaluate",   name: "Evaluate",      status: "Evidence Required" },
  { id: "govern",     name: "Govern",        status: "Not Started" },
  { id: "build",      name: "Build",         status: "Not Started" },
  { id: "validate",   name: "Validate",      status: "Not Started" },
  { id: "deploy",     name: "Deploy",        status: "Not Started" },
  { id: "operate",    name: "Operate",       status: "Not Started" },
  { id: "improve",    name: "Improve",       status: "Not Started" },
];

// ── HOME ───────────────────────────────────────────────────────────────────
function HomeScreen() {
  const meta = [
    ["Use Case",           "Intelligent Document Processing"],
    ["Business Owner",     "Sarah Chen – Head of Operations"],
    ["Technical Owner",    "James Patel – AI Engineering Lead"],
    ["Risk Owner",         "Mark Hobbs – Chief Risk Officer"],
    ["Department",         "Operations & Customer Services"],
    ["Current Stage",      "Design / Technology Selection"],
    ["Overall Readiness",  "62%"],
    ["AI Risk Level",      "Moderate"],
    ["Architecture Status","In Review"],
    ["Evaluation Status",  "Evidence Required"],
    ["Build/Buy Decision", "Pending"],
    ["Deployment Status",  "Not Started"],
  ];

  const pillars = [
    { name: "PROTECT",  desc: "Risk, security, privacy, compliance, resilience", active: true },
    { name: "IMPROVE",  desc: "Efficiency, accuracy, reduced operational friction", active: true },
    { name: "EMPOWER",  desc: "Human augmentation, access to information", active: true },
    { name: "INNOVATE", desc: "New capabilities and controlled experimentation", active: false },
  ];

  const gates = [
    { id: 0, name: "Problem & AI Suitability", status: "Approved", owner: "Business Owner" },
    { id: 1, name: "Data Readiness",           status: "Approved", owner: "Data Owner · Privacy" },
    { id: 2, name: "Architecture",             status: "In Progress", owner: "EA · AI Arch · Sec Arch" },
    { id: 3, name: "Model Evaluation",         status: "Evidence Required", owner: "AI Eng · Business" },
    { id: 4, name: "Responsible AI",           status: "Not Started", owner: "AI WG · DPO · Legal" },
    { id: 5, name: "Production Readiness",     status: "Not Started", owner: "Eng · Ops · Security" },
    { id: 6, name: "Production Release",       status: "Not Started", owner: "Named Approver" },
    { id: 7, name: "Post-Deployment Review",   status: "Not Started", owner: "Business · Risk · Ops" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <SectionTitle
            children="AI System Design & Adoption"
            sub="Module within the Citation AI Strategy Platform · Intelligent Document Processing" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["PROTECT","IMPROVE","EMPOWER"].map(p => <PrinciplePill key={p} name={p} />)}
        </div>
      </div>

      {/* pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {pillars.map(p => (
          <Card key={p.name} style={{
            borderColor: p.active ? PILL[p.name].border : C.border,
            opacity: p.active ? 1 : 0.5,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: PILL[p.name].text, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: C.textDim }}>{p.desc}</div>
            {p.active && (
              <div style={{ marginTop: 8, fontSize: 10, color: PILL[p.name].text }}>● Active for this use case</div>
            )}
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* left: meta + gates */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* meta grid */}
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Use Case Overview</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {meta.map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
                  <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>
                    {k === "AI Risk Level" ? (
                      <span style={{ color: C.amber, fontWeight: 600 }}>{v}</span>
                    ) : k === "Overall Readiness" ? (
                      <span style={{ color: C.accent, fontWeight: 700 }}>{v}</span>
                    ) : v}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* governance gates */}
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Governance Gates</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gates.map(g => (
                <div key={g.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 12px", borderRadius: 6,
                  background: g.status === "In Progress" ? "#0A2040" : "transparent",
                  border: `1px solid ${g.status === "Approved" ? C.border : g.status === "In Progress" ? C.accent + "60" : C.border}`,
                }}>
                  <span style={{ fontSize: 11, color: C.textDim, width: 20, flexShrink: 0 }}>G{g.id}</span>
                  <span style={{ flex: 1, fontSize: 13, color: C.text }}>{g.name}</span>
                  <span style={{ fontSize: 11, color: C.textDim }}>{g.owner}</span>
                  <StatusBadge status={g.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* right: readiness + risk */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 12 }}>Overall Readiness</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ProgressRing pct={62} size={90} stroke={8} color={C.accent} />
            </div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Discovery & Requirements", 100, C.green],
                ["Data Readiness",           85, C.teal],
                ["System Design",            70, C.accent],
                ["Model Evaluation",         35, C.amber],
                ["Governance",              20, C.textDim],
                ["Production",               0, C.textDim],
              ].map(([label, pct, color]) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textDim, marginBottom: 2 }}>
                    <span>{label}</span><span style={{ color }}>{pct}%</span>
                  </div>
                  <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Risk Snapshot</div>
            {[
              { label: "AI Risk Level", val: "Moderate", color: C.amber },
              { label: "Data Protection", val: "Moderate", color: C.amber },
              { label: "Security", val: "Review Required", color: C.amber },
              { label: "Responsible AI", val: "Not Assessed", color: C.textDim },
              { label: "Regulatory", val: "EU AI Act – TBD", color: C.textDim },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                <span style={{ color: C.textDim }}>{r.label}</span>
                <span style={{ color: r.color, fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Pending Actions</div>
            {[
              "Complete model evaluation dataset",
              "Architecture Gate 2 sign-off",
              "RAG retrieval benchmarks required",
              "DPIA — evidence needed",
              "EU AI Act classification",
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0", fontSize: 12, color: C.text, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.amber }}>!</span>{a}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── DISCOVER ───────────────────────────────────────────────────────────────
function DiscoverScreen() {
  const [vals, setVals] = useState({
    problem: "Manual processing of incoming supplier invoices and customer onboarding documents consumes significant staff time, causes payment delays, and introduces data-entry errors that increase downstream risk.",
    who: "Accounts Payable team (12 FTE), Customer Onboarding team (8 FTE), and customers awaiting account activation.",
    dept: "Operations & Customer Services",
    owner: "Sarah Chen – Head of Operations",
    process: "Documents received by email or post → manually reviewed → data keyed into ERP → exceptions routed to team leads → customer notified.",
    causes: "High document volume (avg 3,200/month), inconsistent formats across 400+ suppliers, manual keying errors, no prioritisation logic.",
    frequency: "Daily, peak at month-end. Average 160 documents per working day.",
    volume: "3,200 invoices/month · 800 onboarding packs/month",
    baseline: "Avg processing time: 4.2 days/invoice. Error rate: 6.8%. Cost per invoice: £18.40.",
    doNothing: "£2.1M annual cost continues to grow 12% YoY. SLA breach risk increases. Regulatory scrutiny of onboarding quality.",
    outcome: "Reduce average processing time to <4 hours. Error rate below 1%. Cost per document below £4.",
  });

  const [primaryPrinciple, setPrimary] = useState("IMPROVE");
  const [secondary, setSecondary] = useState(["PROTECT","EMPOWER"]);
  const [primaryObj, setPrimaryObj] = useState("Cost reduction");

  const objectives = ["Revenue growth","Cost reduction","Productivity","Automation","Customer experience","Risk reduction","Quality","Compliance","Faster decisions","Innovation","New products","New markets"];

  const toggleSecondary = (p) => setSecondary(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  return (
    <div>
      <SectionTitle children="Discover the Business Problem" sub="Understand what problem needs solving before considering AI solutions." />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          ["What business problem are you solving?", "problem", 3],
          ["Who experiences the problem?", "who", 2],
          ["What is the current process?", "process", 3],
          ["What causes delay, cost, error or risk?", "causes", 2],
          ["How frequently does the problem occur?", "frequency", 1],
          ["Users, transactions or cases involved?", "volume", 1],
          ["Current baseline (cost, time, error rate)?", "baseline", 1],
          ["What happens if nothing changes?", "doNothing", 2],
          ["What measurable outcome is required?", "outcome", 2],
        ].map(([label, key, rows]) => (
          <Card key={key}>
            <label style={{ display: "block", fontSize: 12, color: C.textDim, marginBottom: 6 }}>{label}</label>
            <textarea
              value={vals[key]}
              onChange={e => setVals({ ...vals, [key]: e.target.value })}
              rows={rows}
              style={{
                width: "100%", background: C.navyMid, border: `1px solid ${C.border}`,
                borderRadius: 6, padding: "10px 12px", color: C.text, fontSize: 13,
                resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </Card>
        ))}

        {/* objective */}
        <Card>
          <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Primary Objective</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {objectives.map(o => (
              <button key={o} onClick={() => setPrimaryObj(o)}
                style={{
                  background: primaryObj === o ? C.accent : C.navyMid,
                  border: `1px solid ${primaryObj === o ? C.accent : C.border}`,
                  color: C.text, borderRadius: 6, padding: "6px 14px",
                  fontSize: 12, cursor: "pointer",
                }}>{o}</button>
            ))}
          </div>
        </Card>

        {/* principles */}
        <Card>
          <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Strategic Principles</div>
          <div style={{ marginBottom: 8, fontSize: 11, color: C.textDim }}>Primary driver</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["PROTECT","IMPROVE","EMPOWER","INNOVATE"].map(p => (
              <button key={p} onClick={() => setPrimary(p)}
                style={{
                  background: primaryPrinciple === p ? PILL[p].bg : "transparent",
                  border: `2px solid ${primaryPrinciple === p ? PILL[p].border : C.border}`,
                  color: primaryPrinciple === p ? PILL[p].text : C.textDim,
                  borderRadius: 6, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>{p}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>Secondary principles</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["PROTECT","IMPROVE","EMPOWER","INNOVATE"].filter(p => p !== primaryPrinciple).map(p => (
              <button key={p} onClick={() => toggleSecondary(p)}
                style={{
                  background: secondary.includes(p) ? PILL[p].bg : "transparent",
                  border: `1px solid ${secondary.includes(p) ? PILL[p].border : C.border}`,
                  color: secondary.includes(p) ? PILL[p].text : C.textDim,
                  borderRadius: 6, padding: "6px 16px", fontSize: 12, cursor: "pointer",
                }}>{p}</button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── AI FIT ─────────────────────────────────────────────────────────────────
function AIFitScreen() {
  const questions = [
    { key: "deterministic", q: "Is the task deterministic (same input → same output always)?", ans: "No" },
    { key: "rules",         q: "Would rule-based software solve the problem entirely?",        ans: "No" },
    { key: "prediction",    q: "Does it require prediction from historical data?",             ans: "Yes" },
    { key: "unstructured",  q: "Does it involve understanding unstructured information?",      ans: "Yes" },
    { key: "generation",    q: "Does it require generating new content?",                     ans: "Yes" },
    { key: "semantic",      q: "Does it require semantic search?",                            ans: "Yes" },
    { key: "classification",q: "Does it require classification?",                             ans: "Yes" },
    { key: "reasoning",     q: "Does it require reasoning across multiple systems?",           ans: "Yes" },
    { key: "autonomous",    q: "Does it require autonomous actions without human approval?",   ans: "No" },
    { key: "vision",        q: "Does it require computer vision?",                            ans: "Yes" },
    { key: "human",         q: "Does it require meaningful human oversight?",                 ans: "Yes" },
    { key: "workflow",      q: "Could workflow automation alone solve this without AI?",      ans: "No" },
  ];

  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map(q => [q.key, q.ans]))
  );

  const yesCount = Object.values(answers).filter(v => v === "Yes").length;
  const fitScore = Math.round((yesCount / questions.length) * 100);

  const recommendation = "RAG + Document Intelligence";
  const pattern = "Retrieval-Augmented Generation with multimodal document ingestion, structured data extraction, and human-in-the-loop validation.";

  return (
    <div>
      <SectionTitle children="AI Suitability Assessment" sub="Determine whether AI is the right solution before selecting a model." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Suitability Questions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {questions.map(({ key, q }) => (
              <div key={key} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 12px", borderRadius: 6, background: C.navyMid,
              }}>
                <span style={{ flex: 1, fontSize: 13, color: C.text }}>{q}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["Yes","No","TBD"].map(opt => (
                    <button key={opt} onClick={() => setAnswers({ ...answers, [key]: opt })}
                      style={{
                        background: answers[key] === opt
                          ? (opt === "Yes" ? "#0A2820" : opt === "No" ? "#2A0A0A" : "#1A1800")
                          : "transparent",
                        border: `1px solid ${answers[key] === opt
                          ? (opt === "Yes" ? C.green : opt === "No" ? C.red : C.amber)
                          : C.border}`,
                        color: answers[key] === opt
                          ? (opt === "Yes" ? C.green : opt === "No" ? C.red : C.amber)
                          : C.textDim,
                        borderRadius: 4, padding: "3px 10px", fontSize: 11, cursor: "pointer",
                      }}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 12 }}>AI Fit Score</div>
            <ProgressRing pct={fitScore} size={90} stroke={8} color={C.teal} />
            <div style={{ marginTop: 12, fontSize: 12, color: C.teal, fontWeight: 700 }}>Strong AI Fit</div>
          </Card>

          <Card style={{ borderColor: C.teal + "80" }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 8 }}>RECOMMENDED PATTERN</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{recommendation}</div>
            <div style={{ fontSize: 12, color: C.textDim }}>{pattern}</div>
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Alternative Patterns</div>
            {[
              { name: "LLM API Integration", fit: "High" },
              { name: "Traditional ML (extraction)", fit: "Medium" },
              { name: "Rules + Workflow", fit: "Low" },
              { name: "Agentic AI", fit: "Not Justified" },
            ].map(a => (
              <div key={a.name} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.text }}>{a.name}</span>
                <span style={{ color: a.fit === "High" ? C.teal : a.fit === "Medium" ? C.amber : a.fit === "Low" ? C.textDim : C.red, fontSize: 11 }}>{a.fit}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── EVALUATION LAB ─────────────────────────────────────────────────────────
function EvaluationScreen() {
  const [tab, setTab] = useState("llm");
  const tabs = [
    { id: "llm",        label: "LLM Evaluation" },
    { id: "rag",        label: "RAG Evaluation" },
    { id: "leaderboard",label: "Model Leaderboard" },
    { id: "baseline",   label: "Baseline Comparison" },
  ];

  const models = [
    { name: "GPT-4o",       provider: "OpenAI",     scores: { quality: 88, safety: 90, security: 78, latency: 72, cost: 60, dataRes: 65, overall: 79 } },
    { name: "Claude 3.5 S", provider: "Anthropic",  scores: { quality: 91, safety: 95, security: 85, latency: 78, cost: 70, dataRes: 80, overall: 85 } },
    { name: "Gemini 1.5 P", provider: "Google",     scores: { quality: 85, safety: 87, security: 76, latency: 80, cost: 75, dataRes: 60, overall: 78 } },
  ];

  const llmMetrics = [
    { cat: "Quality",     metrics: [["Task completion","91%"],["Answer relevance","88%"],["Correctness","86%"],["Groundedness","89%"],["Hallucination rate","4.2%"]] },
    { cat: "Safety",      metrics: [["Safety violations","0"],["Bias score","Low"],["Toxicity","<0.1%"],["Privacy leakage","None detected"]] },
    { cat: "Security",    metrics: [["Prompt injection resistance","Pass"],["Jailbreak resistance","Pass"],["Sensitive info disclosure","Pass"]] },
    { cat: "Performance", metrics: [["P50 latency","1.2s"],["P95 latency","3.8s"],["Tokens / request","1,240"],["Cost / request","£0.004"]] },
  ];

  const ragMetrics = [
    { label: "Recall @ 5",               val: "82%",  status: "amber" },
    { label: "Precision @ 5",            val: "76%",  status: "amber" },
    { label: "Relevant doc retrieval",   val: "88%",  status: "green" },
    { label: "Retrieval latency P95",    val: "340ms",status: "green" },
    { label: "Permissions enforcement",  val: "Pass", status: "green" },
    { label: "Groundedness",             val: "89%",  status: "green" },
    { label: "Faithfulness",             val: "87%",  status: "green" },
    { label: "Unsupported claims",       val: "6.1%", status: "amber" },
    { label: "Citation correctness",     val: "83%",  status: "amber" },
    { label: "E2E task completion",      val: "79%",  status: "amber" },
  ];

  const statusCol = { green: C.green, amber: C.amber, red: C.red };

  return (
    <div>
      <SectionTitle children="Model Evaluation Lab" sub="Evidence-based model assessment against your use case — not reputation." />

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? C.accent : C.navyMid,
              border: `1px solid ${tab === t.id ? C.accent : C.border}`,
              color: C.text, borderRadius: 6, padding: "7px 16px", fontSize: 13, cursor: "pointer",
            }}>{t.label}</button>
        ))}
      </div>

      {tab === "llm" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {llmMetrics.map(cat => (
            <Card key={cat.cat}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.cat}</div>
              {cat.metrics.map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.textDim }}>{k}</span>
                  <span style={{ color: C.text, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: "6px 10px", background: C.navyMid, borderRadius: 6, fontSize: 11, color: C.textDim }}>
                Model: Claude 3.5 Sonnet · Dataset v1.3 · {new Date().toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "rag" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Retrieval Metrics</div>
            {ragMetrics.slice(0,5).map(m => (
              <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.textDim }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: statusCol[m.status] }}>{m.val}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Generation Metrics</div>
            {ragMetrics.slice(5).map(m => (
              <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.textDim }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: statusCol[m.status] }}>{m.val}</span>
              </div>
            ))}
          </Card>
          <Card style={{ gridColumn: "1 / -1", borderColor: C.amber + "60" }}>
            <div style={{ fontSize: 12, color: C.amber, fontWeight: 700, marginBottom: 6 }}>⚠ Evidence Required</div>
            <div style={{ fontSize: 13, color: C.textDim }}>
              Unsupported claims at 6.1% exceeds the 5% threshold. Citation accuracy requires improvement before Gate 3 approval.
              Re-run retrieval evaluation with expanded knowledge base and improved chunking strategy.
            </div>
          </Card>
        </div>
      )}

      {tab === "leaderboard" && (
        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", color: C.textDim, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Metric</th>
                {models.map(m => (
                  <th key={m.name} style={{ textAlign: "center", padding: "8px 12px", color: C.text, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>
                    {m.name}<br/><span style={{ fontSize: 10, color: C.textDim, fontWeight: 400 }}>{m.provider}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Business task quality", "quality"],
                ["Safety", "safety"],
                ["Security", "security"],
                ["Latency", "latency"],
                ["Cost", "cost"],
                ["Data residency", "dataRes"],
              ].map(([label, key]) => {
                const best = Math.max(...models.map(m => m.scores[key]));
                return (
                  <tr key={key}>
                    <td style={{ padding: "8px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>{label}</td>
                    {models.map(m => (
                      <td key={m.name} style={{ textAlign: "center", padding: "8px 12px", borderBottom: `1px solid ${C.border}`,
                        color: m.scores[key] === best ? C.green : C.text, fontWeight: m.scores[key] === best ? 700 : 400 }}>
                        {m.scores[key]}
                        {m.scores[key] === best && <span style={{ fontSize: 10, color: C.green }}> ★</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr>
                <td style={{ padding: "8px 12px", color: C.text, fontWeight: 700 }}>Overall Score</td>
                {models.map(m => (
                  <td key={m.name} style={{ textAlign: "center", padding: "8px 12px",
                    color: m.scores.overall === Math.max(...models.map(x => x.scores.overall)) ? C.teal : C.text,
                    fontWeight: 700, fontSize: 16 }}>
                    {m.scores.overall}
                    {m.scores.overall === Math.max(...models.map(x => x.scores.overall)) && (
                      <div style={{ fontSize: 9, color: C.teal }}>RECOMMENDED</div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: 12, padding: "10px 14px", background: C.navyMid, borderRadius: 6, fontSize: 12, color: C.textDim }}>
            Recommendation is use-case specific. Claude 3.5 Sonnet scores highest on safety, security and data residency for this UK-regulated document processing use case.
            No model is universally "best." These scores apply only to this evaluation dataset v1.3.
          </div>
        </Card>
      )}

      {tab === "baseline" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { title: "Baseline — Current Manual Process", items: [["Processing time","4.2 days avg"],["Error rate","6.8%"],["Cost / document","£18.40"],["Throughput","160 docs/day"],["FTE required","20"],["Customer NPS","42"]] },
            { title: "Candidate — RAG + Document Intelligence", items: [["Processing time","<4 hours (target)"],["Error rate","<1% (TBD)"],["Cost / document","<£4 (estimated)"],["Throughput","500+ docs/day"],["FTE required","8 (augmented)"],["Customer NPS","TBD"]] },
          ].map(col => (
            <Card key={col.title} style={{ borderColor: col.title.includes("Candidate") ? C.accent + "60" : C.border }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: col.title.includes("Candidate") ? C.accent : C.textDim, marginBottom: 12 }}>
                {col.title.includes("Candidate") ? "◈ " : "◎ "}{col.title}
              </div>
              {col.items.map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ color: C.textDim }}>{k}</span>
                  <span style={{ color: v.includes("TBD") ? C.amber : C.text, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── BUILD vs BUY ───────────────────────────────────────────────────────────
function BuildBuyScreen() {
  const factors = [
    { label: "Strategic differentiation", build: 4, buy: 2, hybrid: 3 },
    { label: "Time to value",             build: 2, buy: 5, hybrid: 4 },
    { label: "Data sensitivity",          build: 5, buy: 2, hybrid: 3 },
    { label: "Customisation",             build: 5, buy: 2, hybrid: 4 },
    { label: "Internal skills",           build: 3, buy: 5, hybrid: 4 },
    { label: "Total cost of ownership",   build: 3, buy: 3, hybrid: 4 },
    { label: "Vendor dependency",         build: 5, buy: 1, hybrid: 3 },
    { label: "Data residency",            build: 5, buy: 2, hybrid: 4 },
    { label: "IP ownership",             build: 5, buy: 1, hybrid: 3 },
    { label: "Regulatory compliance",     build: 4, buy: 3, hybrid: 4 },
  ];

  const tot = (key) => factors.reduce((s, f) => s + f[key], 0);
  const max = factors.length * 5;
  const scores = {
    build: Math.round(tot("build") / max * 100),
    buy:   Math.round(tot("buy")   / max * 100),
    hybrid:Math.round(tot("hybrid")/ max * 100),
  };

  const colColor = (v) => v >= 4 ? C.green : v >= 3 ? C.teal : v >= 2 ? C.amber : C.red;

  return (
    <div>
      <SectionTitle children="Build vs Buy vs Hybrid" sub="Weighted scoring with mandatory risk gates. Score alone does not determine the outcome." />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>Factor</th>
                {["Build","Buy","Hybrid"].map(h => (
                  <th key={h} style={{ textAlign: "center", padding: "8px 12px", color: C.text, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {factors.map(f => (
                <tr key={f.label}>
                  <td style={{ padding: "6px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>{f.label}</td>
                  {["build","buy","hybrid"].map(k => (
                    <td key={k} style={{ textAlign: "center", padding: "6px 12px", borderBottom: `1px solid ${C.border}`, color: colColor(f[k]), fontWeight: 600 }}>
                      {"●".repeat(f[k])}{"○".repeat(5 - f[k])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ padding: "8px 12px", fontWeight: 700, color: C.text }}>Weighted Score</td>
                {["build","buy","hybrid"].map(k => (
                  <td key={k} style={{ textAlign: "center", padding: "8px 12px", fontWeight: 700, fontSize: 16,
                    color: scores[k] === Math.max(...Object.values(scores)) ? C.teal : C.text }}>
                    {scores[k]}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ borderColor: C.teal + "60" }}>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 8 }}>RECOMMENDATION</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8 }}>HYBRID</div>
            <div style={{ fontSize: 12, color: C.textDim }}>
              Use managed LLM API (Buy) for foundation model capability.
              Build proprietary document ingestion pipeline and RAG layer (Build) to retain data control and IP.
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Score Summary</div>
            {[["Build", scores.build, C.textDim],["Buy", scores.buy, C.textDim],["Hybrid", scores.hybrid, C.teal]].map(([l, s, c]) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: c, fontWeight: l === "Hybrid" ? 700 : 400 }}>{l}</span>
                  <span style={{ color: c }}>{s}%</span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 3 }}>
                  <div style={{ width: `${s}%`, height: "100%", background: c === C.teal ? C.teal : C.steel, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ borderColor: C.amber + "60" }}>
            <div style={{ fontSize: 11, color: C.amber, fontWeight: 700, marginBottom: 8 }}>MANDATORY RISK GATES</div>
            <div style={{ fontSize: 12, color: C.textDim }}>
              Data residency requirements override scoring. Any vendor must confirm UK data processing. Training opt-out is mandatory.
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 11, color: C.textDim, fontWeight: 700, marginBottom: 8 }}>OUTCOME OPTIONS</div>
            {[["BUILD","Not Recommended"],["BUY","Not Recommended"],["HYBRID","Selected"],["RUN POC","Pending"],["DEFER",""],["REJECT",""]].map(([o, note]) => (
              <div key={o} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: o === "HYBRID" ? C.teal : C.textDim, fontWeight: o === "HYBRID" ? 700 : 400 }}>{o}</span>
                <span style={{ fontSize: 11, color: C.textDim }}>{note}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── GOVERNANCE ─────────────────────────────────────────────────────────────
function GovernanceScreen() {
  const frameworks = [
    { name: "NIST AI RMF 1.0",           status: "In Progress", owner: "AI Eng", evidence: "Partial mapping" },
    { name: "NIST AI 600-1 (GenAI)",      status: "Not Started", owner: "AI Eng", evidence: "Evidence Required" },
    { name: "ISO/IEC 42001:2023",         status: "Not Started", owner: "CISO", evidence: "Evidence Required" },
    { name: "ISO/IEC 23894",              status: "Not Started", owner: "Risk", evidence: "Evidence Required" },
    { name: "OWASP LLM Top 10 (2026)",    status: "In Progress", owner: "Security", evidence: "Partial" },
    { name: "OWASP Agentic AI Threats",   status: "Not Started", owner: "Security", evidence: "N/A – not agentic" },
    { name: "UK GDPR / ICO AI Toolkit",   status: "In Progress", owner: "DPO", evidence: "DPIA drafted" },
    { name: "EU AI Act (Aug 2026)",        status: "Not Started", owner: "Legal", evidence: "Classification TBD" },
  ];

  const risks = [
    { id: "R-001", title: "Hallucination in document extraction", prob: "Medium", impact: "High",   level: "High",   control: "Human review gate on low-confidence outputs" },
    { id: "R-002", title: "Data residency breach",               prob: "Low",    impact: "Critical",level: "High",   control: "Vendor contractual commitment + data processing agreement" },
    { id: "R-003", title: "Prompt injection via document content",prob: "Medium", impact: "High",   level: "High",   control: "Input sanitisation + output validation guardrails" },
    { id: "R-004", title: "Model output bias in credit decisions",prob: "Low",    impact: "High",   level: "Moderate",control: "Fairness evaluation dataset + periodic audit" },
    { id: "R-005", title: "LLM provider outage",                 prob: "Medium", impact: "Medium", level: "Moderate",control: "Fallback to rule-based extraction + SLA monitoring" },
  ];

  const levelCol = { High: C.red, Critical: "#FF4040", Moderate: C.amber, Low: C.textDim };

  return (
    <div>
      <SectionTitle children="Responsible AI & Governance" sub="Framework mapping, risk register, and governance gate status." />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Framework Mapping</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["Framework","Status","Owner","Evidence"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frameworks.map(f => (
                <tr key={f.name}>
                  <td style={{ padding: "7px 12px", color: C.text, borderBottom: `1px solid ${C.border}` }}>{f.name}</td>
                  <td style={{ padding: "7px 12px", borderBottom: `1px solid ${C.border}` }}><StatusBadge status={f.status} /></td>
                  <td style={{ padding: "7px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>{f.owner}</td>
                  <td style={{ padding: "7px 12px", color: f.evidence.includes("Required") ? C.amber : C.textDim, borderBottom: `1px solid ${C.border}`, fontSize: 11 }}>{f.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Risk Register</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["ID","Risk","Probability","Impact","Level","Control"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {risks.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: "7px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>{r.id}</td>
                  <td style={{ padding: "7px 12px", color: C.text, borderBottom: `1px solid ${C.border}` }}>{r.title}</td>
                  <td style={{ padding: "7px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}` }}>{r.prob}</td>
                  <td style={{ padding: "7px 12px", color: levelCol[r.impact] || C.textDim, borderBottom: `1px solid ${C.border}` }}>{r.impact}</td>
                  <td style={{ padding: "7px 12px", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: levelCol[r.level], fontWeight: 700 }}>{r.level}</span>
                  </td>
                  <td style={{ padding: "7px 12px", color: C.textDim, borderBottom: `1px solid ${C.border}`, maxWidth: 240 }}>{r.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>AI Risk Classification</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[
              { label: "Internal Risk Level", val: "Moderate", color: C.amber },
              { label: "EU AI Act Classification", val: "TBD — Evidence Required", color: C.textDim },
              { label: "ICO AI Risk Assessment", val: "In Progress", color: C.accentL },
            ].map(r => (
              <div key={r.label} style={{ background: C.navyMid, borderRadius: 6, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 6 }}>{r.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── MONITORING ─────────────────────────────────────────────────────────────
function MonitoringScreen() {
  const metrics = [
    { label: "Requests / day",     val: "3,241",  trend: "+2.4%",  good: true },
    { label: "Task success rate",  val: "91.2%",  trend: "-0.3%",  good: false },
    { label: "P95 Latency",        val: "3.8s",   trend: "+0.2s",  good: false },
    { label: "Hallucination flags", val: "4.2%",  trend: "-0.8%",  good: true },
    { label: "Safety violations",  val: "0",      trend: "0",      good: true },
    { label: "Cost / request",     val: "£0.004", trend: "+£0.001",good: false },
    { label: "Human escalations",  val: "284",    trend: "+12",    good: false },
    { label: "Provider uptime",    val: "99.94%", trend: "—",      good: true },
  ];

  return (
    <div>
      <SectionTitle children="Production Monitoring" sub="Technical metrics connected to business outcomes. Continuous evaluation in production." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {metrics.map(m => (
          <Card key={m.label}>
            <div style={{ fontSize: 11, color: C.textDim, marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{m.val}</div>
            <div style={{ fontSize: 11, color: m.good ? C.green : C.amber, marginTop: 4 }}>{m.trend}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Re-Evaluation Triggers</div>
          {[
            { trigger: "Model version change",      status: "Watch", color: C.textDim },
            { trigger: "Prompt / instructions change",status: "Watch", color: C.textDim },
            { trigger: "Knowledge base update",     status: "Active",  color: C.amber },
            { trigger: "Business process change",   status: "Watch", color: C.textDim },
            { trigger: "Performance drop > 2%",     status: "Active",  color: C.amber },
            { trigger: "Security incident",         status: "Watch", color: C.textDim },
            { trigger: "New regulation applies",    status: "Active",  color: C.amber },
          ].map(t => (
            <div key={t.trigger} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: C.textDim }}>{t.trigger}</span>
              <span style={{ color: t.color, fontWeight: 600 }}>{t.status}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Business KPI Alignment</div>
          {[
            { kpi: "Processing time", baseline: "4.2 days", current: "6.2 hrs", target: "<4 hrs", ok: true },
            { kpi: "Error rate",      baseline: "6.8%",     current: "1.4%",    target: "<1%",    ok: false },
            { kpi: "Cost / doc",      baseline: "£18.40",   current: "£6.20",   target: "<£4",    ok: false },
            { kpi: "FTE required",    baseline: "20",       current: "14",      target: "8",      ok: false },
          ].map(k => (
            <div key={k.kpi} style={{ padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: C.text }}>{k.kpi}</span>
                <span style={{ fontSize: 11, color: k.ok ? C.green : C.amber }}>{k.ok ? "On track" : "In progress"}</span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
                <span style={{ color: C.textDim }}>Was: {k.baseline}</span>
                <span style={{ color: C.accentL }}>Now: {k.current}</span>
                <span style={{ color: C.green }}>Target: {k.target}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── EXECUTIVE REPORT ───────────────────────────────────────────────────────
function ReportsScreen() {
  return (
    <div>
      <SectionTitle children="Executive Decision" sub="AI System Decision — Intelligent Document Processing · Citation · September 2026" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["PROTECT","IMPROVE","EMPOWER"].map(p => <PrinciplePill key={p} name={p} size="md" />)}
            </div>
            {[
              ["Business Problem", "Manual invoice and onboarding document processing consuming £2.1M/year, with 6.8% error rate and 4.2-day cycle times."],
              ["Proposed Solution", "RAG-based Document Intelligence platform with multimodal ingestion, structured data extraction, and human-in-the-loop validation."],
              ["Why AI", "Task involves understanding of unstructured documents in 400+ varied formats, classification, semantic extraction, and consistency checking — beyond the capability of rule-based systems."],
              ["Recommended Architecture", "Hybrid: Managed LLM API (Claude 3.5 Sonnet) + proprietary RAG pipeline built internally. Data remains UK-hosted. No customer data used for model training."],
              ["Expected Business Outcome", "Processing time <4 hours, error rate <1%, cost/document <£4, FTE reduction from 20 to 8 through augmentation."],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: C.textDim, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</div>
                <div style={{ fontSize: 13, color: C.text }}>{v}</div>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14 }}>Key Dependencies & Risks</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>DEPENDENCIES</div>
                {["UK data residency confirmed with vendor","DPIA completion","ERP integration scoped","Evaluation dataset v2 completed","Human review workflow designed"].map((d,i) => (
                  <div key={i} style={{ fontSize: 12, color: C.textDim, padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>→ {d}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>TOP RISKS</div>
                {["Hallucination in extraction (High)","Unsupported claims > threshold (High)","Prompt injection via documents (High)","EU AI Act classification pending (Medium)","Provider latency at peak (Medium)"].map((r,i) => (
                  <div key={i} style={{ fontSize: 12, color: C.textDim, padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>⚠ {r}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ textAlign: "center", borderColor: C.amber + "80" }}>
            <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8 }}>RECOMMENDATION</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.amber, letterSpacing: "-0.02em" }}>GO WITH</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.amber }}>CONDITIONS</div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 10 }}>
              3 evidence items must be resolved before Gate 3 approval.
            </div>
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Status Summary</div>
            {[
              ["Evaluation Result",  "Partial — Evidence Required", C.amber],
              ["Security Status",    "Review Required",              C.amber],
              ["Privacy Status",     "DPIA In Progress",             C.accentL],
              ["Governance Status",  "Gate 2 In Progress",           C.accentL],
              ["Production Readiness","Not Yet Assessed",             C.textDim],
            ].map(([k, v, c]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 10, color: C.textDim }}>{k}</span>
                <span style={{ fontSize: 12, color: c, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>Cost & Value</div>
            {[
              ["Estimated annual cost", "£340,000"],
              ["Baseline annual cost",  "£2,100,000"],
              ["Net saving (Year 1)",   "£1,760,000"],
              ["Payback period",        "2.4 months (estimated)"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textDim }}>{k}</span>
                <span style={{ color: C.text, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── PLACEHOLDER ────────────────────────────────────────────────────────────
function PlaceholderScreen({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 32, opacity: 0.2 }}>⬡</div>
      <div style={{ fontSize: 16, color: C.textDim }}>{label}</div>
      <div style={{ fontSize: 13, color: C.border }}>Select a stage to begin</div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [phase, setPhase]   = useState("design");

  const screens = {
    home:         <HomeScreen />,
    discover:     <DiscoverScreen />,
    "ai-fit":     <AIFitScreen />,
    requirements: <PlaceholderScreen label="Requirements Collection" />,
    data:         <PlaceholderScreen label="Data Readiness Assessment" />,
    design:       <PlaceholderScreen label="System Design Workspace" />,
    evaluation:   <EvaluationScreen />,
    buildbuy:     <BuildBuyScreen />,
    governance:   <GovernanceScreen />,
    mlops:        <PlaceholderScreen label="MLOps / LLMOps / AgentOps" />,
    deploy:       <PlaceholderScreen label="Deployment & Production Readiness" />,
    monitor:      <MonitoringScreen />,
    reports:      <ReportsScreen />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.navy, color: C.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* left nav */}
      <div style={{ width: 200, background: C.navyMid, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.12em", marginBottom: 2 }}>CITATION</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>AI System<br/>Design &amp; Adoption</div>
        </div>

        {/* nav */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "8px 10px", borderRadius: 6, border: "none",
                background: active === n.id ? C.slate : "transparent",
                color: active === n.id ? C.text : C.textDim,
                fontSize: 13, cursor: "pointer", textAlign: "left",
                fontWeight: active === n.id ? 600 : 400,
              }}>
              <span style={{ fontSize: 14, opacity: 0.7 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* bottom */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, color: C.textDim }}>v1.3 · Sep 2026</div>
        </div>
      </div>

      {/* main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* top bar */}
        <div style={{ padding: "12px 24px", background: C.navyMid, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <PhaseBar phases={PHASES} current={phase} onSelect={setPhase} />
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, flexShrink: 0 }}>
            {[["Stage","Design"],["Risk","Moderate"],["Readiness","62%"]].map(([k,v]) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: C.textDim }}>{k}</div>
                <div style={{ color: k === "Risk" ? C.amber : k === "Readiness" ? C.accent : C.text, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {screens[active] || <PlaceholderScreen label={active} />}
        </div>
      </div>
    </div>
  );
}
