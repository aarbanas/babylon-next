import Cookies from 'js-cookie';

const logout = () => {
  Cookies.remove('currentUser');
};

export default logout;
