import Axios from 'axios';
import { addErrorCatching } from './axiosInterceptors';

const glovoClient = Axios.create({
  baseURL: `/api/`,
});

export default addErrorCatching(glovoClient);

