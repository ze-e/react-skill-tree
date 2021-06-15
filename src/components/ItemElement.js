function ItemElement(props) {
  const my = props.item;
  return(
    <li className={`item__content ${my.color}`}>{my.name} {my.parent && my.parent.name && <div className={my.parent.color}>child of {my.parent.name}</div>}</li>
  )
}

export default ItemElement;
