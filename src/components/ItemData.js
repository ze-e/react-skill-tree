import React from 'react';

function ItemData(props) {
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

  function handleAddChild(){
    props.addChild(props.item);
  }

  return(
    <li className= 'item-data'>
      <h4 className='item-data__lesson'>Lesson {my.group} - {props.number} :</h4> 
      {!editing ? <h5 className='item-data__name'>{my.name}</h5>:<input type="text" defaultValue={my.name} onChange={handleChangeName} onBlur={toggleEdit}></input>}
      <p className='item-data__XP'>XP : {my.xp}</p>
      <button className="item-data__edit" type="button" onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button>
      {my.children < 3 && <button className="item-data__add-child" type="button" onClick={handleAddChild}>Next Lesson</button>}
      {props.lastItem && my.children < 3 && <button className="item-data__add-skill" type="button" onClick={handleAddLesson}>Add More Lessons</button>}

    </li>
  )
}

export default ItemData;