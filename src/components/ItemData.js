function ItemData(props) {
  const my = props.item;
  return(
    <li className='item-data'>
      <h4 className='item-data__name'>{my.name}</h4>
      <p className='item-data__XP'>{my.xp}</p>
    </li>
  )
}

export default ItemData;