import React from 'react';
import ReactDOM from 'react-dom';


class Navigation extends React.Component {
    render() {
        const notes = this.props.notes.map((obj, i) => {
            return (
                <li
                    key={obj.title} 
                    className={obj === this.props.selectedNote ? "selected-note" : ""}>
                        <div onClick={() => this.props.onNoteClick(obj)}>
                            {obj.title}
                        </div>
                        <button className="navigation-btn" onClick={() => this.props.deleteNote(obj)}>x</button>
                    </li>
            )
        });
        return (
            <div className="navigation">
                <h1>Notion</h1>
                <div>
                    <div className="navigation-page-header">
                        <h4>PAGES</h4>
                        <button className="navigation-btn" onClick={() => this.props.addNote()}>+</button>
                    </div>
                    <ul>
                        {notes}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Navigation;