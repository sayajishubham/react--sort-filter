import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [page, setpage] = useState(1);
  const [filter, setfilter] = useState("");
  const [search, setsearch] = useState("");
  const [sort, setsort] = useState(null);

  const fetchInfo = () => {
    axios
      .get(`http://localhost:3000/product`, {
        params: {
          _page: page,
          _limit: "5",
          category: filter || undefined,
          q: search || undefined,
          ...(sort && { _sort: "price", _order: sort }),
        },
      })
      .then((response) => setDetail(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInfo();
  }, [page, filter, search, sort]);

  const handleDelete = (id, e) => {
    e.stopPropagation();

    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then(() => {
        alert("Product successfully deleted.");
        setDetail((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Show Product</h1>
      {/* filter dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <select
          style={{
            width: "200px",
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "#333",
          }}
          value={filter}
          onChange={(e) => setfilter(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewellery</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <input
          type="text"
          placeholder="search"
          style={{ padding: "10px 20px" }}
          onChange={(e) => setsearch(e.target.value)}
        />

        {/* Sort Dropdown */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setsort("asc")}>Price: Low to High</button>
          <button onClick={() => setsort("desc")}>Price: High to Low</button>
        </div>
      </div>

      <div
        className="card-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {detail.map((el) => (
          <div
            key={el.id}
            className="card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              backgroundColor: "#fff",
            }}
          >
            {/* Description Link */}
            <Link
              to={`/Description/${el.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <img
                className="card-image"
                src={el.image}
                alt={el.title}
                height={250}
                width={250}
              />
              <h2>{el.id}</h2>
              <div className="card-content">
                <h2 className="card-title">{el.title}</h2>
                <p className="card-description">{el.description}</p>
                <h3 className="card-category">{el.category}</h3>
                <h4 className="card-price">{el.price}</h4>
              </div>
            </Link>

            <div style={{ padding: "10px", textAlign: "center" }}>
              <button
                onClick={(e) => handleDelete(el.id, e)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Next & Previous button */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button onClick={() => setpage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setpage(page + 1)} disabled={page === 4}>
          Next
        </button>
      </div>
    </>
  );
};

export default Product;
