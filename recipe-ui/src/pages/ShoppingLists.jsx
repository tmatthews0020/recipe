import { useState, useEffect } from 'react';
import api from '../services/api';
import './ShoppingLists.css';

function ShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showListForm, setShowListForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [listFormData, setListFormData] = useState({
    name: '',
    date: ''
  });
  const [itemFormData, setItemFormData] = useState({
    ingredientName: '',
    quantity: '',
    unit: '',
    notes: '',
    isPurchased: false
  });

  useEffect(() => {
    loadShoppingLists();
  }, []);

  const loadShoppingLists = async () => {
    try {
      setLoading(true);
      const data = await api.getShoppingLists();
      setShoppingLists(data);
      setError(null);
    } catch (err) {
      setError('Failed to load shopping lists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadListDetails = async (id) => {
    try {
      const data = await api.getShoppingList(id);
      setSelectedList(data);
    } catch (err) {
      alert('Failed to load shopping list details');
      console.error(err);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();

    try {
      await api.createShoppingList(listFormData);
      resetListForm();
      loadShoppingLists();
    } catch (err) {
      alert('Failed to create shopping list');
      console.error(err);
    }
  };

  const handleDeleteList = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shopping list?')) {
      return;
    }

    try {
      await api.deleteShoppingList(id);
      if (selectedList?.id === id) {
        setSelectedList(null);
      }
      loadShoppingLists();
    } catch (err) {
      alert('Failed to delete shopping list');
      console.error(err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!selectedList) return;

    const payload = {
      ...itemFormData,
      quantity: parseFloat(itemFormData.quantity)
    };

    try {
      await api.addShoppingListItem(selectedList.id, payload);
      resetItemForm();
      loadListDetails(selectedList.id);
    } catch (err) {
      alert('Failed to add item');
      console.error(err);
    }
  };

  const handleToggleItem = async (item) => {
    try {
      await api.updateShoppingListItem(item.id, {
        ...item,
        isPurchased: !item.isPurchased
      });
      loadListDetails(selectedList.id);
    } catch (err) {
      alert('Failed to update item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.deleteShoppingListItem(itemId);
      loadListDetails(selectedList.id);
    } catch (err) {
      alert('Failed to delete item');
      console.error(err);
    }
  };

  const resetListForm = () => {
    setListFormData({ name: '', date: '' });
    setShowListForm(false);
  };

  const resetItemForm = () => {
    setItemFormData({
      ingredientName: '',
      quantity: '',
      unit: '',
      notes: '',
      isPurchased: false
    });
    setShowItemForm(false);
  };

  return (
    <div className="shopping-lists-page">
      <div className="page-header">
        <h1>Shopping Lists</h1>
        <button onClick={() => setShowListForm(!showListForm)} className="btn btn-primary">
          {showListForm ? 'Cancel' : 'New List'}
        </button>
      </div>

      {showListForm && (
        <form onSubmit={handleCreateList} className="list-form">
          <h3>New Shopping List</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="List Name *"
              value={listFormData.name}
              onChange={(e) => setListFormData({ ...listFormData, name: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="date"
              value={listFormData.date}
              onChange={(e) => setListFormData({ ...listFormData, date: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Create</button>
            <button type="button" onClick={resetListForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="shopping-lists-container">
        <div className="lists-sidebar">
          <h3>Your Lists</h3>
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}
          <div className="lists-list">
            {shoppingLists.map(list => (
              <div
                key={list.id}
                className={`list-item ${selectedList?.id === list.id ? 'active' : ''}`}
                onClick={() => loadListDetails(list.id)}
              >
                <div className="list-info">
                  <h4>{list.name}</h4>
                  {list.date && (
                    <span className="list-date">
                      {new Date(list.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id);
                  }}
                  className="btn-icon btn-danger"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {!loading && shoppingLists.length === 0 && (
            <p className="empty-text">No shopping lists yet.</p>
          )}
        </div>

        <div className="list-details">
          {selectedList ? (
            <>
              <div className="details-header">
                <h2>{selectedList.name}</h2>
                <button
                  onClick={() => setShowItemForm(!showItemForm)}
                  className="btn btn-primary"
                >
                  {showItemForm ? 'Cancel' : 'Add Item'}
                </button>
              </div>

              {showItemForm && (
                <form onSubmit={handleAddItem} className="item-form">
                  <div className="form-grid-compact">
                    <input
                      type="text"
                      placeholder="Item name *"
                      value={itemFormData.ingredientName}
                      onChange={(e) => setItemFormData({ ...itemFormData, ingredientName: e.target.value })}
                      required
                      className="form-input"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Quantity *"
                      value={itemFormData.quantity}
                      onChange={(e) => setItemFormData({ ...itemFormData, quantity: e.target.value })}
                      required
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={itemFormData.unit}
                      onChange={(e) => setItemFormData({ ...itemFormData, unit: e.target.value })}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Notes"
                      value={itemFormData.notes}
                      onChange={(e) => setItemFormData({ ...itemFormData, notes: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Add</button>
                    <button type="button" onClick={resetItemForm} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="items-list">
                {selectedList.items && selectedList.items.length > 0 ? (
                  selectedList.items.map(item => (
                    <div key={item.id} className={`shopping-item ${item.isPurchased ? 'purchased' : ''}`}>
                      <input
                        type="checkbox"
                        checked={item.isPurchased}
                        onChange={() => handleToggleItem(item)}
                        className="item-checkbox"
                      />
                      <div className="item-content">
                        <span className="item-name">
                          {item.quantity} {item.unit} {item.ingredientName}
                        </span>
                        {item.notes && <span className="item-notes">{item.notes}</span>}
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="btn-icon btn-danger"
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="empty-text">No items in this list yet.</p>
                )}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>Select a shopping list to view its items</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingLists;
