import { GiNoodles } from 'react-icons/gi';
import Swal from 'sweetalert2';

const Navbar = ({ cart, updateCart }) => {
  const checkoutButton = () => {
    Swal.fire({
      title: 'Payment Success',
      icon: 'success',
    });
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="bg-slate-700 text-white text-xl p-2 rounded-md">
            <div className="flex items-center gap-2">
              <GiNoodles className="w-8 h-8 lg:w-9 lg:h-9" />
              <span className="text-xl font-semibold">Noodle</span>
            </div>
          </a>
        </div>
        <div className="flex-none">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button cursor-pointer">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm badge-neutral indicator-item">
                    {cart.length}
                  </span>
                </div>
              </label>
            </div>
            <div className="drawer-side z-20">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <div className="flex w-full flex-col">
                  {cart.map((el, i) => {
                    return (
                      <li className="mb-2" key={i}>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 items-center">
                            <img
                              src={el.imageUrl}
                              alt="mie"
                              className="w-20 rounded-md"
                            />
                            <div>
                              <p className="font-bold text-[10px]">{el.name}</p>
                              <p className="font-semibold text-[10px]">
                                {el.price.toLocaleString('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1 items-center">
                            <button
                              className="btn btn-neutral btn-xs"
                              onClick={() => updateCart(el.id, 'decrement')}>
                              -
                            </button>
                            <p className="text-[12px]">{el.quantity}</p>
                            <button
                              className="btn btn-neutral btn-xs"
                              onClick={() => updateCart(el.id, 'increment')}>
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <div className="divider"></div>
                  <div className="flex justify-between">
                    <h1>Total : </h1>
                    <h1>
                      {total.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </h1>
                  </div>
                  <button
                    className="btn btn-success text-white mt-2"
                    onClick={checkoutButton}>
                    Checkout
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
