function SkillData(props) {
  const [editing, setEditing] = React.useState(false);

  function toggleEdit(){
    setEditing(!editing);
  }

  function handleChangeName(e){
    // const newName = e.target.value;
    // props.changeName(props.item, newName);
    return;
  }

  return(
    <li className="skill">
      {!editing ? <h5 className='skill__name'>{props.item}</h5>:<input type="text" defaultValue={my.name} onChange={handleChangeName} onBlur={toggleEdit}></input>}
      <p className="skill__xp">+ 10 XP / Gold</p>
      <button className="skill__edit" type="button" onClick={toggleEdit}>{editing ? 'Save' : 'Edit'}</button>
    </li>
  )
}

export default SkillData;
