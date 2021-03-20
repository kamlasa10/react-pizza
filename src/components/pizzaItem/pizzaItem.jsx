import React, {useState} from 'react'
import classNames from 'classnames'

import {transformNumToStr} from '@/helpers/helpers';

const availableTypes = ['тонкое', 'традиционное']
const availableSizes = [26, 30, 40]

const PizzaItem = ({name, imageUrl, price, types,
                     sizes, addPizza, id, cartItems,
                     totalItems
}) => {
  const [activeType, setActiveType] = useState(types[0])
  const [activeSize, setActiveSize] = useState(sizes[0].size)
  const [currentPrice, setCurrentPrice] = useState(price)
  const [totalItemsEqualType, setTotalItemsEqualType] = useState(0)

  const onTypeClickHanlder = (i) => {
    console.log(i)
    setActiveType(i)
  }

  const onSizeClickHandler = (sizeObj) => {
    setCurrentPrice(Math.round(price * sizeObj.delta))
    setActiveSize(sizeObj.size)
  }

  const filterTotalItemsByFields = (size, type) => {
    const idx = transformNumToStr(id)

    if(cartItems[idx]?.sizes?.[activeSize]?.[availableTypes[type]]) {
      setTotalItemsEqualType(cartItems[idx].sizes[size][availableTypes[type]].count)
      return
    }

    setTotalItemsEqualType(0)
  }

  React.useEffect(() => {
    filterTotalItemsByFields(activeSize, activeType)
  }, [activeSize, activeType, totalItems])

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((name, i) => <li className={classNames({
            active: activeType === i,
            disabled: !types.includes(i)
          })} key={name}
                                               onClick={() => onTypeClickHanlder(i)}
          >{name}</li>)}
        </ul>
        <ul>
          {availableSizes.map((size) => <li key={size}
                                               className={classNames({
                                                 active: activeSize === size,
                                                 disabled: !sizes.find(item => item.size === size)
                                               })}
                                               onClick={() => onSizeClickHandler(sizes.find(item => item.size === size))}
          >{size}</li>)}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {currentPrice} ₽</div>
        <div className="button button--outline button--add" onClick={() => addPizza({
          name,
          imageUrl,
          price: currentPrice,
          id
        }, {size: activeSize, type: availableTypes[activeType]})}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{totalItemsEqualType}</i>
        </div>
      </div>
    </div>
  )
}

export default PizzaItem