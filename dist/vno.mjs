import fs from 'fs';
import path from 'path';
import watchFiles from 'node-watch';

const fs_promises$1 = fs.promises;
async function deepFile(fold, {ext, ignores = [], includes = []}, doFunc, base_fold = "") {
    try {
        const srcFold = path.resolve(fold, base_fold);
        const stat = await fs_promises$1.stat(srcFold);
        if(stat.isDirectory()) {
            const fold_files =  await fs_promises$1.readdir(srcFold);
            for (const foldFile of fold_files) {
                const child_fold = path.resolve(srcFold, foldFile);
                const stat1 = await fs_promises$1.stat(child_fold);
                if(stat1.isDirectory()) {
                    // ignore
                    if(!ignores.map(item => path.resolve(fold, item)).includes(child_fold)) {
                        if(includes && includes.length > 0) {
                            if(includes.map(item => path.resolve(fold, item)).includes(child_fold)) {
                                await deepFile(fold, {ext, ignores, includes},  doFunc ,base_fold ? ( base_fold + '/' +foldFile) : foldFile);
                            }
                        } else {
                            await deepFile(fold, {ext, ignores, includes},  doFunc ,base_fold ? ( base_fold + '/' +foldFile) : foldFile);
                        }
                    }
                } else if(stat1.isFile()) {
                    const fileExt = path.parse(child_fold).ext.substring(1);
                    if(!ext || child_fold.endsWith(`.${ext}`) || ext.split(",").includes(fileExt)) {
                        await doFunc(child_fold, );
                    }
                }
            }
        }
    }catch(err) {
        console.error(err);
    }
}

async function findAndMkdir(dir) {
    try {
        const stat = await fs_promises$1.stat(dir);
        if(!stat.isDirectory()) {
            await fs_promises$1.mkdir(dir);
        }
    } catch(err) {
        await fs_promises$1.mkdir(dir);
    }
}

var logger = {
 error: msg => {
  console.log('\x1B[31m%s\x1B[0m', msg);
 },
 success: msg => {
  console.log('\x1B[32m%s\x1B[0m', msg);
 },
 primary: msg => {
  console.log('\x1B[34m%s\x1B[0m', msg);
 },
 info: msg => {
  console.log('\x1B[2m%s\x1B[0m', msg);
 },
 log: msg => {
  console.log(msg);
 },
 reg: msg => {
  const ms = msg.matchAll(/\$([^\$]*\$\#[0-9a-fA-F]{3,8})/);
  console.log(ms);
 },
 dict: dict => {
  if (typeof dict === 'object') {
   for (let key in dict) {
    console.log('\x1B[34m%s\x1B[0m', `${key}: ${typeof dict[key] === 'string' ? `'${dict[key]}'` : dict[key]}     `);
   }
  } else {
   console.log(dict);
  }
 }
};

const fs_promises = fs.promises;


let watcher;
function watchAndCompile (config) {
    const { watch, hot, ignores, includes, ext, rules, target, cssSplit } = config;
    if (watcher) watcher.close();
    // 监听文件变化
    watcher = watchFiles(path.resolve(process.cwd(), watch,), {
        recursive: true,
        filter (f, skip) {
            // skip node_modules
            if (Array.isArray(ignores)) {
                for (let ign of ignores) {
                    if (new RegExp(`\\/${ign}`).test(f)) return skip;
                }
            }
            if (Array.isArray(includes) && includes.length > 0) {
                for (let inc of includes) {
                    if (new RegExp(`\\/${inc}`).test(f)) {
                        let fg = false;
                        for (let _ext of ext.split(",")) {
                            if (new RegExp(`\\.${_ext}`).test(f)) {
                                fg = true;
                                break
                            }
                        }
                        return fg
                    }
                }
                return skip;
            }
            let fg = false;
            for (let _ext of ext.split(",")) {
                if (new RegExp(`\\.${_ext}`).test(f)) {
                    fg = true;
                    break
                }
            }
            return fg
        }
    }, function (eventType, filePath,) {
        vno(config);
    });
    logger.primary("监听文件中...");
}

async function vno (config) {
    const { watch, hot, ignores, includes, ext, rules, target, cssSplit } = config;
    logger.primary("vnocss编译中......");
    const targetPath = path.resolve(process.cwd(), target);
    const targetPath_parse = path.parse(targetPath);
    await findAndMkdir(targetPath_parse.dir);
    let vno_styles = '';
    // ignores优先
    await deepFile(path.resolve(process.cwd(), watch,), { ext, ignores, includes }, async function (filepath) {
        let multipleStr = '';
        const filebuffer = await fs_promises.readFile(filepath);
        const filestr = filebuffer.toString();

        const match_vno = [...filestr.matchAll(/class="([^"]*)"/g), ...filestr.matchAll(/class='([^']*)'/g)];
        let classes = [];
        for (let mv of match_vno) {
            classes = [...new Set([...classes, ...mv[1].trim().split(/\s+/)])];
        }
        for (let class_str of classes) {
            for (let key in rules) {
                let val_str = rules[key];
                const reg = new RegExp(`^${key}$`);
                if (!reg.test(class_str)) continue
                const _m = class_str.match(reg); // class 匹配
                let styleStr = '';
                if (typeof val_str === 'string') {
                    const rule_ms = [...val_str.matchAll(/\$val\[(\d+)\]/g)];
                    for (let rule_m of rule_ms) {
                        const data_index = +rule_m[1];
                        val_str = val_str.replace(rule_m[0], _m[data_index]);
                    }
                    styleStr = `.${_m[0]}{${val_str}}`;

                } else if (val_str === 'function') {
                    styleStr = `.${_m[0]}{${val_str(_m)}}`;
                }

                if (multipleStr.indexOf(styleStr) < 0) {
                    multipleStr += styleStr;
                }
                if (vno_styles.indexOf(styleStr) < 0) {
                    vno_styles += styleStr;
                }

            }
        }

        const filepath_parse = path.parse(filepath);

        if (cssSplit && multipleStr) {
            const fileTargetDir = filepath_parse.dir.replace(path.resolve(process.cwd(), watch,), "");
            const targetFilePath = path.resolve(targetPath_parse.dir, '.' + fileTargetDir, filepath_parse.name + '_css.css');
            await findAndMkdir(path.parse(targetFilePath).dir);
            await fs_promises.writeFile(targetFilePath, multipleStr);
        }

    });

    if (vno_styles) await fs_promises.writeFile(targetPath, vno_styles);
    logger.success("vnocss编译成功");

    if (hot) {
        watchAndCompile(config);
    }
    return true
}

export { vno as default };
