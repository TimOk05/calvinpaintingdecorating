import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
for(const file of ['index.html','styles.css','app.js','.nojekyll','robots.txt']) await copyFile(file, `dist/${file}`);
await cp('assets','dist/assets',{recursive:true});
console.log('Static website built in dist/.');
