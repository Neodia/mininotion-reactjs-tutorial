# Mini-Notion

This repo serves as my work journal where I'll write everything about my learning process of ReactJS.

I'm trying to learn more about this Framework because it seems to be in high demand in the industry, and I want to
maximise my chances of finding a job.

The goal is to follow the ReactJS tutorial, and then change the code to implement a mini version of my favourite note
taking system, Notion. This mini version will only allow us to create new note using markdown. The notes won't be stored
as it will only be a Frontend system.

The following text is my learning journal from newest to older updates.

## Journal

## 12.11.2020 15:46

After a break, I properly finished the tutorial. I implemented the time travel by moving all intelligence in the game component,
and then adding each new state to a list.

I'm done for now, I'll be back to start the Mini-Notion after I take care of some obligations.

## 12.11.2020 14:21

The tutorial talked about immutability. I already knew most of it because I had a really interesting course at school that 
went in depth about it.

I saw function components. When components only have the render function we can turn them into functions, like this : 

```jsx harmony
class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
```

Is the same as 

```jsx harmony
function Square(props) {
    return  (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}
```

The usage of both stays the same.

I just finished alternating between X and O. The game is almost done. I'll implement the win condition and a play history.
Then I'll start my Mini-Notion. 

## 12.11.2020 13:56

As expected the listeners are handled mostly like in VueJS. Thus I fast forwarded a bit and I am now seeing how to handle
communication between components so the Board component can store the state of each square.

### 12.11.2020 13:30

First look at the code, it seems that ReactJS follows a lot of same principles that VueJS uses. Being kind of fluent in
VueJs, the learning process should be pretty fast. The only things that seems to change, for now, is the syntax of the code.

### 12.11.2020 13:20

Added the starting code with `npx create-react-app mini-notion`. I'm starting to read the [tutorial](https://fr.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment).

The code comes with a grid to implement the TicTacToe game.