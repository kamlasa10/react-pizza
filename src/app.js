import React, {useEffect} from 'react'
import * as axios from 'axios';
import {Route} from 'react-router-dom';

import './scss/app.scss'

import {Header} from './components'
import Home from '@/pages/home';
import Cart from '@/pages/cart';
import {useDispatch} from 'react-redux';
import {setPizzas} from '@/redux/actions/pizzas';

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3004/pizzas').then(({data}) => setTimeout(() => dispatch(setPizzas(data)), 800))
  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
      </div>
    </div>
  )
}

export default App