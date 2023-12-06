"use client";

import { useState } from 'react';
import './style.css';
import Header from '../components/Header';
import Form from '../components/Form';
import Grocery from '../components/Grocery';
import Footer from '../components/Footer';

const GroceryItems = [
    {
        id: 1,
        name: 'Kopi Bubuk',
        quantity: 2,
        checked: true,
      },
      {
        id: 2,
        name: 'Gula Pasir',
        quantity: 5,
        checked: false,
      },
      {
        id: 3,
        name: 'Air Mineral',
        quantity: 3,
        checked: false,
      },
];

export default function App()
{
    const [items, setItems] = useState(GroceryItems);

    function handleAddItem(item:any){
        setItems([...items, item])
    }

    function handleDeleteItem(id:any){
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id:any){
        setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked} : item));
    }

    function handleClearItems(){
        setItems([]);
    }

    return(
        <main>
            <div className='app'>
                <Header />
                <Form onAddItem={handleAddItem}  />
                <Grocery items={items}  onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
                <Footer items={items}/>
             </div>
        </main>
    )
}