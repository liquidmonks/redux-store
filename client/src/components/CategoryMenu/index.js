import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentCategory, updateCategories, updateCurrentCategory } from '../../redux/categoriesSlice'

function CategoryMenu() {
  const categories = useSelector(state => state.categories.categories)
  const currentCategory = useSelector(state => state.categories.currentCategory)
  const dispatch = useDispatch()

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories))
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(updateCategories(categories))
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch(updateCurrentCategory(id))
  };

  const handleClearCurrentCategory = () => {
    dispatch(clearCurrentCategory())
  }

  return (
    <div className='mb-10'>
      <h2>Choose a Category:</h2>
      <div className='flex flex-wrap gap-1'>
        {categories.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
            className='btn-primary flex-grow-0 w-fit text-sm'
          >
            {item.name}
          </button>
        ))}
      </div>

      {
        currentCategory !== ''
          ? <button className='link mt-1' onClick={handleClearCurrentCategory}>Clear Category</button>
          : null
      }
    </div>
  );
}

export default CategoryMenu;
