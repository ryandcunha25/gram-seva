// utils/gtmEvents.js

// Ensure dataLayer exists
const pushToDataLayer = (eventData) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // clear previous ecommerce data
  window.dataLayer.push(eventData);
};

// View item list (e.g. on Products page)
export const gtm_viewItemList = (products, listName = "Products") => {
  pushToDataLayer({
    event: "view_item_list",
    ecommerce: {
      item_list_id: listName.toLowerCase().replace(/\s+/g, "_"),
      item_list_name: listName,
      items: products.map((item, index) => ({
        item_id: item._id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
        index,
      })),
    },
  });
};

// Add to cart
export const gtm_addToCart = (item) => {
  pushToDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency: "INR",
      value: item.price * (item.quantity || 1),
      items: [
        {
          item_id: item._id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          item_category: item.category,
        },
      ],
    },
  });
};

// Remove from cart
export const gtm_removeFromCart = (item) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "remove_from_cart",
    ecommerce: {
      items: [
        {
          item_id: item._id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          category: item.category,
        },
      ],
    },
  });
};

// (Optional) View single product
export const viewItem = (item) => {
  pushToDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "INR",
      value: item.price,
      items: [
        {
          item_id: item._id,
          item_name: item.name,
          price: item.price,
          item_category: item.category,
        },
      ],
    },
  });
};

// (Optional) Purchase (e.g. after successful booking/order)
export const gtm_book = (orderId, items, totalAmount) => {
  pushToDataLayer({
    event: "purchase",
    ecommerce: {
      transaction_id: orderId,
      currency: "INR",
      value: totalAmount,
      items: items.map((item) => ({
        item_id: item._id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: item.category,
      })),
    },
  });
};
