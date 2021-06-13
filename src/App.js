import './App.css';
import React from 'react';
import ItemElement from './components/ItemElement.js';

function App() {

  const [ITEMS, setItems] = React.useState([]);
  const [ID, setID] = React.useState(0);
  const [GROUP, setGroup] = React.useState(1);

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
    const columnSize = document.querySelector(".add-form").elements["number"].value;
    addItem();
  }
  
  function addItem(){ 
    const newItem = new Item({
      name : "myItem",
    });
    //new item has been added
    setItems([...ITEMS, newItem]);
    setID(ID+1);
    console.log(`created item ${newItem} and added to item list in group ${GROUP}. ${JSON.stringify(ITEMS)}`)
  }

  return (
    <div className="App">
    <ol className="column">
      {ITEMS.length > 0 && ITEMS.map(item => <ItemElement key={item.id} name = {item.name} xp = {item.xp} />)}
    </ol>
    <form className="add-form" onSubmit={handleSubmit}>
      <input name="number" type="number" max="4" min="1" defaultValue="1" ></input>
      <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
