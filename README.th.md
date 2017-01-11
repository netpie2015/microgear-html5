# microgear-html5

microgear-html5 คือ client library ที่ทำหน้าที่เป็น client library ของ NETPIE ที่จะเปลี่ยน web browser ให้เป็น microgear เพื่อสื่อสารกับ microgear ใน platform อื่นๆ ไม่ว่าจะเป็น arduino, raspberry pi หรือ computer เพื่อการพัฒนา IOT application คุณสามารถนำ library นี้ไปพัฒนา IOT console หรือ mobile application ได้โดยการเขียนโปรแกรมเขียนโปรแกรมภาษา HTML/JavaScript ที่คุณคุ้นเคย รายละเอียดเกี่ยวกับ netpie platform สามารถศึกษาได้จาก http://netpie.io

## การรองรับ
- Chrome
- Firefox
- Opera
- Safari
- Internet Explorer
- Edge

## Port ที่มีการใช้งาน
หากพบปัญหาการใช้งาน กรุณาตรวจสอบว่า port ต่อไปนี้ได้รับอนุญาตให้เข้าถึงจาก network ของคุณ
- TLS mode : 8081 and 8084 (โดยปกติ HTML5 microgear จะใช้โหมดนี้เป็น default)
- Non-TLS mode : 8080 and 8083

## การติดตั้ง

ดาวน์โหลด microgear.js จาก ที่นี่
https://raw.githubusercontent.com/netpieio/microgear-html5/master/microgear.js

หรือเรียกใช้เวอร์ชั่นล่าสุดจาก cdn โดยใช้ tag
```html
<script src="https://cdn.netpie.io/microgear.js"></script>
```

ตัวอย่างการเรียกใช้
```js
<script src="https://cdn.netpie.io/microgear.js"></script>
<script>
  const APPID     = <APPID>;
  const APPKEY    = <APPKEY>;
  const APPSECRET = <APPSECRET>;

	var microgear = Microgear.create({
		key: APPKEY,
		secret: APPSECRET,
		alias : "myhtml"         /*  optional  */
	});

	microgear.on('message',function(topic,msg) {
		document.getElementById("data").innerHTML = msg;
	});

	microgear.on('connected', function() {
		microgear.setAlias('htmlgear');    /* alias can be renamed anytime with this function */
		document.getElementById("data").innerHTML = "Now I am connected with netpie...";
		setInterval(function() {
			microgear.chat("htmlgear","Hello from myself at "+Date.now());
		},5000);
	});

	microgear.on('present', function(event) {
		console.log(event);
	});

	microgear.on('absent', function(event) {
		console.log(event);
	});

	microgear.connect(APPID);
</script>

<div id="data">_____</div>
```

## การใช้งาน library
**microgear create (config)**

**arguments**
* *config* เป็น json object ที่ที่มี attribute ดังนี้
  * *key* `string` - เป็น key สำหรับ device
  * *secret* `string` - เป็น secret ของ key ซึ่งจะใช้ประกอบในกระบวนการยืนยันตัวตน
  * *alias* `string` - เป็นการตั้งชื่อเรียก จะใส่ที่นี่หรือ setAlias() ทีหลังก็ได้

```js
var microgear = MicroGear.create({
    key : "sXfqDcXHzbFXiLk",
    secret : "DNonzg2ivwS8ceksykGntrfQjxbL98",
    alias : "myhtml"
});
```

---
## microgear
**void microgear.connect (*appid*, *callback*)**
เชื่อมต่อไปที่ NETPIE โดยระบุ *appid* เป้าหมาย

**arguments**
* *appid* `string` - คือ application ที่ microgear จะทำการเชื่อมต่อ 
```js
microgear.connect("happyfarm");
```
---
**void microgear.setAlias(*gearalias*)**
microgear สามารถตั้งชื่อตัวเองได้ ซึ่งสามารถใช้เป็นชื่อเรียกในการใช้ฟังก์ชั่น chat()

**arguments**
* *gearalias* `string` - ชื่อของ microgear นี้   

```js
microgear.setAlias("plant");
```
---
**void microgear.chat (*gearalias*, *message*)**

**arguments**
* *gearalias* `string` - ชื่อของ microgear ที่ต้องการจะส่งข้อความไปถึง 
* *message* `string|number|object` - ข้อความ

```js
microgear.chat("valve","I need water");
```
---
**void microgear.publish (*topic*, *message*)**
ในการณีที่ต้องการส่งข้อความแบบไม่เจาะจงผู้รับ สามารถใช้ฟังชั่น publish ไปยัง topic ที่กำหนดได้ ซึ่งจะมีแต่ microgear ที่ subscribe topoic นี้เท่านั้น ที่จะได้รับข้อความ

**arguments**
* *topic* `string` - ชื่อของ topic ที่ต้องการจะส่งข้อความไปถึง 
* *message* `string|number|object` - ข้อความ

```js
microgear.publish("/outdoor/temp","28.5");
```
---
**void microgear.subscribe (*topic*)**
microgear อาจจะมีความสนใจใน topic ใดเป็นการเฉพาะ เราสามารถใช้ฟังก์ชั่น subscribe() ในการบอกรับ message ของ topic นั้นได้

**arguments**
* *topic* `string` - ชื่อของ topic ที่ต้องการจะส่งข้อความไปถึง 

```js
microgear.subscribe("/outdoor/temp");
```
---
**void microgear.unsubscribe (*topic*)**
ยกเลิกการ subscribe

**arguments**
* *topic* `string` - ชื่อของ topic ที่ต้องการจะส่งข้อความไปถึง 

```js
microgear.unsubscribe("/outdoor/temp");
```
---
**void microgear.writeFeed (*feedid*, *datajson* [, *apikey*])**
เขียนข้อมูลลง feed storage

**arguments**
* *feedid* `string` - ชื่อของ feed ที่ต้องการจะเขียนข้อมูล 
* *datajson* `string` - ข้อมูลที่จะบันทึก ในรูปแบบ json 
* *apikey* `string` - apikey สำหรับตรวจสอบสิทธิ์ หากไม่กำหนด จะใช้ default apikey ของ feed ที่ให้สิทธิ์ไว้กับ AppID

```js
microgear.writeFeed("homesensor",{temp:25.7,humid:62.8,light:8.5});
```
---
**void microgear.resetToken (callback)**
ออนไลน์ส่งคำสั่ง revoke token และลบ token ออกจาก cache ส่งผลให้ microgear ต้องขอ token ใหม่ในการเชื่อมต่อครั้งต่อไป

**arguments**
* *callback* `function` - callback function ที่จะถูกเรียกเมื่อการ reset token เสร็จสิ้น

```js
microgear.resetToken(function(result){
});
```

เนื่องจาก resetToken() เป็น asynchronous function หากต้องการ connect หลังจาก resetToken ต้องเขียนโค้ดในลักษณะนี้
```js
microgear.resetToken(function(result){
    microgear.connect(APPID);
});
```
---
**void microgear.useTLS (tlsmode)**
Enable หรือ disable TLS. สำหรับ HTML5 microgear จะใช้ TLS เป็นค่า default

**arguments**
* *tlsmode* `boolean` - เป็น true หมายถึงใช้ TLS (เป็นค่า default), false หมายถึงไม่ใช้ TLS

```js
microgear.useTLS(false);
```

---
## Events
application ที่รันบน microgear จะมีการทำงานในแบบ event driven คือเป็นการทำงานตอบสนองต่อ event ต่างๆ ด้วยการเขียน callback function ขึ้นมารองรับในลักษณะนี้

**void microgear.on (*event*, *callback*)**

**arguments**
* *event* `string` - ชื่อ event
* *callback* `function` - callback function

netpie platform เวอร์ชั่นปัจจุบัน มี event ดังต่อไปนี้

**Event: 'connected'**
เกืดขึ้นเมื่อ microgear library เชื่อมต่อกับ platform สำเร็จ
```
microgear.on("connected", function() {
	console.log("connected");
});
```

**Event: 'closed'**
เกืดขึ้นเมื่อ microgear library ตัดการเชื่อมต่อกับ platform
```
microgear.on("closed", function() {
	console.log("closed");
});
```

**Event: 'error'**
เป็น event ที่เกิดมี error ขึ้นภายใน microgear
```
microgear.on("error", function(err) {
	console.log("Error: "+err);
});
```

**Event: 'message'**
เมื่อมี message เข้ามา จะเกิด event นี้ขึ้น พร้อมกับส่งผ่านข้อมูลเกี่ยวกับ message นั้นมาทาง argument ของ callback function
```
microgear.on("message", function(topic,msg) {
	console.log("Incoming message: "+msg);
});
```

**Event: 'present'**
event นี้จะเกิดขึ้นเมื่อมี microgear ใน appid เดียวกัน online เข้ามาเชื่อมต่อ netpie
```
microgear.on("present", function(event) {
	console.log("New friend found: "+event.gearkey);
});
```
**Event: 'absent'**
event นี้จะเกิดขึ้นเมื่อมี microgear ใน appid เดียวกัน offline หายไป
```
microgear.on("absent", function(event) {
	console.log("Friend lost: "+event.gearkey);
});
```
