import './AddNewProduct.scss';
import { useState, useEffect } from 'react';

function AddNewProduct() {

  const initialProductDetails = {
    title: '',
    description: '',
    img: '',
    price: undefined,
  };
  const [newProduct, setNewProduct] = useState(initialProductDetails);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    setSumbitEnabled(!Object.values(newProduct).some(val => val === '' || val === undefined));
  }, [newProduct]);

  const onSubmit = () => {

  }

  return <div className='AddNewProduct'>
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='title'
        placeholder='Product name'
        value={newProduct.title}
        onChange={handleChange}
        autoComplete="off"
      />
      <textarea
        type='text'
        name='description'
        placeholder='Product description'
        value={newProduct.description}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        type='text'
        name='img'
        placeholder='Image URL'
        value={newProduct.img}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        type='number'
        name='price'
        placeholder='Product price'
        value={newProduct.price}
        onChange={handleChange}
        autoComplete="off"
      />

      <button disabled={!sumbitEnabled} type='submit'>
        Add
      </button>
    </form>
  </div>
}

export default AddNewProduct;
