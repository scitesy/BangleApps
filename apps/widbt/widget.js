WIDGETS.bluetooth = {
    area: "tr",
    width: 15,
    warningEnabled: 1,
    draw: function() {
        g.reset();
        if (NRF.getSecurityStatus().connected) {
            g.setColor((g.getBPP() > 8) ? "#07f" : (g.theme.dark ? "#0ff" : "#00f"));
        } else {
            // g.setColor(g.theme.dark ? "#666" : "#999");
            g.setColor("#f00"); // red is easier to distinguish from blue
        }
        g.drawImage(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA=="), 2 + this.x, 2 + this.y);
    },
    connect: function() {
        WIDGETS.bluetooth.draw();
    },
    disconnect: function() {
        if(WIDGETS.bluetooth.warningEnabled == 1){
            Bangle.buzz(700, 1); // buzz on connection loss
            E.showMessage("Connection\nlost.","Bluetooth");
            WIDGETS.bluetooth.warningEnabled = 0;
            setTimeout('WIDGETS.bluetooth.warningEnabled = 1;', 30000); // re-notify only after 30 seconds.
        }
        WIDGETS.bluetooth.draw();
    }
};

NRF.on('connect', WIDGETS.bluetooth.connect);
NRF.on('disconnect', WIDGETS.bluetooth.disconnect);
