import xapi from 'xapi';
// DJ Uittenbogaard - duittenb@cisco.com
// JW Ruys - jruys@cisco.com
//
// v0.1       Info: Count maximum people, show notification when >max nr of people in the room
// v0.2       Changed text display method
// v0.3       Moved maxPeople display to alert header
// v0.4       Changed to trigger on TVOC
// v0.5       Added menu button and info panel

const poorTVOC = 3;
const badTVOC = 4;
const alertDuration = 30;
var poorAlert = false;
var badAlert = false;

console.log('DEBUG - Init' );

// Covert TVOC value to good/poor/bad
function goodBad(value) {
  if (value >= poorTVOC) {
    if (value >= badTVOC) {
      return('bad');
    }
    else {
      return('poor');
    }
  }
  else {
    return('good');
  }
}

// display text on screen - can also be replaced by play-message, show-image, call-security etc
function displayTextOnScreen(header,text) {
  xapi.command('UserInterface Message Alert Display', {
  Title: header,
  Text: text, 
  Duration: alertDuration,
  });
}

// Process updated status data
function postStatusCall(amount) {
  console.log('DEBUG - Detected: ' + amount );
  xapi.command('UserInterface Extensions Panel Update', {PanelId: 'TVOC', Name: 'Air: ' + goodBad(amount) });
  xapi.command('UserInterface Extensions Widget SetValue', {WidgetId: 'TVOC_value', Value: 'Air quality is ' + goodBad(amount) + ', TVOC value is ' + amount });
  if (amount >= poorTVOC) {
    if (amount >= badTVOC) {
      if ( badAlert == false ) {
        console.log('DEBUG - BAD alert');
        displayTextOnScreen("ALERT: bad air quality", "Please ventilate and leave this room<br>(TVOC " + amount + ")" );
//      xapi.command('UserInterface Extensions Panel Update', {PanelId: 'TVOC', Color: 'Red'});
        poorAlert = true;
        badAlert = true;
      }
    }
    else if ( ( poorAlert == false ) && ( badAlert == false ) ) {
      console.log('DEBUG - POOR warning');
      displayTextOnScreen("WARNING: poor air quality", "Please ventilate this room<br>(TVOC " + amount + ")" ); 
//    xapi.command('UserInterface Extensions Panel Update', {PanelId: 'TVOC', Color: 'Yellow'});
      poorAlert = true;
      badAlert = false;
    }
  }
  else if ( poorAlert == true ) {
    console.log('DEBUG - OK notification');
    displayTextOnScreen("Air quality OK", "Healthy air quality restored<br>(TVOC " + amount + ")" );  
//  xapi.command('UserInterface Extensions Panel Update', {PanelId: 'TVOC', Color: 'Green'});
    poorAlert = false;
    badAlert = false;
  }
}

// Get startup Air Quality value
xapi.Status.Peripherals.ConnectedDevice[1002].RoomAnalytics.AirQuality.Index.get().then((airquality) => {
  postStatusCall(airquality);
});

// Get dynamic Air Quality status updates
xapi.status.on('Peripherals ConnectedDevice 1002 RoomAnalytics AirQuality Index', (airquality) => postStatusCall(airquality));
