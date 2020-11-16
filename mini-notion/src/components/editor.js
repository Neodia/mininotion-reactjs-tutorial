import React from 'react';
import ReactDOM from 'react-dom';
import { Remarkable } from 'remarkable';

class EditorBloc extends React.Component {   
    constructor(props) {
        super(props);

        this.state = {
            text: props.mdText
        }

        this.onFocus = this.onFocus.bind(this);
        this.onFocusLeave = this.onFocusLeave.bind(this);
    }

    onFocus(e) {
        //  alert(e.target.innerHTML);
        this.setState({
            text: this.props.text
        });
    }

    onFocusLeave() {
        this.setState({
            text: this.props.mdText
        });
    }
    
    render() {
        return (
            <div    data-text="You can use basic markdown for your notes."
                    contentEditable={true}
                    dangerouslySetInnerHTML={ this.state.text } 
                    className="editor-bloc" 
                    onInput={this.props.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onFocusLeave}
                    onKeyDown={this.props.onKeyPress}></div>
        );
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.md = new Remarkable();
        this.md.set({
            breaks: false
        })
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

    convertToMd(text) {
        return {__html: this.md.render(text)};
    }

    render() {
        const parentBlocs = this.state.note.blocs;
        const blocs = parentBlocs.map((bloc, i) => {
            return (
                <EditorBloc 
                    text={ {__html: bloc} }
                    mdText={ this.convertToMd(bloc) } 
                    onChange={(event) => this.props.checkChange(event, i)} 
                    ref={(inst) => {if(this.props.jumpTo === i) this.refToLast = inst; }} 
                    key={i} 
                    onKeyPress={(event) => this.props.onKeyPress(event, i)} />
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