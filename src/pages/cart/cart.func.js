import {transformObjToArr} from '@/helpers/helpers';
import React from 'react';
import EmptyCart from '@/assets/img/empty-cart.png';
import {NavLink} from 'react-router-dom';
import CartItem from '@/pages/cart/cartItem';

export const renderItems = (data, props = {}) => {
  return transformObjToArr(data).map(([id, value]) => {
    let res = {}
    const resArr = []

    res.imageUrl = value.imageUrl
    res.name = value.name

    transformObjToArr(value.sizes).forEach(([key, size]) => {
      res.size = key

      transformObjToArr(size).forEach(([typeName, typeData], i) => {
        const newData = {
          type: typeName,
          id,
          ...res,
          ...typeData
        }

        resArr.push(<CartItem {...props} key={`${Date.now().toString()}_${Math.random()}`} data={newData} />)
      })
    })

    return resArr
  })
}

export const CartEmpty = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая <icon>😕</icon></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br/>
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={EmptyCart} alt="Empty cart"/>
        <NavLink to="/" className="button button--black">
          <span>Вернуться назад</span>
        </NavLink>
      </div>
    </div>
  )
}