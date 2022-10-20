import { useEffect, useState } from 'react';
import { FiEdit, FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

interface ICategory {
  id: String;
  name: String;
  cor: String;
  adminId: String;
  created_at: Date;
}

function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const acessToken = localStorage.getItem('acessToken');
  const email = localStorage.getItem('email');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    api.get('category/find', authorization)
      .then(response => {
        setCategories(response.data);
      });

  }, [acessToken]);

  async function editCategory(id: String) {
    try {
      navigate(`/categories/category/new/${id}`);
    } catch (erro) {
      console.log('Error');
      alert('Error');
    }
  }

  async function deleteCategory(id: String) {
    try {
      await api.delete(`/category/delete/${id}`, authorization);
      setCategories(categories.filter(category => category.id !== id));
    } catch (erro) {
      alert('Error');
    }
  }

  async function logout() {
    try {
      localStorage.clear();
      navigate('/');
    } catch (erro) {
      alert('Error');
    }
  }


  return (
    <div className="book-container">
      <header>
        <h1>Logo</h1>
        <span>Welcome, <strong>{email}</strong>!</span>
        <Link to="/categories/category/new/0" className='button'>Add new Category</Link>
        <button onClick={() => logout()} type='button'>
          <FiPower size={18} color='#251fc5' />
        </button>
      </header>

      <h2>Categories</h2>

      <ul>
        {
          categories.map((category, index) => (
            <li key={index}>
              <strong>Category</strong>
              <p>{category.name}</p>
              <strong>Author</strong>
              <p>{category.adminId}</p>
              <strong>Color</strong>
              <p>{category.cor}</p>
              <strong>Created</strong>
              <p>{Intl.DateTimeFormat('pt-BR').format(new Date(category.created_at))}</p>

              <button onClick={() => editCategory(category.id)} type='button'>
                <FiEdit size={20} color='#251fc5' />
              </button>
              <button onClick={() => deleteCategory(category.id)} type='button'>
                <FiTrash2 size={20} color='#251fc5' />
              </button>
            </li>
          ))
        }

      </ul>
    </div>
  );
}

export { Categories };

