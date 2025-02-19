import express from 'express';
import { createNotecontroller, deleteNoteController, getNotecontroller, getNotecontrollerbyid, updateNoteController } from '../Controller/noteController.js';
const router=express.Router();


 
//create a Note

router.post("/create-note",createNotecontroller);
 

router.delete("/delete-note/:id",deleteNoteController);


router.put("/update-note/:id",updateNoteController);

router.get("/get-note/",getNotecontroller);

router.get("/updateget-note/:id",getNotecontrollerbyid);





//get all notes

export default router;
