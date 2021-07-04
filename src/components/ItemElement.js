function ItemElement(props) {
  const my = props.item;
  return(
    <li className={`item__content ${my.color} ${props.visible === true ? 'item__content_visible' : 'item__content_invisible'}`}>
      <div className="item__name">{my.name}</div>
    </li>
  )
}

export default ItemElement;
