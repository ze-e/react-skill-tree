import React from 'react';

function SkillData(props) {
  const [editing, setEditing] = React.useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  function handleChangeName(e){
    const newName = e.target.value;
    props.changeSkill(newName, props.index, props.parent);
  }

  function handleDelete(){
    props.deleteSkill(props.item, props.parent);
  }

  return(
    <li className={`skill ${props.parent.color}`}>
      {!editing ? <h5 className='skill__name'>{props.item}</h5>:<input type="text" defaultValue={props.item} onChange={handleChangeName} onBlur={toggleEdit}></input>}
      <p className="skill__xp">+ 10 XP / Gold</p>
      <button className="skill__edit" type="button" onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button>
      <button className="skill__delete" type="button" onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default SkillData;
