
import { Sequelize } from "sequelize";

export const sequelize= new Sequelize('blog_app','root','root',{
    host:'localhost',
    dialect:'mysql'
})

export const chechkConnectionDB =async()=>{
 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

export const checkSyncDB =async()=>{
 sequelize.sync({alter: false ,force: false }).then(() => {
    console.log('Database synced successfully.');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });
}
  export default sequelize