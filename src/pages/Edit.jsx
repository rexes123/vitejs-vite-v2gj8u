import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const [editItem, setEditItem] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    phone_number: '',
    email: '',
  });
  console.log(editItem);

  const { id } = useParams();
  console.log(id);

  // {
  //   title: 'title',
  //   description: 'description',
  //   date: '5/8/2024',
  //   time: '2.21pm',
  //   phoneNum: '0168767633',
  //   email: 'chinhong1@gmail.com'
  // }

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [date, setDate] = useState('');
  // const [time, setTime] = useState('');
  // const [phoneNum, setPhoneNum] = useState('');
  // const [email, setEmail] = useState('');

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          `https://backend-six-puce.vercel.app/booking/${id}`
        );
        const data = await response.json();
        setEditItem(data[0]);
        console.log(editItem);
      } catch (error) {
        console.error(error.message);
      }
    };
    data();
    // Fetch data whenever `id` changes
  }, [id]);

  // data();

  const handleTitle = (e) => {
    setEditItem({
      ...editItem,
      title: e.target.value,
    });
  };

  const handleDescription = (e) => {
    setEditItem({
      ...editItem,
      // {
      //   title: 'title',
      //   description: 'description',
      //   date: '5/8/2024',
      //   time: '2.21pm',
      //   phoneNum: '0168767633',
      //   email: 'chinhong1@gmail.com'
      //
      // description: e.target.value
      // }
      description: e.target.value,
    });
  };

  const handleDate = (e) => {
    setEditItem({
      ...editItem,
      date: e.target.value,
    });
  };

  const handleTime = (e) => {
    setEditItem({
      ...editItem,
      time: e.target.value,
    });
  };

  const handlePhoneNum = (e) => {
    setEditItem({
      ...editItem,
      phone_number: e.target.value,
    });
  };

  const handleEmail = (e) => {
    setEditItem({
      ...editItem,
      email: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://backend-six-puce.vercel.app/booking/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editItem),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEditItem(data);
        alert('Update successfully');
      } else {
        console.log('response is not ok', response.status);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={editItem.title}
            onChange={handleTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={editItem.description}
            onChange={handleDescription}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Date</Form.Label>
          {/* const [editItem, setEditItem] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    phoneNum: '',
    email: '',
  }); */}
          <Form.Control
            type="date"
            value={editItem.date}
            onChange={handleDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="name@example.com"
            value={editItem.time}
            onChange={handleTime}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={editItem.phone_number}
            onChange={handlePhoneNum}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={editItem.email}
            onChange={handleEmail}
          />
        </Form.Group>

        <button type="submit">Update</button>
      </Form>
    </div>
  );
}
