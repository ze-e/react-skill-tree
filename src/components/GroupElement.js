import React from 'react';
import ItemElement from './ItemElement';

function GroupElement(props) {
  
  const [setXP, XP] = React.useState(0);
  
  React.useEffect(()=>{
    const newXP = props.children && props.children.reduce((sum, key) => {return sum + key.xp});
    setXP(newXP);
  },[props.children])

  return(
    <>
    <p className="item__groupXp">{XP > 0 && `${XP} XP`}</p>
    <ol className="item" id={props.id}>
      {props.children.length > 0 && props.children.map((child, index) => <ItemElement key={child.id} item={child} visible={true}/>)}
    </ol>
    </>
  )
}

export default GroupElement;
