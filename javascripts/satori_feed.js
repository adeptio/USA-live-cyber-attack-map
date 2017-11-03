var endpoint = "wss://open-data.api.satori.com";
var appkey = "Fd1A23752B4eCbD8Ec8E131171CdD0a8"; // check weekly for new public api key
var channelName = "live-cyber-attack-threat-map";

var client = new RTM(endpoint, appkey);
var satoriData = [];

function showText(text) {
  var view = document.getElementById("output");
  var record = "<div>" + text + "</div>";
  view.innerHTML = record + view.innerHTML;
}

function updateTally(msg, table, dimension) {
  var sumTable = document.getElementById(table);
  let numRows = sumTable.rows.length;
  let incremented = false;
  let newDimension = "";
  if (msg[dimension] === "") {
    newDimension = "Unknown";
  } else {
    newDimension = msg[dimension];
  }

  for (let i = 0; i < numRows; i++) {
    let currentDimension = sumTable.rows[i].cells[0].innerHTML;
    let dimensionCount = parseInt(sumTable.rows[i].cells[1].innerHTML);
    if (currentDimension === newDimension) {
      sumTable.rows[i].cells[1].innerHTML = (dimensionCount + 1);
      incremented = true;
    }
  }
  if (incremented === false) {
    let addDimension = sumTable.insertRow(-1);
    let cell1 = addDimension.insertCell(0);
    let cell2 = addDimension.insertCell(1);
    if (msg[dimension] === "") {
      cell1.innerHTML = "Unknown";
    } else {
          cell1.innerHTML = msg[dimension];
    }
    cell2.innerHTML = 1;
  }
}

// https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(tableName) {
  let table, rows, switching, i, countOne, countTwo, shouldSwitch;
  table = document.getElementById(tableName);
  switching = true;

  while (switching) {

    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      countOne = rows[i].getElementsByTagName("TD")[1];
      countTwo = rows[i + 1].getElementsByTagName("TD")[1];

      if (parseInt(countOne.innerHTML) < parseInt(countTwo.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


// client.on("enter-connected", function () {
//   showText("Connected to Satori RTM!");
// });
client.on("leave-connected", function () {
  showText("Disconnected from Satori RTM");
});
client.on("error", function (error) {
  var reason;
  if (error.body) {
    // reason = error.body.error + " - " + error.body.reason;
    showText("As of October 2017, Satori has disabled this feed.");
  } else {
    reason = "As of October 2017, Satori has disabled this feed.";
  }
  // showText("RTM client failed: " + reason);
  showText("As of October 2017, Satori has disabled this feed.");
});

var subscription = client.subscribe(channelName, RTM.SubscriptionMode.SIMPLE, {
  filter: 'select * from `live-cyber-attack-threat-map` where country_origin="US"'
});

subscription.on("enter-subscribed", function() {
  showText("Subscribed to the channel: " + channelName);
});
subscription.on("rtm/subscribe/error", function(pdu) {
  // showText("Failed to subscribe: " + pdu.body.error + " - " + pdu.body.reason);
  showText("As of October 2017, Satori has disabled this feed.");
});
subscription.on("rtm/subscription/data", function(pdu) {
  // Messages arrive in an array.
  pdu.body.messages.forEach(function(msg) {
    satoriData = satoriData.concat(msg);
    showText("Data is received: " + JSON.stringify(msg));
    updateTally(msg, 'attack-tally', 'attacker');
    updateTally(msg, 'malware-tally', 'attack_type');
    updateTally(msg, 'target-tally', 'country_target');
    sortTable('attack-tally');
    sortTable('malware-tally');
    sortTable('target-tally');
  });
});

client.start();
