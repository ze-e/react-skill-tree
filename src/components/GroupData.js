import React from 'react';
import ItemData from './ItemData';

function GroupData(props) {
  const [XP, setXP] = React.useState(0);
  
  React.useEffect(()=>{
    const newXP = props.children && props.children.reduce((sum, key) => {return sum + key.xp});
    setXP(newXP);
  },[props.children]);

  return(
    <>
    <h2 className="item-data__groupXp">{XP > 0 && `${XP} XP`}</h2>
    <ol className="item-data__group">
      {props.children && props.children.length > 0 && props.children.map((child, index) => 
        <ItemData key={index} number={index} item={child} changeName={props.changeName} addLesson={props.addLesson} addChild={props.addChild} deleteItem={props.deleteItem} lastItem={index === props.children.length-1 && true}/>
      )}
    </ol>
    </>
  )
}

export default GroupData;