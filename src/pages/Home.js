import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db as firebaseDB } from "../firebase";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    firebaseDB.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      firebaseDB.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully");
        }
      });
    }
  };

  const filterData = (status) => {
    firebaseDB
      .child("contacts")
      .orderByChild("status")
      .equalTo(status)
      .on("value", (snapshot) => {
        if (snapshot.val) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });
  };

  const handleChange = (e) => {
    setSort(true);
    firebaseDB
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    firebaseDB.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].status}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="bttn btn-edit">Edit</button>
                    </Link>

                    <button
                      className="bttn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="bttn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td>{item.contact}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className="dropdown" name="sortValue" onChange={handleChange}>
        <option>Please Select Value</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
        <option value="status">Status</option>
      </select>
      <button className="bttn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <br />
      <label>Status:</label>
      <button className="bttn btn-active" onClick={() => filterData("Active")}>
        Active
      </button>
      <button
        className="bttn btn-inactive"
        onClick={() => filterData("Inactive")}
      >
        Inactive
      </button>
    </div>
  );
};

export default Home;
