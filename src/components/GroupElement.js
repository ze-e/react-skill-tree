import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <ol className="item">
      {props.children.length > 0 && props.children.map((child) => <ItemElement key={child.id} item={child} />)}
    </ol>
  )
}

export default GroupElement;
