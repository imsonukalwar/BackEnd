

# 🔐 Sliding Window Rate Limiter (Complete Explanation)

## 🧠 Sabse Pehle: Rate Limiting Kya Hai?

**Rate Limiting** ka matlab:

> “Ek user / IP fixed time me limited request hi bhej sakta hai”

Example:

* 1 hour → max **60 requests**
* 61st request → ❌ block

---

## ❌ Fixed Window Problem (Samjho Pehle)

### Rule:

> 1 hour = 60 request

### Problem:

Agar user:

* 1:59 PM → 60 request
* 2:01 PM → phir 60 request

👉 2 minute me **120 request** 😱
Security fail ❌

---

## ✅ Sliding Window Solution

👉 **Har request ka exact time store hota hai**
👉 **Last X time ka data hi count hota hai**

Isliye cheating possible nahi ✔️

---

## 🪟 Sliding Window Kya Hai?

**Sliding Window** =

> “Current time se pichle 1 hour tak ka data”

Window **move (slide)** karta rehta hai har request pe

---

## 🧩 Real-Life Example (Best Samajhne Ke Liye)

### Rule:

* 1 hour → max 5 requests

### User Requests Time:

```
10:00
10:10
10:20
10:30
10:40
```

✔ 5 request allowed

### 6th Request:

```
10:50 ❌ BLOCK
```

---

### Ab Window Slide Hoga

User fir request kare:

```
11:01
```

Sliding window = **10:01 → 11:01**

👉 10:00 wali request bahar ho gayi
👉 Ab sirf 4 request count hongi
✔ Request allowed

---

## 🧠 Sliding Window Ka Golden Rule

> **"Current time – window size" ke pehle ka data delete kar do**

---

# 🧰 Redis Me Sliding Window Kaise Kaam Karta Hai?

Hum use karte hain:

## 📦 Redis Sorted Set (ZSET)

| Part  | Use               |
| ----- | ----------------- |
| score | request ka time   |
| value | unique request id |

---

## 🔑 Redis Key Structure

```txt
IP:192.168.1.5
```

Har IP ka apna alag record

---

## 🧾 Redis Data Example

```txt
ZSET IP:192.168.1.5
--------------------------------
score (time)    value
1700000000      1700000000:0.23
1700000300      1700000300:0.88
1700000600      1700000600:0.55
```

---

# 🔄 Sliding Window Step-by-Step Flow

### Step 1️⃣ Current Time

```js
current_time = Date.now() / 1000
```

---

### Step 2️⃣ Window Start Time

```js
windowStart = current_time - windowSize
```

Example:

```
current_time = 11:10
windowSize = 1 hour

windowStart = 10:10
```

---

### Step 3️⃣ Purani Requests Delete

```js
ZREMRANGEBYSCORE key 0 windowStart
```

Meaning:

> “10:10 se pehle wali sari requests hata do”

---

### Step 4️⃣ Count Bachi Hui Requests

```js
ZCARD key
```

Agar count > limit → ❌ block

---

### Step 5️⃣ New Request Add

```js
ZADD key score value
```

---

### Step 6️⃣ Key Expire

```js
EXPIRE key windowSize
```

👉 Memory safe

---

# 🧠 Diagram (Text Version)

```
TIME  ─────────────────────────▶

|---- old ----|---- WINDOW ----|
               ↑
          current time

❌ old requests deleted
✅ only window requests counted
```

---

# ⚖️ Sliding vs Fixed Window

| Feature        | Fixed Window | Sliding Window |
| -------------- | ------------ | -------------- |
| Accuracy       | ❌            | ✅              |
| Burst Attack   | ❌ possible   | ❌ blocked      |
| Complexity     | Easy         | Medium         |
| Real-world use | ❌            | ✅              |

---

# 🚀 Real World Use Cases

✔ Login attempts
✔ OTP sending
✔ Payment APIs
✔ Public APIs
✔ DDOS protection

---

# 🧪 Your Code Is Using Sliding Window ✔️

Tumhara logic **industry-standard** hai
Netflix, GitHub, Cloudflare same idea use karte hain 🔥

---

## 🔧 Small Improvements (Pro Level)

```js
res.status(429).json({
  message: "Too many requests, try after some time"
});
```



=====================================================================================================================
>>>>>>EXAMPLE CODE
Ye code **Redis based Rate Limiter (Sliding Window)** hai
👉 matlab: **ek IP 1 hour me max 60 request** kar sakta hai.

## 🔰 Sabse Pehle Samjho: Rate Limiter Kya Hai?

**Rate Limiter** =

> “Koi bhi user / IP limited time me limited request hi bhej sakta hai”

Example:

* 1 hour = max **60 request**
* 61st request → ❌ block

---

## 📦 Imports

```js
const radis = require('redis');
const radisClient = require("../config/radis.js")
```

✔ Redis client import ho raha hai
✔ `radisClient` already Redis se connected hai

---

## ⏱️ Config Values

```js
const windowSize = 3600; // 1 hour (seconds)
const max_req = 60;     // max requests
```

| Variable   | Meaning                 |
| ---------- | ----------------------- |
| windowSize | 1 ghanta ka time window |
| max_req    | ek IP max 60 request    |

---

## 🚪 Middleware Function

```js
const ratelimiter = async (req, res, next) => {
```

👉 Ye **middleware** hai
👉 Har request pe chalega **route ke pehle**

---

## 🔑 Redis Key Banana

```js
const key = `IP:${req.ip}`;
```

Example:

```
IP:192.168.1.10
```

👉 Har IP ka **alag record** Redis me store hoga

---

## 🕒 Current Time Nikalna

```js
const current_time = Date.now() / 1000;
```

✔ `Date.now()` → milliseconds
✔ Redis seconds me kaam karta hai → isliye `/1000`

---

## ⏳ Window Start Time

```js
const windowTime = current_time - windowSize;
```

### Example samjho:

* Current time = **2:10 PM**
* Window size = **1 hour**

👉 Window start = **1:10 PM**

Matlab:

> **1:10 se pehle wali requests delete kar do**

---

## 🧹 Purani Requests Delete Karna

```js
await radisClient.zRemRangeByScore(key, 0, windowTime);
```

👉 Redis ke **Sorted Set** se:

* score = time
* 0 se lekar `windowTime` tak → delete

Simple words:

> “1 hour se purani sari requests hata do”

---

## 🔢 Current Requests Count

```js
const num_of_req = await radisClient.zCard(key);
```

👉 Bata raha hai:

> “Last 1 hour me is IP ne kitni request bheji?”

---

## 🚫 Limit Cross Check

```js
if (num_of_req > 60) {
    throw new Error("num. of req is excedes")
}
```

👉 Agar request **60 se zyada**:
❌ user block
❌ next route nahi chalega

---

## ➕ Nayi Request Add Karna

```js
await radisClient.zAdd(key, [
  { score: current_time, value: `${current_time}:${Math.random()}` }
]);
```

✔ Sorted Set me add:

* **score** = time
* **value** = unique string (collision na ho isliye)

---

## ⏲️ Expire Set Karna

```js
await radisClient.expire(key, windowSize);
```

👉 Agar user inactive ho jaye:

* Redis automatically data delete kar dega
* Memory safe rahegi

---

## ➡️ Request Allow

```js
next();
```

👉 Sab sahi hai → request aage route me jayegi

---

## ❌ Error Case

```js
catch (err) {
    res.send("user is not exist in your DB")
}
```

⚠️ Message thoda galat hai
Better hoga:

```js
res.status(429).send("Too many requests, try later");
```

---

## 🧠 Poora Flow Ek Line Me

1️⃣ IP se key bani
2️⃣ Last 1 hour ka data rakha
3️⃣ Purani requests delete hui
4️⃣ Current requests count hui
5️⃣ Limit cross → block
6️⃣ Nayi request save
7️⃣ Route allow

---

## 🔥 Real-World Use

✔ Login API
✔ OTP send
✔ Password reset
✔ Public APIs
✔ DDOS protection

---

Agar chaho to mai:

* 🔐 **JWT + Redis**
* ⚡ **Fixed window vs Sliding window**
* 🧪 **Postman test kaise kare**

bhi samjha deta hoon 👍
