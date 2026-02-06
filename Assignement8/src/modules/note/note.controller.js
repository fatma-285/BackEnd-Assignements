import { Router } from "express";
import * as NS from "./note.service.js";
const noteRouter=Router(); 

noteRouter.post("/Create",NS.createNote);
noteRouter.patch("/Update/:id",NS.updateNote);
noteRouter.put("/Replace/:id",NS.replaceNote);
noteRouter.patch("/Update-All",NS.updateAllNotes);
noteRouter.delete("/Delete/:id",NS.deleteNote);
noteRouter.get("/Paginated",NS.getPaginatedNotes);
noteRouter.get("/Info/:id",NS.getNote);
noteRouter.get("/By-Content",NS.getNoteByContent);
noteRouter.get("/All-Notes",NS.getAllNotes);
noteRouter.get("/By-Title",NS.searchByTitle);
noteRouter.delete("/Delete-All",NS.deleteAllNotes);

export default noteRouter;