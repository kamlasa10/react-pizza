import React from 'react'
import {Categories, PizzaItem, SortDropdown} from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '@/redux/actions/category';
import {setSortBy} from '@/redux/actions/filters';
import {setPizzasByCategory} from '@/redux/actions/pizzas';
import {addPizzaToCart} from '@/redux/actions/cart';

const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'закрытые']
const sortCategories = [{label: 'популярности', name: 'popular'}, {label: 'цене', name: 'price'}, {label: 'алфавиту', name: 'alphabet'}]

const Home = () => {
  const {pizzas, sort, activeCategory, cartItems
  , totalItems} = useSelector(({pizzas, filters, category, cart}) => ({
    pizzas: pizzas.items,
    sort: filters.filterBy,
    activeCategory: category.activeCategoryName,
    cartItems: cart.cartItems,
    totalItems: cart.totalItems
  }))
  const dispatch = useDispatch()

  const onCategorySelected = React.useCallback((value) => {
    dispatch(setCategory(value))
  }, [])

  const onSortByClick = React.useCallback((value) => {
    dispatch(setSortBy(value.name))
  }, [])

  const setPizzaByFilter = () => {
    dispatch(setPizzasByCategory(activeCategory, sort))
  }

  React.useEffect(() => {
    setPizzaByFilter()
  }, [sort, activeCategory])

  const addPizza = (pizza, pizzaDesc) => {
    dispatch(addPizzaToCart(pizza, pizzaDesc))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories onCategorySelected={onCategorySelected} items={categories}
        />
        <SortDropdown onSortByClick={onSortByClick} items={sortCategories}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.length && pizzas.map(pizza => <PizzaItem key={pizza.id} {...pizza}
                                                         addPizza={addPizza}
                                                         cartItems={cartItems}
                                                         totalItems={totalItems}
        />)}
      </div>
    </div>
  )
}

export default Home