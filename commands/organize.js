let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'ppt', 'pptx'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn(dirPath) {
    let destPath;
    if(dirPath == undefined)
    {
        destPath = process.cwd();
        return;
    }
    else
    {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist)
        {
            destPath = path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath) == false)
            {
                fs.mkdirSync(destPath);
            }
        }
        else
        {
            console.log("Enter a valid path!");
            return;
        }
    }
    organizeHelper(dirPath,destPath);
}

function organizeHelper(src, dest)
{
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    for(let i=0;i<childNames.length; i++)
    {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile)
        {
            //console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "-> ", category);
            sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(childAddress, dest, category)
{
     let categoryPath = path.join(dest,category);
     if(fs.existsSync(categoryPath) == false)
     {
        fs.mkdirSync(categoryPath);
     }
     let fileName = path.basename(childAddress);
     let destFilePath = path.join(categoryPath,fileName);
     fs.copyFileSync(childAddress,destFilePath);
     //fs.unlinkSync(childAddress); --> to remove the files from the original path (cut function)
     console.log(fileName, "copied to -> ", category);
}

function getCategory(name)
{
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types)
    {
        let currTypeArr = types[type];
        for(let i=0; i<currTypeArr.length; i++)
        {
            if(ext == currTypeArr[i]){
                return type;
            }
        }
    }
    return "Other type";
    
}

module.exports = {
    organieKey : organizeFn
}