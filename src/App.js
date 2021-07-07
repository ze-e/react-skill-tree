import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Colors from './util/Colors';
import GroupElement from './components/GroupElement';
import GroupData from './components/GroupData';

import {DataContext} from './contexts/dataContext';

function App() {
  
  const [selectedGroup, setSelectedGroup] = React.useState();
  const [GROUPS, setGROUPS] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(()=>{
    //move to child
    const itemContentList = document.querySelectorAll('.item');
    const selected = itemContentList[itemContentList.length-1];
    if(selected && selected != null){
      const oldSelected = document.querySelector('.selected');
      oldSelected && oldSelected != null && oldSelected.classList.remove('selected');
      selected.classList.add('selected');
      selected.id && setSelectedGroup(itemContentList.length-1);
    }
  },[GROUPS.length]);

  React.useEffect(()=>{
    //move to child
    const itemContentList = document.querySelectorAll('.item');
    const selected = itemContentList[selectedGroup];
    if(selected && selected != null){
      const oldSelected = document.querySelector('.selected');
      oldSelected && oldSelected != null && oldSelected.classList.remove('selected');
      selected.classList.add('selected');
    }
  },[selectedGroup]);

  class Item {
    constructor({name, group, parents, children, color}={}){
    this.id = uuidv4();
    this.name = name || `New Lesson`;
    this.xp = this.getXP();
    this.group = group;
    this.parents = parents || [];
    this.children = children || [];
    this.color = color || "black";
    this.skills = ["Skill 1"];
    }

    getXP(){
      return this.skills && this.skills.length > 0 ? this.skills.length * 10 : 10;
    }
    
    addSkill(newSkill){
      this.skills.push(newSkill);
      this.xp = this.getXP();
    }

    deleteSkill(skill){
      this.skills.splice(this.skills.indexOf(skill),1);
      this.xp = this.getXP();
    }
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

  function changeSkill(newName, index, parent){
    const newGroups = [...GROUPS];
    const skillsArray = newGroups[parent.group] && newGroups[parent.group].find( i => i.id === parent.id).skills;
    skillsArray[index] = newName;
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
      setGROUPS([...newGroups]);

      //remove errors
      setError('');
    }else{
      setError('Cannot add more than 3 lessons to group');
    }
  }

  function addSkill(item){
    const newGroups = [...GROUPS];
    const newItem = newGroups[item.group].find(i =>(i.id === item.id));
    newItem && newItem.addSkill(`Skill ${newItem.skills && newItem.skills.length + 1}`);
    setGROUPS([...newGroups]);
  }

  function deleteSkill(skill, item){
    const newGroups = [...GROUPS];
    const newItem = newGroups[item.group].find(i =>(i.id === item.id));
    if(newItem && newItem.skills && newItem.skills.length > 1){
      newItem.deleteSkill(skill);
      setGROUPS([...newGroups]);
      //remove errors
      setError('');

    } 
    
    else if(newItem && newItem.skills && newItem.skills.length === 1){
      setError('Must have at least one skill per lesson');
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

    //update selectedGroup
    setSelectedGroup(parseInt(selectedGroup)+1);
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

      //update selectedGroup
      setSelectedGroup(parseInt(selectedGroup)+1);

      //remove errors
      setError('');

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
    item.parents.length > 0 && item.parents.forEach((i)=> i.children = i.children.filter((child)=>child.id !== item.id));

    //remove item from children
    item.children.length > 0 && item.children.forEach((i)=> i.parents = i.parents.filter((parent)=>parent.id !== item.id));


    //remove group if item is the only item in group
    if(newGroups[item.group].length === 0) {
      newGroups.splice(item.group, 1);

      newGroups[item.group] && newGroups.slice(newGroups[item.group].forEach((i)=>{
        i.group--;
      }));

      // reconnect parents to children
      item.parents.length > 0 && item.children.length > 0 && item.parents.forEach((parent)=>{parent.children = parent.children.concat(item.children)});
      
      // reconnect children to parents
      item.parents.length > 0 && item.children.length > 0 && item.children.forEach((child)=>{child.parents = child.parents.concat(item.parents)});
    }

    //update groups
    setGROUPS(newGroups);
  }

  function changeParents(item, values){
    const newGroups = [...GROUPS];

    newGroups[item.group].find((i)=>i.id === item.id).parents = [...values];
    
    newGroups[item.group - 1] && newGroups[item.group - 1].forEach((i)=>{
      values.includes(i) ? !i.children.includes(item) && i.children.push(item) : i.children.includes(item) && i.children.splice(i.children.indexOf(item),1);
    })

    //
    setGROUPS([...newGroups]);
  }

  return (
    <div className="App">
      <DataContext.Provider value={GROUPS}>
      <div className="timeline">
        <ol className="column" onClick={handleClick}>
          {GROUPS && GROUPS.length > 0 ? GROUPS.map((group, index) => 
            <GroupElement 
              key={index} 
              id={index} 
              selected={index === selectedGroup && true} 
              children={group}
            />)
          :
            <button className="add-group" type="button" onClick={handleAddGroup}>Start lesson plan!</button>}
        </ol>
      </div>
      <div className="error">{error}</div>
      <div class="data">
          <GroupData 
            groupNumber={selectedGroup} 
            children={GROUPS && GROUPS[selectedGroup] && GROUPS[selectedGroup]} 
            changeName={changeName} 
            addLesson={addLesson} 
            addSkill={addSkill} 
            changeSkill={changeSkill}
            changeParents={changeParents} 
            deleteSkill={deleteSkill} 
            addChild={createChild} 
            deleteItem={deleteItem}
          />
      </div>
    </DataContext.Provider>
    </div>
  );
}

export default App;
