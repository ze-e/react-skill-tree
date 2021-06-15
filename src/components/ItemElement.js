function ItemElement(props) {
  return(
    <li className="item__content">{props.name} - {props.xp}, child of {props.parent}</li>
  )
}

export default ItemElement;
