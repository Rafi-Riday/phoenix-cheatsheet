console.log('🚀🚀 Running postbuild.js...🚀🚀');

console.time('🔥 HTML minified in');

import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier-terser';

// HTML minification

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
    const output = await minify(input, minifyOptions);

    fs.writeFileSync(filePath, output);
}

(async () => {
    await traverseDir('./build');
})().catch((err) => {
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
