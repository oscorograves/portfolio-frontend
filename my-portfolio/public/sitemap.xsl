<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap Directory - Kanishk Singh</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700&amp;family=VT323&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          :root {
            --bg-color: #0f172a; /* slate-900 */
            --border-color: #334155; /* slate-700 */
            --text-primary: #f8fafc; /* slate-50 */
            --text-secondary: #94a3b8; /* slate-400 */
            --accent-color: #f59e0b; /* amber-500 */
            --accent-hover: #d97706; /* amber-600 */
            --terminal-bg: #020617; /* slate-950 */
            --font-mono: 'Space Mono', monospace;
            --font-sans: 'VT323', monospace;
          }
          * { box-sizing: border-box; }
          body {
            font-family: var(--font-mono);
            background-color: var(--bg-color);
            color: var(--text-primary);
            margin: 0;
            padding: 60px 20px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .container {
            width: 100%;
            max-width: 800px;
          }
          header { margin-bottom: 40px; margin-left: 20px; }
          h1 {
            font-family: var(--font-sans);
            font-size: 3.5rem;
            font-weight: 400;
            margin: 0 0 10px 0;
            letter-spacing: 0.05em;
            color: var(--text-primary);
            text-shadow: 0 0 30px rgba(245, 158, 11, 0.15); /* amber glow */
            border-bottom: 2px solid var(--accent-color);
            display: inline-block;
            padding-bottom: 8px;
            text-transform: uppercase;
          }
          p.description {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin: 0;
          }
          
          /* The Terminal Window */
          .terminal-window {
            background-color: var(--terminal-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            margin-bottom: 40px;
          }
          
          .terminal-header {
            display: flex;
            gap: 8px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px dashed var(--border-color);
            color: var(--text-secondary);
            font-size: 0.8rem;
          }
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ef4444; /* red */
          }
          .dot:nth-child(2) { background-color: #f59e0b; /* yellow */ }
          .dot:nth-child(3) { background-color: #22c55e; /* green */ }
          
          .terminal-path {
            margin-left: auto;
            opacity: 0.5;
          }

          /* Directory Tree Styling */
          .tree-root {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 8px;
            color: var(--accent-color);
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .tree-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .tree-list li {
            position: relative;
            padding: 6px 0;
            display: flex;
            align-items: center;
          }
          .branch {
            color: var(--border-color);
            font-size: 1.1rem;
            margin-right: 16px;
            font-weight: bold;
            user-select: none;
          }
          a {
            color: var(--text-primary);
            text-decoration: none;
            transition: color 0.2s, transform 0.2s;
            display: inline-block;
          }
          a:hover {
            color: var(--accent-color);
            transform: translateX(4px);
          }
          .directory-icon {
            color: var(--accent-color);
            margin-right: 8px;
            font-style: normal;
          }
          .file-icon {
            color: var(--text-secondary);
            margin-right: 8px;
            font-style: normal;
          }

          .footer {
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Route Index</h1>
            <p class="description">Current logical architecture and public routes.</p>
          </header>
          
          <div class="terminal-window">
            <div class="terminal-header">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="terminal-path">user@server:~/public_html/sitemap$ xml-tree --depth=2</div>
            </div>

            <div class="tree-root">
              <span class="directory-icon">📁</span>
              <span>scalewithkanishk.in/</span>
            </div>
            
            <ul class="tree-list">
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <li>
                  <xsl:variable name="itemURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <xsl:variable name="path">
                    <xsl:value-of select="substring-after(sitemap:loc, 'https://scalewithkanishk.in')"/>
                  </xsl:variable>

                  <xsl:choose>
                    <xsl:when test="position() = last()">
                      <span class="branch">&#9492;&#9472;&#9472;</span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span class="branch">&#9500;&#9472;&#9472;</span>
                    </xsl:otherwise>
                  </xsl:choose>
                  
                  <xsl:choose>
                    <xsl:when test="normalize-space($path) = ''">
                      <a href="{$itemURL}"><span class="file-icon">📄</span> index.html (home)</a>
                    </xsl:when>
                    <xsl:otherwise>
                      <a href="{$itemURL}"><span class="directory-icon">📁</span> <xsl:value-of select="substring-after($path, '/')"/>/</a>
                    </xsl:otherwise>
                  </xsl:choose>
                </li>
              </xsl:for-each>
            </ul>
          </div>
          
          <div class="footer">
            open-source foundation. original design &#38; brand identity by kanishk singh &#169; 2026.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
