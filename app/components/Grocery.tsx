import { useState } from "react";
import Item from "./Item";
export default function Grocery({items, onDeleteItem, onToggleItem, onClearItems}:any)
{

    const [sortBy, setSortBy] = useState('input');

    let sortedItems;

    if (sortBy == 'input') {
        sortedItems = items;
    }if (sortBy == 'name') {
        sortedItems = items.slice().sort((a:any, b:any) => a.name.localeCompare(b))
    }if(sortBy == 'checked'){
        sortedItems = items.slice().sort((a:any, b:any) => b.checked - a.checked)
    }

    return(
        <>
        <div className='list'>
                    <ul>
                        {sortedItems.map((item:any) => (
                        <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
                        )) }
                    </ul>
                </div>
                <div className='actions'>
                    <select value={sortBy} onChange={(e:any) => setSortBy(e.target.value)}>
                        <option value="input">Urutkan berdasarkan urutan input</option>
                        <option value="name">Urutkan berdasarkan nama barang</option>
                        <option value="checked">Urutkan berdasarkan ceklis</option>
                    </select>
                    <button onClick={onClearItems}>Bersihkan Daftar</button>
                </div>
        </>
    )
}