import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { SetBadgeColor, priceDecimalFormat } from '../services';

const CartPage = () => {
  const { cart, decreaseCartQuantity, increaseCartQuantity } =
    useContext(GlobalContext);

  const totalPrice = () => {
    let total = 0;

    cart.forEach((cartItem: CartItem) => {
      total += +cartItem.product.price * cartItem.quantity;
    });

    return total.toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className='row text-center mt-5'>
        <div className='col'>
          <h2>
            No items in your cart! Click <Link to='/'>here</Link> to shop for
            some great products!{' '}
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div id='cart'>
      <div className='row text-center mt-5 mb-3'>
        <div className='col'>
          <h2>YOUR BAG</h2>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-sm-12 col-md-8 offset-md-2'>
          <ul className='list-group'>
            {cart.map(cartItem => {
              return (
                <li className='list-group-item cart-item' key={cartItem.id}>
                  <div className='row'>
                    {/* product image */}
                    <div className='col-sm-12 col-md-2'>
                      <div className='cart-item-img-container'>
                        <img src={cartItem.product.image} alt='' />
                      </div>
                    </div>

                    {/* product details */}
                    <div className='col-sm-12 col-md-8'>
                      <div className='cart-item-body'>
                        <h3>
                          <Link to={`/products/${cartItem.product.id}`}>
                            {cartItem.product.title}
                          </Link>
                        </h3>
                        <div>
                          <span
                            className={`badge ${SetBadgeColor(
                              cartItem.product.category
                            )}`}>
                            {cartItem.product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* quantity/price */}
                    <div className='col-sm-12 col-md-2'>
                      <div className='cart-item-price'>
                        <div className='item-price'>
                          <div>
                            $
                            {priceDecimalFormat(
                              +cartItem.product.price * cartItem.quantity
                            )}
                          </div>
                          <div>
                            {cartItem.quantity > 1 ? (
                              <small className='text-secondary'>
                                {+cartItem.product.price} per item
                              </small>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div className='item-quantity'>
                          {/* incremement button starts */}
                          <div className='input-group'>
                            <span className='input-group-btn'>
                              <button
                                type='button'
                                className='btn btn-info btn-number'
                                data-type='minus'
                                onClick={() =>
                                  decreaseCartQuantity(cartItem.id)
                                }
                                data-field=''>
                                <span className='increment-minus'>-</span>
                              </button>
                            </span>
                            <input
                              type='text'
                              id='quantity'
                              name='quantity'
                              className='form-control input-number'
                              value={cartItem.quantity}
                              min='1'
                              max='100'
                            />
                            <span className='input-group-btn'>
                              <button
                                type='button'
                                className='btn btn-info btn-number'
                                data-type='plus'
                                onClick={() =>
                                  increaseCartQuantity(cartItem.id)
                                }
                                data-field=''>
                                <span className='increment-plus'>+</span>
                              </button>
                            </span>
                          </div>
                          {/* increment ends */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <hr />
          <div className='total-price text-right mt-3'>
            <h4>Total: ${totalPrice()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
