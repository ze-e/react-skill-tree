function ItemElement(props) {
  const my = props.item;
  return(
    <li className={`item__content ${my.color} ${props.visible === true ? 'item__content_visible' : 'item__content_invisible'}`}>
      <div className="item__content_name">{my.name}</div>
      <div className="item__content_parents">
        {my.parents.length > 0 && 'Parents:'}
        {my.parents.length > 0 && my.parents.map((parent, index) => <div key={index}>{parent.name && parent.name}</div>)}
      </div>
      <div className="item__content_children">
        {my.parents.length > 0 && 'Children:'}
        {my.children.length > 0 && my.children.map((child, index) => <div key={index}>{child.name && child.name}</div>)}
      </div>
      </li>
  )
}

export default ItemElement;
