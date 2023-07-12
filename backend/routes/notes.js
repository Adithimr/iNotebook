const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE1 Get all the notes  using :GET "/api/notes/fetchnotes". login required
try {
  router.get("/fetchnotes", fetchuser, async (req, res) => {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

//ROUTE2 Add new notes using :POST "/api/notes/addnote". login required
try {
  router.post(
    "/addnote",
    fetchuser,
    [
      body("title", "enter the valid title").isLength({ min: 3 }),
      body("description", "description must 5 character atleast").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
      const { title, description, tag } = req.body;

      //if there are errors,return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    }
  );
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

//ROUTE3 update notes using :POST "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE4 delete notes using :DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if user owns the notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
