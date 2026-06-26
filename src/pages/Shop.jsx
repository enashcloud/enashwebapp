import React, { useMemo, useState } from "react";
import "./Shop.css";
import "./News.css";

const products = [
  {
    id: "lenovo-thinkpad-e14",
    name: "Lenovo ThinkPad E14 Business Laptop",
    category: "Laptops",
    price: 13999,
    stock: 8,
    tag: "Business laptop",
    specs: ["Intel Core i5", "16GB RAM", "512GB SSD", "14-inch display"],
    description:
      "Reliable business laptop for students, office workers, entrepreneurs and remote work."
  },
  {
    id: "hp-probook-450",
    name: "HP ProBook 450 Work Laptop",
    category: "Laptops",
    price: 15499,
    stock: 6,
    tag: "Office ready",
    specs: ["Intel Core i5", "16GB RAM", "512GB SSD", "15.6-inch display"],
    description:
      "Professional laptop for admin, finance, online learning and office productivity."
  },
  {
    id: "dell-latitude-5450",
    name: "Dell Latitude 5450 Business Laptop",
    category: "Laptops",
    price: 17999,
    stock: 4,
    tag: "Premium work",
    specs: ["Intel Core Ultra/i5 class", "16GB RAM", "512GB SSD", "Business chassis"],
    description:
      "Durable work laptop for business users who need performance and long-term reliability."
  },
  {
    id: "macbook-air-m3",
    name: "Apple MacBook Air 13-inch",
    category: "Laptops",
    price: 23999,
    stock: 3,
    tag: "Creator choice",
    specs: ["Apple M-series chip", "8GB+ RAM", "256GB+ SSD", "13-inch Retina display"],
    description:
      "Lightweight laptop for creators, students, business owners and professionals."
  },
  {
    id: "ryzen-desktop-bundle",
    name: "Ryzen Office Desktop Bundle",
    category: "Desktop Bundles",
    price: 11999,
    stock: 5,
    tag: "Full setup",
    specs: ["Ryzen 5 class CPU", "16GB RAM", "512GB SSD", "24-inch monitor"],
    description:
      "Complete office desktop bundle with monitor, keyboard and mouse."
  },
  {
    id: "mini-pc-office",
    name: "Mini PC Office Setup",
    category: "Desktop Bundles",
    price: 8999,
    stock: 7,
    tag: "Space saving",
    specs: ["Intel NUC/mini PC class", "16GB RAM", "512GB SSD", "Wi-Fi"],
    description:
      "Compact computer for reception desks, home offices and small businesses."
  },
  {
    id: "hp-laserjet-printer",
    name: "HP LaserJet Office Printer",
    category: "Printers",
    price: 4299,
    stock: 10,
    tag: "Office printing",
    specs: ["Mono laser", "Fast printing", "USB/Wi-Fi options", "Low running cost"],
    description:
      "Reliable black-and-white printer for invoices, school work and office documents."
  },
  {
    id: "epson-ecotank",
    name: "Epson EcoTank Colour Printer",
    category: "Printers",
    price: 5999,
    stock: 6,
    tag: "Colour printing",
    specs: ["Ink tank system", "Colour print", "Scan/copy options", "Low ink cost"],
    description:
      "Colour printer for small businesses, schools, photos, labels and marketing material."
  },
  {
    id: "canon-pixma",
    name: "Canon PIXMA Home & Study Printer",
    category: "Printers",
    price: 2499,
    stock: 9,
    tag: "Home printer",
    specs: ["Colour inkjet", "Scan and copy", "Wi-Fi options", "Compact design"],
    description:
      "Affordable printer for home, school and small office use."
  },
  {
    id: "crucial-ssd-1tb",
    name: "1TB SSD Upgrade",
    category: "Computer Hardware",
    price: 1499,
    stock: 20,
    tag: "Speed upgrade",
    specs: ["1TB storage", "SATA/NVMe options", "Fast boot", "Laptop/desktop upgrade"],
    description:
      "Upgrade slow computers with faster storage and more working space."
  },
  {
    id: "ddr4-ram-16gb",
    name: "16GB RAM Upgrade",
    category: "Computer Hardware",
    price: 1199,
    stock: 18,
    tag: "Performance",
    specs: ["16GB memory", "DDR4/DDR5 options", "Laptop/desktop options", "Installation available"],
    description:
      "Improve multitasking performance for office work, studying, browsing and design tools."
  },
  {
    id: "wifi-router",
    name: "Business Wi-Fi Router",
    category: "Networking",
    price: 1899,
    stock: 12,
    tag: "Connectivity",
    specs: ["Dual-band Wi-Fi", "Office/home use", "Guest network support", "Setup available"],
    description:
      "Router for stable internet access in homes, shops and small offices."
  },
  {
    id: "ups-backup",
    name: "UPS Backup Power Unit",
    category: "Power & Accessories",
    price: 2199,
    stock: 11,
    tag: "Power backup",
    specs: ["UPS backup", "Surge protection", "PC/router support", "Load shedding support"],
    description:
      "Keep routers, desktops or office equipment protected during power interruptions."
  },
  {
    id: "monitor-24",
    name: "24-inch Full HD Monitor",
    category: "Power & Accessories",
    price: 2499,
    stock: 14,
    tag: "Workspace",
    specs: ["24-inch display", "Full HD", "HDMI/VGA options", "Office and study use"],
    description:
      "External monitor for productivity, studying, design and dual-screen office setups."
  },
  {
    id: "keyboard-mouse-combo",
    name: "Wireless Keyboard & Mouse Combo",
    category: "Power & Accessories",
    price: 599,
    stock: 25,
    tag: "Accessory",
    specs: ["Wireless", "USB receiver", "Office layout", "Laptop/desktop support"],
    description:
      "Clean wireless setup for office desks, students and home workstations."
  },
  {
    id: "enash-hoodie",
    name: "Custom Printed Hoodie",
    category: "Printed Clothing",
    price: 699,
    stock: 30,
    tag: "Custom print",
    specs: ["S to XXL", "Front/back print", "Bulk orders", "Brand printing available"],
    description:
      "Printed hoodie for businesses, teams, schools, events and personal branding."
  },
  {
    id: "enash-tshirt",
    name: "Custom Printed T-shirt",
    category: "Printed Clothing",
    price: 249,
    stock: 60,
    tag: "Bulk friendly",
    specs: ["S to XXL", "DTF/vinyl style print", "Logo/text print", "Bulk pricing"],
    description:
      "Custom T-shirts for brands, teams, events, campaigns and small businesses."
  },
  {
    id: "enash-cap",
    name: "Custom Branded Cap",
    category: "Printed Clothing",
    price: 199,
    stock: 45,
    tag: "Brand merch",
    specs: ["Adjustable fit", "Logo print", "Team branding", "Bulk orders"],
    description:
      "Branded caps for staff, events, promotions and business merchandise."
  }
];

const serviceAddons = [
  { id: "setup", label: "Device setup and software installation", price: 499 },
  { id: "delivery", label: "Local delivery", price: 299 },
  { id: "branding-design", label: "Basic print/logo placement design", price: 350 },
  { id: "data-transfer", label: "Data transfer from old device", price: 599 }
];

function money(value) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(value);
}

function Shop() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("enashCart") || "[]");
  });
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [addons, setAddons] = useState([]);
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "Delivery",
    address: "",
    paymentMethod: "Request invoice",
    notes: ""
  });
  const [order, setOrder] = useState(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.specs.join(" ").toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const addonsTotal = useMemo(() => {
    return serviceAddons
      .filter((addon) => addons.includes(addon.id))
      .reduce((total, addon) => total + addon.price, 0);
  }, [addons]);

  const grandTotal = cartTotal + addonsTotal;

  function saveCart(nextCart) {
    setCart(nextCart);
    localStorage.setItem("enashCart", JSON.stringify(nextCart));
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      saveCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      );
      return;
    }

    saveCart([...cart, { ...product, quantity: 1 }]);
  }

  function updateQuantity(productId, quantity) {
    const nextQuantity = Number(quantity);

    if (nextQuantity < 1) return;

    saveCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(nextQuantity, item.stock) }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    saveCart(cart.filter((item) => item.id !== productId));
  }

  function toggleAddon(addonId) {
    setAddons((current) =>
      current.includes(addonId)
        ? current.filter((id) => id !== addonId)
        : [...current, addonId]
    );
  }

  function handleCheckoutChange(event) {
    const { name, value } = event.target;
    setCheckout((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderPayload = {
      reference: `ENASH-SHOP-${Date.now().toString().slice(-6)}`,
      customer: checkout,
      items: cart,
      addons: serviceAddons.filter((addon) => addons.includes(addon.id)),
      totals: {
        products: cartTotal,
        addons: addonsTotal,
        grandTotal
      },
      status: "Submitted",
      createdAt: new Date().toISOString()
    };

    try {
      const endpoint = import.meta.env.VITE_ORDER_ENDPOINT;

      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderPayload)
        });
      }

      const existingOrders = JSON.parse(localStorage.getItem("enashOrders") || "[]");
      localStorage.setItem(
        "enashOrders",
        JSON.stringify([orderPayload, ...existingOrders])
      );

      setOrder(orderPayload);
      saveCart([]);
      setAddons([]);
      setCheckout({
        name: "",
        email: "",
        phone: "",
        deliveryMethod: "Delivery",
        address: "",
        paymentMethod: "Request invoice",
        notes: ""
      });
    } catch (error) {
      console.error(error);
      alert("Order could not be submitted. Please try again.");
    }
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div>
          <p className="eyebrow">Enash Shop</p>
          <h1>Buy laptops, hardware, printers and custom branded clothing online.</h1>
          <p>
            A practical shop for real products: work laptops, desktop bundles,
            printer setups, SSD/RAM upgrades, Wi-Fi equipment, UPS backup power,
            printed hoodies, T-shirts and branded merchandise.
          </p>

          <div className="hero-actions">
            <a href="#products" className="primary-btn">
              Shop products
            </a>
            <a href="#checkout" className="secondary-btn">
              Checkout
            </a>
          </div>
        </div>

        <div className="shop-summary-card">
          <span>Cart summary</span>
          <h2>{money(grandTotal)}</h2>
          <p>
            {cart.length} product type{cart.length === 1 ? "" : "s"} selected
          </p>
          <a href="#checkout">Complete order</a>
        </div>
      </section>

      <section className="shop-controls" id="products">
        <div>
          <p className="eyebrow">Product catalogue</p>
          <h2>Real items people can actually buy</h2>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Search laptop, printer, hoodie, SSD..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-icon">
              {product.category === "Laptops" && "💻"}
              {product.category === "Desktop Bundles" && "🖥️"}
              {product.category === "Printers" && "🖨️"}
              {product.category === "Computer Hardware" && "🧩"}
              {product.category === "Networking" && "📡"}
              {product.category === "Power & Accessories" && "🔌"}
              {product.category === "Printed Clothing" && "👕"}
            </div>

            <div className="product-top">
              <span>{product.category}</span>
              <strong>{product.tag}</strong>
            </div>

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <ul className="spec-list">
              {product.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>

            <div className="product-bottom">
              <div>
                <strong>{money(product.price)}</strong>
                <small>{product.stock} available</small>
              </div>

              <button type="button" onClick={() => addToCart(product)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="cart-checkout" id="checkout">
        <div className="cart-panel">
          <p className="eyebrow">Your cart</p>
          <h2>Order summary</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{money(item.price)} each</p>
                  </div>

                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.id, event.target.value)
                    }
                  />

                  <strong>{money(item.price * item.quantity)}</strong>

                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}

          <div className="addons-box">
            <h3>Optional add-ons</h3>

            {serviceAddons.map((addon) => (
              <label key={addon.id}>
                <input
                  type="checkbox"
                  checked={addons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                />
                <span>{addon.label}</span>
                <strong>{money(addon.price)}</strong>
              </label>
            ))}
          </div>

          <div className="totals-box">
            <div>
              <span>Products</span>
              <strong>{money(cartTotal)}</strong>
            </div>
            <div>
              <span>Add-ons</span>
              <strong>{money(addonsTotal)}</strong>
            </div>
            <div className="grand-total">
              <span>Total</span>
              <strong>{money(grandTotal)}</strong>
            </div>
          </div>
        </div>

        <form className="checkout-form" onSubmit={submitOrder}>
          <p className="eyebrow">Checkout</p>
          <h2>Complete order without calling</h2>

          {order && (
            <div className="success-box">
              <strong>Order submitted.</strong>
              <p>
                Reference: <b>{order.reference}</b>
              </p>
            </div>
          )}

          <label>
            Full name
            <input
              required
              name="name"
              value={checkout.name}
              onChange={handleCheckoutChange}
              placeholder="Your full name"
            />
          </label>

          <label>
            Email address
            <input
              required
              type="email"
              name="email"
              value={checkout.email}
              onChange={handleCheckoutChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Phone number
            <input
              required
              name="phone"
              value={checkout.phone}
              onChange={handleCheckoutChange}
              placeholder="+27..."
            />
          </label>

          <label>
            Delivery method
            <select
              name="deliveryMethod"
              value={checkout.deliveryMethod}
              onChange={handleCheckoutChange}
            >
              <option>Delivery</option>
              <option>Pickup</option>
              <option>Courier quotation</option>
            </select>
          </label>

          <label>
            Payment option
            <select
              name="paymentMethod"
              value={checkout.paymentMethod}
              onChange={handleCheckoutChange}
            >
              <option>Request invoice</option>
              <option>EFT / bank transfer</option>
              <option>Card payment link</option>
              <option>Business purchase order</option>
            </select>
          </label>

          <label className="full-field">
            Delivery address / pickup notes
            <textarea
              required
              name="address"
              value={checkout.address}
              onChange={handleCheckoutChange}
              placeholder="Enter delivery address or pickup instructions"
            />
          </label>

          <label className="full-field">
            Extra notes
            <textarea
              name="notes"
              value={checkout.notes}
              onChange={handleCheckoutChange}
              placeholder="Example: hoodie sizes, logo colour, laptop setup requirements..."
            />
          </label>

          <button type="submit" className="primary-btn">
            Submit order
          </button>

          <p className="checkout-note">
            To make orders reach the business in production, set
            <code> VITE_ORDER_ENDPOINT </code>
            to your backend, Azure Function, CRM webhook or order API.
          </p>
        </form>
      </section>
    </main>
  );
}

export default Shop;