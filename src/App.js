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
      group,
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

    moveItem(newGroup){
      this.group = newGroup;
    }
  }

  React.useEffect(()=>{
    console.log(GROUPS);
  })

  function refactorGroups(){
    const newGroups = [...GROUPS];
    newGroups.forEach((group)=>{
      //if there are no members in the group, move them all down to the previous group
      if(group > 0 && group.length === 0 || isNaN(group)){
        newGroups.slice(newGroups[group-1]).forEach((i)=> i.group = i.group-1);
      }
      //if any have no parents, assign all members of prev group as parents
      if(group > 0){
        group.forEach((j)=>{
          if(j.parents.length === 0){
            newGroups[group - 1].forEach((k)=>{
                k.children.push(j);
                j.parents.push(k);
            })
          }
        })
      }
    })
    setGROUPS([...newGroups]);
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
      
      //add item to all parents  
      if(group > 0){
        newGroups[group - 1] && newGroups[group - 1].forEach((item)=>{
          item.children.push(newItem);
          newItem.parents.push(item);
        })
      }
      //update groups
      
      setGROUPS([...newGroups])
    }else{
      setError('Cannot add more than 3 lessons to group');
    }
  }

  function handleAddGroup(){
    const newGroups = [...GROUPS];

    const itemsToAdd = [];
    const GroupColors = new Colors();
    const color = GroupColors.chooseUniqueColor();
    const newItem = addItem({group:newGroups.length, color});
    itemsToAdd.push(newItem);

    // add item to all parents  
    if(newItem.group > 0){
      newGroups[newItem.group - 1] && newGroups[newItem.group - 1].forEach((item)=>{
        item.children.push(newItem);
        newItem.parents.push(item);
      })
    }
    //update groups
    setGROUPS([...newGroups, itemsToAdd]);
  }

  function createChild(parent){
    const newGroups = [...GROUPS];
    if(!newGroups[parent.group+1] || parent.children.length < 3){
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
      setError('Cannot add more than 3 lessons');
    }
  }

  function deleteItem(item){
    const newGroups = [...GROUPS];

    //remove item
    const itemToRemove = newGroups[item.group].find(i => item.id === i.id);
    newGroups[item.group].splice(itemToRemove, 1);
    
    //remove item from parents
    // item.group > 0 && newGroups[item.group-1].forEach((i)=> i.children = i.children.filter((child)=>child.id !== item.id));
    item.parents.length > 0 && item.parents.forEach((i)=> i.children = i.children.filter((child)=>child.id !== item.id));

    //remove item from children
    // newGroups[item.group+1] && newGroups[item.group+1].forEach((i)=> i.parents = i.parents.filter((parent)=>parent.id !== item.id));
    item.children.length > 0 && item.children.forEach((i)=> i.parents = i.parents.filter((parent)=>parent.id !== item.id));

    //reconnect parents to children
    item.parents.length > 0 && item.children.length > 0 && item.parents.forEach((parent)=>{parent.parents.length > 0 && parent.children.push(item.children)});
    
    //reconnect children to parents
    item.parents.length > 0 && item.children.length > 0 && item.children.forEach((child)=>{item.parents.length > 0 && child.parents.push(item.parents)});

    //update groups
    setGROUPS(newGroups);
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
          <GroupData groupNumber={selectedGroup} children={GROUPS && GROUPS[selectedGroup] && GROUPS[selectedGroup]} changeName={changeName} addLesson={addLesson} addChild={createChild} deleteItem={deleteItem}/>
      </div>
      <button className="add-group" type="button" onClick={handleAddGroup}>Add Unit</button>
    </div>
  );
}

export default App;
