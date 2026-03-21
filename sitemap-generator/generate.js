/**
 * Sitemap Generator for scalewithkanishk.in
 * Generates sitemap.xml from routes.json configuration
 */

import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load routes configuration
const config = JSON.parse(readFileSync(resolve(__dirname, 'routes.json'), 'utf-8'));

// Output path - writes to the portfolio's public folder
const outputPath = resolve(__dirname, '../my-portfolio/public/sitemap.xml');

async function generateSitemap() {
    console.log('🗺️  Generating sitemap...');
    console.log(`📍 Base URL: ${config.baseUrl}`);
    console.log(`📄 Found ${config.routes.length} routes`);

    const sitemap = new SitemapStream({ hostname: config.baseUrl });

    // Get current date for lastmod
    const today = new Date().toISOString().split('T')[0];

    // Add all routes (including hidden ones)
    for (const route of config.routes) {
        sitemap.write({
            url: route.path,
            lastmod: today,
            changefreq: route.changefreq || 'monthly',
            priority: route.priority || 0.5
        });
        console.log(`  ✅ Added: ${route.path}${route.hidden ? ' (hidden)' : ''}`);
    }

    sitemap.end();

    const buffer = await streamToPromise(sitemap);

    // Inject XML stylesheet instruction with relative URL for localhost CORS fix
    let xmlContent = buffer.toString();
    const timestamp = Date.now();
    const PI = `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl?v=${timestamp}"?>`;
    xmlContent = xmlContent.replace('<?xml version="1.0" encoding="UTF-8"?>', `<?xml version="1.0" encoding="UTF-8"?>\n${PI}\n`);
    writeFileSync(outputPath, xmlContent);

    console.log(`\n✨ Sitemap generated successfully!`);
    console.log(`📁 Output: ${outputPath}`);
}

generateSitemap().catch(err => {
    console.error('❌ Error generating sitemap:', err);
    process.exit(1);
});
