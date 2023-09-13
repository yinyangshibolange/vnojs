
const fs = require('fs');
const path = require('path');
const fs_promises = fs.promises
async function deepFile(fold, {ext, ignores, includes}, doFunc, base_fold = "") {
    try {
        const srcFold = path.resolve(fold, base_fold)
        const stat = await fs_promises.stat(srcFold)
        if(stat.isDirectory()) {
            const fold_files =  await fs_promises.readdir(srcFold)
            for (const foldFile of fold_files) {
                const child_fold = path.resolve(srcFold, foldFile)
                const stat1 = await fs_promises.stat(child_fold)
                if(stat1.isDirectory()) {
                    // ignore
                    if(!ignores.map(item => path.resolve(fold, item)).includes(child_fold)) {
                        if(includes && includes.length > 0) {
                            if(includes.map(item => path.resolve(fold, item)).includes(child_fold)) {
                                await deepFile(fold, {ext, ignores, includes},  doFunc ,base_fold ? ( base_fold + '/' +foldFile) : foldFile)
                            }
                        } else {
                            await deepFile(fold, {ext, ignores, includes},  doFunc ,base_fold ? ( base_fold + '/' +foldFile) : foldFile)
                        }
                    }
                } else if(stat1.isFile()) {
                    const fileExt = path.parse(child_fold).ext.substring(1)
                    if(!ext || child_fold.endsWith(`.${ext}`) || ext.split(",").includes(fileExt)) {
                        await doFunc(child_fold, )
                    }
                }
            }
        }
    }catch(err) {
        console.error(err)
    }
}

async function findAndMkdir(dir) {
    try {
        const stat = await fs_promises.stat(dir)
        if(!stat.isDirectory()) {
            await fs_promises.mkdir(dir)
        }
    } catch(err) {
        await fs_promises.mkdir(dir)
    }
}

module.exports = {
    deepFile,
    findAndMkdir,
}
