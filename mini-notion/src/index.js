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

        // This sets the starting pages of the site.
        let notes = [ newNote(this.lastNoteId++, "Use Markdown"), newNote(this.lastNoteId++, "Modifying Pages") ];
        notes[0].blocs = [
            "# How to",
            "To change a text block, just click on the text that you want to modify. The text with the tokens will then be showed so you can properly modify your text. When you leave the focus on the text block the text will automatically be converted to markdown.",
            "You can use all the basic tokens of markdown.",
            "## Examples",
            "*Italic*",
            "**Bold**",
            "̣~~Strikethrough~~",
            "```Code```",
            "- Bullet Point",
        ];

        notes[1].blocs = [
            "# Functionalities",
            "## Add pages",
            "You can add pages by clicking on the '+' button on the right of the PAGES header.",
            "## Delete pages",
            "You can delete a page by clicking on the 'X' button that shows up when hovering on the page on the left.",
            "## Renaming a page",
            "When clicking on a page, you can change its title directly on the top of the note.",
            "## Modifying text-blocks withing a page.",
            "To **add** a text-block, simply click on a text-block and press enter. The new text-block will be inserted right under.",
            "To **delete** a text-block, remove all text from it and then press backspace.",
            "*The empty text-blocks will show a text placeholder when the mouse hovers them.*"

        ];
        this.state = {
            notes: notes,
            selected: notes[0]
        }

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.checkChange = this.checkChange.bind(this);
        this.checkChangeTitle = this.checkChangeTitle.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    spliceSelectedNote(index, amountToDel, replacement=null) {
        var note = this.state.selected;
        var newBlocs = note.blocs;
        if(replacement !== null)
            newBlocs.splice(index, amountToDel, replacement);
        else
            newBlocs.splice(index, amountToDel);
        note.blocs = newBlocs;
        this.setState({ selected: note });
    }

    onKeyPress(event, i) {
        if (event.keyCode === 13) {
            this.spliceSelectedNote(i + 1, 0, "");
            this.jumpTo = i + 1;

            // Prevent the <br> to be inserted.
            event.preventDefault();
            event.stopPropagation();
            return false;
        } else if (event.keyCode === 8 && event.target.textContent === "") {
            this.spliceSelectedNote(i, 1);
            document.activeElement.blur();
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
