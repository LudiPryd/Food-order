import { formatIDR } from '../lib/format';

const CardItem = ({ dataFoods, addToCart }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4">
      {dataFoods.map((food) => {
        const modalId = `modal_${food.id}`;
        return (
          <div
            className="card card-compact border border-1 lg:w-64 shadow-xl"
            key={food.id}>
            <figure className="p-2">
              <button
                type="button"
                aria-label={`Lihat detail ${food.name}`}
                onClick={() => document.getElementById(modalId)?.showModal()}>
                <img
                  src={food.image_url}
                  alt={food.name}
                  className="h-36 w-36 object-cover rounded-md"
                />
              </button>
              {/* modal */}
              <dialog id={modalId} className="modal">
                <div className="modal-box flex flex-col">
                  <img
                    src={food.image_url}
                    alt={food.name}
                    className="w-48 mx-auto object-contain"
                  />
                  <p className="font-bold mx-auto my-2">
                    {food.name} - {formatIDR(food.price)}
                  </p>
                  <p className="font-semibold mx-auto text-[15px]">
                    {food.description}
                  </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold md:text-[12px] lg:text-lg">
                {food.name}
              </h2>
              <p className="text-[12px] md:text-[10px] lg:text-[12px] font-semibold">
                {food.description}
              </p>
              <p className="font-semibold">{formatIDR(food.price)}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-accent w-28 text-white"
                  onClick={() => addToCart(food)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardItem;
