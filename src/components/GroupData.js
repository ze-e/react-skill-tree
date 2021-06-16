import ItemData from './ItemData';

function GroupData(props) {
  return(
    <ol className="item-data__group">
      {props.children.length > 0 && props.children.map((child) => 
        <ItemData key={child.id} item={child}/>
      )}
    </ol>
  )
}

export default GroupData;