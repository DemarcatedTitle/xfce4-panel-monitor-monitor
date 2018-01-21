# xfce-panel-monitor-watcher
Automatically set up your xfce panels when a monitor is plugged in

# Directions
This guide assumes some familiarity with linux. 

Read this guide for the basics of setting up your panels and the shell script:

http://colinrrobinson.com/technology/linux/xfce/automatically-switch-xfce-panel-layout-plugging-monitor/


Make sure Node.js is installed
Copy hotplug_monitor.sh to /usr/local/bin/
Add the following line to your bashrc/zshrc:
if ! pgrep -x "node" > /dev/null 
then
        node /${path_to_repo}/xfce4-panel-monitor-monitor/server.js &> /dev/null &
fi

The conditional is so you don't have new processes each time you start up bash/zsh.

If you don't use bash or zsh you can probably figure out how to add the equivalent lines. 

# Background
I have a particular panel setup, and while XFCE4 is good for dealing with multiple monitors, the panel part of it isn't. I looked up how to do it and found the following guide: http://colinrrobinson.com/technology/linux/xfce/automatically-switch-xfce-panel-layout-plugging-monitor/ and it got me most of the way, but I ran into the issue of the python file not working because of some dbus stuff. I don't know too much about that, but on the systemd irc it was said that udev was not the ideal way to go about it.

I figured the script was working, I just needed to figure out some sort of event handling system. I tried inotifywait and fs.watch but for some reason the status file doesn't trigger events when it is changed by the os or whatever thing changes it when I plug and unplug the hdmi cable. 

But I know node well enough and I know linux well enough and here is a thing that is working 'well enough'. 

# Troubleshooting
This should work if your setup is like mine, but if it's not, and it isn't unlikely that it's not, you will have to go through and change a few lines to make it fit how your system is set up. 

In server.js the card0 may need changing. 

In hotplug_monitor.sh you will have to set up your own panel layouts as well as change the card0 things here. 
