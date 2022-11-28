const texturePacker = require("free-tex-packer-core");
const fs = require("fs").promises;
const { join } = require("path");
const { exec } = require("child_process");

const srcPath = join(__dirname, "../src");
const assetsPath = join(srcPath, "assets");

const paths = {
    images: {
        path: join(assetsPath, "images"),
        name: "images",
    },
    uncompressed: {
        path: join(assetsPath, "uncompressed"),
        name: "uncompressed",
    },
    atlases: {
        path: join(assetsPath, "atlases"),
        name: "atlases",
    },
};

let options = {
    textureName: "",
    width: 2048,
    height: 2048,
    fixedSize: false,
    powerOfTwo: false,
    padding: 3,
    extrude: 0,
    allowRotation: true,
    detectIdentical: true,
    allowTrim: true,
    trimMode: "trim",
    alphaThreshold: 0,
    removeFileExtension: false,
    prependFolderName: true,
    textureFormat: "png",
    base64Export: false,
    scale: 1,
    packer: "MaxRectsBin",
    packerMethod: "BestShortSideFit",
    exporter: "Pixi",
    filter: "none",
};

function getFileNameWithExtension(path) {
    return path.slice(path.lastIndexOf("/") + 1, path.length);
}

function isImage(filePath) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filePath);
}

async function generateAtlas(data, name) {
    const assets = await Promise.all(
        data.map(async (key) => {
            const contents = await fs.readFile(join(paths.images.path, name, key));
            return { path: key, contents };
        }),
    );
    options.textureName = name;
    texturePacker(assets, options, async (files, error) => {
        if (error) throw error;
        for (const item of files) {
            const itemPath = join(assetsPath, `atlases/${item.name}`);
            await fs.appendFile(itemPath, item.buffer);
        }
    });
}

async function getFolderContent(folderPath, shorterPath = true, shortenFromFolder = "src") {
    let result = [];
    const getFilesRecursively = async (path) => {
        const files = await fs.readdir(path);
        for (const f of files) {
            let newPath = join(path, f);
            const stat = await fs.stat(newPath);
            if (stat.isDirectory()) {
                await getFilesRecursively(newPath);
            } else {
                if (shorterPath) {
                    const dir = newPath.split("/");
                    const fileDir = dir.slice(dir.indexOf(shortenFromFolder) + 1, dir.length);
                    newPath = fileDir.join("/");
                }
                result.push(newPath);
            }
        }
    };
    await getFilesRecursively(folderPath);
    return result;
}

async function emptyAtlasesFolder() {
    const { name, path } = paths.atlases;
    let files = await getFolderContent(path, true, name);
    if (files.length !== 0) {
        for (const f of files) {
            await fs.unlink(join(path, f));
        }
    }
}

async function generateAtlases() {
    const { path } = paths.images;
    let imageFiles;
    try {
        const folders = await fs.readdir(path, "utf8");
        const atlasNames = [];
        for (const folder of folders) {
            const folderPath = join(path, folder);
            const stat = await fs.stat(folderPath);
            if (!stat.isDirectory()) continue;
            const folderContent = await getFolderContent(join(path, folder), true, folder);
            if (folderContent.length === 0) continue;
            imageFiles = folderContent.filter((f) => isImage(f));
            atlasNames.push(folder);
            await generateAtlas(imageFiles, folder);
        }
        const data = `export const atlases = ${JSON.stringify(atlasNames)}`;
        const file = join(assetsPath, "assets-names/atlases.js");
        await fs.writeFile(file, data);
        await runPrettierOn(file);
    } catch (e) {
        console.log(e.message);
    }
}
async function generateUncompressedImages() {
    const { path } = paths.uncompressed;
    try {
        const files = await getFolderContent(path, true);
        const images = files.filter((f) => isImage(f));
        let filesNamesAndPaths = [];
        if (images.length !== 0) {
            filesNamesAndPaths = images.map((el) => {
                const assetName = getFileNameWithExtension(el);
                return { assetName, url: el };
            });
        }
        const file = join(assetsPath, "assets-names/assets.js");
        const data = `export const assets = ${JSON.stringify(filesNamesAndPaths)}`;
        await fs.writeFile(file, data);
        await runPrettierOn(file);
    } catch (e) {
        console.log(e.message);
    }
}

async function runPrettierOn(file) {
    await exec(`prettier --write ${file}`);
}

async function start() {
    console.log("removing current sprite sheets");
    await emptyAtlasesFolder();
    console.log("generating atlases");
    await generateAtlases();
    console.log("generating uncompressed sprites");
    await generateUncompressedImages();
    console.log("asset generation complete");
    console.log("running the game");
}

start();
