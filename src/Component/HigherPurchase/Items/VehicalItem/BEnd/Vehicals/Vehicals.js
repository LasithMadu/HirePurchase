var main = require('../../../../../Main/BEnd/MainTasks/main');

module.exports={
    saveVehicals: function(request, response, dbconfg){
        var nic = request.body.nic;
        var vehicals = request.body.vehiData;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('INSERT INTO public."vehicalsTable"( id, "vehiNo", chassis, "engineNo", capacity, make, modal, fuel, year, "cusNic", "logTime") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',[...vehicals, nic, main.getTime()], (err, table) => {
                        db.end();
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        } 
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    getVehicals: function(request, response, dbconfg){
        var data;
        var cusNames = [];

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."vehicalsTable"', (err, table) => {
                        db.end();
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    });
                }catch(err){
                    console.log(err)
                }
                
                
            }
        });
    }
}