function ItemElement(props) {
  const my = props.item;
  return(
    <li className="item__content">{my.name} - {my.xp} {my.parent && my.parent.name && `, child of ${my.parent.name}`}</li>
  )
}

export default ItemElement;
