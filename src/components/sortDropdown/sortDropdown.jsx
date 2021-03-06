import React, {memo, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'

const SortDropdown = memo(({items, onSortByClick}) => {
  const [sortDisplay, setSortDisplay] = useState(false)
  const [activeFilter, setActiveFilter] = useState(items[0])
  const sortRef = useRef()

  const onSortTextClickHanlder = (e) => {
    e.stopPropagation()
    setSortDisplay((value) => !value)
  }

  useEffect(() => {
    document.addEventListener('click', e => {
      const path = e.path || (e.composedPath && e.composedPath());

      if(!path.includes(sortRef.current)) {
        setSortDisplay(false)
      }
    })
  }, [])

  const onCategoryClickHandler = (value) => {
    setActiveFilter(value)
    setSortDisplay(false)
    onSortByClick(value)
  }

  const getClassNames = (isAll = true, value = null) => {
    if(isAll) {
      return classNames({active: activeFilter === null})
    }

    return classNames({active: activeFilter.label === value})
  }

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pathdu887
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onSortTextClickHanlder}>{activeFilter.label}</span>
      </div>
      <div className={classNames('sort__popup', {'sort__popup--show': sortDisplay})}>
        <ul>
          {items.map((value, i) => <li onClick={() => onCategoryClickHandler(value)}
                                       key={`${name}_${i}`}
                                       className={getClassNames(false, value.label)}
          >{value.label}</li>)}
        </ul>
      </div>
    </div>
  )
})

export default SortDropdown