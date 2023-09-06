import React from 'react'

const CatFilter = ({filter, setFilter}) => {
  return (
    <div className='cat__filter'>
      <input className='cat__btn cat__search' type="text" name="search" placeholder="Поиск..." value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}/>
    </div>
  )
}

export default CatFilter