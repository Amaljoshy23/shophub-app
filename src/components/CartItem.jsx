import { useDispatch } from 'react-redux';
import { addItem, removeItem, removeAllItems } from '../redux/slices/cartSlice';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addItem(item));
  };

  const handleDecrease = () => {
    dispatch(removeItem(item.id));
  };

  const handleRemove = () => {
    dispatch(removeAllItems(item.id));
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-lg font-bold text-indigo-600 mt-1">${item.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-xl font-bold text-gray-800">
          ${item.totalPrice.toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
