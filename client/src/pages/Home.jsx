import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import { toast } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setdata] = useState([]);

  const loadData = async () => {
    const responce = await axios.get("http://localhost:3001/api/v3/app/events");
    setdata(responce.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteEvent = (id) => {
    if (window.confirm("Do you want to delete Event?")) {
      axios.delete(`http://localhost:3001/api/v3/app/events/${id}`);
      toast.success("Event Deleted");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addEvent">
        <button className="btn btn-contact">Add Event</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Tagline</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "center" }}>Moderator</th>
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>Sub Category</th>
            <th style={{ textAlign: "center" }}>Photo</th>
            <th style={{ textAlign: "center" }}>Schedule</th>
            <th style={{ textAlign: "center" }}>Rigor rank</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.tagline}</td>
                <td>{item.description}</td>
                <td>{item.moderator}</td>
                <td>{item.category}</td>
                <td>{item.sub_category}</td>
                <td>{item.photo}</td>
                <td>{item.schedule}</td>
                <td>{item.rigor_rank}</td>

                <td className="button-container">
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteEvent(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
