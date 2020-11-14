import React from 'react';
import ReactDOM from 'react-dom';

class EditorBloc extends React.Component {    
    render() {
        return (
            <input type="text" 
                    onMouseEnter={(e) => {e.target.placeholder = "You can use basic markdown for your notes."}}
                    onMouseLeave={(e) => {e.target.placeholder = ""}}
                   value={this.props.value} className="editor-bloc" onChange={this.props.onChange} onKeyDown={(event) => this.props.onKeyPress(event)}></input>
        );
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        // Extract the blocs from the notes later.
        this.state = {
            note: this.props.selectedNote,
        }

        this.refToLast = React.createRef();
    }

    componentDidUpdate() {
        if(this.props.jumpTo) {
            ReactDOM.findDOMNode(this.refToLast).focus();
            this.props.resetJumpTo();
        }
    }

    render() {
        const parentBlocs = this.state.note.blocs;
        const blocs = parentBlocs.map((bloc, i) => {
            return (
                <EditorBloc value={bloc} 
                    onChange={(event) => this.props.checkChange(event, i)} 
                    ref={(inst) => {if(this.props.jumpTo === i) this.refToLast = inst; }} 
                    key={i} 
                    onKeyPress={(event) => this.props.onEnterPress(event, i)} />
            );
        });
        
        return (
            <div className="editor">
               <input type="text" className="note-editor-title" value={this.props.selectedNote.title} onChange={this.props.checkChangeTitle}></input>
                {blocs}
            </div>
        );
    }

}



export default Editor;