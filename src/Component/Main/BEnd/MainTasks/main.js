module.exports={
    signin: function(request, response, dbconfg){
        let values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return response.json({msg: false, data: err})
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
    },

    getTime: function() {

        var date = new Date();
    
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
    
        var year = date.getFullYear();
    
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    
    }
}