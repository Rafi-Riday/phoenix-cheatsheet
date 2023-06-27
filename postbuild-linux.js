console.log('🚀🚀 Running postbuild.js...🚀🚀');

console.time('🔥 HTML minified in');

import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier-terser';
import { fileURLToPath } from 'url';
import * as glob from 'glob';

// HTML minification
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const minifyOptions = {
    minifyCSS: true,
    minifyJS: true,
    removeComments: false,
    useShortDoctype: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
};

const buildPath = path.join(__dirname, 'build');

const processHtmlFiles = async () => {
    const files = glob.sync(path.join(buildPath, '**/*.html'));

    for (const file of files) {
        const stats = await fs.promises.stat(file);

        if (stats.isFile()) {
            const fileContent = await fs.promises.readFile(file, 'utf8');
            const result = await minify(fileContent, minifyOptions);

            await fs.promises.writeFile(file, result);
        }
    }
};

processHtmlFiles().catch((err) => {
    console.error(`🚨 Error while processing HTML files in build directory:`, err);
});
console.timeEnd('🔥 HTML minified in');


// specify the folders to delete
const buildFolder = 'build';
const foldersToDelete = ['db', 'image-data'];

// helper function to delete a folder
const deleteFolder = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        fs.rm(folderPath, { recursive: true, force: true }, (err) => {
            if (!err) {
                console.log(`💥 ${folderPath} is deleted!`);
            }
        });
    }
};

// delete the specified folders
foldersToDelete.forEach((folder) => {
    const folderPath = path.join(buildFolder, folder);
    deleteFolder(folderPath);
});
