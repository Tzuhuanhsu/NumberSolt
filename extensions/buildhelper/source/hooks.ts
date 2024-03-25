import { IBuildTaskOption, BuildHook, IBuildResult } from '../@types';
import pathModule from "path";
import fsModule from "fs";
import path from 'path';
interface IOptions
{
}

const PACKAGE_NAME = 'buildhelper';
const EXPORT_FILE = "exportSummary";
const EXPORT_PATH = "assets";

interface ITaskOptions extends IBuildTaskOption
{
    packages: {
        //'cocos-plugin-template': IOptions;
    };
}

function log(...arg: any[])
{
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function ()
{
    console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request('asset-db', 'query-assets');
};

export const onBeforeBuild: BuildHook.onBeforeBuild = async function (options: ITaskOptions, result: IBuildResult)
{
    // Todo some thing
    log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function (options: ITaskOptions, result: IBuildResult)
{
    const pkgOptions = options.packages[PACKAGE_NAME];
    // Todo some thing
    console.debug('get settings test', result.settings);
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function (options: ITaskOptions, result: IBuildResult)
{
    // Todo some thing
    console.log('webTestOption', 'onAfterCompressSettings');
};

export const onAfterBuild: BuildHook.onAfterBuild = async function (options: ITaskOptions, result: IBuildResult)
{
    console.log("On onAfterBuild Process");
    writeBundleSetting(result.paths.settings, getExportFile(result.dest));
};

export const unload: BuildHook.unload = async function ()
{
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};

export const onError: BuildHook.onError = async function (options, result)
{
    // Todo some thing
    console.warn(`${PACKAGE_NAME} run onError`);
};

export const onBeforeMake: BuildHook.onBeforeMake = async function (root, options)
{
    console.log(`onBeforeMake: root: ${root}, options: ${options}`);
};

export const onAfterMake: BuildHook.onAfterMake = async function (root, options)
{
    console.log(`onAfterMake: root: ${root}, options: ${options}`);
};

//取得輸出位置
function getExportFile(dest: string)
{
    console.log("export Path=", pathModule.join(dest, EXPORT_PATH, EXPORT_FILE));
    return pathModule.join(dest, EXPORT_PATH, EXPORT_FILE);
}

//設定輸出內容
function writeBundleSetting(settings: string, exportPath: string)
{
    const utf8BundleSetting = fsModule.readFileSync(settings).toString('utf-8');
    const jsonBundleSetting = JSON.parse(utf8BundleSetting);
    fsModule.writeFileSync(exportPath, JSON.stringify(jsonBundleSetting.assets.bundleVers));
}
