import {Chord} from "./Chord";
import $ from "jquery";


const chordSymbols: any = { // Holds the symbols for each chord name.
    "Single": "One Note",
    "Major Triad": "",
    "Minor Triad": "m",
    "Augmented Triad": "Aug",
    "Diminished Triad" : "Dim"
};

/**
 * Holds the chord information for each chord in the inversion.
 */
class InversionChord {
    rootNote: string
    type: string
    inversion: number
    
    constructor(rootNote: string, type: string, inversion: number) {
        this.rootNote = rootNote; // Holds the root note of the chord
        this.type = type; // Holds the type of chord
        this.inversion = inversion; // Holds the inversion of the piano keys to be played
    }

    getRepresentation() {  // Returns a div element that is put into the progression holder
        const chordRepresentation = document.createElement("div");
        chordRepresentation.classList.add("col-2", "chord-column");
        chordRepresentation.innerText = this.rootNote + " " + chordSymbols[this.type];
        chordRepresentation.dataset.type = this.type; // Sets notes attached to representation to be played later
        chordRepresentation.id = "chord-representation";
        // chordRepresentation.addEventListener("click", alert(this.type)); // Fix this!

        return chordRepresentation;
    }
}


/**
 * Holds information for sequence of chords.
 */
class ChordProgression {
    static chordsList: Array<string> = [];
    constructor(container: HTMLElement) {
        this._renderView(container);
        this._keyDown();
    }

    _renderView(container: HTMLElement) {
        // Created chordListHolder out of the class so I can edit it everywhere.
        chordListHolder.classList.add("chord-list-holder");

        container.append(chordListHolder);
    }

    /**
     * Adds chord to chord list
     * @param chord
     */
    static addChord() {
        let currentChord = new InversionChord("A2", Chord.type, Chord.inversionNum);  //  Update chord.mjs variables
        if (ChordProgression.chordsList.length === 6) {
            alert("Progression List can not have length longer than eight.")
        }
        else {
            ChordProgression.chordsList.push(Chord.type);
            chordListHolder.appendChild(currentChord.getRepresentation()); // attaches the div element to the chords holder.
            // this.updateText();
        }
    }

    /**
     * Clears the list of chords
     */
    static resetChord() {
        const group = this;
        group.chordsList = [];
        chordListHolder.innerHTML = ""
    }


    /**
     * Plays through the chords using sequencers.
     */
    static playChord() {
        alert(ChordProgression.chordsList);
    }

    alertHello(){
        alert("hello");
    }

    _keyDown() {
        $(".chord-representation").click(function() {
            alert("hello")
        });
    }

}

const chordListHolder = document.createElement("div"); // Creates global variables to be accessed throughout.
chordListHolder.classList.add("row");
ChordProgression.chordsList = [];

export {ChordProgression}