#!/bin/bash

export DISPLAY=:0

function connect()
{
    xrandr --output HDMI1 --auto --left-of eDP1
    python3 /usr/share/xfpanel-switch/xfpanel-switch/panelconfig.py load ~/externalmonitor.tar.bz2
}

function disconnect()
{
    python3 /usr/share/xfpanel-switch/xfpanel-switch/panelconfig.py load ~/noexternalmonitor.tar.bz2
}

if [ $(cat /sys/class/drm/card0-HDMI-A-1/status) ==  "connected" ] ; then
    connect
elif [ $(cat /sys/class/drm/card0-HDMI-A-1/status) == "disconnected" ] ; then
    disconnect
else
    exit
fi
