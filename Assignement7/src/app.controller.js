import express from 'express'
import { checkConnectionDb } from "./DB/connectionDB.js"
import bookRouter from './modules/books/book.controller.js'
import authorRouter from './modules/authors/author.controller.js'
import collectionRouter from './modules/collections/collection.controller.js'
import logRouter from './modules/logs/log.controller.js'
const app = express()
const port = 3000


const bootstrap = () => {
    app.use(express.json());
    app.get('/', (req, res) => res.send('Hello World!'))
    
    checkConnectionDb();
    
    app.use("/collection",collectionRouter);
    app.use("/book",bookRouter);
    app.use("/author",authorRouter); 
    app.use("/log",logRouter); 


    app.use((req, res, next) => {
        res.status(404).json({ message: `URL ${req.originalUrl} not found...🤷‍♀️🤷‍♀️` })
    })
    app.listen(port, () => console.log(`app listening on port ${port}!`))

}

export default bootstrap;