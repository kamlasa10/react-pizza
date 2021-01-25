import React, {memo, useState} from 'react'
import classNames from 'classnames'

const Categories = memo(({items, onCategorySelected}) => {
  const [activeFilter, setActiveFilter] = useState(null)

  const onCategoryClickHandler = (value) => {
    setActiveFilter(value)
    onCategorySelected(value)
  }
  console.log('rerender', 'category')

  const getClassNames = (isAll = true, value = null) => {
    if(isAll) {
      return classNames({active: activeFilter === null})
    }

    return classNames({active: activeFilter === value})
  }

  return (
    <div className="categories">
      <ul>
        <li className={getClassNames()}
            onClick={() => onCategoryClickHandler(null)}
        >Все</li>
        {items.map((name, i) => <li onClick={() => onCategoryClickHandler(i)}
                                    key={`${name}_${i}`}
                                    className={getClassNames(false, i)}
        >{name}</li>)}
      </ul>
    </div>
  )
})

export default Categories