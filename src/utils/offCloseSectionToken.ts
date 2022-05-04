import axios from "axios";


export const offCloseSectionToken = () => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    return window.location.href = '/login';
}

