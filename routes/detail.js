import express from "express";

const router = express.Router();

router.get("/details", async (req, res) => {
  try {
    let user = req.user.username;
    if (!user) {
      return res.json({ error: "User not found" });
    }
    res.json({ data: user });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal Server Error..." });
  }
});

export const detailRouter = router;
