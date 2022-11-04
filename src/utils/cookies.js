const userKey = "userinfo";
const cookies = {
    setUser(userInfo){
        console.log("setCookies");
        document.cookie=userKey+"=" + JSON.stringify(userInfo);
    },

    getUser(){
        let strCookies = document.cookie;
        let listCookies = strCookies.split(";");
        
        for(let i of listCookies) {
            
            const lengthName = (userKey+"=").length
            const key = i.slice(0, lengthName)
            console.log(key, userKey+"=");
            if (key === (userKey+"=")) {
                
                const value = i.slice(lengthName, i.length)
                console.log(JSON.parse(value));
                return JSON.parse(value);
            }
        }
        return null;
    },
    deleteUser(){
        document.cookie = userKey+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        return true;
    }

}
export default cookies;