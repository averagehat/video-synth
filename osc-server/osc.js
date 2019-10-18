osc = require('osc');
const localHost = "127.0.0.1"
const tidalPort = 6010
var udpPort = new osc.UDPPort({
    localAddress: localHost,
    localPort: 6969,
    metadata: true
});
SuperCollider mappings (MIDIFunc callbacks)
// creates a new synth for each channel
// this synth needs a VCF for the CC
/*
Since the Seaboard assigns each new note to its own channel, the musical result of using Channel Pressure and Poly Aftertouch will be the same, but some software can only respond to one or the other so the option is available here.
https://support.roli.com/support/solutions/articles/36000024588-should-i-use-channel-pressure-or-poly-aftertouch-
// also need to handle noteon/noteoff velocity
// "pitch" in message log (midi.txt) is pitch bend -- this is left/write movement (wiggle, vibrato) and glide
// channel aftertouch (pressure) is . .  pressure on the keys. i.e. amplitude.
// the CC corresponds to up/down on the keys
*/
synths[chan] = Synth(\default, [\freq, num.midicps, \amp, vel * (1.0/128.0)]);
// all of these except bend are 0-127
Seaboard BLOCK: channel: 6, controller: 74, value: 64, _type: cc // control
Seaboard BLOCK: channel: 5, note: 45, velocity: 1, _type: noteon  // noteOn
Seaboard BLOCK: channel: 7, pressure: 0, _type: channel aftertouch //  polytouch or touch
Seaboard BLOCK: channel: 5, value: 8192, _type: pitch  // bend
// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
});

cSF :: String -> String -> Pattern Double
cSF d = _cX d getF<Paste>
// Open the socket.
udpPort.open(); 
// how do I play continuous notes with tidal?
// osc can send color with "r"
// When the port is read, send an OSC message to, say, SuperCollider
//
// cF is what you use for floating point controls. The second parameter1 is the default value, for when tidal hasn't received that control yet. There is also cS for strings and cI for integers. For time values (for using e.g. as the first parameter of fast/slow), use cT. For ratios add cR
const sendTidal =  (key, value) =>
    udpPort.send({
        address: "/ctrl",
        args: [
            {
                type: "s",
                value: key
            },
            {
                type: "f",
                value: value 
            }
        ]
    }, localHost, tidalPort)

udpPort.on("ready", () =>
    udpPort.send({
        address: "/ctrl",
        args: [
            {
                type: "s",
                value: "hello"
            },
            {
                type: "f",
                value: 1
            }
        ]
    }, localHost, tidalPort)
);
