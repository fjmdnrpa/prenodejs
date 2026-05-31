import { Router } from "express";
import { getUsers,
        getUserById,
        deleteUser,
        createUser } from "../controllers/users.controllers.js";

const router = Router();

router.get ("/", getUsers);
router.get("/:id", getUserById );
router.post ("/", createUser );
router.delete("/:id", deleteUser); 

export default router;


