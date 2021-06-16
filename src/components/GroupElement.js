import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <ol className="item" id={props.id}>
      {props.children.length > 0 && props.children.map((child, index) => 
        <ItemElement key={child.id} item={child} 
          visible={props.selected ? true : props.children.length > 1 ? index === 0 || index === 2 ? false : true : true} 
        />
      )}
    </ol>
  )
}

export default GroupElement;
