import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';
import { axiosInstance } from './lib/axios';

const CART_STORAGE_KEY = 'cart';

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function App() {
  const [dataFoods, setDataFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(loadCart);

  const fetchDataFoods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/api/foods');
      const foods = response.data?.data;
      setDataFoods(Array.isArray(foods) ? foods : []);
    } catch (err) {
      console.error(err.message);
      setError('Gagal memuat menu. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFoods();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors (private mode, quota)
    }
  }, [cart]);

  function addToCart(food) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  }

  function updateCart(foodId, action) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === foodId
            ? {
                ...item,
                quantity:
                  action === 'increment'
                    ? item.quantity + 1
                    : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      {/* Navbar */}
      <div className="container mx-auto px-12 lg:px-24 lg:pb-5">
        <div className="flex justify-center">
          <Navbar cart={cart} updateCart={updateCart} clearCart={clearCart} />
        </div>
      </div>
      {/* End Of Navbar */}

      {/* card */}
      <main className="container mx-auto p-10 lg:p-0">
        <div className="flex justify-center">
          {isLoading ? (
            <span className="loading loading-spinner loading-lg" />
          ) : error ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-error font-semibold">{error}</p>
              <button className="btn btn-sm" onClick={fetchDataFoods}>
                Coba lagi
              </button>
            </div>
          ) : dataFoods.length === 0 ? (
            <p className="font-semibold">Menu belum tersedia.</p>
          ) : (
            <CardItem dataFoods={dataFoods} addToCart={addToCart} />
          )}
        </div>
      </main>
      {/* end of card */}
    </>
  );
}

export default App;
