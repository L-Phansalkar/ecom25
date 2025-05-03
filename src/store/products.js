import axios from 'axios';

// const Products = import('.../server/db/models/products');

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

const fetchProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products');
      console.log(data)
      dispatch(fetchProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
