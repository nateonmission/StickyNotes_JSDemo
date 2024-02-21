let notesObj = {};
let noteCounter = 0;


function addNote(isNew=true, this_index=0, this_text="") {
    console.log("CLICK")
    noteCounter += 1;

    let noteContainer = document.querySelector('.notes')
    let newNote = document.createElement('div');
    newNote.classList.add('square', 'note')

    let newTextArea = document.createElement('TEXTAREA')
    newTextArea.classList.add('note');
    let newButton = document.createElement('button')
    newButton.classList.add('delete')
    newButton.innerHTML = `Delete`;

    if (isNew){
        newTextArea.setAttribute("id", `note${noteCounter}`);
        newTextArea.setAttribute("onkeyup", "saveNote(id)");
        newButton.setAttribute("id", `button${noteCounter}`)
        let deleteNote = `note${noteCounter}`
        newButton.setAttribute("onclick", `deleteNote("${deleteNote}")`)
        newNote.appendChild(newTextArea);
        newNote.appendChild(newButton)
        noteContainer.appendChild(newNote);
        newTextArea.focus();
    } else {
        newTextArea.setAttribute("id", `note${this_index}`);
        newTextArea.setAttribute("onkeyup", "saveNote(id)");
        newTextArea.value=this_text;
        newButton.setAttribute("id", `button${this_index}`)
        let deleteNote = `note${this_index}`
        newButton.setAttribute("onclick", `deleteNote("${deleteNote}")`)
        newNote.appendChild(newTextArea);
        newNote.appendChild(newButton)
        noteContainer.appendChild(newNote);
        saveNote(`note${this_index}`);
    }
}

function saveNote(id) {
    let note = document.querySelector(`#${id}`)
    notesObj[id] = note.value;
    console.log(notesObj)
    localStorage.setItem("stickyNotes", JSON.stringify(notesObj))
}

function deleteNote(id){
    console.log(`${id}`)
    noteJSON = JSON.parse(localStorage.stickyNotes);
    noteJSON[id] = null;
    notesObj[id] = null;
    let oldNote = document.querySelector(`#${id}`);
    oldNote.parentElement.remove()
    localStorage.setItem("stickyNotes", JSON.stringify(notesObj))
}

function loadNotes(){
    console.log("Click Load")
    console.log(JSON.parse(localStorage.stickyNotes))

    let local = JSON.parse(localStorage.stickyNotes);
    let max_index = 0;
    for (const [key, value] of Object.entries(local)) {
        if(value === "" || value === null){
            this_index = parseInt(key.substring(4,key.length))
            max_index = this_index>max_index ? this_index : max_index;
            continue
        } else {
            this_index = parseInt(key.substring(4,key.length))
            max_index = this_index>max_index ? this_index : max_index;
            addNote(false, this_index, value)
        }

    }
}