const express = require('express')
const {registerUser,loginUser,getroutes} = require('../controllers/userController')
const router = express.Router()
const {auth,isAdmin} = require('../middleware/authMiddleware')

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/get',auth,isAdmin, getroutes)

// user route
router.get("/user-auth", auth, (req, res) => {
    res.status(200).send({ ok: true });
  });

// admin route
  router.get("/admin-auth", auth,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });


module.exports = router;