import React from 'react';
import ReactDOM from 'react-dom';

class EditorBloc extends React.Component {    
    render() {
        return (
            <input type="text" value={this.props.value} className="editor-bloc" onChange={this.props.onChange} onKeyDown={(event) => this.props.onKeyPress(event)}></input>
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
        this.jumpTo = null

        this.onEnterPress = this.onEnterPress.bind(this);
    }

    onEnterPress(event, i) {
        if (event.keyCode === 13) {
            let newBlocs = this.state.note.blocs;
            newBlocs.splice(i + 1, 0, "");
            this.setState({ blocs: newBlocs });

            this.jumpTo = i + 1;
        }
    }

    componentDidUpdate() {
        if(this.jumpTo) {
            ReactDOM.findDOMNode(this.refToLast).focus();
            this.jumpTo = null;
        }
    }

    checkChange(event, i) {
        let blocs = this.state.note.blocs;
        blocs[i] = event.target.value;
        this.setState({ blocs: blocs }); 
    }

    render() {
        const parentBlocs = this.state.note.blocs;
        const blocs = parentBlocs.map((bloc, i) => {
            return (
                <EditorBloc value={bloc} 
                    onChange={(event) => this.checkChange(event, i)} 
                    ref={(inst) => {if(this.jumpTo === i) this.refToLast = inst; }} 
                    key={i} 
                    onKeyPress={(event) => this.onEnterPress(event, i)} />
            );
        });
        
        return (
            <div className="editor">
                <div className="note-editor-title">{this.state.note.title}</div>
                {blocs}
            </div>
        );
    }

}



export default Editor;