function ItemElement(props) {
  return(
    <ol className="item">
      <li className="item__content">{props.name} - {props.xp}</li>
    </ol>
  )
}

export default ItemElement;
