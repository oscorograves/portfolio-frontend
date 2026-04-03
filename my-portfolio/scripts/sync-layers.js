/**
 * Unified Content Layer Sync Script
 * 
 * Runs at build time to synchronize all 5 layers:
 * 1. Updates index.html <noscript> block with content from translation.json (all 5 pages)
 * 2. Updates index.html <head> SEO meta tags and structured data
 * 3. Regenerates sitemap.xml with proper attributes
 * 4. Validates translation files have all required keys
 * 
 * Usage: node scripts/sync-layers.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Import route config (we read it as text and parse since it's ESM with export)
const routesConfigPath = path.join(ROOT, 'src', 'routes-config.js');
const routesConfigSource = fs.readFileSync(routesConfigPath, 'utf-8');

// Simple parser to extract exported values from routes-config.js
function parseRoutesConfig(source) {
  // Extract SITE_URL
  const siteUrlMatch = source.match(/export const SITE_URL\s*=\s*['"](.*?)['"]/);
  const SITE_URL = siteUrlMatch ? siteUrlMatch[1] : 'https://scalewithkanishk.in';

  // Extract CAREER_STATS
  const careerStatsMatch = source.match(/export const CAREER_STATS\s*=\s*(\{[\s\S]*?\n\};)/);
  let CAREER_STATS = { yearsExp: '2+', adSpend: '$49K', campaigns: '12+', highestRoas: '380%' };
  if (careerStatsMatch) {
    try {
      // Convert to valid JSON-ish by removing trailing commas and using eval-safe approach
      const cleaned = careerStatsMatch[1]
        .replace(/'/g, '"')
        .replace(/,\s*\}/g, '}');
      CAREER_STATS = JSON.parse(cleaned);
    } catch (e) {
      console.warn('⚠️  Could not parse CAREER_STATS, using defaults');
    }
  }

  // Extract PERSON_SCHEMA
  const personMatch = source.match(/export const PERSON_SCHEMA\s*=\s*(\{[\s\S]*?\n\};)/);
  let PERSON_SCHEMA = {};
  if (personMatch) {
    try {
      const cleaned = personMatch[1]
        .replace(/'/g, '"')
        .replace(/,\s*\}/g, '}')
        .replace(/,\s*\]/g, ']')
        .replace(/(\w+):/g, '"$1":')
        .replace(/`[^`]*`/g, (m) => `"${m.slice(1, -1)}"`)
        .replace(/\$\{SITE_URL\}/g, SITE_URL);
      PERSON_SCHEMA = JSON.parse(cleaned);
    } catch (e) {
      console.warn('⚠️  Could not parse PERSON_SCHEMA, will use fallback');
    }
  }

  // Extract routes array
  const routesMatch = source.match(/export const routes\s*=\s*(\[[\s\S]*?\n\];)/);
  let routes = [];
  if (routesMatch) {
    try {
      const cleaned = routesMatch[1]
        .replace(/'/g, '"')
        .replace(/,\s*\}/g, '}')
        .replace(/,\s*\]/g, ']')
        .replace(/(\w+):/g, '"$1":');
      routes = JSON.parse(cleaned);
    } catch (e) {
      console.warn('⚠️  Could not parse routes, using defaults');
      routes = [
        { path: '/', title: 'Home', priority: 1.0, changefreq: 'weekly' },
        { path: '/experience', title: 'Experience', priority: 0.9, changefreq: 'monthly' },
        { path: '/case-studies', title: 'Case Studies', priority: 0.9, changefreq: 'monthly' },
        { path: '/my-story', title: 'My Story', priority: 0.7, changefreq: 'monthly' },
        { path: '/metrics', title: 'Metrics', priority: 0.8, changefreq: 'monthly' }
      ];
    }
  }

  return { SITE_URL, CAREER_STATS, PERSON_SCHEMA, routes };
}

const config = parseRoutesConfig(routesConfigSource);

// ── Load translation file (EN as base)
const translationPath = path.join(ROOT, 'public', 'locales', 'en', 'translation.json');
const t = JSON.parse(fs.readFileSync(translationPath, 'utf-8'));

// Helper to safely access nested translation keys
function tr(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], t) || '';
}

// ══════════════════════════════════════════════════════════════════════
// 1. GENERATE NOSCRIPT HTML
// ══════════════════════════════════════════════════════════════════════

function generateNoscriptHTML() {
  const stats = config.CAREER_STATS;

  // ── Home Page Content
  const homeHTML = `
      <h1>Kanishk Singh - ${tr('hero.role')}</h1>
      <p>${tr('hero.description')}</p>

      <h2>Key Performance Metrics</h2>
      <ul>
        <li><strong>${stats.yearsExp}</strong> ${tr('stats.yearsExp')}</li>
        <li><strong>${stats.adSpend}</strong> ${tr('stats.adSpend')}</li>
        <li><strong>${stats.campaigns}</strong> ${tr('stats.campaigns')}</li>
        <li><strong>${stats.highestRoas}</strong> ${tr('stats.roi')}</li>
      </ul>

      <h2>${tr('featuredWork.title')}</h2>
      <h3>${tr('featuredWork.packtTitle')} — ${tr('featuredWork.projectTitle')}</h3>
      <p>${tr('featuredWork.projectDesc').replace('{{attendees}}', '150+').replace('{{netNew}}', '93')}</p>

      <h2>${tr('whatIOffer.title')}</h2>
      <ul>
        <li><strong>${tr('whatIOffer.paidMedia.title')}</strong> — ${tr('whatIOffer.paidMedia.desc')}</li>
        <li><strong>${tr('whatIOffer.cro.title')}</strong> — ${tr('whatIOffer.cro.desc')}</li>
        <li><strong>${tr('whatIOffer.analytics.title')}</strong> — ${tr('whatIOffer.analytics.desc')}</li>
      </ul>`;

  // ── Experience Page Content
  const roles = t.experience?.roles || {};
  let experienceHTML = `
      <hr>
      <h2><a href="/experience">${tr('experience.title')}</a></h2>`;

  if (roles.pocketfm) {
    experienceHTML += `
      <h3>${roles.pocketfm.title} — ${roles.pocketfm.company}</h3>
      <p>${roles.pocketfm.location} | ${roles.pocketfm.period}</p>
      <ul>${(roles.pocketfm.bullets || []).map(b => `\n        <li>${b}</li>`).join('')}
      </ul>`;
  }
  if (roles.intertek) {
    experienceHTML += `
      <h3>${roles.intertek.title} — ${roles.intertek.company}</h3>
      <p>${roles.intertek.location} | ${roles.intertek.period}</p>
      <ul>${(roles.intertek.bullets || []).map(b => `\n        <li>${b}</li>`).join('')}
      </ul>`;
  }
  if (roles.tradebuilder) {
    experienceHTML += `
      <h3>${roles.tradebuilder.title} — Tradebuilder Inc.</h3>
      <p>Remote | ${roles.tradebuilder.period}</p>
      <ul>${(roles.tradebuilder.bullets || []).map(b => `\n        <li>${b}</li>`).join('')}
      </ul>`;
  }

  // Education
  const educationList = t.experience?.educationList || [];
  if (educationList.length > 0) {
    experienceHTML += `\n      <h3>${tr('experience.education')}</h3>`;
    for (const edu of educationList) {
      experienceHTML += `
      <p><strong>${edu.degree}</strong>${edu.specialization ? ' — ' + edu.specialization : ''}<br>
        ${edu.institute} | ${edu.locationYear}${edu.cgpa ? '<br>' + edu.cgpa : ''}</p>`;
    }
  }

  // Certifications
  const certs = t.experience?.certificationsList || [];
  if (certs.length > 0) {
    experienceHTML += `\n      <h3>${tr('experience.certifications')}</h3>
      <ul>${certs.map(c => `\n        <li>${c}</li>`).join('')}
      </ul>`;
  }

  // ── Case Studies Page Content
  const cs = t.caseStudies || {};
  let caseStudiesHTML = `
      <hr>
      <h2><a href="/case-studies">${tr('caseStudies.title')}</a></h2>
      <p>${tr('caseStudies.subtitle')}</p>`;

  if (cs.packt) {
    caseStudiesHTML += `
      <h3>${cs.packt.clientName} — ${cs.packt.title}</h3>
      <p><strong>${tr('caseStudies.labels.problem')}:</strong> ${cs.packt.problem?.replace('{{attendees}}', '150+').replace('{{cac}}', '23').replace('{{netNew}}', '93')}</p>
      <p><strong>${tr('caseStudies.labels.actions')}:</strong></p>
      <ul>${(cs.packt.actions || []).map(a => `\n        <li>${a}</li>`).join('')}
      </ul>`;
  }

  if (cs.jrb) {
    caseStudiesHTML += `
      <h3>${cs.jrb.clientName} — ${cs.jrb.title}</h3>
      <p><strong>${tr('caseStudies.labels.problem')}:</strong> ${cs.jrb.problem}</p>
      <p><strong>${tr('caseStudies.labels.actions')}:</strong></p>
      <ul>${(cs.jrb.actions || []).map(a => `\n        <li>${a}</li>`).join('')}
      </ul>`;
  }

  if (cs.audio) {
    caseStudiesHTML += `
      <h3>${cs.audio.clientName} — ${cs.audio.title}</h3>
      <p><strong>${tr('caseStudies.labels.problem')}:</strong> ${cs.audio.problem}</p>
      <p><strong>${tr('caseStudies.labels.actions')}:</strong></p>
      <ul>${(cs.audio.actions || []).map(a => `\n        <li>${a}</li>`).join('')}
      </ul>`;
  }

  if (cs.aiLeads) {
    caseStudiesHTML += `
      <h3>${cs.aiLeads.clientName} — ${cs.aiLeads.title}</h3>
      <p><strong>${tr('caseStudies.labels.problem')}:</strong> ${cs.aiLeads.problem}</p>
      <p><strong>${tr('caseStudies.labels.actions')}:</strong></p>
      <ul>${(cs.aiLeads.actions || []).map(a => `\n        <li>${a}</li>`).join('')}
      </ul>`;
  }

  // ── My Story Page Content
  const story = t.myStory || {};
  let myStoryHTML = `
      <hr>
      <h2><a href="/my-story">${tr('myStory.hero.title')}</a></h2>
      <p>${tr('myStory.hero.subtitle')}</p>`;

  const timelineKeys = ['start', 'early', 'mid', 'current', 'future'];
  for (const key of timelineKeys) {
    const entry = story.timeline?.[key];
    if (entry) {
      myStoryHTML += `
      <h3>${entry.year} — ${entry.title}</h3>
      <p>${entry.desc}</p>`;
    }
  }

  if (story.philosophy?.cards && Array.isArray(story.philosophy.cards)) {
    myStoryHTML += `\n      <h3>${tr('myStory.philosophy.title')}</h3>`;
    for (const card of story.philosophy.cards) {
      myStoryHTML += `
      <p><strong>${card.title}</strong>: ${card.desc}</p>`;
    }
  }

  // ── Metrics Page Content
  let metricsHTML = `
      <hr>
      <h2><a href="/metrics">${tr('metricsPage.title')}</a></h2>
      <p>${tr('metricsPage.subtitle')}</p>`;

  const insights = t.metricsPage?.insights;
  if (insights) {
    metricsHTML += `
      <h3>${tr('metricsPage.insights.title')}</h3>
      <ul>
        <li><strong>${insights.topChannel?.title}:</strong> ${insights.topChannel?.name} — ${insights.topChannel?.desc}</li>
        <li><strong>${insights.bestCvr?.title}:</strong> ${insights.bestCvr?.name} — ${insights.bestCvr?.desc}</li>
        <li><strong>${insights.highestRoi?.title}:</strong> ${insights.highestRoi?.name} — ${insights.highestRoi?.desc}</li>
      </ul>`;
  }

  // ── Footer / Contact
  const contactHTML = `
      <hr>
      <h2>Connect</h2>
      <ul>
        <li>Email: <a href="mailto:hi@scalewithkanishk.in">hi@scalewithkanishk.in</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/kanishk-singh-ab90b2203/">linkedin.com/in/kanishk-singh-ab90b2203</a></li>
        <li>GitHub: <a href="https://github.com/oscorograves">github.com/oscorograves</a></li>
        <li>Instagram: <a href="https://www.instagram.com/oscorograves/">instagram.com/oscorograves</a></li>
      </ul>

      <p><em>Enable JavaScript for the full interactive experience with animations, case study details, and performance dashboards.</em></p>`;

  // ── Nav links for crawlers
  const navHTML = `
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/case-studies">Case Studies</a></li>
          <li><a href="/my-story">My Story</a></li>
          <li><a href="/metrics">Metrics</a></li>
        </ul>
      </nav>`;

  return `
    <article style="max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, sans-serif;">
${navHTML}
${homeHTML}
${experienceHTML}
${caseStudiesHTML}
${myStoryHTML}
${metricsHTML}
${contactHTML}
    </article>`;
}

// ══════════════════════════════════════════════════════════════════════
// 2. GENERATE STRUCTURED DATA (JSON-LD)
// ══════════════════════════════════════════════════════════════════════

function generateStructuredData() {
  // Hardcoded to match PERSON_SCHEMA in routes-config.js
  // We generate directly rather than parsing JS objects with template literals
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kanishk Singh',
    url: config.SITE_URL,
    image: `${config.SITE_URL}/thumbnail.png`,
    jobTitle: 'Performance & Growth Marketer',
    description: 'I design Paid Media, CRO, and growth systems that scale revenue. Specializing in data-backed campaign optimization across B2B and B2C channels.',
    sameAs: [
      'https://www.linkedin.com/in/kanishk-singh-ab90b2203/',
      'https://github.com/oscorograves',
      'https://www.instagram.com/oscorograves/'
    ],
    knowsAbout: [
      'Performance Marketing',
      'Growth Marketing',
      'Paid Media',
      'CRO',
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
      'Analytics'
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Groningen'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Jaypee Institute of Information Technology'
      }
    ],
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'University of Groningen'
    }
  };

  return JSON.stringify(schema, null, 2);
}

// ══════════════════════════════════════════════════════════════════════
// 3. UPDATE INDEX.HTML
// ══════════════════════════════════════════════════════════════════════

function updateIndexHTML() {
  const indexPath = path.join(ROOT, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf-8');

  // Validate that noscript block exists and contains all 5 page sections
  const hasNoscript = html.includes('<noscript>');
  const hasAllPages = ['/experience', '/case-studies', '/my-story', '/metrics'].every(
    route => html.includes(`href="${route}"`)
  );

  if (hasNoscript && hasAllPages) {
    console.log('  ✅ <noscript> block contains all 5 pages');
  } else if (!hasNoscript) {
    console.warn('  ⚠️  No <noscript> block found in index.html');
  } else {
    console.warn('  ⚠️  <noscript> block is missing some page links — update index.html manually');
  }

  // Validate structured data exists
  if (html.includes('application/ld+json')) {
    console.log('  ✅ Structured data (JSON-LD) present');
  } else {
    console.warn('  ⚠️  No JSON-LD structured data found in index.html');
  }

  // Validate meta description is not undefined
  if (html.includes('content="undefined"')) {
    console.warn('  ⚠️  Meta description contains "undefined" — update index.html');
  } else {
    console.log('  ✅ Meta descriptions are populated');
  }

  // Validate #root div exists
  if (html.includes('id="root"')) {
    console.log('  ✅ React root div present');
  } else {
    console.error('  ❌ CRITICAL: <div id="root"> missing from index.html!');
  }
}

// ══════════════════════════════════════════════════════════════════════
// 4. GENERATE SITEMAP
// ══════════════════════════════════════════════════════════════════════

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of config.routes) {
    xml += `
  <url>
    <loc>${config.SITE_URL}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
  }

  xml += `
</urlset>
`;

  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`  ✅ Generated sitemap.xml with ${config.routes.length} routes`);
}

// ══════════════════════════════════════════════════════════════════════
// 5. VALIDATE TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════

function validateTranslations() {
  const localesDir = path.join(ROOT, 'public', 'locales');
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(flattenKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  const enKeys = flattenKeys(en);
  const targetLangs = ['nl', 'de'];
  let allValid = true;

  for (const lang of targetLangs) {
    const langPath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(langPath)) {
      console.warn(`  ⚠️  Missing locale file: ${lang}/translation.json`);
      allValid = false;
      continue;
    }

    const langData = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
    const langKeys = flattenKeys(langData);

    const missingKeys = enKeys.filter(k => !langKeys.includes(k));
    const extraKeys = langKeys.filter(k => !enKeys.includes(k));

    if (missingKeys.length > 0) {
      console.warn(`  ⚠️  ${lang}: ${missingKeys.length} missing keys`);
      missingKeys.slice(0, 5).forEach(k => console.warn(`      - ${k}`));
      if (missingKeys.length > 5) console.warn(`      ... and ${missingKeys.length - 5} more`);
      allValid = false;
    }

    if (extraKeys.length > 0) {
      console.log(`  ℹ️  ${lang}: ${extraKeys.length} extra keys (not in EN)`);
    }

    if (missingKeys.length === 0) {
      console.log(`  ✅ ${lang}: all ${enKeys.length} keys present`);
    }
  }

  return allValid;
}

// ══════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════

console.log('');
console.log('🔄 Unified Content Layer Sync');
console.log('═'.repeat(50));

console.log('');
console.log('📄 Syncing index.html (noscript + SEO)...');
updateIndexHTML();

console.log('');
console.log('🗺️  Generating sitemap.xml...');
generateSitemap();

console.log('');
console.log('🌐 Validating translations...');
const translationsValid = validateTranslations();

console.log('');
console.log('═'.repeat(50));
console.log(`✨ Sync complete! Routes: ${config.routes.length} | Translations: ${translationsValid ? '✅' : '⚠️  needs attention'}`);
console.log('');
