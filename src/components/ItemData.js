function ItemData(props) {
  const my = props.item;
  return(
    <li className='item-data'>
      <h4 className='item-data__name'>Lesson {props.number} - {my.name}</h4>
      <p className='item-data__XP'>XP : {my.xp}</p>
      <button className="item-data__edit" type="button" onClick={props.handleEditItem}>edit</button>
    </li>
  )
}

export default ItemData;