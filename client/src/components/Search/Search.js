import './Search.scss';
import { useState, useEffect } from 'react';

function Search({ originalList, setFilteredList, filterFunction, searchPlaceholder }) {

  const [searchPhrase, setSearchPhrase] = useState('');

  const handleChange = (e) => {
    setSearchPhrase(e.target.value);
  }

  useEffect(() => {
    if (searchPhrase === '') return setFilteredList(originalList);
    setFilteredList(filterFunction(searchPhrase));
  }, [searchPhrase, originalList])

  return <div className='Search'>
    <input type='text'
      name='search'
      placeholder={searchPlaceholder}
      value={searchPhrase}
      onChange={handleChange}
      autoComplete="off"
    />
  </div>
}

export default Search;
