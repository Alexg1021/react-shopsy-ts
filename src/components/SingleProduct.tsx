import React from 'react';
import { SetBadgeColor, priceDecimalFormat } from '../services';

interface SingleProductProps {
  product: Product | undefined;
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  if (!product) {
    return <div>There is no product to show!</div>;
  }
  return (
    <div className='card'>
      <div className='row'>
        {/* Product Img */}
        <div className='col-sm-12 col-md-4'>
          <div className='prod-img-container p-3'>
            <div
              className='prod-img'
              style={{ backgroundImage: `url(${product.image})` }}></div>
          </div>
        </div>
        {/* product details */}
        <div className='col-sm-12 col-md-8'>
          <div className='card-body d-flex flex-column justify-content-between h-100'>
            {/* product title */}
            <h3 className='card-title'>
              {product.title}
              <div className=''>
                <small className='text-info'>
                  ${priceDecimalFormat(+product.price)}
                </small>
              </div>
            </h3>
            {/* product details */}
            <div className='card-details'>
              <h4>Description</h4>
              <p>{product.description}</p>
              <div>
                <span
                  className={`badge text-white ${SetBadgeColor(
                    product.category
                  )}`}>
                  {product.category}
                </span>
              </div>
            </div>
            {/* product add to cart */}
            <div className='card-cart'>
              <div className='row'>
                <div className='col-2'>
                  <div className='form-group'>
                    <select className='form-control'>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                    </select>
                  </div>
                </div>

                <div className='col-10'>
                  <button className='btn btn-block btn-danger'>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
