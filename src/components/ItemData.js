import React from 'react';

function ItemData(props) {
  const my = props.item;

  const [editing, setEditing] = React.useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  function handleChangeName(e){
    my.name = e.target.value;
  }

  return(
    <li className='item-data'>
      <h4 className='item-data__lesson'>Lesson {props.number} :</h4> 
      {!editing ? <h5 className='item-data__name'>{my.name}</h5>:<input type="text" defaultValue={my.name} onChange={handleChangeName}></input>}
      <p className='item-data__XP'>XP : {my.xp}</p>
      <button className="item-data__edit" type="button" onClick={toggleEdit}>{editing ? 'save' : 'edit'}</button>
    </li>
  )
}

export default ItemData;