import expressAsyncHandler from "express-async-handler";

// create catagory
const createCatagory = expressAsyncHandler(async (req, res) => {
  res.send("CREATE CATAGORY");
});

// get a catagory

// update a catagory

//delete a catagory

export { createCatagory };
