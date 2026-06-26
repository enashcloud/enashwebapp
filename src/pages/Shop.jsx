import { useMemo, useState } from "react";
import { shopCategories, shopProducts } from "../data/shopProducts.js";
import { submitOrder } from "../lib/api.js";
import { readStore, writeStore } from "../lib/storage.js";
import "./Shop.css";

function currency(value) {
  return `R${Number(value).toLocaleString("en-ZA")}`;
}

export default function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => readStore("enash.cart", []));
  const [customer, setCustomer] = useState({ name: "", email: "", delivery: "digital", notes: "" });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      const search = `${product.title} ${product.summary} ${product.category}`.toLowerCase();
      const matchesQuery = search.includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const saveCart = (next) => {
    setCart(next);
    writeStore("enash.cart", next);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    const next = existing
      ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];
    saveCart(next);
    setCheckoutOpen(true);
  };

  const updateQuantity = (id, direction) => {
    const next = cart
      .map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + direction) } : item)
      .filter((item) => item.quantity > 0);
    saveCart(next);
  };

  const removeItem = (id) => saveCart(cart.filter((item) => item.id !== id));

  const placeOrder = async () => {
    if (!cart.length) {
      setError("Add at least one item to the cart first.");
      return;
    }
    if (!customer.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      setError("Add your name and a valid email for the order record.");
      return;
    }
    setSubmitting(true);
    setError("");
    const savedOrder = await submitOrder({ customer, items: cart, total, currency: "ZAR", status: "Order created" });
    setOrder(savedOrder);
    saveCart([]);
    setSubmitting(false);
  };

  return (
    <main id="main" className="shop-page">
      <section className="page-hero ec-blueprint-grid">
        <div className="ec-container page-hero__grid">
          <div>
            <span className="ec-eyebrow">Shop</span>
            <h1>Buy templates, guides, support credits, and digital packs.</h1>
            <p>The shop is separate from services. Products go to cart. Service packages use the request process on the home page.</p>
          </div>
          <div className="shop-summary-card">
            <strong>{itemCount}</strong>
            <span>items in cart</span>
            <button className="ec-btn ec-btn--primary ec-btn--block" onClick={() => setCheckoutOpen(true)}>Open cart</button>
          </div>
        </div>
      </section>

      <section className="ec-section">
        <div className="ec-container shop-layout">
          <aside className="shop-filters">
            <label className="ec-field"><span>Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates, guides, support..." /></label>
            <div className="category-list">
              {shopCategories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </aside>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__mark">{product.category.slice(0, 2).toUpperCase()}</div>
                <span className="product-card__type">{product.type}</span>
                <h2>{product.title}</h2>
                <p>{product.summary}</p>
                <ul>{product.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
                <div className="product-card__bottom"><strong>{currency(product.price)}</strong><button className="ec-btn ec-btn--primary" onClick={() => addToCart(product)}>Add to cart</button></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {checkoutOpen && (
        <div className="cart-panel" role="dialog" aria-label="Shopping cart">
          <div className="cart-panel__inner">
            <button className="cart-close" onClick={() => setCheckoutOpen(false)}>×</button>
            <span className="ec-eyebrow">Checkout</span>
            <h2>Your cart</h2>
            {cart.length === 0 && !order ? <p className="muted">Your cart is empty.</p> : null}
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div><strong>{item.title}</strong><span>{currency(item.price)} each</span></div>
                <div className="quantity-controls"><button onClick={() => updateQuantity(item.id, -1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>+</button></div>
                <button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
            <div className="cart-total"><span>Total</span><strong>{currency(total)}</strong></div>

            {!order && (
              <div className="checkout-form">
                <label className="ec-field"><span>Name</span><input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="Full name" /></label>
                <label className="ec-field"><span>Email</span><input value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="you@example.com" /></label>
                <label className="ec-field"><span>Delivery</span><select value={customer.delivery} onChange={(event) => setCustomer({ ...customer, delivery: event.target.value })}><option value="digital">Digital delivery</option><option value="support-credit">Support credit allocation</option></select></label>
                <label className="ec-field"><span>Notes optional</span><textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} placeholder="Anything important for this order?" /></label>
                {error && <div className="ec-form-note ec-form-note--error">{error}</div>}
                <button className="ec-btn ec-btn--primary ec-btn--block" onClick={placeOrder} disabled={submitting}>{submitting ? "Creating order..." : "Create order"}</button>
              </div>
            )}

            {order && (
              <div className="order-complete">
                <h3>Order created</h3>
                <p>Reference: <strong>{order.reference}</strong></p>
                <p>The order has been saved. If an API endpoint exists, it was submitted to the server. Otherwise it was saved in the browser for now.</p>
                <button className="ec-btn ec-btn--ghost" onClick={() => {
                  const blob = new Blob([JSON.stringify(order, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${order.reference}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}>Export order</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
