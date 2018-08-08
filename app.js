//1 导入模块
const fs = require("fs");
const http = require("http");
const path = require("path");
const mime = require("mime");

// 根目录
let rootPath = path.join(__dirname, "www");
//2 创建服务器
let server = http.createServer((request, response) => {
    // 目标文件或文件夹路径
    let targetPath=path.join(rootPath,request.url);
    console.log(targetPath);
    // 判断地址是否存在
    if(fs.existsSync(targetPath)){
       fs.stat(targetPath,(err,status)=>{
            if(status.isFile()){
                // response.setHeader("content-type",mime.getType(targetPath));
                fs.readFile(targetPath,(err,data)=>{
                    response.end(data);
                })
            }else{
                fs.readdir(targetPath,(err,data)=>{
                    let str=``;
                    for(let i=0;i<data.length;i++){
                    str+=`<li><a href="${request.url}${request.url=="/"?"":"/"}${data[i]}">${data[i]}<a></li>`
                    }
                    response.end(`
                        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                        <html>
                         <head>
                          <title>Index of /</title>
                         </head>
                         <body>
                        <h1>Index of ${request.url=='/'?'':request.url}/</h1>
                        <ul>${str}</ul>
                        </body></html>
                    `)
                })
            }
        })
    }else{
        response.statusCode=404;
        response.setHeader("content-type","text/html;charset=utf-8");
        response.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                <h2>Not Found</h2>
                <div>抱歉,你输入的地址有误,请检查后重新输入</div>
            </body>
            </html>
        `)
    }

})


//3 监听服务器
server.listen(3000, "192.168.38.88", () => {
    console.log("监听成功")
})