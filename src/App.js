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
    console.log(JSON.stringify(GROUPS));
  }
  
  function insertContent(){
    setGroup(GROUP + 1);
    let childSize = document.querySelector(".add-form").elements["number"].value;
    //const prev = GROUPS[GROUP-1] ? GROUPS[GROUP-1].length : 1;
    //childSize = childSize * prev;
    //const itemsToAdd = [];
    // for(let i = 1; i <= childSize; i++){
    //   const newItem = addItem();
    //   itemsToAdd.push(newItem);
    // }

    const itemsToAdd = [];
    if(GROUP === 0){
      for(let i = 1; i <= childSize; i++){
        const newItem = addItem();
        itemsToAdd.push(newItem);
    }
  }

    if(GROUP > 0){
      const prevGroup = GROUPS[GROUP-1];
      prevGroup.forEach(item => {
        for(let i = 1; i <= childSize; i++){
          const newItem = addItem({parent : item});
          itemsToAdd.push(newItem);
          item.children.push(newItem);
        }
      });

    }

    setGroups([...GROUPS, itemsToAdd]);
  }
  
  function addItem({parent = null}){ 
    setID(ID+1);
    const newItem = new Item({
      name : "myItem",
      parent : parent    
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
