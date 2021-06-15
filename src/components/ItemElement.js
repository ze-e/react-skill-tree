function ItemElement(props) {
  const my = props.item;
  return(
    <li className="item__content">{my.name} - {my.xp}, child of {my.parent && my.parent.name && my.parent.name}</li>
  )
}

export default ItemElement;
