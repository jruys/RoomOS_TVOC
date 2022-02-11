# RoomOS_TVOC
Webex Room device TVOC alerter - alerts when detected TVOC value in a room is too high

This is a proof of concept using the Webex video endpoint Room Navigator sensor function to alert when TVOC value gets too high.

Add the 'TVOC' button to your room panel by importing the XML file.

Macro code speaks for itself: set poorTVOC and badTVOC to relevant value (3 and 4 are recommended) and alertDuration to number of seconds the alert is shown.

For the macro to work, check 'xstatus peripherals' to see if the value 1002 in line 76 and 81 are the same on your system, don't know yet if that changes or not.

System will show current air quality below the TVOC button and when pressed show exact value. When one of the thresholds is exceeded a warning is shown, and another one when value returns to acceptable levels.

All this is for demo and inspirational purposes only, no warranty, no official support.
