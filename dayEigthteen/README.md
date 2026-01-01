
# ⭐ **Mongoose Schema Methods – Complete Guide (Hindi + Simple)**

---

## 🔥 Topic Name (Best Title)

> **Mongoose Schema Methods – Instance, Static & Virtual (Complete Explanation with Examples)**

# 🔷 **Mongoose Me Methods Kyu Banaate Hain?**

MongoDB me user data sirf store nahi karte, balki:

* password compare
* jwt token generate
* custom search
* calculated fields
* login logic
* business logic

ye sab schema ke andar hi handle karna **best practice** hai.

Isliye Mongoose 3 special methods deta hai 👇

---

# 🏆 **Types of Mongoose Schema Methods**

| Type             | Kaam                         | Call Kaise hota hai |
| ---------------- | ---------------------------- | ------------------- |
| `schema.methods` | Individual Document par kaam | user.method()       |
| `schema.statics` | Pure Model par kaam          | User.method()       |
| `schema.virtual` | Calculated property          | user.virtualName    |

---

# 🔥 1️⃣ Instance Methods (`schema.methods`)

✔️ **Single User / Document par kaam karta hai**
✔️ `this` = current user document
✔️ Mostly Authentication me use hota hai

---

## ✅ Real Project Example – Password Compare

```js
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Instance Method
userSchema.methods.verifyPassword = async function(userPassword){
  return await bcrypt.compare(userPassword, this.password);
};
```

### ▶️ Use

```js
const user = await User.findOne({ email });

const isMatch = await user.verifyPassword(req.body.password);

if(!isMatch){
   throw new Error("Invalid Password");
}
```

---

## ⚙️ Best Use Cases

✔ Password Compare
✔ JWT Token Generate
✔ Refresh Token
✔ Profile Methods
✔ Business Logic

---

# 🔥 2️⃣ Static Methods (`schema.statics`)

✔️ **Model Level par kaam karta hai**
✔️ `this` = Model (User)
✔️ Document nahi required

---

## ✅ Real Example – Find User by Email

```js
userSchema.statics.findByEmail = function(email){
  return this.findOne({ email });
};
```

### ▶️ Use

```js
const user = await User.findByEmail("test@gmail.com");
```

---

## ⚙️ Best Use Cases

✔ Custom Queries
✔ Searching
✔ Advanced filtering
✔ Login lookup
✔ Admin operations

---

# 🔥 3️⃣ Virtual Methods (`schema.virtual`)

✔️ **DB me store nahi hota**
✔️ Sirf calculate hota hai
✔️ Response me dikhta hai

---

## ✅ Example – Full Name

```js
userSchema.virtual("fullName").get(function(){
  return this.firstName + " " + this.lastName;
});
```

### ▶️ Use

```js
const user = await User.findOne();
console.log(user.fullName);
```

---

## ⚙️ Best Use Cases

✔ Full Name
✔ Age calculation from DOB
✔ Address Format
✔ Derived Fields

---

# 🧠 Interview Short Notes

👉 `methods`

* Document based
* Example: password compare
* `user.method()`

👉 `statics`

* Model based
* Example: find by email
* `User.method()`

👉 `virtual`

* Calculated
* Example: fullName
* `user.fullName`

---

# 💎 Best Professional Practices

✔ Arrow functions ❌ (Instance me `this` break ho jata hai)
✔ Always `async/await` use karo
✔ Sensitive logic schema ke andar rakhna 👍
✔ Virtual me heavy logic mat daalo
✔ Static = Model Work
✔ Method = User Work

---

# 🎯 Summary (One Line Memory Trick)

> **Document ka kaam → `methods`
> Model ka kaam → `statics`
> Calculation ka kaam → `virtual`**

---





**`.env` file kya hota hai? Simple language me samjho 👇**

---

# 🔐 `.env` File — Secret Settings Store Karne Ka File

`.env` ek **Environment Variable File** hoti hai jisme hum apni application ke

* secrets
* passwords
* API keys
* tokens
* configuration values

**safe jagah par store karte hain**, taaki code me directly likhna na pade.

---

## 🧠 Simple Example Samjho

Agar aap JWT bana rahe ho 👇

❌ **Galat tareeka**

```js
const jwtSecret = "MY_SUPER_SECRET_KEY_12345";
```

Ye bahut risky hai,
kyunki ye code Github par upload hote hi **sabko mil jayega** 😨

---

## ✅ Sahi tareeka (.env use karke)

### 🔹 Step 1 – `.env` file banao

```
JWT_SECRET = MY_SUPER_SECRET_KEY_12345
PORT = 5000
MONGO_URL = mongodb://localhost:27017/mydb
```

---

### 🔹 Step 2 – dotenv install karo

```
npm install dotenv
```

---

### 🔹 Step 3 – isse load karo

```js
require("dotenv").config();
```

---

### 🔹 Step 4 – Use karo

```js
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT;
```

---

# ❓ `.env` file kyu use karte hain?

| Reason                   | Explanation                                 |
| ------------------------ | ------------------------------------------- |
| 🔐 Security              | Secrets public nahi hote                    |
| 🔁 Reusable              | Same code multiple environments me use hota |
| 🛠 Easy Config           | Bas value change karo, code nahi            |
| 🌍 Professional Standard | Sab industries me use hotte hain            |

---

# 🌎 Environments Kya Hote Hain?

1️⃣ Development → local computer
2️⃣ Testing
3️⃣ Production → real server

Har jagah **alag settings chahiye hoti hain**
isliye `.env` best hota hai 👍

---

# ⚠️ Important Rule

✔ `.env` ko **GitHub par kabhi upload mat karo**
Isliye ye file hamesha:

```
.gitignore
```

me add karte hain 👇

```
.env
```

---

# 🧾 Short Summary

✔ `.env` = environment configuration file
✔ Secrets yahi rakhte hain
✔ `process.env.VARIABLE_NAME` se access karte hain
✔ `.gitignore` me add karna mat bhoolna


==================================================================================================

 **“route file”**


 **“route file”** ka matlab backend (specially Express.js / Node.js) me wo **alag file** hoti hai jisme hum saare routes likhte hain — taaki code clean, organized aur maintainable rahe.


> Route file = wo file jaha saare URL path + API endpoints define hote hain.

---

## 🔥 Kyun use karte hain Route File?

Agar sab routes `app.js` me hi likh doge to file bahut badi, messy aur samajhne me mushkil ho jaegi.
Isliye routes ko **alag file me split** kar dete hain.

Benefits:
✔️ Code clean
✔️ Easy to manage
✔️ Maintain karna simple
✔️ Large project me best practice

---

## 🧠 Folder Structure Samjho

Normal project me aisa hota hai:

```
project
 ├── app.js
 ├── routes
 │    └── userRoutes.js
 └── controllers
      └── userController.js
```

---

## ✅ Basic Example — Route File kaise banti hai?

### 1️⃣ `userRoutes.js` (Route File)

```js
const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("All Users");
});

router.post("/users", (req, res) => {
  res.send("User Created");
});

module.exports = router;
```

---

### 2️⃣ `app.js` me use kaise karte hain?

```js
const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);

app.listen(5000, () => console.log("Server Running..."));
```

Ab routes aise chalenge:

* `GET /api/users`
* `POST /api/users`

---

## 🔥 Dynamic Route Example

```js
router.get("/users/:id", (req, res) => {
  res.send("User id = " + req.params.id);
});
```

---

## 🎯 Short Summary

| Term       | Meaning                                         |
| ---------- | ----------------------------------------------- |
| Route File | Jisme routes likhe jate hain                    |
| router     | Express ka mini app routes handle karne ke liye |
| app.use()  | route file ko main app me connect karta hai     |

---