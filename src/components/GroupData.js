import ItemData from './ItemData';

function GroupData(props) {
  return(
    <>
    <h2>XP : {props.children && props.children.length * 10}</h2>
    <ol className="item-data__group">
      {props.children && props.children.length > 0 && props.children.map((child, index) => 
        <ItemData key={index} number={index} item={child}/>
      )}
    </ol>
    </>
  )
}

export default GroupData;