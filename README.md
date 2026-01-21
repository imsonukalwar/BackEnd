


## 🔥 Core Backend Dependencies 

---

## 1️⃣ **express**

### 👉 Kyon use hoti hai?

* Backend server banane ke liye
* Routes (`/login`, `/signup`) handle karta hai
* API banane ka base

### 📦 Install

```bash
npm install express
```

---

## 2️⃣ **mongoose**

### 👉 Kyon use hoti hai?

* MongoDB ko Node.js se connect karne ke liye
* Schema & Model banane ke liye
* Database me data save / fetch

### 📦 Install

```bash
npm install mongoose
```

---

## 3️⃣ **dotenv**

### 👉 Kyon use hoti hai?

* Secret cheezein hide karne ke liye

  * DB URL
  * JWT secret
* `.env` file se variables load karta hai

### 📦 Install

```bash
npm install dotenv
```

---

## 4️⃣ **cors**

### 👉 Kyon use hoti hai?

* Frontend (React) ko backend se connect karne ke liye
* **CORS error** solve karta hai

### 📦 Install

```bash
npm install cors
```

---

## 5️⃣ **bcrypt / bcryptjs**

### 👉 Kyon use hoti hai?

* Password **encrypt (hash)** karne ke liye
* Security ke liye (plain password save nahi hota)

### 📦 Install

```bash
npm install bcrypt
```

ya

```bash
npm install bcryptjs
```

---

## 6️⃣ **jsonwebtoken (JWT)**

### 👉 Kyon use hoti hai?

* Login ke baad **token generate** karne ke liye
* User authentication / authorization

### 📦 Install

```bash
npm install jsonwebtoken
```

---

## 7️⃣ **nodemon** (devDependency)

### 👉 Kyon use hoti hai?

* Server auto-restart karta hai
* Baar-baar `node index.js` likhne ki zarurat nahi

### 📦 Install

```bash
npm install nodemon --save-dev
```

---

## 8️⃣ **body-parser** (optional)

### 👉 Kyon use hoti hai?

* Request body (`req.body`) read karne ke liye
* JSON / form data handle karta hai

⚠️ Express me ab mostly **built-in** hota hai

### 📦 Install (agar use kiya ho)

```bash
npm install body-parser
```

---

## 🟡 Agar tumne file upload kiya hai to 👇

## 9️⃣ **multer**

### 👉 Kyon use hoti hai?

* Image / file upload ke liye
* Profile pic, product image etc.

### 📦 Install

```bash
npm install multer
```

---

## 🟡 Agar email feature hai 👇

## 🔟 **nodemailer**

### 👉 Kyon use hoti hai?

* Signup email
* OTP / password reset mail

### 📦 Install

```bash
npm install nodemailer
```
---

## 📊 Summary (Tumne approx itni use ki hongi)

| Type     | Count                   |
| -------- | ----------------------- |
| Core     | 6–7                     |
| Optional | 3–4                     |
| Total    | **8–12 dependencies** ✅ |

---
------------------------------------------------


## ✅ 1️⃣ `bcrypt`

```json
"bcrypt": "^6.0.0"
```

### 🔹 Kyon use hoti hai?

* Password **hash (encrypt)** karne ke liye
* Login system ka **most important security part**

### 📦 Install

```bash
npm install bcrypt
```

### ✅ Correct & Required

✔ Ye dependency **bilkul sahi** hai

---

## ✅ 2️⃣ `cookie-parser`

```json
"cookie-parser": "^1.4.7"
```

### 🔹 Kyon use hoti hai?

* Browser se aane wali **cookies read** karne ke liye
* JWT ko **cookie me store** kar rahe ho to zaroori

### 📦 Install

```bash
npm install cookie-parser
```

### ✅ Correct

✔ Agar JWT cookie me hai → **must**

---

## ✅ 3️⃣ `dotenv`

```json
"dotenv": "^17.2.3"
```

### 🔹 Kyon use hoti hai?

* `.env` file se **secret data** read karne ke liye

  * DB_URL
  * JWT_SECRET

### 📦 Install

```bash
npm install dotenv
```

### ✅ Correct & Mandatory

---

## ⚠️ 4️⃣ `express`

```json
"express": "^5.2.1"
```

### 🔹 Kyon use hoti hai?

* Backend server
* Routes, middleware, API handling

### ⚠️ PROBLEM

❌ **Express 5 stable nahi hai (breaking changes)**
Industry me abhi bhi **Express 4.x** use hota hai

### ✅ Best version

```bash
npm install express@4
```

👉 Strongly recommend: **downgrade karo**

---

## ✅ 5️⃣ `jsonwebtoken`

```json
"jsonwebtoken": "^9.0.3"
```

### 🔹 Kyon use hoti hai?

* Login ke baad **JWT token generate & verify**
* Authentication / Authorization

### 📦 Install

```bash
npm install jsonwebtoken
```

### ✅ Correct

---

## ❌ 6️⃣ `middleware`

```json
"middleware": "^1.0.0"
```

### ❌ Sachai

* Ye **Express ka official package nahi**
* Usually **custom middleware** hum khud likhte hain

### ❌ Recommended action

👉 **REMOVE karo**

```bash
npm uninstall middleware
```

---

## ✅ 7️⃣ `mongoose`

```json
"mongoose": "^9.1.2"
```

### 🔹 Kyon use hoti hai?

* MongoDB connect karne ke liye
* Schema & Model banane ke liye

### 📦 Install

```bash
npm install mongoose
```

### ⚠️ Note

* v9 thoda new hai → agar issue aaye to v8 stable hai

---

## ❌ 8️⃣ `radis`

```json
"radis": "^2.0.0"
```

### ❌ PROBLEM

* ❌ **Typing mistake**
* ❌ Ye package **galat / useless**

### ✅ Action

```bash
npm uninstall radis
```

---

## ✅ 9️⃣ `redis`

```json
"redis": "^5.10.0"
```

### 🔹 Kyon use hoti hai?

* Cache (fast data access)
* OTP store
* Rate limiting
* Session handling

### 📦 Install

```bash
npm install redis
```

### ✅ Correct

✔ `radis` ki jagah **sirf redis rakho**

---

## ❌ 1️⃣0️⃣ `route`

```json
"route": "^0.2.5"
```

### ❌ Sachai

* Express me **routing already built-in** hoti hai
* Ye package **koi real use ka nahi**

### ❌ Remove karo

```bash
npm uninstall route
```

---

## ✅ 1️⃣1️⃣ `validator`

```json
"validator": "^13.15.26"
```

### 🔹 Kyon use hoti hai?

* Email validation
* Password strength check
* Phone number validation

### 📦 Install

```bash
npm install validator
```

### ✅ Very good practice

---

## 🔥 FINAL CLEAN DEPENDENCY LIST (Recommended)
moved:

* middleware
* radis
* route

---




# BackEnd
backend code 
