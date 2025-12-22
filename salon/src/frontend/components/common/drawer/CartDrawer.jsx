import React from "react";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../../redux/cartSlice";

const CartDrawer = ({ cartOpen, setCartOpen }) => {
  const dispatch = useDispatch();
  const { items, delivery, handling, smallCart } = useSelector(
    (state) => state.cart
  );

  const itemsTotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const grandTotal = itemsTotal + delivery + handling + smallCart;

  const isLoggedIn = false;

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setCartOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 lg:w-96 bg-white shadow-2xl z-50 
          transform transition-transform duration-300 flex flex-col
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-xl font-semibold text-[#017D03]">My Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-gray-600 hover:text-black text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-100 p-3 rounded-xl relative">
              {/* ❌ REMOVE BUTTON */}
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={18} />
              </button>

              <p className="text-xs text-gray-500">
                Shipment of {item.qty} items
              </p>

              <div className="flex items-center mt-3 space-x-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-16 object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-black">
                    {item.name}
                  </p>

                  <p className="mt-1 font-bold text-gray-700">
                    ₹{item.price * item.qty}
                  </p>
                </div>

                {/* Qty Buttons */}
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-lg">
                  <FiMinus
                    className="cursor-pointer"
                    onClick={() => dispatch(decreaseQty(item.id))}
                  />
                  <span className="mx-2">{item.qty}</span>
                  <FiPlus
                    className="cursor-pointer"
                    onClick={() => dispatch(increaseQty(item.id))}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Bill */}
          <div className="bg-gray-100 p-3 rounded-xl">
            <p className="font-semibold mb-2 text-black">Bill details</p>

            <div className="text-sm space-y-1 text-black">
              <div className="flex justify-between">
                <span>Items total</span>
                <span>₹{itemsTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery charge</span>
                <span>₹{delivery}</span>
              </div>

              <div className="flex justify-between">
                <span>Handling charge</span>
                <span>₹{handling}</span>
              </div>

              <div className="flex justify-between">
                <span>Small cart charge</span>
                <span>₹{smallCart}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-bold text-black">
                <span>Grand total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Policy */}
          <div className="bg-gray-100 p-3 rounded-xl mt-4 text-xs text-gray-600">
            Orders cannot be cancelled once packed for delivery.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold">
            {isLoggedIn ? "Proceed to Payment" : "Login to Proceed"}
          </button>

          <div className="flex justify-between items-center mt-3 font-semibold">
            <span>Total</span>
            <span className="text-xl text-green-600 font-bold">
              ₹{grandTotal}
            </span>
          </div>
          {/* <div className="flex justify-between text-black items-center mt-5 font-semibold">
            <span>Items</span>
            <span className="text-sm  font-bold">{items.qty}</span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
