import SkillElement from './SkillElement';

function ItemElement(props) {
  const my = props.item;
  return(
    <li className={`item__content ${my.color} ${props.visible === true ? 'item__content_visible' : 'item__content_invisible'}`}>
      <div className="item__name">{my.name}</div>
      <ol className="item__skills" id={props.id}>
        {props.skills > 0 && props.skills.map((skill) => <SkillElement key={skill.id} item={skill}/>)}
      </ol>
    </li>
  )
}

export default ItemElement;
