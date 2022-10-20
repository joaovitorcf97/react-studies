import { useEffect, useState } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

function NewCategory() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [color, setCoLor] = useState('');
  const { categoryId } = useParams();

  const navigate = useNavigate();
  const acessToken = localStorage.getItem('acessToken');
  const authorization = {
    headers: {
      'Authorization': `Bearer ${acessToken}`,
    }
  };

  useEffect(() => {
    if (categoryId === '0') {
      return;
    } else {
      loadCategory();
    }
  }, [categoryId]);



  async function sabeOrUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name,
      color,
    };

    try {
      if (categoryId === '0') {
        await api.post('category/create', data, authorization);
      } else {
        await api.put(`category/update/${categoryId}`, data, authorization);
      }
    } catch (error) {
      alert('Faild! try again!');
    }
    navigate('/categories');
  }

  async function loadCategory() {
    try {
      const response = await api.get(`/category/find-one/${categoryId}`, authorization);

      setId(response.data.id);
      setName(response.data.name);
      setCoLor(response.data.cor);


    } catch (error) {
      alert('Faild! try again!');
      navigate('/categories');
    }
  }

  return (
    <div className="new-category-container">
      <div className="content">
        <section className="form">
          <h1>{categoryId === '0' ? 'Add' : 'Update'} new Category</h1>

          <p>Enter the category information and click on {categoryId === '0' ? 'Add' : 'Update'}!</p>
          <Link to='/categories' className="back-link">
            <FiArrowLeft size={16} color="#251fc5" />
            Home
          </Link>
        </section>
        <form onSubmit={sabeOrUpdate}>
          <input
            required
            type="text"
            placeholder="Title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Cor"
            value={color}
            onChange={e => setCoLor(e.target.value)}
          />
          <button className='button'>{categoryId === '0' ? 'Add' : 'Update'}</button>
        </form>
      </div>
    </div>
  );
}

export { NewCategory };

