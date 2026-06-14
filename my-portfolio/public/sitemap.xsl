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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          <![CDATA[
          :root {
            --bg: #09090B;
            --card: #141416;
            --card-hover: #1C1C1F;
            --border: #27272A;
            --accent: #F59E0B;
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
            padding: 120px 24px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            position: relative;
          }

          /* Subtle grid pattern background */
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: 
              linear-gradient(rgba(39, 39, 42, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(39, 39, 42, 0.12) 1px, transparent 1px);
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
            width: 700px;
            height: 350px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%);
            z-index: -1;
            pointer-events: none;
            filter: blur(40px);
          }

          .container {
            width: 100%;
            max-width: 600px;
            z-index: 10;
          }

          header {
            margin-bottom: 36px;
            text-align: left;
          }

          .section-label {
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-muted);
            letter-spacing: 0.2em;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
          }

          h1 {
            font-size: 2.25rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 4px;
            color: var(--text);
          }

          p.subtitle {
            color: var(--text-secondary);
            font-family: var(--font-mono);
            font-size: 0.85rem;
          }

          .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 32px;
            transition: border-color 0.3s, background 0.3s;
          }

          .card:hover {
            background: var(--card-hover);
            border-color: rgba(245, 158, 11, 0.2);
          }

          .tree-root {
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 20px;
            color: var(--accent);
            font-family: var(--font-mono);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .tree-list {
            list-style: none;
          }

          .tree-item {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(39, 39, 42, 0.4);
          }

          .tree-item:last-child {
            border-bottom: none;
          }

          .branch {
            color: var(--border);
            font-family: var(--font-mono);
            font-size: 1rem;
            margin-right: 16px;
            user-select: none;
          }

          .tree-link {
            color: var(--text);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.2s, transform 0.2s;
            display: inline-flex;
            align-items: center;
          }

          .tree-link:hover {
            color: var(--accent);
            transform: translateX(4px);
          }

          .tree-path-prefix {
            color: var(--text-muted);
            margin-right: 2px;
          }

          .meta-date {
            margin-left: auto;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-muted);
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.05em;
            padding-top: 16px;
            border-top: 1px solid var(--border);
          }

          .footer-back-link {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          .footer-back-link:hover {
            color: var(--accent);
          }
          ]]>
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <span class="section-label">Route Index</span>
            <h1>Sitemap</h1>
            <p class="subtitle">scalewithkanishk.in</p>
          </header>
          
          <div class="card">
            <div class="tree-root">
              <span>~/</span>
              <span>scalewithkanishk.in</span>
            </div>
            
            <ul class="tree-list">
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:variable name="path">
                  <xsl:value-of select="substring-after(sitemap:loc, 'https://scalewithkanishk.in')"/>
                </xsl:variable>

                <li class="tree-item">
                  <xsl:choose>
                    <xsl:when test="position() = last()">
                      <span class="branch">└──</span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span class="branch">├──</span>
                    </xsl:otherwise>
                  </xsl:choose>
                  
                  <xsl:choose>
                    <xsl:when test="normalize-space($path) = '' or $path = '/'">
                      <a href="{sitemap:loc}" class="tree-link">
                        <span class="tree-path-prefix">/</span>home
                      </a>
                    </xsl:when>
                    <xsl:otherwise>
                      <a href="{sitemap:loc}" class="tree-link">
                        <span class="tree-path-prefix">/</span>
                        <xsl:value-of select="substring-after($path, '/')"/>
                      </a>
                    </xsl:otherwise>
                  </xsl:choose>

                  <span class="meta-date">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </span>
                </li>
              </xsl:for-each>
            </ul>
          </div>
          
          <footer>
            <span>© 2026 Kanishk Singh</span>
            <a href="https://scalewithkanishk.in" class="footer-back-link">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Home
            </a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
