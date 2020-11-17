import React from 'react';


class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: null
        }
    }

    componentDidMount() {
        fetch("https://api.adviceslip.com/advice")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    time: data.slip.advice
                });
            })
            .catch((err) => alert(err));
    }

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
                <div className="time">{this.state.time}</div>
            </div>
        );
    }

}

export default Navigation;