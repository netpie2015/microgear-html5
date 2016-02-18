# microgear-html5

microgear-html5 is a JavaScript library that will transform any browser into a NETPIE connected client. It enables web browsers to communicate with other NETPIE devices. For more details on the NETPIE Platform, please visit https://netpie.io . 
## Browser Support
- Chrome
- Firefox
- Opera

## Installation

Download microgear.js here
https://raw.githubusercontent.com/netpieio/microgear-html5/master/microgear.js

Or call it directly from the website netpie.io by using this tag
```html
<script src="https://netpie.io/microgear.js"></script>
```

Usage Example
```js
<script src="https://netpie.io/microgear.js"></script>
<script>
  const APPKEY    = <APPKEY>;
  const APPSECRET = <APPSECRET>;
  const APPID     = <APPID>;

	var microgear = Microgear.create({
		gearkey: APPKEY,
		gearsecret: APPSECRET
	});

	microgear.on('message',function(topic,msg) {
		document.getElementById("data").innerHTML = msg;
	});

	microgear.on('connected', function() {
		microgear.setname('htmlgear');
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

	microgear.resettoken(function(err) {
		microgear.connect(APPID);
	});
</script>

<div id="data">_____</div>
```
## Library Usage
**microgear create (config)**

**arguments**
* *config* is a json object with the following attributes:
  * *gearkey* `string` - is used as a microgear identity.
  * *gearsecret* `string` comes in a pair with gearkey. The secret is used for authentication and integrity. 
  * *scope* `string` - specifies the right.  

**scope** is an optional field. This can be specified when the microgear needs additional rights beyond default scope. If the scope is specified, it may need an approval from the Application ID's owner for each request. The scope format is the concatenation of strings in the following forms, separated with commas:

   * [r][w]:&lt;/topic/path&gt; - r and w is the right to publish and subscribe topic as specified such as rw:/outdoor/temp
  *  name:&lt;gearname&gt; - is the right to name the &lt;gearname&gt;
  *  chat:&lt;gearname&gt; - is the right to chat with &lt;gearname&gt;
In the key generation process on the web netpie.io, the developer can specify basic rights to each key. If the creation of microgear is within right scope, a token will be automatically issued, and the microgear can be connected to NETPIE immediately. However, if the requested scope is beyond the specified right, the developer will recieve a notification to approve a microgear's connection. Note that if the microgear has operations beyond its right (e.g., pulishing to the topic that it does not has the right to do so), NETPIE will automatically disconnect the microgear. In case that APPKEY is used as a gearkey, the developer can ignore this attribute since by default the APPKEY will gain all rights as the ownwer of the app.
 
```js
var microgear = MicroGear.create({
    gearkey : "sXfqDcXHzbFXiLk",
    gearsecret : "DNonzg2ivwS8ceksykGntrfQjxbL98",
    scope : "r:/outdoor/temp,w:/outdoor/valve,name:logger,chat:plant"
});
```
---
## microgear
**void microgear.connect (*appid*, *callback*)**

**arguments**
* *appid* `string` - a group of application that microgear will connect to.
```js
microgear.connect("happyfarm");
```
---
**void microgear.setname (*gearname*)**
microgear ??????????????????????? ??????????????????????????????????????????? chat()

**arguments**
* *gearname* `string` - ??????? microgear ???   

```js
microgear.setname("plant");
```
---
**void microgear.chat (*gearname*, *message*)**

**arguments**
* *gearname* `string` - name of microgear to which to send a message. 
* *message* `string` - message to be sent.

```js
microgear.chat("valve","I need water");
```
---
**void microgear.publish (*topic*, *message*, [retained])**
In the case that the microgear want to send a message to an unspecified receiver, the developer can use the function publish to the desired topic, which all the microgears that subscribe such topic will receive a message.

**arguments**
* *topic* `string` - name of topic to be send a message to. 
* *message* `string` - message to be sent.
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
**void microgear.resettoken (callback)**
send a revoke token control message to NETPIE and delete the token from cache. As a result, the microgear will need to request a new token for the next connection.

**arguments**
* *callback* `function` - this function will be called when the token reset is finished.

```js
microgear.resettoken(function(result){
});
```

Since the function resettoken() is asynchronous, to connect applicatin after token reset,  the code should be as follows.
```js
microgear.resettoken(function(result){
    microgear.connect(APPID);
});
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

**Event: 'rejected'**
This event is created when the microgear connects unsuccessfully because the token is rejected. This could be because the token is revoked or disabled. 
```
microgear.on("rejected", function(info) {
	console.log("Connection rejected: "+info);
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
