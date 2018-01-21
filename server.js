const fs = require("fs");
const { spawn } = require("child_process");
let prevStatus = "";
setInterval(function() {
    try {
        const status = spawn(
            "cat",
            ["/sys/class/drm/card0/card0-HDMI-A-1/status"],
            { detached: true }
        );
        status.stdout.on("data", data => {
            const currentStatus = data.toString();
            if (currentStatus === prevStatus) {
                console.log("No change");
            } else {
                console.log("Status changed");
                spawn("/usr/local/bin/hotplug_monitor.sh");
            }
            prevStatus = currentStatus;
        });
        status.stderr.on("err", err => {
            console.log(err);
        });
        status.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });
    } catch (err) {
        console.log(err);
    }
}, 3000);
