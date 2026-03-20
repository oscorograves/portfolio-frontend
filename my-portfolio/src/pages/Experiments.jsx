import { useState } from 'react';

const Experiments = ({ isDarkMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Use env variable or default to 'oscoro'
  const CORRECT_PASSWORD = import.meta.env.VITE_EXPERIMENTS_PASSWORD || 'oscoro';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake effect or simply clear
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-20 pb-20 min-h-screen transition-colors duration-300 flex flex-col items-center justify-center">
        <div className="w-full px-8 flex flex-col items-center justify-center relative">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4 text-amber-600 dark:text-yellow-400">
                <LockKey size={32} weight="duotone" />
              </div>
              <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2 text-center">
                Private Access
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                This section contains experimental projects and WIP prototypes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password"
                    className={`w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-950 border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-800 focus:border-primary-500 focus:ring-primary-500/20'
                      } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-4 transition-all duration-300 font-mono`}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 text-center font-medium"
                  >
                    Incorrect password
                  </motion.p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
        </div>
      </div>
    );
  }

  // Reusable style constants
  const sectionLabel = "text-xs font-medium tracking-widest text-gray-500 dark:text-gray-500 uppercase mt-10 mb-4";
  const card = "bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-3";
  const cardTitle = "text-sm font-semibold text-gray-900 dark:text-white";
  const cardSub = "text-sm text-gray-600 dark:text-gray-400 leading-relaxed";
  const tag = "inline-block text-xs px-2 py-0.5 rounded border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-500 mr-1 mt-1.5";
  const metricCard = "bg-gray-100 dark:bg-gray-800/60 rounded-xl p-4";
  const metricVal = "text-2xl font-semibold text-gray-900 dark:text-white leading-tight";
  const metricLabel = "text-xs text-gray-500 dark:text-gray-400 mt-1";
  const divider = "h-px bg-gray-200 dark:bg-gray-800 my-8";
  const pill = "inline-block text-xs font-medium px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 mb-4";

  return (
    <div className="pt-20 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 border border-primary-200 dark:border-primary-800/50 backdrop-blur-sm">
          <Flask size={16} weight="duotone" />
          <span className="text-sm font-medium tracking-wider uppercase">Laboratory</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-2 leading-tight">
          ChatSpark: 90-day performance marketing plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Kanishk Singh · Growth Marketer, User Acquisition
        </p>

        {/* ── Revenue Math ── */}
        <p className={sectionLabel}>Revenue math</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { val: '₹2', label: 'Trial Game Pass entry' },
            { val: '₹49', label: 'First recharge (40 CS Coins)' },
            { val: '₹6/min', label: 'Pay-per-minute voice call' },
            { val: '₹149', label: 'High-value recharge (core SKU)' },
            { val: '₹300–600', label: 'Blended 90-day LTV (high-intent Tier 3–4)' },
            { val: '₹60–90', label: 'Sustainable CAC for high-intent payers' },
          ].map((m, i) => (
            <div key={i} className={metricCard}>
              <div className={metricVal}>{m.val}</div>
              <div className={metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>
        <div className={`${card} mt-3`}>
          <p className={cardSub}>
            Power user math: 3–4 sessions/month × 5–10 min × ₹6/min = <strong className="text-gray-900 dark:text-white">₹90–240/month</strong>. The ₹149 pack is the LTV lever — optimize for users who hit ₹149+ lifetime spend within 30 days.
          </p>
        </div>

        <div className={divider} />

        {/* ── Campaign Structure ── */}
        <p className={sectionLabel}>Campaign structure (your 3-layer framework)</p>

        {/* Layer 1 */}
        <div className={card}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0">
              <Flask size={16} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className={cardTitle}>Layer 1 — Signal (Days 1–21)</div>
          </div>
          <p className={cardSub}>Goal: find what converts. Not volume — data.</p>
          <ul className="mt-2 pl-4 list-disc space-y-1">
            <li className={cardSub}>3 ad sets testing ONE variable each: (a) Males 18–26, Jio users in UP/Bihar/MP + gaming interest, (b) Males 18–28, regional entertainment app users, (c) Broad 18–30 Tier 3–4 males, no interest stacking</li>
            <li className={cardSub}>3–4 creatives per ad set. Two hook angles: "game challenge" vs "talk to someone new" — both Hindi-first</li>
            <li className={cardSub}>Budget split evenly. Conversion objective: Game Pass purchase (not just install)</li>
            <li className={cardSub}>No overlapping audiences across ad sets</li>
          </ul>
          <div className="mt-2">
            <span className={tag}>CTR target &gt;1.5%</span>
            <span className={tag}>CPI ≤ ₹20</span>
            <span className={tag}>Game Pass CVR ≥ 35%</span>
            <span className={tag}>Play Store CVR ≥ 15%</span>
          </div>
        </div>

        {/* Layer 2 */}
        <div className={card}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-md bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-sm shrink-0">
              <CheckCircle size={16} weight="duotone" className="text-green-600 dark:text-green-400" />
            </div>
            <div className={cardTitle}>Layer 2 — Validation (Days 15–35)</div>
          </div>
          <p className={cardSub}>Switch to CBO. Keep only winning audiences + creatives.</p>
          <ul className="mt-2 pl-4 list-disc space-y-1">
            <li className={cardSub}>CBO pushes spend to the ad set generating the cheapest Game Pass purchases — let it work</li>
            <li className={cardSub}>Set Cost Per Result Goal anchored to target CPA (₹60–90 for high-intent payers)</li>
            <li className={cardSub}>Scale budget 20–30% every 48 hours — never more than one variable at a time</li>
            <li className={cardSub}>Win criteria: minimum 2–3x target CPA spend, stable CVR, no volatility spikes, early downstream signal healthy (check ₹49 recharge rate within 7 days of install)</li>
          </ul>
          <div className="mt-2">
            <span className={tag}>CBO active</span>
            <span className={tag}>CPA anchor set</span>
            <span className={tag}>+20–30% budget every 48h</span>
          </div>
        </div>

        {/* Layer 3 */}
        <div className={card}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-md bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-sm shrink-0">
              <TrendUp size={16} weight="duotone" className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className={cardTitle}>Layer 3 — Scale + Protection (Days 30–90)</div>
          </div>
          <p className={cardSub}>Core scaling campaign + separate retargeting campaign.</p>
          <ul className="mt-2 pl-4 list-disc space-y-1">
            <li className={cardSub}>Core campaign: best-performing audiences from Layer 2 at full budget</li>
            <li className={cardSub}>Expand to 1%, 2%, 5% lookalikes built from Game Pass buyers (expect 30–40% lower CPI)</li>
            <li className={cardSub}>Creative refresh every 10–14 days — introduce new Hindi angle or Bhojpuri variant</li>
            <li className={cardSub}>Exclude converters from cold traffic — keeps learning clean, prevents decay</li>
            <li className={cardSub}>Duplicate best ad sets into new campaigns before scaling budget on originals</li>
          </ul>
          <div className="mt-2">
            <span className={tag}>Converter exclusion active</span>
            <span className={tag}>Lookalike 1–5%</span>
            <span className={tag}>Creative refresh every 2 weeks</span>
          </div>
        </div>

        <div className={divider} />

        {/* ── Creative Testing Matrix ── */}
        <p className={sectionLabel}>Creative testing matrix</p>
        <div className={card}>
          <p className={`${cardSub} mb-3`}>3 hooks × 2 formats × 1 core offer = 6 creatives per flight</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'HOOK A — CHALLENGE', text: '"Kya tu jeet sakta hai?"' },
              { label: 'HOOK B — CONNECTION', text: '"Anjaan se baat karo, live"' },
              { label: 'HOOK C — PRICE', text: '"₹2 se shuru, ₹6/min live baat"' },
            ].map((h, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-3">
                <div className="text-[11px] font-medium text-gray-500 dark:text-gray-500 mb-1">{h.label}</div>
                <div className="text-sm text-gray-900 dark:text-white">{h.text}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'FORMAT 1', text: 'Short video 15–30s (Reel/Short)' },
              { label: 'FORMAT 2', text: 'Static + bold CTA card' },
            ].map((f, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800/60 rounded-lg p-3">
                <div className="text-[11px] font-medium text-gray-500 dark:text-gray-500 mb-1">{f.label}</div>
                <div className="text-sm text-gray-900 dark:text-white">{f.text}</div>
              </div>
            ))}
          </div>
          <p className={`${cardSub} mt-3`}>
            Measure: Thumbstop rate → CTR → CVR → CPA → ₹49 recharge rate within 7 days. Winner = stable CPA + positive downstream signal. Low CPA + zero recharges = not a winner.
          </p>
        </div>

        <div className={divider} />

        {/* ── Warm Traffic + Retargeting ── */}
        <p className={sectionLabel}>Warm traffic + retargeting</p>
        <div className={card}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0">
              <Repeat size={16} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className={cardTitle}>Warm traffic (Days 10–30)</div>
          </div>
          <ul className="mt-1 pl-4 list-disc space-y-1">
            <li className={cardSub}>Audiences: 50%+ video viewers, Play Store listing visitors, Instagram engagers</li>
            <li className={cardSub}>Creative: objection handling ("No time? 5 min game, connect fast") + offer reinforcement</li>
            <li className={cardSub}>Retargeting: "₹2 se shuru karo" for installs who never bought Game Pass</li>
            <li className={cardSub}>Target: 20–30% lower CPI vs cold. If warm traffic improves efficiency by 25%+, it's structured correctly</li>
          </ul>
        </div>
        <div className={card}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-7 h-7 rounded-md bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-sm shrink-0">
              <Target size={16} weight="duotone" className="text-red-600 dark:text-red-400" />
            </div>
            <div className={cardTitle}>Retargeting segments</div>
          </div>
          <ul className="mt-1 pl-4 list-disc space-y-1">
            <li className={cardSub}>Visited Game Pass purchase screen but didn't buy → scarcity creative + ₹2 trial hook</li>
            <li className={cardSub}>Bought ₹49 pack, not ₹149 → "₹149 recharge par aur sasta call rate" — drive the core SKU</li>
            <li className={cardSub}>Installed, never played first game → game challenge FOMO creative</li>
          </ul>
          <div className="mt-2">
            <span className={tag}>Target: 40–60% lower CPA vs cold</span>
            <span className={tag}>Highest ROAS in funnel</span>
          </div>
        </div>

        <div className={divider} />

        {/* ── Budget ── */}
        <p className={sectionLabel}>Channel mix + budget (₹10L/month)</p>
        <div className={card}>
          {[
            { name: 'Meta Ads', pct: 35, amt: '₹3.5L (35%)' },
            { name: 'Google UAC', pct: 20, amt: '₹2L (20%)' },
            { name: 'Influencer / UGC', pct: 20, amt: '₹2L (20%)' },
            { name: 'ShareChat / Moj', pct: 10, amt: '₹1L (10%)' },
            { name: 'Affiliate seeding', pct: 10, amt: '₹1L (10%)' },
            { name: 'Creative production', pct: 5, amt: '₹0.5L (5%)' },
          ].map((row, i, arr) => (
            <div key={i} className={`flex items-center gap-3 py-2 ${i < arr.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}>
              <span className="text-sm text-gray-900 dark:text-white flex-1 min-w-[120px]">{row.name}</span>
              <div className="flex-[2] h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary-500" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[100px] text-right">{row.amt}</span>
            </div>
          ))}
        </div>
        <div className={card}>
          <p className={cardSub}>
            <strong className="text-gray-900 dark:text-white">Affiliate unlock:</strong> Register on vCommission + DGM India. ₹20–30 CPI payout structure. No single channel should exceed 50% of installs — diversification is a health metric.
          </p>
        </div>

        <div className={divider} />

        {/* ── 90-day growth targets ── */}
        <p className={sectionLabel}>90-day growth targets</p>
        <div className={`${card} overflow-x-auto`}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {['KPI', 'Month 1', 'Month 2', 'Month 3'].map((h) => (
                  <th key={h} className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide text-left py-2 px-3 border-b border-gray-200 dark:border-gray-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['New installs', '50,000', '1,20,000', '2,00,000'],
                ['CPI target', '₹20', '₹17', '₹15'],
                ['Game Pass CVR', '35%', '40%', '48%'],
                ['Activation rate (first call)', '40%', '45%+', '50%+'],
                ['% users reaching ₹149+ spend in 30d', '—', '10%', '18%'],
                ['LTV:CAC ratio', '—', '2:1', '3:1+'],
                ['MAU growth rate', 'baseline', '2x', '3x'],
              ].map((row, i, arr) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={`py-2 px-3 ${i < arr.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''} ${j === 0 ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 text-center'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={divider} />

        {/* ── 5 key metrics ── */}
        <p className={sectionLabel}>The 5 metrics that tell the whole story</p>
        <div className={card}>
          <ul className="pl-4 list-disc space-y-2">
            <li className={cardSub}><strong className="text-gray-900 dark:text-white">MAU growth rate</strong> — the headline the founder cares about. Target 3x in 90 days</li>
            <li className={cardSub}><strong className="text-gray-900 dark:text-white">CPI</strong> — efficiency of paid spend. Target ₹15–20</li>
            <li className={cardSub}><strong className="text-gray-900 dark:text-white">User activation rate</strong> — % who complete their first audio call. The UA/product intersection. Target 45%+</li>
            <li className={cardSub}><strong className="text-gray-900 dark:text-white">% reaching ₹149+ lifetime spend within 30 days</strong> — your LTV lever and the new north star KPI</li>
            <li className={cardSub}><strong className="text-gray-900 dark:text-white">LTV:CAC ratio</strong> — sustainability at scale. Target &gt;3:1 by Month 3</li>
          </ul>
        </div>

        <div className={divider} />

        {/* ── What to avoid ── */}
        <p className={sectionLabel}>What to avoid</p>
        <div className={card}>
          <ul className="pl-4 list-disc space-y-2">
            <li className={cardSub}>Any creative implying romantic/sexual interaction — Meta will reject it and tank your account health</li>
            <li className={cardSub}>Framing it as a "dating app" — position as casual gaming + voice social</li>
            <li className={cardSub}>Scaling more than one variable at once — kills learning</li>
            <li className={cardSub}>Deciding winners on CTR alone — low CPA + zero recharges downstream is not a winner</li>
            <li className={cardSub}>Any single channel exceeding 50% of installs — concentration risk</li>
          </ul>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Experiments;
