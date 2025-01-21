import { use } from 'react';

interface User {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const fetchUsers = fetch('https://jsonplaceholder.typicode.com/users', { mode: 'no-cors' })
  .then((res) => res.json())
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

export const Use = () => {
  const users = use<User[]>(fetchUsers);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
