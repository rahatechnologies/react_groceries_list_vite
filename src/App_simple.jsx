import Header from './Header';
import Content from './Content';
import AddItem from './AddItem';
import Footer from './Footer';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';

function App() {
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: true,
  //     item: 'One half pound bag of Cocoa Covered Almonds Unsalted'
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     item: 'Item 2'
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: 'Item 3'
  //   }
  // ]);
  const API_URL = 'http://localhost:3500/items';
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [fetchError, setFetchError] = useState(null);

  // useEffect(()=>{
  //   localStorage.setItem('shoppingList', JSON.stringify(items));
  //   console.log('Loadtime - render from useEffect');
  // },[items])

  // useEffect for fetch api
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error('Did not received expected  data');
        }
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        console.log(error.message);
        setFetchError(error.message);
      }
    };

    (async () => await fetchItems())();
  }, []);

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    // localStorage.setItem('shoppingList', JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    const myNewItem = { id, checked: false, item };

    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  const handleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );

    setAndSaveItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    setAndSaveItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  //  Render
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
