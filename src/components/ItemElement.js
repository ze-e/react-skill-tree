function ItemElement(props) {
  return(
    <li className="item__content">{props.name} - {props.xp}</li>
  )
}

export default ItemElement;
