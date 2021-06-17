import React from 'react';
//import {dataContext} from '../contexts/dataContext';

function ItemData(props) {
//  const Data = React.useContext(dataContext);
  const my = props.item;

  const [editing, setEditing] = React.useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  function handleChangeName(e){
    const newName = e.target.value;
    props.changeName(props.item, newName);
  }

  return(
    <li className='item-data'>
      <h4 className='item-data__lesson'>Lesson {props.number} :</h4> 
      {!editing ? <h5 className='item-data__name'>{my.name}</h5>:<input type="text" defaultValue={my.name} onChange={handleChangeName}></input>}
      <p className='item-data__XP'>XP : {my.xp}</p>
      <button className="item-data__edit" type="button" onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button>
      <button className="item-data__edit" type="button" onClick={props.addLesson}>Add Skill</button>
    </li>
  )
}

export default ItemData;