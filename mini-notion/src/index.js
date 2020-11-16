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
        notes[1].blocs[0] = "Super !";
        this.state = {
            notes: notes,
            selected: notes[0]
        }

        this.addNote = this.addNote.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.checkChangeTitle = this.checkChangeTitle.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event, i) {
        if (event.keyCode === 13) {
            let newBlocs = this.state.selected.blocs;
            newBlocs.splice(i + 1, 0, "");
            this.setState({ blocs: newBlocs });

            this.jumpTo = i + 1;
        }
    }

    checkChange(event, i) {
        // alert( event.target.innerHTML );
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

    render() {
        return (
            <div className="notion">
                <Navigation key={this.state.notes}
                            notes={this.state.notes} 
                            selectedNote={this.state.selected}
                            addNote={this.addNote} 
                            onNoteClick={(note) => this.onNoteClick(note)} />

                <Editor key={this.state.selected.id} 
                        selectedNote={this.state.selected}
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
