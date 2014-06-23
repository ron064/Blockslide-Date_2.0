var dateorder = localStorage.getItem("dateorder");
if (!dateorder) {
	dateorder = 1;
}

var weekday = localStorage.getItem("weekday");
if (!weekday) {
	weekday = 0;
}

var lang = localStorage.getItem("lang");
if (!lang) {
	lang = 1;
}

var stripes = localStorage.getItem("stripes");
if (!stripes) {
	stripes = 1;
}

var roundcorners = localStorage.getItem("roundcorners");
if (!roundcorners) {
	roundcorners = 1;
}

var fulldigits = localStorage.getItem("fulldigits");
if ((fulldigits != 0) && (fulldigits != 1)) {
	fulldigits = 0;
}

Pebble.addEventListener("ready", function() {
	console.log("Ready Event");
	console.log("	dateorder: " + dateorder);
	console.log("	weekday: " + weekday);
	console.log("	lang: " + lang);
	console.log("	stripes: " + stripes);
	console.log("	roundcorners: " + roundcorners);
	console.log("	fulldigits: " + fulldigits);

	
	Pebble.sendAppMessage(JSON.parse('{"dateorder":'+dateorder+',"weekday":'+weekday+',"lang":'+lang+',"stripes":'+stripes+',"roundcorners":'+roundcorners+',"fulldigits":'+fulldigits+'}'));
});

Pebble.addEventListener("showConfiguration", function(e) {
	console.log("showConfiguration Event");
	console.log("	dateorder: " + dateorder);
	console.log("	weekday: " + weekday);
	console.log("	lang: " + lang);
	console.log("	stripes: " + stripes);
	console.log("	roundcorners: " + roundcorners);
	console.log("	fulldigits: " + fulldigits);
	Pebble.openURL("http://www.famillemattern.com/jnm/pebble/Blockslide-Date/Blockslide-Date_2.2.1.php?dateorder=" + dateorder + "&weekday=" + weekday + "&lang=" + lang + "&stripes=" + stripes + "&roundcorners=" + roundcorners + "&fulldigits=" + fulldigits);
});

Pebble.addEventListener("webviewclosed", function(e) {
	console.log("Configuration window closed");
  console.log(e.type);
  console.log(e.response);

	var configuration = JSON.parse(e.response);
	Pebble.sendAppMessage(configuration);
	
	dateorder = configuration["dateorder"];
	localStorage.setItem("dateorder", dateorder);
	
	weekday = configuration["weekday"];
	localStorage.setItem("weekday", weekday);

	lang = configuration["lang"];
	localStorage.setItem("lang", lang);
						
	stripes = configuration["stripes"];
	localStorage.setItem("stripes", stripes);

	roundcorners = configuration["roundcorners"];
	localStorage.setItem("roundcorners", roundcorners);

  fulldigits = configuration["fulldigits"];
	localStorage.setItem("fulldigits", fulldigits);
});
