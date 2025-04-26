const Cart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 ">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="text-lg">Tên sản phẩm:{item.name}</h3>
                  <p className="text-gray-600">Giá sản phẩm:${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-semibold">Total: ${totalPrice}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;