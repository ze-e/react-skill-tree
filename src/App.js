import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Colors from './util/Colors';
import GroupElement from './components/GroupElement';
import GroupData from './components/GroupData';

function App() {
  
  const [selectedGroup, setSelectedGroup] = React.useState(0);
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
    
    this.id = uuidv4();
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
      selected.id && setSelectedGroup(selected.id);
    }
  }

  function changeName(item, newName){
    const newValue = [...GROUPS];
    newValue.forEach(group => {
      group.forEach(i => i.id === item.id ? i.name = newName : i.name = i.name)
    });
    setGroups(newValue);
  }
  
  function insertContent(){

    setGroup(GROUP + 1);
    const childSize = document.querySelector(".add-form").elements["number"].value;
    const itemsToAdd = [];

    //create groupColor
    const GroupColors = new Colors();

    if(GROUP === 0){
    const color = GroupColors.chooseUniqueColor();
      for(let i = 1; i <= childSize; i++){
        const newItem = addItem({color});
        itemsToAdd.push(newItem);
    }
  }

    if(GROUP > 0){
      const prevGroup = GROUPS[GROUP-1];
      prevGroup.forEach(item => {
      const color = GroupColors.chooseUniqueColor();
        for(let i = 1; i <= childSize; i++){
          const newItem = addItem({parent:item,color});
          itemsToAdd.push(newItem);
          item.children.push(newItem);
        }
      });

    }

    setGroups([...GROUPS, itemsToAdd]);
  }
  
  function addItem({name=uuidv4().slice(0,4), parent, color='black', group}={}){ 
    const newItem = new Item({name, parent, color, group});
    group && GROUPS[group - 1] && GROUPS[group - 1].forEach(item => item.children.push(newItem));    
    return newItem;
   }

  function addLesson(group){
    const newValue = [...GROUPS];
    //create new item
    const color = new Colors().chooseUniqueColor();
    const newItem = addItem({color, group});
    //add item to group
    const thisGroup = newValue[group];
    thisGroup.push(newItem);
    //update groups
    setGroups(newValue);
  }

  function handleAddGroup(){
    setGroup(GROUP + 1);
    const itemsToAdd = [];

    const GroupColors = new Colors();
    const color = GroupColors.chooseUniqueColor();
    const newItem = addItem({group, color});
    itemsToAdd.push(newItem);

    setGroups([...GROUPS, itemsToAdd]);
  }

  return (
    <div className="App">
      <div class="data">
        <h1>{selectedGroup && `Level : ${selectedGroup}`}</h1>
          <GroupData groupNumber={selectedGroup} children={GROUPS && GROUPS[selectedGroup] && GROUPS[selectedGroup]} changeName={changeName} addLesson={addLesson}/>
      </div>
      <div className="timeline">
        <ol className="column" onClick={handleClick}>
          {GROUPS && GROUPS.length > 0 && GROUPS.map((group, index) => <GroupElement key={index} id={index} selected={index === selectedGroup && true} children={group}/>)}
        </ol>
      </div>
      <button className="add-group" type="button" onClick={handleAddGroup}>Add Unit</button>
    </div>
  );
}

export default App;
