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
        <style type="text/css">
          :root {
            --bg-color: #0d1117;
            --surface-color: rgba(255, 255, 255, 0.05);
            --border-color: rgba(255, 255, 255, 0.1);
            --text-primary: #e6edf3;
            --text-secondary: #8b949e;
            --accent-color: #f59e0b;
            --accent-hover: #d97706;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-primary);
            margin: 0;
            padding: 40px 20px;
            line-height: 1.6;
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
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(to right, #ffffff, #8b949e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p.description {
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
          }
          .info-banner {
            background-color: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: var(--accent-color);
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: var(--surface-color);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          th, td {
            text-align: left;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
          }
          th {
            background-color: rgba(255, 255, 255, 0.02);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-secondary);
            font-weight: 600;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: rgba(255, 255, 255, 0.03);
          }
          a {
            color: var(--accent-color);
            text-decoration: none;
            transition: color 0.2s;
            font-weight: 500;
          }
          a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
          }
          .count {
            float: right;
            font-weight: normal;
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-top: 10px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.85rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>XML Sitemap</h1>
            <p class="description">This is an XML Sitemap, meant to be consumed by search engines like Google or Bing.</p>
          </header>
          
          <div class="info-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span>You can find more information about XML sitemaps on <a href="http://sitemaps.org" target="_blank">sitemaps.org</a>.</span>
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
                    <td>
                      <xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                    </td>
                    <td>
                      <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span class="badge"><xsl:value-of select="sitemap:priority"/></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <div class="count">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs in this sitemap.
            </div>
          </div>
          
          <div class="footer">
            Designed for Kanishk Singh's Portfolio.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
