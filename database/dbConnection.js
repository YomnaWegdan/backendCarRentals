
import { connect } from 'mongoose';

export const dbConnection = async () => await connect(process.env.DB_Online).then(()=>{
    console.log('database connected'); 
}).catch((err)=>{
    console.log({msg: 'database not connected', err});
});
