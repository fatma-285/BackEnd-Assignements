//* //////////////////////////////////////////////////////////////////////
//*                         Part1: Core Modules                          /
//* //////////////////////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path');
const { createGzip } = require("node:zlib");
const gZip = createGzip();

const absolutePath1 = path.resolve("./data.txt");
const absolutePath2 = path.resolve("./data2.txt");
const absolutePath3 = path.resolve("./data3.zip");

const readFileStream = fs.createReadStream(absolutePath1, {
    encoding: "utf-8",
    highWaterMark: 100
});

const writeFileStream = fs.createWriteStream(absolutePath2);
const writeFileStreamZip = fs.createWriteStream(absolutePath3);

//?  1. Use a readable stream to read a file in chunks and log each chunk.

// readFileStream.on("data", (chunk) => {
//     console.log("****************chunk****************");
//     console.log(chunk);
// })

// readFileStream.on("open", () => {
//     console.log("****************open****************");
// })

// readFileStream.on("close", () => {
//     console.log("****************close****************");
// })

//? 2. Use readable and writable streams to copy content from one file to another.

// readFileStream.on("data", (chunk) => {
//     writeFileStream.write(chunk);
// })

//? 3. Create a pipeline that reads a file, compresses it, and writes it to another file.

// readFileStream.pipe(gZip).pipe(writeFileStreamZip);


//* ///////////////////////////////////////////////////////////////////////
//*                   Part2: Simple CRUD Operations Using HTTP           */
//* ///////////////////////////////////////////////////////////////////////

const http = require("node:http");
const { writeFileSync } = require('node:fs');
let port = 3000;
const users = JSON.parse(fs.readFileSync("./users.json", { encoding: "utf-8" }));



const server = http.createServer((req, res) => {
    const { method, url } = req;
    function resHead(code){
        return{
            res:res.writeHead(code,{ "Content-Type": "application/json"}),
        }
    }
    function resWrite(message,code,...args){
        return{
            res:res.write(JSON.stringify({message:message,statusCode:code,data:args})),
        }
    }
    if (method == "GET" && url == "/") {
        resHead(200);
        resWrite("Welcome!",200);
        return res.end();

    } else if (method == "GET" && url == "/users") {
// =================================== GET ALL USERS ===================================
        resHead(200);
        resWrite("Users Fetched Successfully!",200, users);
        return res.end();
    } else if (method == "GET" && url.startsWith("/users/")) {
// =================================== GET User =========================================
        const id = url.split("/")[2];
        const user = users.find((user) => user.id == id);
        if (!user) {
           resHead(404);
           resWrite("user not found",404);
        return res.end();

        }
        resHead(200);
        resWrite("User Fetched Successfully!",200,user);   
        return res.end();

    }
    else if (method == "POST" && url == "/users") {
// ================================== ADD NEW USER =======================================
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
            const { name, email, age } = JSON.parse(data);
            const isExist = users.find((user) => user.email === email);
            if (isExist) {
               resHead(409);
               resWrite(`${email} is Already Exist`,409);
            }
            const id = users.length + 1;
            users.push({id, name, email, age });
            writeFileSync("./users.json", JSON.stringify(users));
            resHead(201);
            resWrite(`${email} added successfully`,201);
        return res.end();

        })
    } else if (method == "PATCH" && url.startsWith("/users/")) {
// ================================== UPDATE USER =======================================
        const id = Number(url.split("/")[2]);
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
        const { email, name, age } = JSON.parse(data);
        const user = users.find((user)=>{
            if(user.id==id){
                user.email = email??user.email;
                user.name = name??user.name;
                user.age = age??user.age;
                return user;
            }
        });
        if (!user) {
           resHead(404);
           resWrite("user not found",404);
        return res.end();

        }
        const isExist = users.find((user) => user.email === email && user.id != id);
        if (isExist) {
            resHead(409);
            resWrite(`${email} is Already Exist`,409);
        return res.end();

        }
            writeFileSync("./users.json", JSON.stringify(users));
            resHead(200);
            resWrite(`${email} updated successfully`,200);
        return res.end();

        })
    }else if(method=="DELETE"&&url.startsWith("/users/")){
//================================== DELETE USER ======================================= 
        const id = Number(url.split("/")[2]);
        const userIndex=users.findIndex((user)=>{
            return user.id==id;
        })
        if(userIndex==-1){
          resHead(404);
          resWrite("user not found",404);  
        return res.end();

        }
        users.splice(userIndex,1);
//TODO: handle deleted id reuse issue
        writeFileSync("./users.json", JSON.stringify(users));
        resHead(200);
        resWrite(`user with id ${id} deleted successfully`,200);
        return res.end();

    }
    else {
// ================================= PAGE NOT FOUND ===================================
        resHead(404);
        resWrite("page not found",404);
        return res.end();

    }
})

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        port++;
    }
})
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

//* ////////////////////////////////////////////////////////////////////////
//*                          Part3: Node Internals                         / 
//* ////////////////////////////////////////////////////////////////////////

//? 1. What is the Node.js Event Loop?
// mechanism that Node js use to handle asynchronous operations,
// it is coninuously running even there is no request in event queue  
/* -------------------------------------------------------------------------- */
//? 2. What is Libuv and What Role Does It Play in Node.js? 
// it`s c library that handle event loop and I/O operations asynchronosly
/* -------------------------------------------------------------------------- */
//? 3. How Does Node.js Handle Asynchronous Operations Under the Hood? 
/*
1- client sends a request.
2- libuv detects async operations and decides assigning to os or kernel threads 
3- request is registered, and its callback is stored in the event queue.
4- event loop monitors the call stack. When the call stack is empty, it assigns tasks to kernel threads if wanted.
5- kernel thread completes the task and signals completion.
6- callback is moved from event queue to call stack by event loop
7- main thread executes the callback and sends the response to the client.
*/ 
/* -------------------------------------------------------------------------- */
//? 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?
/*
//*call stack:
where functions be stacked to be executed
//*event queue:
it is the queue where requests are stored to be executed.
FIFO structure
each request include callback function that exucuted when the request is done
//*event loop:
where main thread take requests from event queue and assign them to kernel threads
*/ 
/* -------------------------------------------------------------------------- */
//? 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? 
//  kernal threads that are used to execute tasks in parallel by event loop its default size is 4
//  size can be set by process.env.UV_THREADPOOL_SIZE
/* -------------------------------------------------------------------------- */
//? 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
/*
//* Blocking Code:
execute operations directly on the main thread
pauses the event loop until the operation is complete and any other requests have to wait.
//* Non-blocking Code:
execute operations on the kernel thread or os
continues executing other code on the main thread.
*/ 