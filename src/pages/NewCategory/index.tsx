import { useEffect, useState } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import './styles.css';

function NewCategory() {
  const [id, setId] = useState(null);
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

  const data = {
    name,
    color,
  };

  async function createNewCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.post('category/create', data, authorization);
      navigate('/categories');
    } catch (error) {
      alert('Faild! try again!');
    }
  }

  async function loadCategory() {
    try {
      const response = await api.get(`category/find/${categoryId}`, authorization);

      setId(response.data.id);
      setId(response.data.title);
      setId(response.data.cor);

      navigate('/categories');
    } catch (error) {
      alert('Faild! try again!');
      navigate('/categories');
    }
  }

  return (
    <div className="new-category-container">
      <div className="content">
        <section className="form">
          <h1>Add new Category</h1>

          <p>Enter the category information and click on 'Add'!{categoryId}</p>
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

