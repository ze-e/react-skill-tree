import React from 'react';

function SkillData(props) {
  const [editing, setEditing] = React.useState(false);

  function toggleEdit(e){
    e.preventDefault();
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
      {!editing ? 
      <h5 className='skill__name' onClick={toggleEdit}>{props.item}</h5>:
      <form onSubmit={toggleEdit}>
        <input type="text" defaultValue={props.item} onChange={handleChangeName}></input>
      {editing && <button className="skill__edit" type="submit">Save</button>}
      </form>}
      <p className="skill__xp">+ 10 XP / Gold</p>
      <button className="skill__delete" type="button" onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default SkillData;
