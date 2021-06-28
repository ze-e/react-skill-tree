function ItemElement(props) {
  const my = props.item;
  return(
    <li className={`item__content ${my.color} ${props.visible === true ? 'item__content_visible' : 'item__content_invisible'}`}>
      <div className="item__content_name">{my.name}</div>
      <ol className="item__content_parents">
        {my.parents.length > 0 &&  my.parents.map((parent, index) => <li key={index}>{parent && parent.name && parent.name}</li>)}
      </ol>
      <ol className="item__content_children">
        {my.children.length > 0 && my.children.map((child, index) => <li key={index}>{child && child.name && child.name}</li>)}
      </ol>
      </li>
  )
}

export default ItemElement;
