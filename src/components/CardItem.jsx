const CardItem = ({ dataFoods, addToCart }) => {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
        {dataFoods.map((food) => {
          const modalId = `modal_${food.id}`;
          return (
            <div
              className="card card-compact border border-1 lg:w-64 shadow-xl"
              key={food.id}>
              <figure className="p-2">
                <img
                  src={food.imageUrl}
                  alt="food"
                  className="h-36 w-36 object-cover rounded-md"
                  onClick={() => document.getElementById(modalId).showModal()}
                />
                <dialog id={modalId} className="modal">
                  <div className="modal-box flex flex-col">
                    <img
                      src={food.imageUrl}
                      alt="food"
                      className="w-48 mx-auto object-contain"
                    />
                    <p className="font-bold mx-auto my-2">
                      {food.name} -{' '}
                      {food.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </p>
                    <p className="font-semibold mx-auto text-[15px]">
                      {food.desc}
                    </p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </figure>
              <div className="card-body">
                <h1 className="card-title font-bold md:text-[12px] lg:text-lg">
                  {food.name}
                </h1>
                <p className="text-[12px] md:text-[10px] lg:text-[12px] font-semibold">
                  {food.desc}
                </p>
                <p className="font-semibold">
                  {food.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-accent w-28 text-white"
                    onClick={() => {
                      addToCart(food);
                    }}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* modal */}
    </>
  );
};

export default CardItem;
