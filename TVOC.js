import xapi from 'xapi';
// DJ Uittenbogaard - duittenb@cisco.com
// JW Ruys - jruys@cisco.com
//
// v0.1       Info: Count maximum people, show notification when >max nr of people in the room
// v0.2       Changed text display method
// v0.3       Moved maxPeople display to alert header
// v0.4       Changed to trigger on TVOC

const maxTVOC = 2
const alertDuration = 30
console.log('Debug: init - maxTVOC = '+maxTVOC);

// display text on screen - can also be replaced by play-message, show-image, call-security etc
function displayTextOnScreen(header,text) {
  xapi.command('UserInterface Message Alert Display', {
  Title: header,
  Text: text, 
  Duration: alertDuration,
  });
}

// Process updated STATUS data
function postStatusCall(amount) {
   console.log('DEBUG - Detected: ' + amount + ', max: ' + maxTVOC);
   if (amount > maxTVOC) {
       console.log('DEBUG - Alerting');
       displayTextOnScreen("Current TVOC " + amount + " is above " + maxTVOC, ". Please ventilate this room." )
   }
}

// Get dynamic AIRQUALITY STATUS updates
xapi.status.on('Peripherals ConnectedDevice 1002 RoomAnalytics AirQuality Index', (airquality) => postStatusCall(airquality));
