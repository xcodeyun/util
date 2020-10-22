const fs = require("fs");
const path = require("path");
const qn = require("qn");

// 自定义配置项
const CONFIG = {
  accessKey: "**********", // 七牛云密钥1
  secretKey: "**********", // 七牛云密钥2
  bucket: "**********", // 七牛云存储桶名
  origin: "**********", // 七牛云绑定域名
  dist: "**********", // 存储目标(本地 文件/文件夹 路径)
  targetPath: "**********" // 存储到云存储的路径名
};

let allUpload = 0; // 需要上传的文件总数
let havaUpload = 0; // 已经上传的文件总数
let urls = []; // 文件的网络url地址

// 配置七牛云上传对象
const client = qn.create({
  accessKey: CONFIG.accessKey,
  secretKey: CONFIG.secretKey,
  origin: CONFIG.origin,
  bucket: CONFIG.bucket,
  uploadURL: "**********" // 七牛云存储的分区URL
});

// 文件递归筛查逻辑
function getFile(pathn) {
  let pathfn = fs.readdirSync(path.resolve(__dirname, pathn));
  pathfn.forEach(v => {
    let pathName = pathn + "/" + v;
    let stat = fs.statSync(path.resolve(pathName));
    if (stat.isFile()) {
      allUpload += 1;
      let oriName = `${CONFIG.targetPath}/` + v;
      upload(oriName, pathName);
    } else {
      getFile(pathName);
    }
  });
}

// 文件上传逻辑
function upload(key, pathName) {
  client.uploadFile(pathName, { key }, function (err, result) {
    havaUpload += 1;
    urls.push(result.url);
    if (allUpload == havaUpload) {
      console.log(urls);
    }
  });
}

// 入口函数
getFile(CONFIG.dist);