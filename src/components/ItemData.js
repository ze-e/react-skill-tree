import React from 'react';
import SkillData from './SkillData';
import {DataContext} from '../contexts/dataContext';


function ItemData(props) {
  const DATA = React.useContext(DataContext);
  const my = props.item;

  const [editing, setEditing] = React.useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  function handleChangeName(e){
    const newName = e.target.value;
    props.changeName(props.item, newName);
  }

  function handleAddLesson(){
    props.addLesson(my.group);
  }

  function handleAddSkill(){
    props.addSkill(props.item);
  }

  function handleAddChild(){
    props.addChild(props.item);
  }

  function handleChangeParents(e){
    const values = Array.from(e.target.selectedOptions, option => option.value);
    //const values = Array.from(e.target.selectedOptions);
    props.changeParents(props.item, values);
  }

  function handleDelete(){
    props.deleteItem(props.item);
  }

  return(
    <li className = {`item-data ${my.color}`}>
      <h4 className='item-data__lesson'>Lesson {my.group} - {props.number} :</h4> 
      {!editing ? <h5 className='item-data__name'>{my.name}</h5>:<input type="text" defaultValue={my.name} onChange={handleChangeName} onBlur={toggleEdit}></input>}
      <p className='item-data__XP'>XP/GOLD : {my.xp}</p>
      <button className="item-data__edit" type="button" onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button>
      <button className="item-data__delete" type="button" onClick={handleDelete}>Delete</button>
      <button className="item-data__add-child" type="button" onClick={handleAddChild}>Next Lesson</button>      
      { editing && DATA[my.group-1] && DATA[my.group-1].length > 0 &&     
      <> 
        <label for="item-data__parentList">Change prerequisites:</label>
        <select name="parents" id="parents" multiple onChange={handleChangeParents}>
          {DATA[my.group-1].map((parent) => <option value={parent}>{parent.name}</option>)}
        </select>
      </>
      }
      <ol className="item-data__skills">
        {my.skills && my.skills.length > 0 &&  my.skills.map((skill, index) => <SkillData key={index} index={index} item={skill} parent={props.item} addSkill={props.addSkill} changeSkill={props.changeSkill} deleteSkill={props.deleteSkill} changeName={props.changeName}/>)}
      </ol>
      <button className="item-data__add-skill" type="button" onClick={handleAddSkill}>Add Skill</button>

      <ol className="item-data__parents">
        {my.parents.length > 0 && 'Complete any of these to unlock this lesson:'}
        {my.parents.length > 0 &&  my.parents.map((parent, index) => <li key={index}>{parent && parent.name && parent.name}</li>)}
      </ol>
      <ol className="item-data__children">
        {my.children.length > 0 && 'Complete me to unlock these lessons:'}
        {my.children.length > 0 && my.children.map((child, index) => <li key={index}>{child && child.name && child.name}</li>)}
      </ol>
      <button className="item-data__add-lesson" type="button" onClick={handleAddLesson}>Add More Lessons</button>
    </li>
  )
}

export default ItemData;