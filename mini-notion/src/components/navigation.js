import React from 'react';
import ReactDOM from 'react-dom';


class Navigation extends React.Component {
    render() {
        const notes = this.props.notes.map((obj, i) => {
            return (
                <li
                    key={obj.title} 
                    onClick={() => this.props.onNoteClick(obj)}
                    className={obj === this.props.selectedNote ? "heavy-note" : ""}>{obj.title}</li>
            )
        });
        return (
            <div className="navigation">
                <h1>Notion</h1>
                <div>
                    <div className="navigation-page-header">
                        <h4>PAGES</h4>
                        <button className="add-note" onClick={() => this.props.addNote()}>+</button>
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