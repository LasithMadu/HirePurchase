module.exports = {
    getData: function(request, response, dbconfg){
        var vehi = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."vehicalsTable" INNER JOIN public."customerTable" ON public."vehicalsTable"."cusNic" = public."customerTable".nic WHERE "vehiNo" = $1',[vehi], (err, table) => {
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

    saveData: function(request, response, dbconfg){
        var agreement = request.body.data;

        console.log(agreement)
        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('INSERT INTO public."agreementTable"("agreementNo", "createdDate", "expireDate", version, "veicalNo") VALUES ($1, $2, $3, $4, $5);',[...agreement], (err, table) => {
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