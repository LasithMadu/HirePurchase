module.exports={
    signin: function(request, response, dbconfg){
        let values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }
            else{
                db.query('SELECT * FROM public."usersTable" WHERE "userName" = $1 AND "password" = $2',[...values], (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }
                    else{
                        response.json({msg: true, table:table});
                    }
                });
            }
        })
    },

    companyList: function(request, response, dbconfg){
        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }
            else{
                db.query('SELECT "companyName" FROM public."themeTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }
                    else{
                        var company = [];
                        for(var i=0; i<table.rows.length; i++){
                            company[i] = table.rows[i].companyName;
                        }
                        response.json({msg: true, table:company});
                    }
                });
            }
        })
    }
}