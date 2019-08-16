const USER_KEY = "user";

const setItem = (user) => {
    localStorage.setItem(USER_KEY,JSON.stringify(user))
};

const getItem = () => {
    return JSON.parse(localStorage.getItem(USER_KEY));
};

const removeItem = () => {
      localStorage.removeItem(USER_KEY)
};

export {
    setItem,
    getItem,
    removeItem
}