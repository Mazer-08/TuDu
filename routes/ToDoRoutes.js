const {Router} = require("express")
const {registerUser, loginUser, getToDos, saveToDos, updateToDos, deleteToDos} = require("../controller/ToDoController")
const router = Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", getToDos);
router.post("/save", saveToDos);
router.put("/update/:id", updateToDos);
router.delete("/delete/:id", deleteToDos);

module.exports = router;