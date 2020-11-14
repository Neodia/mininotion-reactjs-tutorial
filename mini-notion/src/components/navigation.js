import React from 'react';
import ReactDOM from 'react-dom';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes
        }
    }

    render() {
        const notes = this.state.notes.map((obj, i) => {
            return (
                <li className="note" key={obj.title} onClick={() => this.props.onNoteClick(obj)}>{obj.title}</li>
            )
        });
        return (
            <div className="navigation">
                <h1>Notion</h1>
                <div>
                    <div className="navigation-page-header">
                        <h4>Pages</h4>
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