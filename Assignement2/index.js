const path=require('node:path');
const {EventEmitter} =require('node:events')
const event=new EventEmitter();
const fs=require("node:fs");
const os=require("node:os")

//? 1-Write a function that logs the current file path and directory

// function getPath(){
//     return {File:__filename,Dir: __dirname};
// }
// console.log(getPath());

//? 2. Write a function that takes a file path and returns its file name. 

// function getFileName(filePath){
// return path.basename(filePath);
// }
// console.log(getFileName('/user/files/report.pdf'));

//? 3. Write a function that builds a path from an object 

// function buildPath(obj){
//     return path.format(obj);
// }
// console.log(buildPath({ dir: "/folder", name: "app", ext: ".js"}));

//? 4. Write a function that returns the file extension from a given file path.

// function getExtension(filePath){
// return path.extname(filePath);
// }
// console.log(getExtension('/docs/readme.md'));

//? 5. Write a function that parses a given path and returns its name and ext.

// function parsePath(Path){
// const {name:Name,ext:Ext}=path.parse(Path);
// return {Name,Ext};
// }
// console.log(parsePath('/home/app/main.js'));

//? 6. Write a function that checks whether a given path is absolute.

// function checkIfAbsolute(Path){
//     return path.isAbsolute(Path);
// } 
// console.log(checkIfAbsolute('/home/user/file.txt'));

//? 7. Write a function that joins multiple segments 

// function joinSegments(...segs){
// return path.join(...segs);
// }
// console.log(joinSegments("src", "components", "App.js"));

//? 8. Write a function that resolves a relative path to an absolute one.

// function resolvePath(Path){
//     return path.resolve(Path);
// }
// console.log( resolvePath("./index.js"));

//? 9. Write a function that joins two paths.

// function joinPaths(path1, path2){
//     return path.join(path1, path2);
// }
// console.log(joinPaths("/folder1", "folder2/file.txt"));

//? 10. Write a function that deletes a file asynchronously.

//  function deleteFile(filePath){
//  fs.unlink(filePath,(err)=>{
//     if (err){
//         console.log({err});
//     }else{
// console.log(`${path.basename(filePath)} deleted Successfully`);
//     }
//  });
// }
// deleteFile("/read-write/write.txt");

//? 11. Write a function that creates a folder synchronously.

// function createFolderSync(folder){
//     try{
//         fs.mkdirSync(folder,{recursive:true});
//         console.log(`${folder} created successfully`);
//     }catch(err){
//         console.log({err});
//     }
// }
// createFolderSync("src/trial");

//? 12. Create an event emitter that listens for a "start" event and logs a welcome message. 

// event.on("start",()=>{
//     console.log("Welcome event triggered!");
// })
// event.emit("start");

//? 13. Emit a custom "login" event with a username parameter

// event.on("login",(userName)=>{
//     console.log(`User Logged In: ${userName}`);
// })
// event.emit("login","Ahmed");

//? 14. Read a file synchronously and log its contents.

// try {
//     const fileData= fs.readFileSync("./read-write/read.txt",{encoding:'utf-8'})
// console.log({fileData});
// }catch(err){
//     console.log({err});  
// }

//? 15. Write asynchronously to a file.

// fs.writeFile("read-write/write.txt","HelloWorld",(err)=>{
//     (err)? console.log(err):"";
// })

// const Path1=path.resolve("./read-write/read.txt");
// const Path2=path.resolve("./read-write/write.txt");
// const readFileStream=fs.createReadStream(Path1,{
//     encoding:'utf-8'
// });
// const writeFileStream=fs.createWriteStream(Path2);
// readFileStream.pipe(writeFileStream);

// readFileStream.on("error",(err)=>{
// console.log({err});
// })
// writeFileStream.on("error",(err)=>{
// console.log({err});
// })

//? 16. Check if a directory exists

// function existence(dir){
// return fs.existsSync(dir);
// }
// console.log(existence("Bonus.js"));

//? 17. Write a function that returns the OS platform and CPU architecture.

// function getOsData(){
//     return {Platform:os.platform(),Arch:os.arch()}
// }
// console.log(getOsData());
