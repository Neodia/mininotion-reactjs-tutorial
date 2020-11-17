# Mini-Notion

This repo serves as my work journal where I'll write everything about my learning process of ReactJS.

I'm trying to learn more about this Framework because it seems to be in high demand in the industry, and I want to
maximize my chances of finding a job.

The goal is to follow the ReactJS tutorial, and then change the code to implement a mini version of my favorite note
taking system, Notion. This mini version will only allow us to create new note using markdown. The notes won't be stored
as it will only be a Frontend system.

\[Update\]

The project is done for now. I have now a way better understanding of ReactJS and can understand basic code. The project isn't perfect but it allowed me to properly implement some key features of React to learn.

To try the application, please download the code and type `npm start` in the mini-notion directory.

The following text is my learning journal from newest to oldest updates.

## Journal

### 17.11.2020 13:15

This morning I properly consumed an API. It was pretty easy, I just used fetch. The API that I consume just gives a random advice quotes. https://api.adviceslip.com/advice

I set the text for 2 starting pages to properly guide people that come across this project.

This project is done for now.

### 16.11.2020 14:45

I spent some time on a bug. The editor wasn't updating correctly the text with dangerouslySetInnerHTML. Turns out that the constructor is only called once. Previously, I set the state in the constructor and didn't touch the state anymore, but that was wrong. I now check if the component is receiving some props, I compare them, and if the component isn't focused, I correctly update the text.

I'll stop for today. Tomorrow I'll consume an API, probably a simple one just to learn how to handle it in React.

### 16.11.2020 11:30

I changed some styles and did a small break. I will now allow the user to delete text-blocks and notes. Then I'll try and consume an API because I still don't know how to do it in ReactJS, and the project will slowly come to an end.

### 16.11.2020 10:45

It's been now 90 minutes that I started to work again. I stumbled on some problems when transforming the elements to Markdown. The result is not as clean as Notion but it allows to properly modify the markdown and instantly check the result when done modifying.

### 14.11.2020 16:30

We can now change the title and add notes. The text blocks are now prettier (they don't have any border) and the placeholders correctly indicate that we can do Markdown. The markdown isn't implemented yet tho.

I'm stopping for now. The next time I'll change the style of the selected note, I'll implement the markdown and I'll change some visual stuff.

### 14.11.2020 15:00

I can now click on the notes to properly modify them in the editor. I must add the ability to add a note and to modify the title. I'll do this and change some visual aspects to be nicer to the eye.

An important note is that the "key" attribute is useful even outside of dynamic lists. The editor didn't change the note that was displayed before I added a key value to the component. That attribute helps to know when a given component has to be refreshed.

### 14.11.2020 13:30

I took a while to understand some notions that were not in the tutorial. 

First the references. I needed them to properly focus on the correct input when adding a new one. Refs are used to replace the native "getElementById". As this is not possible, we use Refs instead. VueJs has the same utility for refs but the syntax is really different and I didn't understand the ReactJS' one at first.

I also learned about "componentDidUpdate" (and others) that are basically listeners to different moments of the rendering process. VueJS has the same, as most of the stuff, so that went fast.

for now I can add text blocs in the editor. The next step will be to create the notes and to properly link the notes to the text. Gonna eat something then I'll be back to work.

### 14.11.2020 10:22

I'm restarting to code now. For today the objective is to set most of the UI, and eventually to enable Markdown while taking notes.

### 12.11.2020 15:46

After a break, I properly finished the tutorial. I implemented the time travel by moving all intelligence in the game component,
and then adding each new state to a list.

I'm done for now, I'll be back to start the Mini-Notion after I take care of some obligations.

### 12.11.2020 14:21

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

### 12.11.2020 13:56

As expected the listeners are handled mostly like in VueJS. Thus I fast forwarded a bit and I am now seeing how to handle
communication between components so the Board component can store the state of each square.

### 12.11.2020 13:30

First look at the code, it seems that ReactJS follows a lot of same principles that VueJS uses. Being kind of fluent in
VueJs, the learning process should be pretty fast. The only things that seems to change, for now, is the syntax of the code.

### 12.11.2020 13:20

Added the starting code with `npx create-react-app mini-notion`. I'm starting to read the [tutorial](https://fr.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment).

The code comes with a grid to implement the TicTacToe game.