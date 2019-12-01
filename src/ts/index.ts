// Third-party modules
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
import "material-design-icons"
import "bootstrap-submenu/dist/css/bootstrap-submenu.css"
import "bootstrap-submenu/dist/js/bootstrap-submenu"
import "jquery"

import {Piano} from "./keyboard/Piano";
import {PianoSound} from "./sound/PianoSound";
import { Loader } from "./interface/Loader";
import {ChordTypeBtn} from "./setting-toolbar/ChordTypeBtn";
import {InversionBtn} from "./setting-toolbar/InversionBtn";
import {Chord} from "./music-theory/Chord";


new Loader();

const chordTypeBtn = new ChordTypeBtn();
const inversionBtn = new InversionBtn();

const pianoContainer = document.getElementById("pianoContainer")!;
const piano = new Piano(pianoContainer);

// Progression
const progresssionContainer = document.createElement("div");
progresssionContainer.id = "progressionContainer";
document.body.appendChild(progresssionContainer);

new ProgressionButtons(progresssionContainer);

const chordProgression = new ChordProgression(progresssionContainer);

const sound = new PianoSound(0, 100);
sound.load();


piano.onKeyDown = function(chord: Array<string>, clicked: boolean){
    if (clicked){   // The user clicked a key, the sound will be released after the user releases the key
        sound.keyDown(chord);
    } else {    // The user does not click the key, the sound will stop after a certain time
        // sound.keyDown(chord);
        // sound.keyUp(chord);
        sound.keyDownUp(chord);
    }

};

piano.onKeyUp = function(chord: Array<string>){
    sound.keyUp(chord);
};

chordTypeBtn.onSetChordType = function (type: string, family: string) {
    console.log(`Set the type to ${type}`);
    const chordLen = Chord.getLen(family, type);
    inversionBtn.reset(chordLen);
    piano.setChordType(family, type);
};

chordProgression.onPlayChord = function(chords: Array<Array<string>>){
	let events = [];
	for (let i = 0; i < chords.length; i++){
		const event = {"time": i, "chord": chords[i]};
		events.push(event);
	}

	new Part(function(time, value){
		//the value is an object which contains both the note and the velocity
		sound.keyDownUp(value.chord, "2n", time);
		//@ts-ignore
	}, events).start(0);
	//@ts-ignore
	Transport.toggle();
};



