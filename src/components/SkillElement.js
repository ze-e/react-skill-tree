function SkillElement(props) {
  function handleEdit(){
    return;
  }

  function handleAdd(){
    return;
  }

  return(
    <li className="skill">
      <p className="skill__name">{props.item}</p>
      <p className="skill__xp">+ 10 XP / Gold</p>
      <button className="skill_edit" type="button" onClick={handleEdit}>Edit</button>
      <button className="skill_add-skill" type="button" onClick={handleAdd}>Add Skill</button>
    </li>
  )
}

export default SkillElement;
