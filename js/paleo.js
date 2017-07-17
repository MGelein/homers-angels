/**
Corrects the text that needs to be corrected
**/
function parseText(){
	var content = $('#textField').get(0).value;
	var lines = content.split(/\r?\n/);
	var useDef = false;
	var def = "";
	if(lines[0].substr(0, 4) == "urn#"){
		useDef = true;
		def = lines.shift();
	}
	var i = 0; var max = lines.length;
	var counter = {};
	var obs;
	var urn;
	var number = "0";
	var urnParts;
	content = "";
	//break up each of the lines
	for(i = 0; i < max; i++){
		lines[i] = lines[i].split('#');
		//pull parts from the lines
		obs = (lines[i][0]);
		urn = (lines[i][1]);

		//pad with leading zero's
		number = "" + (i + 1);
		//if(i < 9) number = "0" + number;

		//count letter
		if(urn == undefined) break;

		//clean urn before using
		urn = urn.replace(/ *\[[^)]*\] */g, "");

		urnParts = urn.split("@");
		if(counter.hasOwnProperty(urnParts[1])){
			counter[urnParts[1]] = counter[urnParts[1]] + 1;
			urn = urnParts[0] + "@" + urnParts[1] + "[" + counter[urnParts[1]] + "]";
		}else{
			counter[urnParts[1]] = 1;
			urn = urnParts[0] + "@" + urnParts[1];
		}

		//put parts back into the line
    var urnParts = obs.split(':');
		lines[i][0] = obs.substring(0, obs.length - urnParts[urnParts.length - 1].length) + number;
		lines[i][1] = urn;

		content += lines[i].join('#');
		content += "\n";
	}
	if(useDef){
		content = def + "\n" + content;
	}
	$('#textField').val(content);
  copyTextToClipboard(content);
}

/**Copies text to clipboard from the provided element*/
function copyTextToClipboard(copyText){
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if(msg != 'successful'){
        copyText = "ERROR: UNABLE TO COPY";
      }else{
        copyText = 'Copied corrected file to Clipboard';
      }
      showNotif(copyText);
  } catch (err) {
      showNotif("ERROR: UNABLE TO COPY");
  }
  document.body.removeChild(textArea);
}

/**
Shows the notification
**/
function showNotif(text){
  $('#notification').removeClass().addClass('showNotification');
  $('#notificationText').html(text);
  setTimeout(function(){
    $('#notification').removeClass().addClass('hideNotification');
  }, 2000);
}
