import ItemElement from './ItemElement';

function GroupElement(props) {
  return(
    <>
    <p className="item__groupXp">{props.children && `${props.children && props.children.reduce((sum, key) => {sum + key.xp})} XP`}</p>
    <ol className="item" id={props.id}>
      {props.children.length > 0 && props.children.map((child, index) => <ItemElement key={child.id} item={child} visible={true}/>)}
    </ol>
    </>
  )
}

export default GroupElement;
