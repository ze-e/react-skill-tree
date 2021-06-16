import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <ol className="item" id={props.id}>
      {props.children.length > 0 && props.children.map((child, index) => 
        <ItemElement key={child.id} item={child} 
  //        visible={props.selected ? true : props.children.length > 1 ? index === 1 && true : true} 
            visible={true}
        />
      )}
    </ol>
  )
}

export default GroupElement;
