class ProgressionButtons {
    onPlayChord: any;

    constructor(container: HTMLElement) {
        const row = document.createElement("div");
        row.classList.add("row", "justify-content-md-center");

        container.appendChild(row);

        this._renderView(row);
        // this._buttonClicked();

        // callback events
        this.onPlayChord = function(){};
    }

    _renderView(container: HTMLElement){

        const btnGroup = document.createElement("div"); // Button group for the buttons.
        btnGroup.classList.add("btn-group", "p-2");
        btnGroup.setAttribute("role", "group");
        btnGroup.id = "progressionBtnGroup";

        const labelBtnGroup = document.createElement("div"); // Button group for the label
        btnGroup.classList.add("btn-group");
        btnGroup.setAttribute("role", "group");
        btnGroup.id = "progressionLabelBtnGroup";

        this._renderLabel(labelBtnGroup);

        const addButton = document.createElement("button");
        addButton.classList.add("btn", "btn-outline-secondary", "disabled");
        addButton.id = "addBtn";
        addButton.innerText = "Add";
        btnGroup.appendChild(addButton);

        const playButton = document.createElement("button");
        playButton.classList.add("btn", "btn-outline-secondary");
        playButton.id = "playBtn";
        playButton.innerText = "Play";
        btnGroup.appendChild(playButton);

        const resetButton = document.createElement("button");
        resetButton.classList.add("btn", "btn-outline-secondary");
        resetButton.id = "resetBtn";
        resetButton.innerText = "Reset" ;
        btnGroup.appendChild(resetButton);

        // container.appendChild(labelBtnGroup);
        container.appendChild(btnGroup);

    }

    _renderLabel(btnGroup: HTMLElement){
        const label = document.createElement("span");
        label.innerText = "Progression:";
        label.classList.add("text-muted", "btn");
        label.setAttribute("disabled", "true");
        btnGroup.appendChild(label);
    }
}

export {ProgressionButtons}