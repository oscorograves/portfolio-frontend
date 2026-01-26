import fs from 'fs';
import path from 'path';
import { translate } from 'google-translate-api-x';

const localesDir = path.resolve('public/locales');
const sourceLang = 'en';
const targetLangs = ['nl', 'de'];

async function processTranslations() {
    const sourcePath = path.join(localesDir, sourceLang, 'translation.json');
    if (!fs.existsSync(sourcePath)) {
        console.error(`Source file not found: ${sourcePath}`);
        process.exit(1);
    }
    const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

    for (const lang of targetLangs) {
        console.log(`Processing ${lang}...`);
        const targetPath = path.join(localesDir, lang, 'translation.json');
        let targetContent = {};
        if (fs.existsSync(targetPath)) {
            targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
        }

        const { updated, count } = await traverse(sourceContent, targetContent, lang);

        if (count > 0) {
            fs.writeFileSync(targetPath, JSON.stringify(updated, null, 2));
            console.log(`Updated ${lang}: ${count} translations added.`);
        } else {
            console.log(`No updates needed for ${lang}.`);
        }
    }
}

async function traverse(source, target, lang) {
    let count = 0;

    // Handle Primitive (String)
    if (typeof source === 'string') {
        const retranslate = process.argv.includes('--retranslate-identical');
        const shouldTranslate = target === undefined || target === null || (retranslate && target === source && source.trim() !== '');

        if (shouldTranslate) {
            try {
                // simple heuristic: don't translate short proper nouns if they look identical
                // but here we force retranslate so we trust the flag or valid need.
                const res = await translate(source, { from: sourceLang, to: lang });
                return { updated: res.text, count: 1 };
            } catch (e) {
                console.error(`Error translating "${source}" to ${lang}:`, e.message);
                return { updated: source, count: 0 };
            }
        }
        return { updated: target, count: 0 };
    }

    // Handle Array
    if (Array.isArray(source)) {
        const newArray = [];
        const targetArray = Array.isArray(target) ? target : [];

        for (let i = 0; i < source.length; i++) {
            const res = await traverse(source[i], targetArray[i], lang);
            newArray.push(res.updated);
            count += res.count;
        }
        return { updated: newArray, count };
    }

    // Handle Object
    if (typeof source === 'object' && source !== null) {
        const newObj = {};

        for (const key in source) {
            const res = await traverse(source[key], target && target[key], lang);
            newObj[key] = res.updated;
            count += res.count;
        }
        return { updated: newObj, count };
    }

    // Fallback for number/boolean etc. (Usually just copy)
    return { updated: target !== undefined ? target : source, count: 0 };
}

processTranslations().catch(err => console.error(err));
