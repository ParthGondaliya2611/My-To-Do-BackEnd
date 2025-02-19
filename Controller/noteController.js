import Note from "../Model/noteModel.js";

export const getNotecontroller = async (req, res) => {
  try {
    const get = await Note.find();

    res.status(200).json({ success: true, data: get });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNotecontrollerbyid = async (req, res) => {
  try {
    const todoId = req.params.id;

    const update = await Note.find({ _id: todoId });

    res.status(200).json({ success: true, data: update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createNotecontroller = async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Note.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "To-Do Note not found!" });
    }

    res.status(200).json({
      success: true,
      message: "To-Do Note deleted successfully!",
      todo: deletedTodo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "error  while delete note" });
  }
};

export const updateNoteController = async (req, res) => {
  try {
    const todoId = req.params.id;

    const update = await Note.find({ _id: todoId });

    if (!update) {
      return res.status(404).json({ message: "To-Do Note not found!" });
    }
    const updateTodo = await Note.findByIdAndUpdate({ _id: todoId }, req.body);

    res
      .status(200)
      .json({
        success: true,
        message: "To-Do Note update successfully!",
        todo: updateTodo,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "error  while update note" });
  }
};
