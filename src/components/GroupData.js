import React from 'react';
import ItemData from './ItemData';

function GroupData(props) {
  const [XP, setXP] = React.useState(0);
  
  React.useEffect(()=>{
    props.children && props.children.forEach(i => {setXP(XP + i.xp)});
  },[props.children && props.children.length]);

  return(
    <>
    <h2 className="item-data__groupXp">{XP > 0 && `${XP} XP / Gold`}</h2>
    <ol className="item-data__group">
      {props.children && props.children.length > 0 && props.children.map((child, index) => 
        <ItemData key={index} number={index} item={child} changeName={props.changeName} addLesson={props.addLesson} addChild={props.addChild} addSkill={props.addSkill} changeSkill={props.changeSkill} deleteSkill={props.deleteSkill} deleteItem={props.deleteItem} lastItem={index === props.children.length-1 && true}/>
      )}
    </ol>
    </>
  )
}

export default GroupData;