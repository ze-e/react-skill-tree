import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Colors from './util/Colors';
import GroupElement from './components/GroupElement';
import GroupData from './components/GroupData';

function App() {
  
  const [selectedGroup, setSelectedGroup] = React.useState();
  const [GROUPS, setGROUPS] = React.useState([]);
  const [error, setError] = React.useState('');

  class Item {
    constructor({
      name="New lesson",
      group = selectedGroup || 0,
      xp=10,
      parents=[],
      children=[],
      color='black',
    }={}){
    
    this.id = uuidv4();
    // this.name = name;
    this.name = this.id.slice(0,5);
    this.xp = xp;
    this.group = group;
    this.parents = parents;
    this.children = children;
    this.color = color;
    }
  }

  React.useEffect(()=>{
    console.log(GROUPS);
  })

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
    const newGroups = [...GROUPS];
    newGroups.forEach(group => {
      group.forEach(i => i.id === item.id ? i.name = newName : i.name = i.name)
    });
    setGROUPS([...newGroups]);
  }
  
  
  function addItem({parent, color='black', group}={}){ 
    const newItem = new Item({color, group});
    parent && newItem.parents.push(parent);
    newItem.color = parent ? parent.color : color;
    return newItem;
   }

  function addLesson(group){
    const newGroups = [...GROUPS];
    if(newGroups[group].length < 3){
      //create new item
      const color = new Colors().chooseUniqueColor();
      const newItem = addItem({color, group});
      //add item to group
      newGroups[group] && newGroups[group].push(newItem);
      //update groups
      setGROUPS([...newGroups])
    }else{
      setError('Cannot add more than 3 lessons to group');
    }
  }

  function handleAddGroup(){
    const itemsToAdd = [];
    const GroupColors = new Colors();
    const color = GroupColors.chooseUniqueColor();
    const newItem = addItem({group:GROUPS.length, color});
    itemsToAdd.push(newItem);
    setGROUPS([...GROUPS, itemsToAdd]);
  }

  function createChild(parent){
    const newGroups = [...GROUPS];
    if(newGroups[parent.group].length < 3){
      const newItem = addItem({group:parent.group+1, parent});
      //add item to groups
      const itemGroup = newGroups[newItem.group] && newGroups[newItem.group];
      itemGroup ? itemGroup.push(newItem) : newGroups.splice(newItem.group,0,[newItem]);
      
      if(newItem.group > 0){ 
        //update parent
        const prevGroup = newGroups[newItem.group-1];
        const myParent = prevGroup.find(item => item.id === parent.id);
        myParent && myParent.children.push(newItem);
      }

      //update groups
      setGROUPS([...newGroups]);
    }else{
      setError('Cannot add more than 3 lessons to group');
    }
  }

  function showErrorMessage(msg){
    setError(msg); 
  }

  return (
    <div className="App">
      <div className="timeline">
        <ol className="column" onClick={handleClick}>
          {GROUPS && GROUPS.length > 0 && GROUPS.map((group, index) => <GroupElement key={index} id={index} selected={index === selectedGroup && true} children={group}/>)}
        </ol>
      </div>
      <div className="error">{error}</div>
      <div class="data">
        <h1>{selectedGroup && `Level : ${selectedGroup}`}</h1>
          <GroupData groupNumber={selectedGroup} children={GROUPS && GROUPS[selectedGroup] && GROUPS[selectedGroup]} changeName={changeName} addLesson={addLesson} addChild={createChild}/>
      </div>
      <button className="add-group" type="button" onClick={handleAddGroup}>Add Unit</button>
    </div>
  );
}

export default App;
