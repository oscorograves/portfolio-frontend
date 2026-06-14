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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          :root {
            --bg: #09090B;
            --card: #141416;
            --border: #27272A;
            --text: #FAFAFA;
            --muted: #71717A;
            --accent: #F59E0B;
            --font-sans: 'Space Grotesk', system-ui, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
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
          }
          .container { width: 100%; max-width: 700px; }

          header { margin-bottom: 40px; }
          h1 {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
          }
          p.subtitle {
            color: var(--muted);
            font-family: var(--font-mono);
            font-size: 0.85rem;
          }

          .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 32px;
          }

          .tree-root {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 16px;
            color: var(--accent);
            font-family: var(--font-mono);
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .tree-list { list-style: none; }
          .tree-list li {
            position: relative;
            padding: 10px 0;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(39, 39, 42, 0.5);
          }
          .tree-list li:last-child { border-bottom: none; }

          .branch {
            color: var(--border);
            font-family: var(--font-mono);
            font-size: 1rem;
            margin-right: 16px;
            user-select: none;
          }

          a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s, transform 0.2s;
            display: inline-block;
          }
          a:hover { color: var(--accent); transform: translateX(4px); }

          .page-icon {
            color: var(--accent);
            margin-right: 10px;
            font-style: normal;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            opacity: 0.6;
          }

          .meta {
            margin-left: auto;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--muted);
            opacity: 0.5;
          }

          .footer {
            text-align: center;
            color: var(--muted);
            font-family: var(--font-mono);
            font-size: 0.7rem;
            letter-spacing: 0.05em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Sitemap</h1>
            <p class="subtitle">scalewithkanishk.in — route index</p>
          </header>
          
          <div class="card">
            <div class="tree-root">
              <span>~/</span>
              <span>scalewithkanishk.in</span>
            </div>
            
            <ul class="tree-list">
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <li>
                  <xsl:variable name="path">
                    <xsl:value-of select="substring-after(sitemap:loc, 'https://scalewithkanishk.in')"/>
                  </xsl:variable>

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
                      <a href="{sitemap:loc}"><span class="page-icon">/</span>home</a>
                    </xsl:when>
                    <xsl:otherwise>
                      <a href="{sitemap:loc}"><span class="page-icon">/</span><xsl:value-of select="substring-after($path, '/')"/></a>
                    </xsl:otherwise>
                  </xsl:choose>

                  <span class="meta"><xsl:value-of select="sitemap:lastmod"/></span>
                </li>
              </xsl:for-each>
            </ul>
          </div>
          
          <div class="footer">
            © 2026 kanishk singh
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
