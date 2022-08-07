import './Search.scss';
import { useState, useEffect } from 'react';

function Search({ originalList, setFilteredList }) {

  const [searchPhrase, setSearchPhrase] = useState('');

  const handleChange = (e) => {
    setSearchPhrase(e.target.value);
  }

  useEffect(() => {
    if (searchPhrase === '') return setFilteredList(originalList);
    const newFilteredList = JSON.parse(JSON.stringify(originalList));
    Object.entries(originalList).forEach(([type, productsType]) => {
      Object.entries(productsType).forEach(([productName, { description }]) => {
        if (!productName.includes(searchPhrase) && !description.includes(searchPhrase)) delete newFilteredList[type][productName];
      })
    });
    setFilteredList(newFilteredList);
  }, [searchPhrase, originalList])

  return <div className='Search'>
    <input type='text'
      name='search'
      placeholder='Search by product name/description'
      value={searchPhrase}
      onChange={handleChange}
      autoComplete="off"
    />
  </div>
}

export default Search;
