import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <ol className="item">
      {props.children.length > 0 && props.children.map((child, index) => <ItemElement key={index} name={child.name} xp={child.xp} />)}
    </ol>
  )
}

export default GroupElement;
