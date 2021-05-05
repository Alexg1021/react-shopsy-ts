import { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import SingleProduct from '../components/SingleProduct';

const ProductPage = () => {
  const { product, getSingleProduct } = useContext(GlobalContext);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    getSingleProduct(+productId);
  }, [productId]);

  if (!product) {
    return (
      <div className='row'>
        <div className='col'>
          <h2 className='text-center'>No Product!</h2>
        </div>
      </div>
    );
  }
  return (
    <div id='product'>
      {/* Breadcrumb */}
      <div className='row my-3'>
        <div className='col'>
          <div className='page-breadcrumb'>
            <h4>
              <span>
                <Link to='/'>Home</Link>
              </span>
              {' > '}
              <span>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </span>
            </h4>
          </div>
        </div>
      </div>

      {/* Product Card */}
      <div className='row'>
        <div className='col-sm-12 col-md-8 offset-md-2'>
          <SingleProduct product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
