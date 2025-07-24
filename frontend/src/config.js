const getApiUrl = () => {
    return process.env.NODE_ENV === 'development' //production
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_DEV_API_URL
}

export { getApiUrl }
