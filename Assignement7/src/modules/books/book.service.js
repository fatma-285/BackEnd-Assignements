import { db } from "../../DB/connectionDB.js";

// ? 5. Insert one document into the books collection.
export const createBook = async (req, res) => {
  try {
    const book = req.body;
    const result = await db.collection("books").insertOne(book);
    res.status(201).json({
      "acknowledge": result.acknowledged,
      message: "book added successfuly",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ? 6. Insert multiple documents into the books collection with at least three records.
export const createManyBooks = async (req, res) => {
  try {
    const books = req.body;

    if (!Array.isArray(books)) {
      return res.status(400).json({
        message: "body must be an array"
      });
    }

    if (books.length < 3) {
      return res
        .status(400)
        .json({ message: "At least 3 books are required" });
    }
    const result = await db.collection("books").insertMany(books)
    res.status(201).json({ message: "books added successfuly", insertedIds: result.insertedIds, acknowledged: result.acknowledged });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//? 8. Update the book with title “Future” change the year to be 2022.
export const updateByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const result = await db.collection("books").updateOne({ title }, { $set: { year: 2022 } });

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Book not found" });
    }

    res.status(200).json({
      message:
        result.modifiedCount > 0
          ? "Book updated successfully"
          : "Book already updated",
      acknowledged: result.acknowledged,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ? 9. Find a Book with title “Brave New World”.
export const findBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const result = await db.collection("books").findOne({ title });
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//? 10. Find all books published between 1990 and 2010.
export const getBooksBetween = async (req, res, next) => {
  try {
    const result = await db.collection("books").find({ year: { $gte: 1990, $lte: 2010 } }).toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//? 11. Find books where the genre includes "Science Fiction"
export const getBooksByGenre = async (req, res, next) => {
  try {
    const result = await db.collection("books").find({ genres: "Science Fiction" }).toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//? 12. Skip the first two books, limit the results to the next three, sorted by year in descending order.
export const skipBooksLimit = async (req, res, next) => {
  try {
    const result = await db.collection("books").find().sort({ year: -1 }).skip(2).limit(3).toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//? 13. Find books where the year field stored as an integer.
export const getBooksByYear = async (req, res, next) => {
  try {
    const result = await db.collection("books").find({ year: { $type: "int" } }).toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ? 14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".
export const getBooksNotIncludeGenres = async (req, res, next) => {
  try {
    const result = await db.collection("books").find({ genres: { $nin: ["Horror", "Science Fiction"] } }).toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ? 15. Delete all books published before 2000.
export const deleteBooksBeforeYear = async (req, res, next) => {
  try {
    let {year}=req.query
    year=Number(year);
    const result = await db.collection("books").deleteMany({ year: { $lt: year } });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "books deleted successfully", deletedCount: result.deletedCount });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//? 16. Using aggregation Functions, Filter books published after 2000 and sort them by year
//? descending.

export const aggregateBooksYear=async(req,res,next)=>{
  try {
     const result=await db.collection("books").aggregate([
      {$match:{year:{$gte:2000}}},
      {$sort:{year:-1}}
     ]).toArray();
     if (result.length === 0) {
      return res.status(404).json({ message: "book not found" });
    } 
     res.status(200).json(result);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ?17. Using aggregation functions, Find all books published after the year 2000. For each
//?     matching book, show only the title, author, and year fields.

export const aggregateBooks2=async(req,res,next)=>{
  try {
     const result=await db.collection("books").aggregate([
      {$match:{year:{$gte:2000}}},
      {$project:{title:1,author:1,year:1}}
     ]).toArray();
     if (result.length === 0) {
      return res.status(404).json({ message: "book not found" });
    } 
     res.status(200).json(result);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ?18. Using aggregation functions,break an array of genres into separate documents.

export const aggregateBooks3=async(req,res,next)=>{
  try {
     const result=await db.collection("books").aggregate([
      {$unwind:"$genres"},
     ]).toArray();
     if (result.length === 0) {
      return res.status(404).json({ message: "book not found" });
    } 
     res.status(200).json(result);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ? 19. Using aggregation functions, Join the books collection with the logs collection.

export const aggregateBooks4=async(req,res,next)=>{
  try {
     const result=await db.collection("books").aggregate([
      {$lookup:{from:"logs",localField:"_id",foreignField:"bookId",as:"logs"}},
     ]).toArray();
     if (result.length === 0) {
      return res.status(404).json({ message: "book not found" });
    } 
     res.status(200).json(result);  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}