import axios from 'axios';

const checkSessionStatus = async (setIsLoggedIn: any, setUserData: any) => {
    try {
      const response = await axios.get('/api/checkSession');
      setUserData(response.data.data.userInfo)
      setIsLoggedIn(response.data.data.category === "authorized-session"? true: false);
      return 'success';
    } catch (error) {
      // Handle error
      return 'failed';
    }
  };

export default checkSessionStatus;