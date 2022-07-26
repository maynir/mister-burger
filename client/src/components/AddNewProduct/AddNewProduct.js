import './AddNewProduct.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddNewProduct({ getProducts }) {

  const initialProductDetails = {
    title: '',
    productType: 'main',
    description: '',
    file: '',
    price: '',
  };
  const [newProduct, setNewProduct] = useState(initialProductDetails);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.name === 'file' ? e.target.files[0] : e.target.value })
  };

  useEffect(() => {
    setSumbitEnabled(!Object.values(newProduct).some(val => val === '' || val === undefined));
  }, [newProduct]);

  const onSubmit = async () => {
    try {
      let formData = new FormData();
      for (const [key, value] of Object.entries(newProduct)) {
        formData.append(key, value);
      }
      await axios.post('/add-product', formData);
      await getProducts();
      setNewProduct(initialProductDetails);
      Swal.fire('Added new product', '', 'success')
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong...')
    }
  }

  return <div className='AddNewProduct'>
    <label>Product Name:</label>
    <input
      type='text'
      name='title'
      placeholder='Product name'
      value={newProduct.title}
      onChange={handleChange}
      autoComplete="off"
    />
    <label>Product Type:</label>
    <select name="productType" id="productType" onChange={handleChange} value={newProduct.productType}>
      <option value="main">Main</option>
      <option value="side">Side</option>
      <option value="drink">Drink</option>
    </select>
    <label>Description:</label>
    <textarea
      type='text'
      name='description'
      placeholder='Product description'
      value={newProduct.description}
      onChange={handleChange}
      autoComplete="off"
    />
    <label>Product Img:</label>
    <input
      type='file'
      name='file'
      onChange={handleChange}
      accept="image/png, image/gif, image/jpeg"
    />
    <label>Price:</label>
    <input
      type='number'
      name='price'
      placeholder='Product price'
      value={newProduct.price}
      min={1}
      max={100}
      onChange={handleChange}
      autoComplete="off"
    />

    <button disabled={!sumbitEnabled} onClick={onSubmit}>
      Add
    </button>
  </div>
}

export default AddNewProduct;
