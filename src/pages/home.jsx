import React, { useCallback} from 'react'
import {Categories, PizzaItem, SortDropdown} from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '@/redux/actions/category';
import {setSortBy} from '@/redux/actions/filters';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'закрытые']
const sortCategories = [{label: 'популярности', name: 'popular'}, {label: 'цене', name: 'price'}, {label: 'алфавиту', name: 'alphabet'}]

const Home = () => {
  const {pizzas} = useSelector(({pizzas}) => ({pizzas: pizzas.items}))
  const dispatch = useDispatch()

  const onCategorySelected = useCallback((value) => {
    dispatch(setCategory(value))
  }, [])

  const onSortByClick = useCallback((value) => {
    dispatch(setSortBy(value.name))
  }, [])

  console.log('rerender', 'home')

  return (
    <div className="container">
      <div className="content__top">
        <Categories onCategorySelected={onCategorySelected} items={categories} />
        <SortDropdown onSortByClick={onSortByClick} items={sortCategories} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.length && pizzas.map(pizza => <PizzaItem key={pizza.id} {...pizza} />)}
      </div>
    </div>
  )
}

export default Home