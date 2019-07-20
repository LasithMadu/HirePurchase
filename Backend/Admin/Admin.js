module.exports={
    createUser: function(request, response, dbconfg){
        let values = request.body.data;
        let theme = [values[0], values[7], '', '#3a3a3a'];
        var alert,tableData;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }
            else{
                try{
                    db.query('SELECT * FROM public."usersTable" WHERE "nic" = $1',[values[6]], (err, table) => {
                        done();
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            if(table.rowCount === 0){
                                db.query('INSERT INTO public."usersTable"("userId", "firstName", "lastName", "userName", password, email, nic, company, address, city, state, zip, "userLevel") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',[...values], (err, table) => {
                                    done();
                                    if(err){
                                        users = false;
                                        alert = 'User Registered Fail';
                                    }
                                    else{
                                        users = true;
                                        alert = 'User Registered';
                                        tableData = table;
                                    }
                                });
                            }else{
                                alert = 'User Already Registered';
                                users = true;
                                tableData = table;
                            }
                        } 
                    });
                    db.query('SELECT * FROM public."themeTable" WHERE "companyName" = $1',[values[7]], (err, table) => {
                        done();
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            if(table.rowCount === 0){
                                console.log('Company is not registered')
                                db.query('INSERT INTO public."themeTable"(id, "companyName", logo, color) VALUES ($1, $2, $3, $4)',[...theme], (err, table) => {
                                    done();
                                    if(err){
                                        alert = 'User Registered Fail';
                                        response.json({msg: false, data: err});
                                    }
                                    else{
                                        alert = 'User Registered';
                                        response.json({msg: true, table:tableData});
                                    }
                                });
                            }else{
                                response.json({msg: true, alert: alert, table:tableData});
                            }
                        } 
                    });
                }catch(Exception){
                    console.log('Error')
                }
            }
        })
    }
}