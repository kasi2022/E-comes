import React from 'react'
import '../Products/addview.css';
import AddProductForm from './Addproducts';
import ProductList from './GetProducts';
import { Link } from 'react-router-dom';
function Addview() {
    return (
        <div>
            <nav>
                <Link to='/order'>Orders</Link>
            </nav>
            <div className='parent'>
                <div className='left'>
                    <AddProductForm />
                </div>
                <div className='right'>
                    <ProductList />
                </div>
            </div>
        </div>

    )
}

export default Addview
