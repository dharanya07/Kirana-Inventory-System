
import { useState } from "react";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Dairy", description: "Milk, curd, butter" },
    { id: 2, name: "Snacks", description: "Biscuits and chips" },
    { id: 3, name: "Beverages", description: "Juices and drinks" },
    { id: 4, name: "Grocery", description: "Rice, oil and pulses" },
    { id: 5, name: "Personal Care", description: "Soaps and shampoos" }
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const addCategory = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter a category name.");
      return;
    }

    const exists = categories.some(
      (category) =>
        category.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (exists) {
      setMessage("This category already exists.");
      return;
    }

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim()
      }
    ]);

    setName("");
    setDescription("");
    setMessage("Category added successfully!");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    setMessage("Category deleted.");
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="category-page">
      <h1>Categories Management</h1>
      <p>Organize your grocery products into categories.</p>

      <div className="category-summary">
        <h3>Total Categories</h3>
        <h2>{categories.length}</h2>
      </div>

      <form className="category-form" onSubmit={addCategory}>
        <h2>Add New Category</h2>

        <label>Category Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
        />

        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />

        <button type="submit">Add Category</button>

        {message && <p className="category-message">{message}</p>}
      </form>

      <div className="category-list">
        <h2>Category List</h2>

        <input
          className="category-search"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description || "-"}</td>
                <td>
                  <button
                    className="category-delete"
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan="3">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
