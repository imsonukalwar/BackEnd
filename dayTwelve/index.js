const express = require("express");
const app = express();
const port = 1111;

const main = require("./database");
const User = require("./models/users");

app.use(express.json());

// GET All Users
app.get("/user", async (req, res) => {
const ans = await User.find({});
res.send(ans);
});

// POST - Create User
app.post("/user_post", async (req, res) => {
try {
    await User.create(req.body);
    res.send("Post successfully!");
} catch (err) {
    res.status(500).send(err);
}
});

// PUT - Update User
app.put("/update", async (req, res) => {
try {
    const result = await User.updateOne(
      { name: "sonu kalwar" },      // filter
      { $set: { age: 21 } }      // update
    );

    if (result.matchedCount === 0) {
    return res.send("No matching user found");
    }

    res.send("Update success!");
} catch (err) {
    console.log(err);
    res.status(500).send("Error updating user");
}
});

// DELETE - Delete User
app.delete("/delete", async (req, res) => {
try {
    const result = await User.deleteOne({ name: "sonu kalwar" });

    if (result.deletedCount === 0) {
    return res.send("No matching user found");
    }

    res.send("Delete success!");
} catch (err) {
    console.log(err);
    res.status(500).send("Error deleting user");
}
});

main()
.then(async () => {
    console.log("Connected to DB!");

    // Insert sample ONLY if not exists
    const exists = await User.findOne({ name: "sonu kalwar" });
    if (!exists) {
    await User.create({
        name: "sonu kalwar",
        age: 23,
        Gender: "male",
        city: "bengluru",
        House_n: 234,
    });
    console.log("Sample data inserted!");
    }

    app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    });
})
.catch((err) => console.log(err));
