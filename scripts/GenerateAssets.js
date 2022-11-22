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
    spriteSheets: {
        path: join(assetsPath, "spriteSheets"),
        name: "spriteSheets",
    },
};

let options = {
    textureName: "",
    width: 4096,
    height: 4096,
    quality: 70,
    scale: 1,
    fixedSize: false,
    powerOfTwo: false,
    padding: 2,
    extrude: 1,
    allowRotation: false,
    detectIdentical: true,
    allowTrim: true,
    trimMode: "trim",
    alphaThreshold: 1,
    removeFileExtension: false,
    prependFolderName: true,
    textureFormat: "png",
    base64Export: false,
    tinify: false,
    packer: "MaxRectsPacker",
    packerMethod: "Smart",
    exporter: "Pixi",
    filter: "none",
};

function getFileNameWithExtension(path) {
    return path.slice(path.lastIndexOf("/") + 1, path.length);
}

function isImage(filePath) {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filePath);
}

async function generateSpriteSheet(data, name) {
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
            const itemPath = join(assetsPath, `spriteSheets/${item.name}`);
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

async function emptySpriteSheetFolder() {
    const { name, path } = paths.spriteSheets;
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
        const spriteSheetNames = [];
        for (const folder of folders) {
            const folderPath = join(path, folder);
            const stat = await fs.stat(folderPath);
            if (!stat.isDirectory()) continue;
            const folderContent = await getFolderContent(join(path, folder), true, folder);
            if (folderContent.length === 0) continue;
            imageFiles = folderContent.filter((f) => isImage(f));
            // spriteSheetNames.push(folder);
            // await generateSpriteSheet(imageFiles, folder);
        }
        // const data = `export const spriteSheets = ${JSON.stringify(spriteSheetNames)}`;
        // const file = join(assetsPath, "assets-names/spriteSheets.js");
        const imgData = `export const images = ${JSON.stringify(imageFiles)}`;
        const imgFile = join(assetsPath, "assets-names/images.js");
        await fs.writeFile(file, data);
        await fs.writeFile(imgFile, imgData);
        // await runPrettierOn(file);
        // await runPrettierOn(imgFile);
    } catch (e) {
        console.log(e.message);
    }
}
async function generateUncompressedSprites() {
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
    // await emptySpriteSheetFolder();
    console.log("generating atlases");
    await generateAtlases();
    console.log("generating uncompressed sprites");
    await generateUncompressedSprites();
    console.log("asset generation complete");
    console.log("running the game");
}

start();
