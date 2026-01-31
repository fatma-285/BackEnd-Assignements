import { Router } from "express";
import * as BS from "./book.service.js"

const bookRouter=Router();

bookRouter.post("/",BS.createBook);

bookRouter.post("/patch",BS.createManyBooks)

bookRouter.patch("/patch-by-title",BS.updateByTitle);

bookRouter.get("/find-by-title",BS.findBookByTitle)

bookRouter.get("/find-between",BS.getBooksBetween)

bookRouter.get("/find-by-gener",BS.getBooksByGenre)

bookRouter.get("/skip-limit",BS.skipBooksLimit)

bookRouter.get("/find-int-year",BS.getBooksByYear)

bookRouter.get("/not-include-genres",BS.getBooksNotIncludeGenres)

bookRouter.get("/delete-before-year",BS.deleteBooksBeforeYear)

bookRouter.get("/aggregate-year",BS.aggregateBooksYear)

bookRouter.get("/aggregate-year2",BS.aggregateBooks2)

bookRouter.get("/aggregate3",BS.aggregateBooks3)

bookRouter.get("/aggregate4",BS.aggregateBooks4)

export default bookRouter