import { useEffect, useState, useContext } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function Main() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  console.log(todos);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  console.log(time);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);
  console.log(data);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('Add');

    const obj = {
      title: title,
      description: description,
      date: date,
      time: time,
      phoneNum: phoneNum,
      email: email,
    };

    try {
      const response = await fetch(
        'https://backend-six-puce.vercel.app/booking',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        }
      );

      if (!response.ok) {
        // Handle server error or unexpected status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setData((prevData) => [...prevData, data]);
    } catch (error) {
      console.error(error.message);
    }

    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setEmail('');
    setShow(false);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  console.log(title);

  const handleDelete = async (index) => {
    const id = data[index].id;
    console.log(id);

    try {
      const response = await fetch(
        `https://backend-six-puce.vercel.app/booking/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        data.splice(index, 1);
        setData(data);
      } else {
        console.error(`Error: ${response.status}`);
      }

      // const data = response.json();
      // console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      // console.log('Get data');
      const response = await fetch(
        'https://backend-six-puce.vercel.app/bookings'
      );
      const data = await response.json();
      // console.log(data);
      setData(data);
    };
    getData();
  }, []);

  const navToEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const { user } = useContext(AuthContext);
  console.log(user);

  const auth = getAuth;

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="container">
      <Button onClick={handleLogout}>Log out</Button>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>

        {/* <button onClick={getData}>Get data</button> */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                value={title}
                onChange={handleTitle}
              >
                <Form.Label>Title</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={1} />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="name@example.com"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  value={phoneNum}
                  onChange={(e) => {
                    setPhoneNum(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>*</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>user_id</th>
              <th></th>
            </tr>
          </thead>
          {data.map((booking, index) => {
            return (
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td>{booking.title}</td>
                  <td>{booking.description}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.phoneNum}</td>
                  <td>{booking.email}</td>
                  <td></td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                    <button onClick={() => navToEdit(booking.id)}>Edit</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </div>
  );
}
