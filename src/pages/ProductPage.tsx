import { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import SingleProduct from '../components/SingleProduct';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { product, getSingleProduct, is_loading } = useContext(GlobalContext);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    getSingleProduct(+productId);
  }, [productId]);

  if (!product || is_loading) {
    return <Loader />;
  }
  return (
    <div id='product'>
      {/* Breadcrumb */}
      <div>
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
    </div>
  );
};

export default ProductPage;
