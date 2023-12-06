import { useState } from "react";

export default function Form({onAddItem}:any)
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