const getApiUrl = () => {
    return process.env.NODE_ENV === 'production' //development
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_DEV_API_URL
}

export { getApiUrl }
