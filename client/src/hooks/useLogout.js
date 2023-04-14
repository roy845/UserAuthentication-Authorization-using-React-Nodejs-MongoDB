import axios from "../api/axios";


const useLogout = () => {

    const logout = async () => {
        
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout