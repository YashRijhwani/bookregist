import axios from 'axios';
const instance = axios.create();


const useDB = () => {
    const loginDB = async (email) => {
        const { data, status } = await instance.get(`/api/v1/login/${email}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const signupDB = async ({ email, name }) => {
        const { data, status } = await instance.post(`/api/v1/signup/${email}/${name}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const setHomebookDB = async ({ email, id }) => {
        const { data, status } = await instance.post(`/api/v1/sethomebook/${email}/${id}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const removeHomebookDB = async (email) => {
        const { data, status } = await instance.post(`/api/v1/removehomebook/${email}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const getbookDB = async ({ email, id }) => {
        const { data, status } = await instance.get(`/api/v1/getbook/${email}/${id}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const ratebookDB = async ({ email, id, rating }) => {
        const { data, status } = await instance.post(`/api/v1/ratebook/${email}/${id}/${rating}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const updatepageDB = async ({ email, id, page }) => {
        const { data, status } = await instance.post(`/api/v1/updatepage/${email}/${id}/${page}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const updatereviewDB = async ({ email, id, review }) => {
        const { data, status } = await instance.post(`/api/v1/updatereview/${email}/${id}/${review}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const deletereviewDB = async ({ email, id }) => {
        const { data, status } = await instance.post(`/api/v1/deletereview/${email}/${id}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const updatenotesDB = async ({ email, id, notes }) => {
        const { data, status } = await instance.post(`/api/v1/updatenotes/${email}/${id}/${JSON.stringify(notes)}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const renameDB = async ({ email, name }) => {
        const { data, status } = await instance.post(`/api/v1/rename/${email}/${name}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }

    const cleardataDB = async ({ email }) => {
        const { data, status } = await instance.post(`/api/v1/cleardata/${email}`).catch((err) => {
            return ({ status: (err.response) ? err.response.status : "", data: err.response })
        });
        return ({ data, status })
    }



    return { loginDB, signupDB, setHomebookDB, getbookDB, removeHomebookDB, ratebookDB, updatepageDB, updatereviewDB, deletereviewDB, updatenotesDB, renameDB, cleardataDB }
}


export default useDB;