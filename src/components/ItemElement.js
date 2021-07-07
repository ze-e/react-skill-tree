function ItemElement(props) {
  const my = props.item;
  return(
    <li id={my.group} className={`item__content ${my.color} ${props.visible === true ? 'item__content_visible' : 'item__content_invisible'}`}>
      <div className="item__name">{my.name}</div>
      <p className="item__xp">{my.xp}</p>
    </li>
  )
}

export default ItemElement;
