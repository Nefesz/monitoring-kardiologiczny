import React, { Component } from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';

import { Button, Icon, Input, Checkbox } from 'antd';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
  }
  

  handleCheckboxChange = (index) => {
    if (this.state.todos[index].isDone == true) {
      this.state.todos[index].isDone = false;
    } else {
      this.state.todos[index].isDone = true;
    }
    this.forceUpdate();
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleClick = () => {
    if (this.state.inputValue != '') {
      this.state.todos.push({
        name: this.state.inputValue,
        isDone: false
      });

      
      this.state.inputValue = '';

      this.forceUpdate();

      this.saveState();
    }
  }

  removeIndex = (index) => {
    this.state.todos.splice(index, 1);
     this.forceUpdate();
    this.saveState();
  }

  saveState = () => {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
  

  render() {
    return (
      <div>
        <Input
          
          placeholder="Dzień|Godzina|Ciśnienie krwi 31.12.2019|13:00|140\85"
          onChange={this.handleInputChange}
          value={this.state.inputValue}
        />
        <br />
        <Button
          type="primary"
        onClick={this.handleClick}>
        
         Wyślij <div className="icons-list">
    
    <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
   
  </div>,
          
        </Button>
        

        <div>
          <ul>
            {this.state.todos.map((todo, index) =>
              <li key={index}>
                <Checkbox
                  onChange={() => this.handleCheckboxChange(index)}
                  checked={todo.isDone} /> {todo.name} <Icon onClick={() => this.removeIndex(index)} type="delete" />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }

}


render(<App />, document.getElementById('root'));
