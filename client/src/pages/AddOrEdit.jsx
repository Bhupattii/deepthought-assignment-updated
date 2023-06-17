import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./AddOrEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  tagline: "",
  description: "",
  moderator: "",
  category: "",
  sub_category: "",
  schedule: "",
  rigor_rank: "",
};

const AddOrEdit = () => {
  const [state, setState] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const {
    name,
    tagline,
    description,
    moderator,
    category,
    sub_category,
    schedule,
    rigor_rank,
  } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`http://localhost:3001/api/v3/app/events/${id}`)
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !tagline ||
      !description ||
      !moderator ||
      !category ||
      !sub_category ||
      !schedule ||
      !rigor_rank
    ) {
      toast.error("Please fill all the fields");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("tagline", tagline);
      formData.append("description", description);
      formData.append("moderator", moderator);
      formData.append("category", category);
      formData.append("sub_category", sub_category);
      formData.append("photo", photo);
      formData.append("schedule", schedule);
      formData.append("rigor_rank", rigor_rank);

      if (id !== undefined) {
        axios
          .patch(`http://localhost:3001/api/v3/app/events/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setState(initialState);
            setPhoto(null);
            toast.success("Event Updated successfully");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios
          .post("http://localhost:3001/api/v3/app/events", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setState(initialState);
            setPhoto(null);
            toast.success("Event added successfully");
          })

          .catch((err) => toast.error(err.response.data));
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setPhoto(files[0]);
    } else {
      setState({ ...state, [name]: value });
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Event name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="tagline">Tagline</label>
        <input
          type="text"
          id="tagline"
          name="tagline"
          placeholder="Enter tagline of the event"
          value={tagline || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter event description"
          value={description || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="moderator">Moderator</label>
        <input
          type="text"
          id="moderator"
          name="moderator"
          placeholder="Enter event moderator"
          value={moderator || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter event category"
          value={category || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="sub_category">Sub Category</label>
        <input
          type="text"
          id="sub_category"
          name="sub_category"
          placeholder="Enter event sub category"
          value={sub_category || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleInputChange}
        />
        <label htmlFor="schedule">Schedule</label>
        <input
          type="datetime-local"
          id="schedule"
          name="schedule"
          placeholder="Enter event date"
          value={schedule || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="rigor_rank">Rigor Rank</label>
        <input
          type="number"
          id="rigor_rank"
          name="rigor_rank"
          placeholder="Enter number"
          value={rigor_rank || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddOrEdit;
