# Vocabulary

Here are stored are definition proper to ReactJS.

**Controlled Components -** components that have a parent that has full control over them.

**Function Components -** components that only have a "render" function. In that case, we can convert them in a function.

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