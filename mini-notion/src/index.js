import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './components/navigation.js'
import Editor from './components/editor.js';

function newNote(id, title) {
    return {
        id: id,
        title: title,
        blocs: [ "" ]
    };
}

class Notion extends React.Component {
    constructor(props) {
        super(props);

        this.lastNoteId = 0;

        let notes = [ newNote(this.lastNoteId++, "Première"), newNote(this.lastNoteId++, "Seconde") ];
        notes[0].blocs.push("Mon Texte");
        notes[1].blocs[0] = "Premier";
        notes[1].blocs.push("Second");
        notes[1].blocs.push("Troisième");
        notes[1].blocs.push("Quatrième");
        this.state = {
            notes: notes,
            selected: notes[1]
        }

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.checkChangeTitle = this.checkChangeTitle.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event, i) {
        if (event.keyCode === 13) {
            let note = this.state.selected;
            let newBlocs = note.blocs;
            newBlocs.splice(i + 1, 0, "");
            note.blocs = newBlocs;
            this.setState({ selected: note });

            this.jumpTo = i + 1;
            event.preventDefault();
            event.stopPropagation();
            return false;
        } else if (event.keyCode === 8 && event.target.textContent === "") {
            let note = this.state.selected;
            let newBlocs = note.blocs;
            newBlocs.splice(i, 1);
            note.blocs = newBlocs;
            document.activeElement.blur();
            this.setState({ selected: note });
        }
    }

    checkChange(event, i) {
        let note = this.state.selected;
        let blocs = note.blocs;
        blocs[i] = event.target.textContent;
        note.blocs = blocs;

        this.setState({ selected: note }); 
    }

    checkChangeTitle(event) {
        let note = this.state.selected;
        note.title = event.target.value;

        this.setState({selected: note});
    }

    onNoteClick(note) {
        this.setState({
            selected: note
        });
    }

    addNote() {
        this.setState({
            notes: this.state.notes.concat( newNote(this.lastNoteId++, "Untitled") )
        });
    }

    deleteNote(note) {
        let notes = this.state.notes;
        let index = notes.findIndex(n => n.id === note.id);
        notes.splice(index, 1);
        this.setState({
            notes: notes,
            selected: index === 0 ? notes[0] : this.state.selected
        });
    }

    render() {
        return (
            <div className="notion">
                <Navigation key={this.state.notes}
                            notes={this.state.notes} 
                            selectedNote={this.state.selected}
                            addNote={this.addNote}
                            deleteNote={this.deleteNote}
                            onNoteClick={(note) => this.onNoteClick(note)} />

                <Editor key={this.state.selected.id} 
                        noteTitle={this.state.selected.title}
                        noteBlocs={this.state.selected.blocs}
                        checkChangeTitle={this.checkChangeTitle}
                        checkChange={this.checkChange}
                        onKeyPress={this.onKeyPress}
                        jumpTo={this.jumpTo}
                        resetJumpTo={() => this.jumpTo = null} />
            </div>
        );
    }
}


ReactDOM.render(
<Notion />,
    document.getElementById('root')
);
