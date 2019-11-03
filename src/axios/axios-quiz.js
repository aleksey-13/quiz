import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-7759d.firebaseio.com/'
});