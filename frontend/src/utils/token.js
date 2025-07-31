export const getTokens = () => {
    const access = localStorage.getItem("access-token")
    const refresh = localStorage.getItem("refresh-token")

    return [access, refresh]
}

export const setTokens = ({access, refresh}) => {
    localStorage.setItem("access-token", access)
    localStorage.setItem("refresh-token", refresh)
}
