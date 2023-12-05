"use client";

import { useState } from 'react';
import './style.css'

function Header()
{
    return <h1>Catatan Belanjaku 📝</h1>
}

function Form({onAddItem}:any)
{

    const quantityNum = [...Array(20)].map((_, i) => 
    (
        <option value={i+1} key={i+1}>{i+1}</option>
    ) );

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e:any){
        e.preventDefault();
        // alert(name + '' + quantity);
        if(!name) return;

        const newItemm = {name, quantity, checked: false, id: Date.now()};
        onAddItem(newItemm)
        console.log(newItemm);
        setName('');
        setQuantity(1);
    }

    return(
        <form className='add-form' onSubmit={handleSubmit}>
        <h3>Hari ini belanja apa kita?</h3>
        <div>
            <select value={quantity} onChange={(e:any) => setQuantity(Number(e.target.value))}>
           {quantityNum}
            </select>
            <input type="text" placeholder="nama barang..." value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <button>Tambah</button>
    </form>
    )
}

function Grocery({items, onDeleteItem, onToggleItem, onClearItems}:any)
{
    return(
        <>
        <div className='list'>
                    <ul>
                        {items.map((item:any) => (
                        <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
                        )) }
                    </ul>
                </div>
                <div className='actions'>
                    <select>
                        <option value="input">Urutkan berdasarkan urutan input</option>
                        <option value="name">Urutkan berdasarkan nama barang</option>
                        <option value="checked">Urutkan berdasarkan ceklis</option>
                    </select>
                    <button onClick={onClearItems}>Bersihkan Daftar</button>
                </div>
        </>
    )
}

function Item({ item, onDeleteItem, onToggleItem }:any)
{
    return(
        <li key={item.id}>
                            <input type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.id)} />
                            <span style={item.checked ? { textDecoration: 'line-through' } : {}}>{item.quantity} {item.name}</span>
                            <button onClick={() => onDeleteItem(item.id)}>&times;</button>
                        </li>
    )
}

function Footer()
{
    return <footer className='stats'>Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>
}

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
                <Footer/>
             </div>
        </main>
    )
}