import React, {Component} from 'react'

class TaskInput extends Component {
    state = {
        list: [],
        currentInput: ""
      }
    
      addHandler = e => {
        this.setState({ currentInput: e.target.value })
      }
    
      submit = () => {
        let storeInput = this.state.list
    
        if(this.state.currentInput === ""){
          return alert("Please Enter a Task")
        }
        storeInput.push(this.state.currentInput)
        this.setState({input: storeInput, currentInput: ""})
        console.log("task has been added")
      }
    
      enterHandler = (event) => {
        if (event.key === 'Enter'){
          this.submit()
        }
      }
    
      render () {
        return (
          <div>
              <input placeholder="Enter Task Here" type="text" value={this.state.currentInput} onChange={this.addHandler} onKeyPress={this.enterHandler}></input>
              {this.state.list.map((savedInput, index) => {
                return <p key={index}>{savedInput}</p>
              })}
          </div>
        )
      }
    }
 
export default TaskInput;