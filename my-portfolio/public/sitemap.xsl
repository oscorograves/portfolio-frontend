<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap — scalewithkanishk.in</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          <![CDATA[
          :root {
            --bg: #09090B;
            --card: #141416;
            --card-hover: #1C1C1F;
            --border: #27272A;
            --border-hover: rgba(245, 158, 11, 0.4);
            --accent: #F59E0B;
            --accent-dim: rgba(245, 158, 11, 0.1);
            --text: #FAFAFA;
            --text-secondary: #A1A1AA;
            --text-muted: #71717A;
            --font-sans: 'Space Grotesk', system-ui, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: var(--font-sans);
            background-color: var(--bg);
            color: var(--text);
            padding: 80px 24px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
          }

          /* Subtle grid pattern background */
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: 
              linear-gradient(rgba(39, 39, 42, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(39, 39, 42, 0.15) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: -2;
            pointer-events: none;
          }

          /* Subtle glowing ambient lighting */
          body::after {
            content: '';
            position: fixed;
            top: -20%;
            left: 50%;
            transform: translateX(-50%);
            width: 800px;
            height: 400px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, transparent 70%);
            z-index: -1;
            pointer-events: none;
            filter: blur(50px);
          }

          .grain-overlay {
            pointer-events: none;
            position: fixed;
            inset: 0;
            z-index: 90;
            opacity: 0.018;
            mix-blend-mode: overlay;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)'/%3E%3C/svg%3E");
          }

          .container {
            width: 100%;
            max-width: 1000px;
            z-index: 10;
          }

          header {
            margin-bottom: 48px;
            text-align: center;
          }

          .logo-area {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            background: rgba(39, 39, 42, 0.3);
            border: 1px solid var(--border);
            border-radius: 9999px;
            margin-bottom: 20px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: var(--text-secondary);
          }

          .logo-dot {
            width: 6px;
            height: 6px;
            background: var(--accent);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--accent);
          }

          h1 {
            font-size: 2.75rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            margin-bottom: 12px;
            color: var(--text);
            text-shadow: 0 0 40px rgba(245, 158, 11, 0.1);
          }

          p.subtitle {
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
          }

          /* Metrics Section */
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 40px;
          }

          .metric-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .metric-label {
            font-size: 0.65rem;
            color: var(--text-muted);
            letter-spacing: 0.1em;
            font-weight: 600;
          }

          .metric-val {
            font-size: 1.25rem;
            color: var(--text);
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .pulse-dot {
            width: 8px;
            height: 8px;
            background-color: #10B981;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #10B981;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }

          /* Control Panel */
          .control-panel {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 32px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .control-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          .search-wrapper {
            position: relative;
            flex-grow: 1;
            display: flex;
            align-items: center;
            background: rgba(9, 9, 11, 0.5);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 10px 14px;
            transition: border-color 0.2s;
          }

          .search-wrapper:focus-within {
            border-color: var(--border-hover);
          }

          .search-prompt {
            color: var(--accent);
            margin-right: 8px;
            font-weight: 600;
            user-select: none;
          }

          .search-input {
            background: transparent;
            border: none;
            color: var(--text);
            width: 100%;
            font-size: 0.9rem;
            outline: none;
            cursor: not-allowed;
          }

          .search-input::placeholder {
            color: var(--text-muted);
          }

          .view-tabs {
            display: flex;
            background: rgba(9, 9, 11, 0.5);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 4px;
            gap: 4px;
          }

          .tab-btn {
            color: var(--text-secondary);
            font-size: 0.75rem;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
            user-select: none;
            border: 1px solid transparent;
          }

          .tab-btn svg {
            opacity: 0.6;
          }

          .tab-btn:hover {
            color: var(--text);
            background: rgba(39, 39, 42, 0.3);
          }

          /* Filter tags list */
          .filter-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid rgba(39, 39, 42, 0.4);
          }

          .filter-title {
            font-size: 0.65rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-right: 4px;
          }

          .filter-label {
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-secondary);
            background: rgba(39, 39, 42, 0.2);
            border: 1px solid var(--border);
            padding: 5px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
          }

          .filter-label:hover {
            color: var(--text);
            border-color: rgba(255, 255, 255, 0.2);
          }

          /* Radio inputs for CSS-only logic */
          .view-radio-input, .filter-radio-input {
            display: none !important;
          }

          /* CSS-only view switching */
          #radio-grid:checked ~ #routes-grid {
            display: grid !important;
          }
          #radio-grid:checked ~ #routes-tree {
            display: none !important;
          }
          #radio-tree:checked ~ #routes-grid {
            display: none !important;
          }
          #radio-tree:checked ~ #routes-tree {
            display: block !important;
          }

          /* View Tab button active styling */
          #radio-grid:checked ~ .control-panel .grid-label {
            background: var(--accent);
            color: #09090B;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
          }
          #radio-grid:checked ~ .control-panel .grid-label svg {
            opacity: 1;
          }
          #radio-tree:checked ~ .control-panel .tree-label {
            background: var(--accent);
            color: #09090B;
            box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
          }
          #radio-tree:checked ~ .control-panel .tree-label svg {
            opacity: 1;
          }

          /* Filter active styling */
          #filter-all:checked ~ .control-panel .filter-label-all,
          #filter-experience:checked ~ .control-panel .filter-label-experience,
          #filter-case-studies:checked ~ .control-panel .filter-label-case-studies,
          #filter-story:checked ~ .control-panel .filter-label-story,
          #filter-metrics:checked ~ .control-panel .filter-label-metrics {
            background: rgba(245, 158, 11, 0.15) !important;
            color: var(--accent) !important;
            border-color: rgba(245, 158, 11, 0.4) !important;
            box-shadow: 0 0 8px rgba(245, 158, 11, 0.05);
          }

          /* CSS-only Route card filter logic */
          #filter-experience:checked ~ #routes-grid .route-card:not(.experience-route) {
            display: none !important;
          }
          #filter-case-studies:checked ~ #routes-grid .route-card:not(.case-studies-route) {
            display: none !important;
          }
          #filter-story:checked ~ #routes-grid .route-card:not(.story-route) {
            display: none !important;
          }
          #filter-metrics:checked ~ #routes-grid .route-card:not(.metrics-route) {
            display: none !important;
          }

          /* CSS-only Route tree filter logic */
          #filter-experience:checked ~ #routes-tree .tree-item:not(.experience-route) {
            display: none !important;
          }
          #filter-case-studies:checked ~ #routes-tree .tree-item:not(.case-studies-route) {
            display: none !important;
          }
          #filter-story:checked ~ #routes-tree .tree-item:not(.story-route) {
            display: none !important;
          }
          #filter-metrics:checked ~ #routes-tree .tree-item:not(.metrics-route) {
            display: none !important;
          }

          /* Grid View Layout */
          .routes-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 48px;
          }

          .route-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 28px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 220px;
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            position: relative;
            overflow: hidden;
            text-decoration: none;
          }

          .route-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent), transparent);
            transform: scaleX(0);
            transition: transform 0.4s;
          }

          .route-card:hover {
            background: var(--card-hover);
            border-color: var(--border-hover);
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.05);
          }

          .route-card:hover::before {
            transform: scaleX(1);
          }

          .card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 16px;
          }

          .route-icon-box {
            width: 42px;
            height: 42px;
            background: var(--accent-dim);
            color: var(--accent);
            border: 1px solid rgba(245, 158, 11, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .route-path {
            font-family: var(--font-mono);
            font-size: 0.95rem;
            color: var(--text-secondary);
            font-weight: 500;
            background: rgba(9, 9, 11, 0.3);
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid var(--border);
          }

          .card-middle {
            margin-bottom: 24px;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 6px;
          }

          .card-desc {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.5;
          }

          .card-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid rgba(39, 39, 42, 0.5);
          }

          /* Priority Visual Gauge */
          .priority-section {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-grow: 1;
            max-width: 140px;
          }

          .priority-label {
            font-size: 0.65rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
          }

          .priority-gauge-bar {
            height: 4px;
            background: rgba(39, 39, 42, 0.6);
            border-radius: 2px;
            flex-grow: 1;
            position: relative;
            overflow: hidden;
          }

          .priority-gauge-fill {
            height: 100%;
            background: var(--accent);
            border-radius: 2px;
          }

          .priority-gauge-fill.high {
            background: #10B981;
          }

          .meta-badges {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .sitemap-badge {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .badge-frequency {
            background: rgba(39, 39, 42, 0.4);
            color: var(--text-secondary);
            border: 1px solid var(--border);
          }

          /* Tree View Layout */
          .tree-view-wrapper {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 48px;
          }

          .tree-container {
            width: 100%;
          }

          .tree-root {
            font-family: var(--font-mono);
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--accent);
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
          }

          .tree-root-icon {
            color: var(--accent);
          }

          .tree-body {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .tree-item {
            display: flex;
            align-items: center;
            font-family: var(--font-mono);
            padding: 10px 12px;
            border-radius: 8px;
            transition: background 0.2s;
          }

          .tree-item:hover {
            background: rgba(39, 39, 42, 0.2);
          }

          .tree-branch {
            color: var(--border);
            margin-right: 12px;
            letter-spacing: -2px;
            font-size: 1.1rem;
            user-select: none;
          }

          .tree-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            gap: 12px;
            flex-grow: 1;
          }

          .tree-path {
            color: var(--text);
            font-weight: 500;
            font-size: 0.95rem;
          }

          .tree-label {
            color: var(--text-secondary);
            font-size: 0.85rem;
            opacity: 0.8;
          }

          .tree-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          .tree-meta-item {
            background: rgba(9, 9, 11, 0.4);
            border: 1px solid var(--border);
            padding: 2px 8px;
            border-radius: 4px;
          }

          /* Footer */
          footer {
            text-align: center;
            padding-top: 24px;
            border-top: 1px solid var(--border);
            width: 100%;
            margin-top: auto;
          }

          .footer-logo {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            margin-bottom: 8px;
          }

          .footer-back-link {
            font-size: 0.85rem;
            color: var(--accent);
            text-decoration: none;
            transition: color 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .footer-back-link:hover {
            color: var(--text);
            text-decoration: underline;
          }

          /* Responsive Tweaks */
          @media (max-width: 768px) {
            body {
              padding: 40px 16px;
            }

            h1 {
              font-size: 2rem;
            }

            .metrics-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .control-panel {
              flex-direction: column;
              align-items: stretch;
            }

            .routes-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }

            .tree-item {
              flex-wrap: wrap;
              gap: 8px;
            }

            .tree-meta {
              width: 100%;
              padding-left: 36px;
            }
          }
          ]]>
        </style>
      </head>
      <body>
        <div class="grain-overlay"></div>
        <div class="container">
          <!-- Hidden inputs for pure CSS logic -->
          <input type="radio" id="radio-grid" name="view-toggle" checked="checked" class="view-radio-input" />
          <input type="radio" id="radio-tree" name="view-toggle" class="view-radio-input" />

          <input type="radio" id="filter-all" name="category-filter" checked="checked" class="filter-radio-input" />
          <input type="radio" id="filter-experience" name="category-filter" class="filter-radio-input" />
          <input type="radio" id="filter-case-studies" name="category-filter" class="filter-radio-input" />
          <input type="radio" id="filter-story" name="category-filter" class="filter-radio-input" />
          <input type="radio" id="filter-metrics" name="category-filter" class="filter-radio-input" />

          <header>
            <div class="logo-area">
              <span class="logo-dot"></span>
              <span>INDEXED PATHS</span>
            </div>
            <h1>Sitemap directory</h1>
            <p class="subtitle">A visual route registry and structure manifest of scalewithkanishk.in</p>
          </header>

          <!-- Metrics grid -->
          <div class="metrics-grid">
            <div class="metric-card">
              <span class="metric-label">TOTAL PATHS</span>
              <span class="metric-val">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </span>
            </div>
            <div class="metric-card">
              <span class="metric-label">REGISTRY STATUS</span>
              <span class="metric-val">
                <span class="pulse-dot"></span>
                <span>Active</span>
              </span>
            </div>
            <div class="metric-card">
              <span class="metric-label">INDEX DATE</span>
              <span class="metric-val">
                <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/>
              </span>
            </div>
            <div class="metric-card">
              <span class="metric-label">CORE DOMAIN</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 600;">
                scalewithkanishk.in
              </span>
            </div>
          </div>

          <!-- Controls -->
          <div class="control-panel">
            <div class="control-top">
              <div class="search-wrapper">
                <span class="search-prompt">></span>
                <input type="text" id="search-input" placeholder="javascript-disabled browser (use filters below)" class="search-input" readonly="readonly" />
              </div>
              <div class="view-tabs">
                <label for="radio-grid" class="tab-btn grid-label mono">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  GRID
                </label>
                <label for="radio-tree" class="tab-btn tree-label mono">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
                  TREE
                </label>
              </div>
            </div>

            <!-- Filter tags -->
            <div class="filter-tags">
              <span class="filter-title">Filter by:</span>
              <label for="filter-all" class="filter-label filter-label-all">ALL PATHS</label>
              <label for="filter-experience" class="filter-label filter-label-experience">EXPERIENCE</label>
              <label for="filter-case-studies" class="filter-label filter-label-case-studies">CASE STUDIES</label>
              <label for="filter-story" class="filter-label filter-label-story">MY STORY</label>
              <label for="filter-metrics" class="filter-label filter-label-metrics">METRICS</label>
            </div>
          </div>

          <!-- Bento Grid View -->
          <div id="routes-grid" class="routes-grid">
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <xsl:variable name="path">
                <xsl:value-of select="substring-after(sitemap:loc, 'https://scalewithkanishk.in')"/>
              </xsl:variable>
              <xsl:variable name="display-path">
                <xsl:choose>
                  <xsl:when test="normalize-space($path) = '' or $path = '/'">/</xsl:when>
                  <xsl:otherwise><xsl:value-of select="$path"/></xsl:otherwise>
                </xsl:choose>
              </xsl:variable>
              <xsl:variable name="title">
                <xsl:choose>
                  <xsl:when test="normalize-space($path) = '' or $path = '/'">Home Portal</xsl:when>
                  <xsl:when test="contains($path, 'experience')">Professional Journey</xsl:when>
                  <xsl:when test="contains($path, 'case-studies')">Deep Dives &amp; Results</xsl:when>
                  <xsl:when test="contains($path, 'my-story')">Philosophy &amp; Origins</xsl:when>
                  <xsl:when test="contains($path, 'metrics')">Performance &amp; Insights</xsl:when>
                  <xsl:otherwise>Route Index</xsl:otherwise>
                </xsl:choose>
              </xsl:variable>
              <xsl:variable name="desc">
                <xsl:choose>
                  <xsl:when test="normalize-space($path) = '' or $path = '/'">Asymmetric 5-row bento grid showcasing real-time metrics, skills marquee, and featured work.</xsl:when>
                  <xsl:when test="contains($path, 'experience')">Interactive timeline detailing engineering and leadership roles across SaaS, D2C, and publishing.</xsl:when>
                  <xsl:when test="contains($path, 'case-studies')">Selected case studies outlining full-stack architecture, performance benchmarks, and business outcomes.</xsl:when>
                  <xsl:when test="contains($path, 'my-story')">A deep chronological timeline tracing personal philosophy, childhood origins, and technical evolution.</xsl:when>
                  <xsl:when test="contains($path, 'metrics')">Interactive telemetry data, conversion metrics, performance benchmarks, and analytical insights.</xsl:when>
                  <xsl:otherwise>Indexed site route.</xsl:otherwise>
                </xsl:choose>
              </xsl:variable>
              <xsl:variable name="route-class">
                <xsl:choose>
                  <xsl:when test="normalize-space($path) = '' or $path = '/'">route-card home-route</xsl:when>
                  <xsl:when test="contains($path, 'experience')">route-card experience-route</xsl:when>
                  <xsl:when test="contains($path, 'case-studies')">route-card case-studies-route</xsl:when>
                  <xsl:when test="contains($path, 'my-story')">route-card story-route</xsl:when>
                  <xsl:when test="contains($path, 'metrics')">route-card metrics-route</xsl:when>
                  <xsl:otherwise>route-card</xsl:otherwise>
                </xsl:choose>
              </xsl:variable>

              <a href="{sitemap:loc}" class="{$route-class}" data-path="{$display-path}">
                <div class="card-top">
                  <div class="route-icon-box">
                    <xsl:choose>
                      <xsl:when test="normalize-space($path) = '' or $path = '/'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      </xsl:when>
                      <xsl:when test="contains($path, 'experience')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                      </xsl:when>
                      <xsl:when test="contains($path, 'case-studies')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
                      </xsl:when>
                      <xsl:when test="contains($path, 'my-story')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                      </xsl:when>
                      <xsl:when test="contains($path, 'metrics')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                      </xsl:when>
                      <xsl:otherwise>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      </xsl:otherwise>
                    </xsl:choose>
                  </div>
                  <span class="route-path"><xsl:value-of select="$display-path"/></span>
                </div>
                <div class="card-middle">
                  <h3 class="card-title"><xsl:value-of select="$title"/></h3>
                  <p class="card-desc"><xsl:value-of select="$desc"/></p>
                </div>
                <div class="card-bottom">
                  <div class="priority-section">
                    <span class="priority-label">PRIORITY</span>
                    <div class="priority-gauge-bar">
                      <xsl:variable name="priority-width">
                        <xsl:choose>
                          <xsl:when test="sitemap:priority = '1' or sitemap:priority = '1.0'">100%</xsl:when>
                          <xsl:when test="sitemap:priority = '0.9'">90%</xsl:when>
                          <xsl:when test="sitemap:priority = '0.8'">80%</xsl:when>
                          <xsl:when test="sitemap:priority = '0.7'">70%</xsl:when>
                          <xsl:otherwise>50%</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
                      <xsl:variable name="priority-class">
                        <xsl:choose>
                          <xsl:when test="sitemap:priority = '1' or sitemap:priority = '1.0'">priority-gauge-fill high</xsl:when>
                          <xsl:otherwise>priority-gauge-fill</xsl:otherwise>
                        </xsl:choose>
                      </xsl:variable>
                      <div class="{$priority-class}" style="width: {$priority-width}"></div>
                    </div>
                    <span class="priority-label" style="font-weight:600;"><xsl:value-of select="sitemap:priority"/></span>
                  </div>
                  <div class="meta-badges">
                    <span class="sitemap-badge badge-frequency"><xsl:value-of select="sitemap:changefreq"/></span>
                  </div>
                </div>
              </a>
            </xsl:for-each>
          </div>

          <!-- Tree Explorer View -->
          <div id="routes-tree" class="tree-view-wrapper">
            <div class="tree-container">
              <div class="tree-root">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="tree-root-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                <span>~/scalewithkanishk.in</span>
              </div>
              <div class="tree-body">
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:variable name="path">
                    <xsl:value-of select="substring-after(sitemap:loc, 'https://scalewithkanishk.in')"/>
                  </xsl:variable>
                  <xsl:variable name="display-path">
                    <xsl:choose>
                      <xsl:when test="normalize-space($path) = '' or $path = '/'">/</xsl:when>
                      <xsl:otherwise><xsl:value-of select="$path"/></xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>
                  <xsl:variable name="title">
                    <xsl:choose>
                      <xsl:when test="normalize-space($path) = '' or $path = '/'">Home Portal</xsl:when>
                      <xsl:when test="contains($path, 'experience')">Professional Journey</xsl:when>
                      <xsl:when test="contains($path, 'case-studies')">Deep Dives &amp; Results</xsl:when>
                      <xsl:when test="contains($path, 'my-story')">Philosophy &amp; Origins</xsl:when>
                      <xsl:when test="contains($path, 'metrics')">Performance &amp; Insights</xsl:when>
                      <xsl:otherwise>Route Index</xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>
                  <xsl:variable name="tree-class">
                    <xsl:choose>
                      <xsl:when test="normalize-space($path) = '' or $path = '/'">tree-item home-route</xsl:when>
                      <xsl:when test="contains($path, 'experience')">tree-item experience-route</xsl:when>
                      <xsl:when test="contains($path, 'case-studies')">tree-item case-studies-route</xsl:when>
                      <xsl:when test="contains($path, 'my-story')">tree-item story-route</xsl:when>
                      <xsl:when test="contains($path, 'metrics')">tree-item metrics-route</xsl:when>
                      <xsl:otherwise>tree-item</xsl:otherwise>
                    </xsl:choose>
                  </xsl:variable>
                  
                  <div class="{$tree-class}" data-path="{$display-path}">
                    <span class="tree-branch">
                      <xsl:choose>
                        <xsl:when test="position() = last()">└──</xsl:when>
                        <xsl:otherwise>├──</xsl:otherwise>
                      </xsl:choose>
                    </span>
                    <a href="{sitemap:loc}" class="tree-link">
                      <span class="tree-path"><xsl:value-of select="$display-path"/></span>
                      <span class="tree-label">— <xsl:value-of select="$title"/></span>
                    </a>
                    <div class="tree-meta">
                      <span class="tree-meta-item">priority: <xsl:value-of select="sitemap:priority"/></span>
                      <span class="tree-meta-item">freq: <xsl:value-of select="sitemap:changefreq"/></span>
                      <span class="tree-meta-item">modified: <xsl:value-of select="sitemap:lastmod"/></span>
                    </div>
                  </div>
                </xsl:for-each>
              </div>
            </div>
          </div>

          <footer>
            <div class="footer-logo">SCALEWITHKANISHK.IN</div>
            <a href="https://scalewithkanishk.in" class="footer-back-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Portfolio
            </a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
