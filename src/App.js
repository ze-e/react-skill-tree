import './App.css';
import React from 'react';
import GroupElement from './components/GroupElement.js';

function App() {

  const [ID, setID] = React.useState(0);
  const [GROUP, setGroup] = React.useState(0);
  const [GROUPS, setGroups] = React.useState([]);

  class Item {
    constructor({
      name="New Item",
      xp=10,
      parent=null,
      children=[]
    }={}){
    
    this.id = ID;
    this.name = name;
    this.xp = xp;
    this.group = GROUP;
    this.parent = parent;
    this.children = children;
    }
  }
  
  function handleSubmit(e){
    e.preventDefault();
    insertContent();
  }
  
  function insertContent(){
    setGroup(GROUP + 1);
    const childSize = document.querySelector(".add-form").elements["number"].value;
    const itemsToAdd = [];

    for(let i = 1; i <= childSize; i++){
      const newItem = addItem();
      itemsToAdd.push(newItem);
    }

    setGroups([...GROUPS, [itemsToAdd]]);
  }
  
  function addItem(){ 
    const newItem = new Item({
      name : "myItem"
    });
    setID(ID + 1);
    return newItem;
   }

  return (
    <div className="App">
    <ol className="column">
      {GROUPS.length > 0 && GROUPS.map(group => <GroupElement key={index} children={group} />)}
    </ol>
    <form className="add-form" onSubmit={handleSubmit}>
      <input name="number" type="number" max="4" min="1" defaultValue="1" ></input>
      <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
