import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import GroupElement from './components/GroupElement.js';

function App() {

  const [selectedGroup, setSelectedGroup] = React.useState([]);
  const [ID, setID] = React.useState(0);
  const [GROUP, setGroup] = React.useState(0);
  const [GROUPS, setGroups] = React.useState([]);
  const colors = ["red","orange","yellow","blue","lblue","green","purple","pink"];

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
  }

  function handleClick(e){
    const oldSelected = document.querySelector('.selected');
    oldSelected && oldSelected != null && oldSelected.classList.remove('selected');
    const selected = e.target.closest('.item');

    if(selected && selected != null){
      selected.classList.add('selected');
      const group = selected.id;
      group && setSelectedGroup(GROUPS[group]);
    }
  }
  
  function insertContent(){
    setGroup(GROUP + 1);
    const childSize = document.querySelector(".add-form").elements["number"].value;

    const itemsToAdd = [];
    if(GROUP === 0){
    const color = colors[Math.floor(Math.random()*colors.length)]
      for(let i = 1; i <= childSize; i++){
        const newItem = addItem({color});
        itemsToAdd.push(newItem);
    }
  }

    if(GROUP > 0){
      const prevGroup = GROUPS[GROUP-1];
      prevGroup.forEach(item => {
      const color = colors[Math.floor(Math.random()*colors.length)]
        for(let i = 1; i <= childSize; i++){
          const newItem = addItem({parent:item,color});
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
      <form className="add-form" onSubmit={handleSubmit}>
        <input name="number" type="number" max="4" min="1" defaultValue="1" ></input>
        <button type="submit">Add Item</button>
      </form>
      <div class="data">
        <h1>{selectedGroup[0] && selectedGroup[0].id && selectedGroup[0].id}</h1>
      </div>
      <div className="timeline">
        <ol className="column" onClick={handleClick}>
          {GROUPS.length > 0 && GROUPS.map((group, index) => <GroupElement key={index} id={index} children={group} />)}
        </ol>
      </div>

    </div>
  );
}

export default App;
