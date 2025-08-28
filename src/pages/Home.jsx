import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home(){
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(()=>{
    axios.get("/services").then(r => setServices(r.data)).catch(console.error);
    axios.get("/products").then(r => setProducts(r.data)).catch(console.error);
    axios.get("/news").then(r => setNews(r.data)).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <header className="text-center my-6">
        <h1 className="text-3xl font-bold">Gram Seva</h1>
        <p className="text-gray-600">Essential products & services for rural communities</p>
      </header>

      <section className="my-6">
        <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {services.map(s => (
            <div key={s.id} className="p-4 border rounded text-center">
              <div className="text-3xl">{s.icon}</div>
              <div className="mt-2">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-6">
        <h2 className="text-2xl font-semibold mb-3">Available Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="p-3 border rounded">
              <div className="font-semibold">{p.name}</div>
              <div className="text-gray-600">₹{p.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-6">
        <h2 className="text-2xl font-semibold mb-3">News & Updates</h2>
        <ul className="list-disc ml-6">
          {news.map(n => <li key={n.id}>{n.title}</li>)}
        </ul>
      </section>

      <section className="my-6">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <div>
          <p>Address: Gram Seva Center, Village Road</p>
          <p>Helpline: +91 98765 43210</p>
          <a href="/contact" className="text-blue-600 underline">Send us a message</a>
        </div>
      </section>
    </div>
  );
}
