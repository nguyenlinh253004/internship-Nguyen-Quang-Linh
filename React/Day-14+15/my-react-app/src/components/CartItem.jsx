export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
      <div className="flex items-center gap-4 p-2 border-b">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-grow">
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-600">${item.price} x {item.quantity}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
          >
            +
          </button>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Xóa
          </button>
        </div>
      </div>
    )
  }