<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Kanishk Singh</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&amp;family=VT323&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          :root {
            --bg-color: #111827; /* gray-900 */
            --surface-color: rgba(255, 255, 255, 0.05); /* white/5 */
            --border-color: #1f2937; /* gray-800 */
            --text-primary: #f3f4f6; /* gray-100 */
            --text-secondary: #9ca3af; /* gray-400 */
            --accent-color: #ea580c; /* primary-600 */
            --accent-hover: #c2410c; /* primary-700 */
            --accent-bg: rgba(234, 88, 12, 0.1); 
            --font-mono: 'Space Mono', monospace;
            --font-sans: 'VT323', monospace;
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: var(--font-mono);
            background-color: var(--bg-color);
            color: var(--text-primary);
            margin: 0;
            padding: 40px 20px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
          }
          header {
            margin-bottom: 40px;
            text-align: center;
          }
          h1 {
            font-family: var(--font-sans);
            font-size: 3.5rem;
            font-weight: 400;
            margin-bottom: 5px;
            letter-spacing: 0.05em;
            color: var(--text-primary);
            text-shadow: 0 0 30px rgba(250, 204, 21, 0.15); /* heading-glow from index.css */
          }
          p.description {
            color: var(--text-secondary);
            font-size: 1rem;
            max-width: 600px;
            margin: 0 auto;
          }
          .info-banner {
            background-color: var(--accent-bg);
            border: 1px solid var(--border-color);
            color: var(--accent-color);
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 12px;
            backdrop-filter: blur(10px);
          }
          .info-banner svg {
            shape-rendering: crispEdges;
            stroke-width: 1.5px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: var(--surface-color);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            backdrop-filter: blur(12px);
          }
          th, td {
            text-align: left;
            padding: 16px 24px;
            border-bottom: 1px solid var(--border-color);
          }
          th {
            background-color: rgba(0, 0, 0, 0.2);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-secondary);
            font-weight: 700;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: rgba(255, 255, 255, 0.02);
          }
          a {
            color: var(--text-primary);
            text-decoration: none;
            transition: color 0.3s;
          }
          a:hover {
            color: var(--accent-color);
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
          }
          .count {
            float: right;
            color: var(--text-secondary);
            font-size: 0.85rem;
            margin-top: 15px;
          }
          .footer {
            margin-top: 60px;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>SITEMAP.XML</h1>
            <p class="description">Search engine index map.</p>
          </header>
          
          <div class="info-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span>You can find more information about XML sitemaps on <a href="http://sitemaps.org" target="_blank" style="color: var(--accent-color); text-decoration: underline;">sitemaps.org</a>.</span>
          </div>
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>URL Location</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="color: var(--text-secondary); font-size: 0.9rem;">
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                    <td>
                      <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span class="badge" style="color: var(--accent-color); border-color: var(--accent-bg);"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <div class="count">
              TOTAL ROUTES: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
          </div>
          
          <div class="footer">
            Design Rules &amp; Typography matched. © Kanishk Singh.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
