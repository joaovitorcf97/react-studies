import { useState } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

function NewCategory() {
  const [name, setName] = useState('');
  const [color, setCoLor] = useState('');

  const navigate = useNavigate();
  const acessToken = localStorage.getItem('acessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  async function createNewCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name,
      color,
    };

    try {
      await api.post('category/create', data, authorization);

      navigate('/categories');
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  return (
    <div className="new-category-container">
      <div className="content">
        <section className="form">
          <h1>Add new Category</h1>

          <p>Enter the category information and click on 'Add'!</p>
          <Link to='/categories' className="back-link">
            <FiArrowLeft size={16} color="#251fc5" />
            Home
          </Link>
        </section>
        <form onSubmit={createNewCategory}>
          <input
            type="text"
            placeholder="Title"
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cor"
            onChange={e => setCoLor(e.target.value)}
          />
          <button className='button'>Add</button>
        </form>
      </div>
    </div>
  );
}

export { NewCategory };

