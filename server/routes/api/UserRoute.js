const UserModel = require('../../models/User');
const { signToken } = require('../../utils/auth'); //jwt
const router = require('express').Router();

validateBook = async (user, id) => {
  let index = await user.books.findIndex(n => n.id == id);
  if (index !== -1) {
    return index;
  } else {
    user.books.push({ id });
    await user.save()
    return user.books.length - 1
  }
}

router.post('/signup/:mail/:name', async (req, res) => {
  try {
    const { mail, name } = req.params;

    const newUser = new UserModel({ mail, name });
    await newUser.save();
    // Generate token for the new user
    const token = signToken(newUser);
    res.status(200).json({ token, newUser }); 

  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.get('/login/:mail', async (req, res) => {
  try {
    const { mail } = req.params;
    const user = await UserModel.findOne({ mail });
    
    if (!user) {
      return res.status(404).send("You haven't signed up yet.");
    }
    
    const token = signToken(user);
    
    res.status(200).json({ token, user: { name: user.name, mail: user.mail, homebook: user.homebook } });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server is having some trouble.");
  }
});



router.post('/rename/:mail/:name', async (req, res) => {
  try {
    const { mail, name } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      user.name = name;
      await user.save();
      res.status(200).send("User renamed Successfully!")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/cleardata/:mail', async (req, res) => {
  try {
    const { mail, name } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      user.books = [];
      await user.save();
      res.status(200).send("Data cleared")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/sethomebook/:mail/:id', async (req, res) => {
  try {
    const { mail, id } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      user.homebook = id;
      await user.save();
      res.status(200).send("Homebook set Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/removehomebook/:mail', async (req, res) => {
  try {
    const { mail } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      user.homebook = null;
      await user.save();
      res.status(200).send("Homebook removed Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/ratebook/:mail/:id/:rating', async (req, res) => {
  try {
    const { mail, id, rating } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].rating = rating;
      await user.save();
      res.status(200).send("Rated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatepage/:mail/:id/:page', async (req, res) => {
  try {
    const { mail, id, page } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].pagenow = page;
      await user.save();
      res.status(200).send("Page updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatereview/:mail/:id/:review', async (req, res) => {
  try {
    const { mail, id, review } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].review = review;
      await user.save();
      res.status(200).send("Review updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatenotes/:mail/:id/:notes', async (req, res) => {
  try {
    const { mail, id, notes } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      let newnotes = JSON.parse(notes)
      user.books[index].notes = newnotes;
      await user.save();
      res.status(200).send("Notes updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/deletereview/:mail/:id', async (req, res) => {
  try {
    const { mail, id } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].review = null;
      await user.save();
      res.status(200).send("Review deleted Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.get('/getbook/:mail/:id', async (req, res) => {
  try {
    const { mail, id } = req.params;
    const user = await UserModel.findOne({ mail });
    if (!user) res.status(404).send("No such user");
    else {
      let data = user.books.find(n => n.id == id)
      if (!data) {
        res.status(204).send({})
      } else {
        res.status(200).send(data)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});




module.exports = router;