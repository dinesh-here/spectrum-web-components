#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const readline = require('linebyline');

const splitCSS = (
    srcPath,
    dstPath,
    topLevelModules = ['alias', 'global', 'semantic']
) => {
    const regex = new RegExp(/\s+--spectrum-([a-z]+)-.*/i);

    // ensure output folder exists
    fs.mkdirpSync(dstPath);

    return new Promise((resolve, reject) => {
        const rl = readline(srcPath);

        let currentModuleName;
        let fd;

        let indexFd = fs.openSync(path.join(dstPath, 'all.css'), 'w');

        rl.on('line', (line) => {
            const match = line.match(regex);
            if (!match) {
                // no matching result, continue to the next line
                return;
            }
            const moduleName = match[1];
            const isTopLevel = topLevelModules.includes(moduleName);
            const fileName = `${moduleName}.css`;

            // output to components subfolder unless this is a top level module
            let filePath;
            if (isTopLevel) {
                filePath = path.join(dstPath, fileName);
            } else {
                filePath = path.join(dstPath, 'components', fileName);
                fs.mkdirpSync(path.join(dstPath, 'components'));
            }

            // did we change modules?
            if (moduleName !== currentModuleName) {
                // did we have a previous module?
                if (currentModuleName && fd) {
                    // we did, close it out
                    fs.writeSync(fd, '}\n');
                    fs.close(fd);
                }
                // we're starting a new module
                currentModuleName = moduleName;
                const relativePath = path.relative(dstPath, filePath);
                // write the import to the all.css file
                fs.writeSync(indexFd, `@import "${relativePath}";\n`);
                // open the new file
                fd = fs.openSync(filePath, 'w'); // overwrite existing files
                // write the root selector
                fs.writeSync(fd, ':root {\n');
            }
            // write the line to the file with appended newline
            fs.writeSync(fd, `${match[0]}\n`);
        });

        rl.on('close', () => {
            // did we have a previous module?
            if (currentModuleName && fd) {
                // we did, close it out
                fs.writeSync(fd, '}\n');
                fs.close(fd);
            }
            fs.close(indexFd);
            resolve(true);
        });

        rl.on('error', function(e) {
            // something went wrong
            console.error(e);
            reject(e);
        });
    });
};

// where is spectrum-css?
// TODO: use resolve package to find node_modules
const spectrumPath = path.resolve(
    path.join(__dirname, '..', 'node_modules', '@adobe', 'spectrum-css', 'vars')
);

// sources to use from spectrum-css
const themes = [
    'light' /*'dark', 'darkest', 'lightest', 'middark', 'midlight'*/,
];
const scales = ['medium' /* 'large' */];
const cores = ['global'];

const processes = [];

themes.forEach(async (theme) => {
    const srcPath = path.join(spectrumPath, `spectrum-${theme}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `theme-${theme}`)
    );
    console.log(`processing theme ${srcPath}`);
    processes.push(splitCSS(srcPath, dstPath));
});

scales.forEach(async (scale) => {
    const srcPath = path.join(spectrumPath, `spectrum-${scale}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `scale-${scale}`)
    );
    console.log(`processing scale  ${srcPath}`);
    processes.push(splitCSS(srcPath, dstPath));
});

cores.forEach(async (core) => {
    const srcPath = path.join(spectrumPath, `spectrum-${core}.css`);
    const dstPath = path.resolve(
        path.join(__dirname, '..', 'src', 'styles', `core-${core}`)
    );
    console.log(`processing core ${srcPath}`);
    processes.push(splitCSS(srcPath, dstPath));
});

Promise.all(processes).then(() => {
    console.log('complete.');
});
