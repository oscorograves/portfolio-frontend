import fs from 'fs';
import path from 'path';
import { translate } from 'google-translate-api-x';

const localesDir = path.resolve('public/locales');
const srcLang = 'en';
const targetLangs = ['nl', 'de'];

// Helper to read JSON
const readJSON = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return {};
    }
};

// Helper to write JSON
const writeJSON = (filePath, content) => {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Updated ${filePath}`);
};

// Flatten object to dot notation
const flatten = (obj, prefix = '', res = {}) => {
    for (const key in obj) {
        const val = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            flatten(val, newKey, res);
        } else {
            res[newKey] = val; // Treat arrays as values for simplicity in translation if handled as entire block or just string array
        }
    }
    return res;
};

// Start Main Process
(async () => {
    const srcPath = path.join(localesDir, srcLang, 'translation.json');
    if (!fs.existsSync(srcPath)) {
        console.error(`Source file not found: ${srcPath}`);
        process.exit(1);
    }
    const srcContent = readJSON(srcPath);
    const srcFlat = flatten(srcContent);

    for (const lang of targetLangs) {
        console.log(`Processing ${lang}...`);
        const targetPath = path.join(localesDir, lang, 'translation.json');
        const targetContent = readJSON(targetPath);
        const targetFlat = flatten(targetContent);

        let updatesCount = 0;
        let diffCount = 0;

        // We will perform a merge in memory, using dot notation to identify missing keys
        // But to write back safely, we should traverse the source structure and fill target structure

        const deepMergeAndTranslate = async (sourceObj, targetObj) => {
            for (const key in sourceObj) {
                const srcVal = sourceObj[key];

                if (typeof srcVal === 'object' && srcVal !== null && !Array.isArray(srcVal)) {
                    if (!targetObj[key]) targetObj[key] = {};
                    await deepMergeAndTranslate(srcVal, targetObj[key]);
                } else {
                    // It's a value (string or array)
                    if (!targetObj[key] || targetObj[key] === "") {
                        // Missing or empty
                        if (typeof srcVal === 'string') {
                            try {
                                const res = await translate(srcVal, { to: lang });
                                targetObj[key] = res.text;
                                console.log(`Translated [${key}]: ${srcVal.substring(0, 20)}... -> ${res.text.substring(0, 20)}...`);
                                updatesCount++;
                            } catch (err) {
                                console.error(`Error translating ${key}:`, err.message);
                                targetObj[key] = srcVal; // Fallback to english
                            }
                        } else if (Array.isArray(srcVal)) {
                            // Handle array translation: translate each item if string
                            targetObj[key] = [];
                            for (const item of srcVal) {
                                if (typeof item === 'string') {
                                    try {
                                        const res = await translate(item, { to: lang });
                                        targetObj[key].push(res.text);
                                        updatesCount++;
                                    } catch (err) {
                                        targetObj[key].push(item);
                                    }
                                } else {
                                    // Complex object inside array - simplistic handling
                                    targetObj[key].push(item);
                                }
                            }
                            console.log(`Translated Array [${key}]`);
                        } else {
                            targetObj[key] = srcVal;
                        }
                    }
                }
            }
        };

        // Clone target content to avoid mutation issues or start fresh?
        // Better to mutate targetContent to preserve existing keys that might not be in source (though usually we want sync)

        await deepMergeAndTranslate(srcContent, targetContent);

        if (updatesCount > 0) {
            writeJSON(targetPath, targetContent);
        } else {
            console.log(`No new translations needed for ${lang}`);
        }
    }
})();
