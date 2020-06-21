import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const refreshToken = async (setUser) => {
  const res = await axios.post(
    'http://localhost:5000/refresh-token',
    {},
    {
      withCredentials: true,
    }
  );
  setUser({ accessToken: res.data.accessToken });
};

export const checkToken = (user, setUser) => {
  const token = user.accessToken;

  if (!token) {
    return refreshToken(setUser);
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return refreshToken(setUser);
    } else {
      return false;
    }
  } catch (err) {
    console.log('jwt could not be decoded');
    return console.error(err);
  }
};
