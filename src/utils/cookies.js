const userKey = "userinfo";
const cookies = {
    setUser(userInfo){
        document.cookie=userKey+"=" + JSON.stringify(userInfo);
    },

    getUser(){
        let strCookies = document.cookie;
        let listCookies = strCookies.split(";");
        
        for(let i of listCookies) {
            
            const lengthName = (userKey+"=").length
            const key = i.slice(0, lengthName)
            if (key === (userKey+"=")) {
                const value = i.slice(lengthName, i.length)
                return JSON.parse(value);
            }
        }
        return null;
    },
    deleteUser(){
        document.cookie = userKey+"= ; expires=Thu, expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/";
        return true;
    }

}
export default cookies;