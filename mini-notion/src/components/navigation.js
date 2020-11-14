import React from 'react';
import ReactDOM from 'react-dom';


class Navigation extends React.Component {

    render() {
        const notes = this.props.notes.map((obj, i) => {
            return (
                <li key={obj.title} onClick={() => this.props.onNoteClick(obj)}>{obj.title}</li>
            )
        });
        return (
            <div className="navigation">
                <div>Notion</div>
                <div>
                    <h4>Pages</h4>
                    <ul>
                        {notes}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Navigation;