import ItemData from './ItemData';

function GroupData(props) {

  return(
    <>
    <h2>{props.children && `XP : ${props.children.length * 10}`}</h2>
    <ol className="item-data__group">
      {props.children && props.children.length > 0 && props.children.map((child, index) => 
        <ItemData key={index} number={index} item={child} changeName={props.changeName} addLesson={props.addLesson} addChild={props.addChild} lastItem={index === props.children.length-1 && true}/>
      )}
    </ol>
    </>
  )
}

export default GroupData;