
## 1️⃣ Redis kya hai?

**Redis = Remote Dictionary Server**

👉 Redis ek **in-memory database** hai
👉 Data **RAM** me store hota hai (disk nahi)

Isliye:

* ⚡ Bahut **fast**
* 🚀 High performance
* 🧠 Mostly **temporary data** ke liye use hota hai

---

## 2️⃣ Redis kyun use karte hain? (Why we use Redis)

### Redis use hota hai:

✅ Caching
✅ Session store
✅ OTP store
✅ Rate limiting
✅ Token blacklist
✅ Queue system
✅ Real-time counters

### Example:

* Login ke baad user ka data Redis me cache
* OTP 5 minute ke liye store
* API call limit check

👉 **MongoDB / MySQL slow hote hain**
👉 Redis **100x faster** hota hai (kyunki RAM)

---

## 3️⃣ Redis data kaise store karta hai? (How Redis stores data)

Redis **Key–Value** format me data store karta hai:

```
key → value
```

### Data types:

| Type   | Example             |
| ------ | ------------------- |
| String | "sonu"              |
| Number | 100                 |
| List   | [1,2,3]             |
| Set    | unique values       |
| Hash   | object (JSON jaisa) |

### Example:

```js
SET user:1 "Sonu"
GET user:1
```

👉 Redis me **TTL (expiry)** bhi hota hai

```js
SET otp 123456 EX 300
```

(300 seconds = 5 min)

---

## 4️⃣ Redis kaise install karein? (How to install Redis)

### 🔹 Option 1: Redis Cloud (BEST & EASY)

👉 Production ke liye recommended

Steps:

1. [https://redis.com](https://redis.com)
2. Sign up
3. Create database
4. Copy:

   * Host
   * Port
   * Password

👉 Tum already **Redis Cloud** use kar rahe ho ✔️

---

### 🔹 Option 2: Local Redis (Windows/Linux/Mac)

#### Linux / Mac:

```bash
sudo apt install redis
redis-server
```

#### Windows:

Redis officially support nahi karta
👉 Use **Redis Cloud** or **Docker**

---

## 5️⃣ Node.js se Redis kaise connect karein?

### Step 1: Install redis package

```bash
npm install redis
```

### Step 2: Connect code

```js
const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "REDIS_HOST",
    port: 14262
  },
  password: "REDIS_PASSWORD"
});

redisClient.on("error", (err) => {
  console.log("Redis Error", err);
});

(async () => {
  await redisClient.connect();
  console.log("Redis Connected");
})();
```

---

## 6️⃣ Redis me data kaise save / read karein?

### Save data

```js
await redisClient.set("name", "Sonu");
```

### Read data

```js
const data = await redisClient.get("name");
console.log(data);
```

### Expiry ke sath

```js
await redisClient.set("otp", "123456", {
  EX: 300
});
```

---

## 7️⃣ Rate Limiter kya hota hai? 🚦

### Simple words me:

👉 **Ek user kitni baar request kar sakta hai — control karna**

### Example:

* 1 minute me max **5 requests**
* Zyada hua → ❌ Block

---

## 8️⃣ Redis se Rate Limiter kaise kaam karta hai?

### Logic:

1️⃣ User request aata hai
2️⃣ Redis me counter badhao
3️⃣ Counter limit cross → block

### Example code:

```js
const key = `rate:${userId}`;
const count = await redisClient.incr(key);

if (count === 1) {
  await redisClient.expire(key, 60); // 1 minute
}

if (count > 5) {
  return res.status(429).send("Too many requests");
}
```

---

## 9️⃣ HLD kya hota hai? (High Level Design)

### HLD = System ka **big picture**

👉 Kaunsa component kya karega
👉 Data ka flow
👉 Tech stack
👉 Scalability

### Example (Login System HLD):

```
Client
  ↓
API Server (Express)
  ↓
Redis (OTP, rate limit)
  ↓
MongoDB (User data)
```

---

## 🔟 Redis vs MongoDB (short)

| Redis          | MongoDB        |
| -------------- | -------------- |
| RAM based      | Disk based     |
| Super fast     | Slower         |
| Temporary data | Permanent data |
| Cache / OTP    | User data      |

---

## 🔥 Interview Ready One-Line Answers

**Q: Redis kya hai?**
👉 In-memory key-value database for high speed data access

**Q: Redis kyun use hota hai?**
👉 Fast caching, session, OTP, rate limiting

**Q: Rate limiter kya hai?**
👉 API abuse se bachane ka mechanism

**Q: HLD kya hota hai?**
👉 System ka high-level architecture design

