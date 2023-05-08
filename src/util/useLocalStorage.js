import React from 'react';

const useLocalStorage = (defaultValue, key) => {
    const [jwt, setJwt] = React.useState(() => {
        const val = window.localStorage.getItem(key)

        return val !== null ? JSON.parse(val) : defaultValue
    })

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(jwt))
    },[key, jwt])

    return [jwt, setJwt]
};

export default useLocalStorage;