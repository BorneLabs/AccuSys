import { useCallback, useMemo } from 'react';
import axios from 'axios';
import { decryptData } from '../utils/authUtils';
const useAxios = () => {
  
  const baseURL = 'http://localhost:5000';
  const fetchData = useCallback(async (url, method = 'GET', data = null, config = {}) => {
    
    
      const encryptedSession = localStorage.getItem('accesstoken');
      const token = decryptData(encryptedSession);
      const headers = {
        ...config.headers,
        ...(config.useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      };
      console.log(`${baseURL}${url}`)
      const response = await axios({
        method,
        url: `${baseURL}${url}`,
        data,
        headers,
        ...config,
      });
      
      return response.data;
    
  }, [baseURL]);

  const get = useMemo(() => (url, config = {}) => fetchData(url, 'GET', null, config), [fetchData]);
  const post = useMemo(() => (url, data, config = {}) => fetchData(url, 'POST', data, config), [fetchData]);
  const patch = useMemo(() => (url, data, config = {}) => fetchData(url, 'PATCH', data, config), [fetchData]);
  const del = useMemo(() => (url,data, config = {}) => fetchData(url, 'DELETE', data, config), [fetchData]);
  const put = useMemo(() => (url, data, config = {}) => fetchData(url, 'PUT', data, config), [fetchData]);

  return { get, post, patch, del,put };
};

export default useAxios;