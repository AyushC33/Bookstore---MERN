import express from 'express';
import {Book} from '../models/bookModel.js'
const router = express.Router();

//Route for saving a new book
router.post("/", async (req, res) =>{
    let {title, author, publishYear} = req.body;
    try{
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message: "Send all required fields"
            });
        }
        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch(err){
        console.log(err.message);
        res.status(500)
    }
});

//Route for getting all books from database
router.get("/", async (req, res) =>{
    try {
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});

//Route for getting one book from database by id
router.get("/:id", async (req, res) =>{
    try {
        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});

//Route for updating a book
router.put("/:id", async (req, res) =>{
    let {title, author, publishYear} = req.body
    try {
        // if(!title || !author || !publishYear){
        //     return res.status(400).send({message: "send all required fields"})
        // }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "Book not Found"})
        }
        return res.status(200).send({message: "Book Updated Sucessfully"});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});

//Route for deleting a book
router.delete("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({message: "Book not Found"})
        }
        return res.status(200).send({message: "Book Deleted"})
    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});

export default router;