import React from 'react';
import ItemData from './ItemData';

function GroupData(props) {
  const [XP, setXP] = React.useState(0);
  
  React.useEffect(()=>{
    const newXP = props.children && Array.from(props.children, child => child.xp).reduce((sum, curr) => sum + curr);
    setXP(newXP);
  },[props.children && props.children.length]);

  return(
    <div className="group-data">
    <h1>{props.groupNumber + 1 > 0 && `Unit : ${parseInt(props.groupNumber) + 1}`}</h1>
    <h2 className="item-data__groupXp">{XP > 0 && `${XP} XP / Gold`}</h2>
    <ol className="item-data__group">
      {props.children && props.children.length > 0 && props.children.map((child, index) => 
        <ItemData 
          key={index} 
          number={index} 
          item={child} 
          changeName={props.changeName} 
          addLesson={props.addLesson} 
          addChild={props.addChild} 
          addSkill={props.addSkill} 
          changeSkill={props.changeSkill} 
          changeParents={props.changeParents} 
          deleteSkill={props.deleteSkill} 
          deleteItem={props.deleteItem} 
          lastItem={index === props.children.length-1 && true}
        />
      )}
    </ol>
    </div>
  )
}

export default GroupData;