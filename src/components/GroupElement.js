import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <ol className="item" id={props.id}>
      {props.children.length > 0 && props.children.map((child, index) => <ItemElement key={child.id} item={child} visible={true}/>)}
    </ol>
  )
}

export default GroupElement;
