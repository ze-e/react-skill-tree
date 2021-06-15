import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import GroupElement from './components/GroupElement.js';

function App() {

  const [ID, setID] = React.useState(0);
  const [GROUP, setGroup] = React.useState(0);
  const [GROUPS, setGroups] = React.useState([]);

  class Item {
    constructor({
      name="new item",
      xp=10,
      parent,
      children=[],
      color='black',
    }={}){
    
    this.id = ID;
    this.name = name;
    this.xp = xp;
    this.group = GROUP;
    this.parent = parent;
    this.children = children;
    this.color = color;
    }
  }
  
  function handleSubmit(e){
    e.preventDefault();
    insertContent();
    console.log(GROUPS);
  }
  
  function insertContent(){
    setGroup(GROUP + 1);
    let childSize = document.querySelector(".add-form").elements["number"].value;

    const itemsToAdd = [];
    const colors = ["red","orange","yellow","blue","lblue","green","purple","pink"];
    if(GROUP === 0){
      for(let i = 1; i <= childSize; i++){
        const color = colors[Math.floor(Math.random()*colors.length)]
        const newItem = addItem({color});
        itemsToAdd.push(newItem);
    }
  }

    if(GROUP > 0){
      const prevGroup = GROUPS[GROUP-1];
      prevGroup.forEach(item => {
        for(let i = 1; i <= childSize; i++){
          const newItem = addItem({parent:item,color:item.color});
          itemsToAdd.push(newItem);
          item.children.push(newItem);
        }
      });

    }

    setGroups([...GROUPS, itemsToAdd]);
  }
  
  function addItem({parent, color='black'}={}){ 
    setID(ID+1);
    const newItem = new Item({
      name : uuidv4().slice(0,4),
      parent,
      color,    
    });
    return newItem;
   }

  return (
    <div className="App">
      <ol className="column">
        {GROUPS.length > 0 && GROUPS.map((group, index) => <GroupElement key={index} children={group} />)}
      </ol>
      <form className="add-form" onSubmit={handleSubmit}>
        <input name="number" type="number" max="4" min="1" defaultValue="1" ></input>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
