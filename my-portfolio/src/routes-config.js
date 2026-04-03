/**
 * Central Route Registry — Single Source of Truth
 * 
 * Every layer of the website reads from this file:
 * - React Router (App.jsx)
 * - Noscript HTML fallback (sync-layers.js → index.html)
 * - SEO meta tags & structured data (sync-layers.js → index.html)
 * - Sitemap (sync-layers.js → sitemap.xml)
 * - Prerender script (prerender.js)
 * 
 * WHEN YOU ADD A NEW PAGE:
 * 1. Add a route entry here
 * 2. Add translations in public/locales/en/translation.json
 * 3. Run `npm run sync` (or it runs automatically on `npm run build`)
 */

export const SITE_URL = 'https://scalewithkanishk.in';

// Career-level stats (used in noscript HTML and Hero)
// These are CAREER TOTALS, not the sum of fallbackMetrics case studies
export const CAREER_STATS = {
  yearsExp: '2+',
  adSpend: '$500K+',
  campaigns: '50+',
  highestRoas: '4.3x'
};

export const PERSON_SCHEMA = {
  name: 'Kanishk Singh',
  jobTitle: 'Performance & Growth Marketer',
  email: 'hi@scalewithkanishk.in',
  url: SITE_URL,
  image: `${SITE_URL}/thumbnail.png`,
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
      type: 'EducationalOrganization',
      name: 'University of Groningen'
    },
    {
      type: 'EducationalOrganization',
      name: 'Jaypee Institute of Information Technology'
    }
  ],
  // Current affiliation
  worksFor: {
    type: 'EducationalOrganization',
    name: 'University of Groningen'
  }
};

export const routes = [
  {
    path: '/',
    title: 'Scale With Kanishk | Performance & Growth Marketer',
    description: 'Kanishk Singh — I design Paid Media, CRO, and growth systems that scale revenue. Specializing in data-backed campaign optimization across B2B and B2C channels.',
    priority: 1.0,
    changefreq: 'weekly'
  },
  {
    path: '/experience',
    title: 'Professional Experience | Kanishk Singh',
    description: 'Ad Operations at Pocket FM, Digital Marketing at Intertek and Tradebuilder. Education at University of Groningen and JIIT.',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/case-studies',
    title: 'Case Studies | Kanishk Singh',
    description: 'Detailed performance marketing case studies: Packt Events Paid GTM, Jones Road Beauty CRO, Audio Platform User Acquisition, and AI Lead Engine.',
    priority: 0.9,
    changefreq: 'monthly'
  },
  {
    path: '/my-story',
    title: 'My Story | Kanishk Singh',
    description: 'From curious explorer to data-driven growth architect — my journey through marketing, from organic SEO to paid media at scale.',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    path: '/metrics',
    title: 'Performance Metrics | Kanishk Singh',
    description: 'Channel-wise performance data across growth, CRO, and paid acquisition campaigns. Meta Ads, Google Ads, and LinkedIn results.',
    priority: 0.8,
    changefreq: 'monthly'
  }
];
