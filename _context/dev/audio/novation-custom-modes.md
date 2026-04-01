# Using Launchpad Mini's Custom Modes

Custom Modes turn Launchpad Mini's 8×8 grid into a deeply customizable control surface.

You can create and edit Custom Modes using Novation Components – our online hub for all Novation products. You may also back up any Custom Modes you create here. We have several Custom Mode templates for you to download and explore on Components.

To access Components, visit components.novationmusic.com using a Web MIDI-enabled browser (we recommend Google Chrome or Opera).

Alternatively, download the standalone version of Components from your Account page on the Novation site.

Custom modes are fully compatible between Launchpad Mini and Launchpad X.

Setting up a Custom Mode in Novation Components
You can create and edit Custom Modes in Novation Components. Components in two versions, a browser-based app or standalone desktop app. When you open Components app or load the website on your computer, your Launchpad Mini connects automatically.

If the product name next to the home icon (in the top right-hand corner) is not Launchpad Mini, click the home icon and select Launchpad Mini from the list of products.

Launchpad_X_Setting_a_Custom_Mode.png
In a Custom Mode, each pad on the 8×8 grid may act as a Note, a MIDI CC (control change), or a Program Change message. In Custom Mode, faders and CC pads respond to incoming CCs, adjusting their position and lighting according to the incoming CC value.

The pads may behave either as toggles, triggers or momentary switches. Momentary behaviour will turn on a note when the pad is pressed and release the note when unpressed. Triggers will always send a specified CC value or program change message.

Full rows and columns of pads may also act as faders. Faders can be assigned CC values and may be unipolar or bipolar. You can position faders horizontally or vertically.

Launchpad_X_and_Mini_Custom_Mode_faders.png
You can assign Pads within a Custom Mode an “On” and “Off” colour when pads within the 8×8 grid are pressed/toggled. (e.g. when a note is being played or a temporary CC change is toggled). There may only be one “On” colour per Custom Mode, but each pad may have a unique “Off” colour.

Custom Modes may have any combination of notes, CCs, program changes and faders – you can set up your own personalised control surface for your studio.

For more hands-on information on how to create your own Custom Modes, visit Components for an interactive tutorial – it’s easier than it may sound!

## Using Launchpad with Web Applications

### Web MIDI API Support

The Novation Launchpad can be controlled directly from web browsers using the Web MIDI API, making it ideal for web-based music and interactive applications.

**Browser Support (as of 2025):**
- **Chrome** 43+: Full support (recommended)
- **Opera** 30+: Full support
- **Edge** 79+: Full support
- **Firefox** 108+: Full support (recently added)
- **Safari**: Not supported (no native support due to fingerprinting concerns)

**Workaround for Safari:** Install the Jazz-Plugin v1.4+ to enable Web MIDI API support in browsers that lack native support.

### JavaScript Libraries for Launchpad Control

Several libraries simplify working with Launchpad devices via Web MIDI API:

1. **launchpad-webmidi**
   - Browser-based library using ES modules and Web MIDI API
   - Compatible with launchpad-mini documentation from Node.js
   - Available on npm and GitHub
   - Repository: https://github.com/LostInBrittany/launchpad-webmidi

2. **LaunchpadJS**
   - Simple browser-based control library
   - Easy connection and LED control
   - Repository: https://github.com/dvberkel/LaunchpadJS

3. **web-midi-launchpad**
   - Includes Pad (X/Y coordinates) and Color interfaces
   - Row values 1-8, column values 1-9
   - Repository: https://github.com/Athaphian/web-midi-launchpad

4. **reactpad** (TypeScript/React)
   - For React applications using TypeScript
   - Custom Launchpad Pro instrument programming
   - Repository: https://github.com/fenixsong/reactpad

### Getting Started with Web MIDI API

Basic approach for connecting to a Launchpad in JavaScript:

```javascript
// Request MIDI access (must be in secure context - HTTPS)
navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  // Access input/output ports
  const inputs = midiAccess.inputs;
  const outputs = midiAccess.outputs;

  // Set up listeners for MIDI messages
  inputs.forEach(input => {
    input.onmidimessage = handleMIDIMessage;
  });
}

function handleMIDIMessage(message) {
  // Process MIDI data
  const [command, note, velocity] = message.data;
  console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);
}
```

**Important**: Web MIDI API requires a secure context (HTTPS) to function.

### Tutorials and Resources

- **MDN Web MIDI API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
- **Smashing Magazine Tutorial**: "Getting Started With The Web MIDI API"
- **WEBMIDI.js Library**: https://webmidijs.org/ (higher-level abstraction)

## Programmer Mode

In Programmer Mode, the Launchpad Mini provides complete MIDI control over the entire surface:

- All Session, Drum, Keys, and User Modes are disabled
- Entire surface becomes unlit by default
- Each pad and button sends specified MIDI messages when pressed
- LEDs are controlled by sending corresponding MIDI messages to the device

**To access Programmer Mode:** Press the orange Scene Launch button from the Settings menu.

**Programmer's Reference Guide:** Download the detailed MIDI implementation guide from downloads.novationmusic.com

- Launchpad Mini MK3: https://downloads.novationmusic.com/novation/launchpad-mk3/launchpad-mini-mk3-0
- Launchpad MK1: https://downloads.novationmusic.com/novation/launchpad-mk1/launchpad

The Programmer's Reference Guide includes:
- Complete MIDI note number mappings (Note 36 = Middle C)
- LED control via SysEx messages
- Velocity and color control specifications
- Channel and CC assignments

## Device Compatibility

Custom modes are fully compatible between:
- Launchpad Mini MK3 (3 custom mode slots)
- Launchpad X (4 custom mode slots)
- Launchpad Pro MK3 (8 custom mode slots)

## Additional Features

### Custom Keystroke Widgets (Launchpad Mini MK3 and X)

These devices support Custom Keystroke widgets that send keyboard shortcuts when pads are pressed, useful for:
- DAW integration with keyboard shortcuts
- Application control via hotkeys
- Custom workflow automation

### Fader Behavior

Faders in Custom Modes respond to incoming CC messages:
- Adjust position based on incoming CC values
- Update LED indicators automatically
- Support both unipolar and bipolar configurations

## Additional Resources

- Novation Components: https://components.novationmusic.com
- User Guides: https://userguides.novationmusic.com
- Downloads: https://downloads.novationmusic.com
- Support: https://support.novationmusic.com 