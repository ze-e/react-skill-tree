import React from 'react';
import ItemElement from './ItemElement';

function GroupElement(props) {

  return(
    <div className="item">
      <ol className="item__groupList" id={props.id}>
        {props.children.length > 0 && props.children.map((child, index) => <ItemElement key={child.id} item={child} visible={true}/>)}
      </ol>
    </div>
  )
}

export default GroupElement;
