# microgear-html5

microgear-html5 is a JavaScript library that will transform any browser into a NETPIE connected client. It enables web browsers to communicate with other NETPIE devices. For more details on the NETPIE Platform, please visit https://netpie.io . 
## Browser Support
- Chrome
- Firefox
- Opera
- Safari
- Internet Explorer
- Edge

## Outgoing Network Port
Make sure ther following ports are allowed to connect from your network.
- TLS mode : 8081 and 8084 (HTML5 microgear use this mode by default)
- Non-TLS mode : 8080 and 8083

## How to use

The raw js file can be used directly from the rawgit URL here
https://raw.githubusercontent.com/netpieio/microgear-html5/master/src/index.js

If possible, it is better to clone the git repository and build using the following steps

```
$ git clone https://github.com/netpieio/microgear-html5
$ cd microgear-html5
$ npm install
$ npm run build
```
The library file will be located at build/microgear.js. However, you can find the ready-to-use version from the CDN. Just add the following HTML tag to your Javascript code:

```html
<script src="https://cdn.netpie.io/microgear.js"></script>
```

Usage Example
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

## Library Usage
**microgear create (config)**

**arguments**
* *config* is a json object with the following attributes:
  * *key* `string` - is used as a microgear identity.
  * *secret* `string` comes in a pair with key. The secret is used for authentication and integrity. 
  * *alias* `string` - specifies the device alias.  

 
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
Connect to NETPIE with the *appid* as a target.

**arguments**
* *appid* `string` - an application that microgear will connect to.
```js
microgear.connect("happyfarm");
```
---
**void microgear.setAlias(*gearalias*)**
Microgear can always name itself. This name will be useful for chatting.

**arguments**
* *gearalias* `string` - device alias 

```js
microgear.setAlias("plant");
```
---
**void microgear.chat (*gearname*, *message*)**

**arguments**
* *gearname* `string` - name of microgear to which to send a message. 
* *message* `string|number|object` - message to be sent.

```js
microgear.chat("valve","I need water");
```
---
**void microgear.publish (*topic*, *message*, [retained])**
In the case that the microgear want to send a message to an unspecified receiver, the developer can use the function publish to the desired topic, which all the microgears that subscribe such topic will receive a message.

**arguments**
* *topic* `string` - name of topic to be send a message to. 
* *message* `string|number|object` - message to be sent.
* *retained* `boolean` - retain a message or not (the default is `false`)


```js
microgear.publish("/outdoor/temp","28.5");
```
---
**void microgear.subscribe (*topic*)**
microgear may be interested in some topic.  The developer can use the function subscribe() to subscribe a message belong to such topic. If the topic used to retain a message, the microgear will receive a message everytime it subscribes that topic.

**arguments**
* *topic* `string` - name of the topic to send a message to. 

```js
microgear.subscribe("/outdoor/temp");
```
---
**void microgear.unsubscribe (*topic*)**
 cancel subscription

**arguments**
* *topic* `string` - name of the topic to send a message to. 

```js
microgear.unsubscribe("/outdoor/temp");
```
---
**void microgear.writeFeed (*feedid*, *datajson* [, *apikey*])**
write time series data to a feed storage

**arguments**
* *feedid* `string` - name of the feed 
* *datajson* `string` - data in json format 
* *apikey* `string` - apikey for authorization. If apikey is not specified, you will need to allow the AppID to access feed and then the default apikey will be assigned automatically.

```js
microgear.writeFeed("homesensor",{temp:25.7,humid:62.8,light:8.5});
```
---
**void microgear.resetToken (callback)**
send a revoke token control message to NETPIE and delete the token from cache. As a result, the microgear will need to request a new token for the next connection.

**arguments**
* *callback* `function` - this function will be called when the token reset is finished.

```js
microgear.resetToken(function(result){
});
```

Since the function resetToken() is asynchronous, to connect application after token reset,  the code should be as follows.
```js
microgear.resetToken(function(result){
    microgear.connect(APPID);
});
```

---
**void microgear.useTLS (tlsmode)**
Enable or disable TLS. For HTML5 microgear, TLS is enabled by default.

**arguments**
* *tlsmode* `boolean` - The default is true (use TLS).

```js
microgear.useTLS(false);
```

---
## Events
An application that runs on a microgear is an event-driven type, which responses to various events with the callback function in a form of event function call:

**void microgear.on (*event*, *callback*)**

**arguments**
* *event* `string` - ???? event
* *callback* `function` - callback function

NETPIE consists of the following events:

**Event: 'connected'**
This event is created when the microgear library successfully connects to the NETPIE platform.
```
microgear.on("connected", function() {
	console.log("connected");
});
```

**Event: 'closed'**
This event is created when the microgear library disconnects the NETPIE platform.
```
microgear.on("closed", function() {
	console.log("closed");
});
```

**Event: 'error'**
This event is created when an error occurs within a microgear.

```
microgear.on("error", function(err) {
	console.log("Error: "+err);
});
```

**Event: 'message'**
When there is an incomming message, this event is created with the related information to be sent via the callback function.
```
microgear.on("message", function(topic,msg) {
	console.log("Incoming message: "+mesage);
});
```

**Event: 'present'**
This event is created when there is a microgear under the same appid appears online to connect to NETPIE.
```
microgear.on("present", function(event) {
	console.log("New friend found: "+event.gearkey);
});
```
**Event: 'absent'**
This event is created when the microgear under the same appid appears offline.
```
microgear.on("absent", function(event) {
	console.log("Friend lost: "+event.gearkey);
});
```
