password never saved inside the jwd tockens because password is sencetive information ,{whatever you think this is not sencetive you can put inside the(JWT)tocken not sencetive data}.

JWT(tocken)==Header.Payload.Digital Signature   >>>>>the structure of JWT  tocken


Payload=={
user_name:"sonu kawar",
emailID:sonukumar@gamil.come,
....}<<<only store user insenstive information like

Digital Sigsnture find
````
(hearde+Payload)<<<-------(hash code)
{encrypt the hash code}===Digital Signature

if you want to decrypt the digital Signature >>> use key:(whish is having >> server)

server veryfy kase karega ki jo JWT tocken aaya hai usse client ne bheja hai
'''```
to server JWT SE == (header+payload) nikalega

(header+payload) >> encrypt with {server:key}
let assume after the encryption of (header+payload)==HP (new hash key)

now compare karega server apne JWT ke signature se 

if(digital signature==HP){
    to ye original client ne bheja hai
}

iss JWT tocken ko ham state less kaha jata hai

JWT tockent ke andar header+payload encrypted form me nahi rahta hai
mera encrypted form me rahta hai wo hai digital signature

***>>kabhi kabhi hashing me do content ka same hash code generate ho jata hai jisse ham hash collision kaha jata hai,,,,

jwt tocken ko acces tockeen kaha jata hai..

Q. kya jwt tocken expire hota hai ki nahi 
ans==ye depend karta hai user pe ki wo apna jwt tocken kitna der me expire karana chahta hai
ex == leetcode geeks_for_geeks me login karte hai to 1 din me dono webside apna JWT tocken expire kara dete hai jisse hame uss webside me agle din dubara se login karna padta hai

to yaha ek bat sochne wali hai filhal me ham facebook and instagram ko dekhte hai ki jab ham waha login karte hai to ham waha hamesa uss wenside pe login rahtey hai >>to ek ba un dono wbside ka JWT tocken expire nahi hota matalb instagram and facebook ne JWt tocken ka Creation data banaya hai lekin uska expiry date nahi kiya iss liaa ham waha hamesha login rahtey hai



......====Refress tocken====....

**Refresh Token kya hota hai?**
---
### 🔐 Refresh Token = “Naya Access Token lane ka Pass”

Jab hum **login** karte hain (JWT / OAuth / Auth system me), humein do cheezein milti hain:

1️⃣ **Access Token**

* Short time ke liye valid hota hai (5 min, 15 min, 1 hour… depends)
* Isse API access hoti hai
* Agar yeh chori ho jaye to bada risk hota hai, isliye short life hoti hai

2️⃣ **Refresh Token**

* Long time ke liye valid hota hai (7 days, 30 days, months)
* Sirf ek kaam karta hai → **Access Token ko dubara generate karna**
* Direct API access nahi deta
* Secure jagah store hota hai (httpOnly cookie / secure storage)

---

### ❓ Refresh Token ki zarurat kyu?

Agar sirf Access Token hota:

* Token expire hote hi user ko baar-baar login karna padta 😓

Refresh Token hone se:

* Access Token expire ho jaye → Refresh Token se **naya token mil jata hai**
* User ko baar-baar login nahi karna padta 😊
* Security bhi safe rehti hai

---
### ⚙️ Flow Simple Samjho

1️⃣ User login karta hai
👉 Server deta hai: Access Token + Refresh Token

2️⃣ Access Token expire ho jata hai
👉 Client Refresh Token bhejta hai

3️⃣ Server verify karta hai
👉 Naya Access Token deta hai

### ✅ Important Security Points

* Refresh Token ko **httpOnly cookie** me store karna best
* Database me store karke blacklist / rotate kar sakte ho
* Agar refresh token leak ho jaye → attacker continuously new tokens le sakta hai
  isliye **secure rakho**


### 🧠 Ek Line me Summary
**Refresh Token wo token hota hai jo expired Access Token ko bina dobara login karaye naya generate kar deta hai.**