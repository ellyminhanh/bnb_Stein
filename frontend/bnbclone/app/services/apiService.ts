import { error } from "console";
import { getAcessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any>{
        // console.log('get', url); 

        const token = await getAcessToken();
        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    
                    
                    const { access, refresh, ...rest } = json;  // Exclude sensitive fields (e.g., tokens)
                    // console.log('Response without sensitive data:', rest);
                    

                    resolve(json);
                })
                .catch((error =>{
                    reject(error);
                }))
        } )

    },

    post: async function(url: string, data:any): Promise<any> {
        // console.log('post', url);

        const token = await getAcessToken();

        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST', 
                headers: {'Authorization': `Bearer ${token}`},
                body: data,
                
            })
                    .then(response => response.json())
                    .then((json) => {
                        const { access, refresh, ...rest } = json;  // Exclude sensitive fields (e.g., tokens)
                        console.log('Response without sensitive data:', rest);
                        
                        resolve(json);
                    })
                    .catch((error =>{
                        reject(error);
                    }))
        })
    },

    postWithoutToken: async function(url: string, data:any): Promise<any> {
        // console.log('post', url);

        

        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: data,
                
            })
                    .then(response => response.json())
                    .then((json) => {
                        const { access, refresh, ...rest } = json;  // Exclude sensitive fields (e.g., tokens)
                        console.log('Response without sensitive data:', rest);
                        
                        resolve(json);
                    })
                    .catch((error =>{
                        reject(error);
                    }))
        })
    }

}

export default apiService;