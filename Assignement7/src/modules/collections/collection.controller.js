import { Router } from "express";
import * as CS from "./collection.service.js"

const collectionRouter=Router()

collectionRouter.post("/book",CS.createBookCollection);

collectionRouter.post("/author",CS.createAuthorCollection);

collectionRouter.post("/log",CS.createLogCollection);

collectionRouter.post("/book/index",CS.createBookIndex);

export default collectionRouter