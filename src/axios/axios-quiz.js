import axios from 'axios';

export default axios.create({
    baseURL: 'https://quiz-creator-59bfd.firebaseio.com/'
});
