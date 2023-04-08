import User from "../app/Http/Models/User.mjs"
import express from "express";
const router = express.Router();

router.get("/users", async (req, res) => {
    const newUser = new User({email: 'test'});
    const insertedUser = await newUser.save();
    return res.status(201).json(insertedUser)
});

export default router;
