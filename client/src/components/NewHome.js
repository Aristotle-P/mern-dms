import React from 'react';
// import axios from 'axios';
import { useUsersQuery } from '../generated/graphql.tsx';

const NewHome = () => {
  // const getUsers = async () => {
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:5000/graphql',
  //       {
  //         query: `{
  //           users {
  //             id
  //             name
  //           }
  //         }`,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(res.data.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleClick = () => {
  //   getUsers();
  // };

  const { data, loading } = useUsersQuery();

  console.log(data);

  return (
    <div>
      <div>hello</div>
    </div>
  );
};

export default NewHome;
