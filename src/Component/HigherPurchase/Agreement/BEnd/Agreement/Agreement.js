module.exports = {
    getData: function(request, response, dbconfg){
        var vehi = request.body.data;
        var agreeid, version, created, isRow = true;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."agreementData" WHERE "vehiNo" = $1 OR "agreeId" = $1 ORDER BY version DESC LIMIT 1',[vehi], (err, table) => {
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            if (table.rowCount == 0) {
                              isRow = false;
                            }else{
                              agreeid = table.rows[0].agreeId;
                              version = table.rows[0].version;
                              created = table.rows[0].created;
                            }
                            db.query('SELECT * FROM public."vehicalsTable" INNER JOIN public."customerTable" ON public."vehicalsTable"."cusNic" = public."customerTable".nic WHERE "vehiNo" = $1',[vehi], (err, table) => {
                                db.end();
                                if(err){
                                  console.log(err);
                                    response.json({msg: false, data: err})
                                }else{
                                    response.json({msg: true, agreeid: agreeid, version: version, created: created, isRow: isRow, table:table})
                                }
                            });
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    saveData: function(request, response, dbconfg){
        var data = request.body.agreementData;
        var vehiNo = request.body.vehiNo;
        var created = request.body.created;
        var nic = request.body.nic;
        var agreeid = request.body.agreementNo;
        var version = 0;

        console.log(agreeid);

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                  db.query('SELECT * FROM public."agreementData" WHERE "nic" = $1 AND "vehiNo" = $2 ORDER BY version DESC LIMIT 1',[nic, vehiNo], (err, table) => {
                      if(err){
                          console.log(err);
                          response.json({msg: false, data: err})
                      }else{
                          if (table.rowCount == 0) {
                            version++;
                             db.query('INSERT INTO public."agreementData"("agreeId", created, expire, version, name, nic, address, occupation, city, state, country, email, mobile, "vehiNo", chassis, "engineNo", capacity, modal, fuel, year, catital, paid, "totalM", "toPay", "Mrental", "rentalM", "make") VALUES '+
                                       '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)',
                                       [agreeid, created, '', version, data.title+" "+data.nameInitials, data.nic, data.address+" "+data.address_2, data.occupation, data.city, data.state, data.country, data.email, data.mobile, data.vehiNo, data.chassis, data.engineNo, data.capacity, data.modal, data.fuel, data.year, '', '', '', '', '', '', data.make]
                                       , (err, table) => {
                                 db.end();
                                 if(err){
                                    console.log(err);
                                    response.json({msg: false, data: err})
                                 }else{
                                    response.json({msg: true, table:table})
                                 }
                             });
                          }else{
                            version = table.rows[0].version;
                            db.query('INSERT INTO public."agreementData"("agreeId", created, expire, version, name, nic, address, occupation, city, state, country, email, mobile, "vehiNo", chassis, "engineNo", capacity, modal, fuel, year, catital, paid, "totalM", "toPay", "Mrental", "rentalM", "make") VALUES '+
                                      '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)',
                                      [agreeid, created, '', ++version, data.title+" "+data.nameInitials, data.nic, data.address+" "+data.address_2, data.occupation, data.city, data.state, data.country, data.email, data.mobile, data.vehiNo, data.chassis, data.engineNo, data.capacity, data.modal, data.fuel, data.year, '', '', '', '', '', '', data.make]
                                      , (err, table) => {
                                db.end();
                                if(err){
                                    console.log(err);
                                    response.json({msg: false, data: err})
                                }else{
                                    response.json({msg: true, table:table})
                                }
                            });
                          }
                      }
                  });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    getAgree: function(request, response, dbconfg){
        var nic = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."agreementData" INNER JOIN public."customerTable" ON public."agreementData"."nic" = public."customerTable"."nic" WHERE public."customerTable"."nic" = $1 ORDER BY version DESC',[nic], (err, table) => {
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            if (table.rowCount == 0) {
                                db.query('SELECT * FROM public."customerTable" WHERE "nic" = $1',[nic], (err, table) => {
                                    db.end();
                                    if(err){
                                      console.log(err);
                                        response.json({msg: false, data: err})
                                    }else{
                                        response.json({msg: true, table:table})
                                    }
                                });
                            }else{
                                response.json({msg: true, table:table})
                            }
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },
}
