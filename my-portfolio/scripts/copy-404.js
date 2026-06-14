import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

try {
    if (fs.existsSync(indexHtml)) {
        // 1. Copy to 404.html for general SPA fallback
        fs.copyFileSync(indexHtml, notFoundHtml);
        console.log('✅ Successfully copied index.html to 404.html for SPA fallback.');

        // 2. Copy index.html to multi-page directories for static route support on refresh
        const routes = ['experience', 'case-studies', 'my-story', 'metrics'];
        
        routes.forEach(route => {
            const routeDir = path.join(distDir, route);
            
            // Create directory (e.g., dist/experience)
            if (!fs.existsSync(routeDir)) {
                fs.mkdirSync(routeDir, { recursive: true });
            }
            
            // Copy index.html to dist/route/index.html (e.g., dist/experience/index.html)
            const destIndex = path.join(routeDir, 'index.html');
            fs.copyFileSync(indexHtml, destIndex);
            console.log(`✅ Pre-generated directory fallback: dist/${route}/index.html`);
            
            // Copy index.html to dist/route.html (e.g., dist/experience.html)
            const destHtml = path.join(distDir, `${route}.html`);
            fs.copyFileSync(indexHtml, destHtml);
            console.log(`✅ Pre-generated file fallback: dist/${route}.html`);
        });
        
        console.log('✨ All route fallbacks generated successfully for Multi-Page reload support!');
    } else {
        console.error('❌ Error: dist/index.html not found. Make sure to run this script after building.');
        process.exit(1);
    }
} catch (error) {
    console.error('❌ Error copying files:', error);
    process.exit(1);
}
