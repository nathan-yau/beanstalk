import axios from 'axios';

const checkSessionStatus = async (setIsLoggedIn: any) => {
    try {
      const response = await axios.get('/api/checkSession');
      setIsLoggedIn(response.data.data.category === "authorized-session"? true: false);
      return 'success';
    } catch (error) {
      // Handle error
      return 'failed';
    }
  };

export default checkSessionStatus;