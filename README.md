# RoomOS_TVOC
Webex Room device TVOC alerter - alerts when detected TVOC value in a room is too high

This is a proof of concept using the Webex video endpoint Room Navigator sensor function to alert when TVOC value gets too high.

Macro code speaks for itself: set maxTVOC to max value (3 recommended) and alertDuration to number of seconds the alert is shown.

For the macro to work, check 'xstatus peripherals' to see if the value 1002 in line 33 is the same on your system, don't know yet if that changes or not.

Known issue:
Keeps alerting every minute as long as the value is too high - need to add some form of hysteresis
