import Header from './Header';
import Content from './Content';
import AddItem from './AddItem';
import Footer from './Footer';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';
import ApiRequest from './ApiRequest';
function App() {
  const API_URL = 'http://localhost:3500/items';
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = items.length
      ? (parseInt(items[items.length - 1].id) + 1).toString()
      : '1';

    const myNewItem = { id, checked: false, item };

    const listItems = [...items, myNewItem];

    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await ApiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleCheck = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );

    setItems(updatedItems);
    const myItem = updatedItems.filter((item) => item.id === id);

    const updatedOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, updatedOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    setItems(updatedItems);

    const deleteOptions = {
      method: 'DELETE',
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await ApiRequest(reqUrl, deleteOptions);
    if (result) {
      setFetchError(result);
    }
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

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />

      <main>
        {isLoading && <p>Loading Items....</p>}

        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(searchItem.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
