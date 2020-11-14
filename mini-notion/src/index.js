import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './components/navigation.js'
import Editor from './components/editor.js';

function newNote(title) {
    return {
        title: title,
        blocs: [ "" ]
    };
}

class Notion extends React.Component {
    constructor(props) {
        super(props);

        let notes = [ newNote("Première"), newNote("Seconde") ];
        notes[0].blocs.push("Mon Texte");
        notes[1].blocs[0] = "Super !";
        this.state = {
            notes: notes,
            selected: notes[0]
        }
    }

    onNoteClick(note) {
        this.setState({
            selected: note
        });
    }

    render() {
        return (
            <div className="notion">
                <Navigation notes={this.state.notes} onNoteClick={(note) => this.onNoteClick(note)} />
                <Editor key={this.state.selected.title} selectedNote={this.state.selected} />
            </div>
        );
    }
}


ReactDOM.render(
<Notion />,
    document.getElementById('root')
);
