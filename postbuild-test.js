import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier-terser';

async function traverseDir(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            await traverseDir(filePath);
        } else if (path.extname(filePath) === '.html') {
            await minifyFile(filePath);
        }
    }
}


async function minifyFile(filePath) {
    const input = fs.readFileSync(filePath, 'utf8');
    const output = await minify(input, {
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
        useShortDoctype: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
    });

    fs.writeFileSync(filePath, output);
}


(async () => {
    await traverseDir('./build');
})();
