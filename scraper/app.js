const scraper = require('html-metadata-parser');
const cheerio = require('cheerio');

exports.handler = function (event, context, callback) {

    performScraping().then((data)=>{
        let result = {};

        if(data.meta){
            result.title = data.meta.title;
            result.description = data.meta.description;
        }
        result.images = data.images || [];
        result.og = data.og || null;
        result.status = true;
        //console.log(result);
        callback(null, result);
    }).catch((err)=>{
        //console.log(err);
        callback({error:err,status:false},null);
    });

    function performScraping() {
        console.log('Scraper : Request started...');
        var promise = new Promise(function (resolve, reject) {

            scraper.parser(event.url, function (err, result) {
    
                if(err){
                    console.log('Scraper : Error ocurred during retriving data');
                    
                    //Ideally this should return but in our case we do some custom manupulation in order to retrive expected data
                    //reject({errorCode:'501',message:"Something went wrong", error:err});

                    //This is custom patch, Since above URL returning 404
                    console.log('Scraper : Performing custome operation');
                    if(err.response && err.response.data){
                        //console.log(err.response.data);

                        const $ = cheerio.load(err.response.data);
                        let meta = getMeta($);
                        resolve(meta);
                    }
                    else
                        reject({errorCode:'501',message:"Something went wrong", error:err.error});
                }
                else{
                    console.log('Scraper : Request completed');
                    resolve(result);
                }
            });
        });
        return promise;
    }

    function getMeta(obj){
        return {   
                meta : {title:obj('title').text(), description:obj('description').text()},
                images : getImages(obj('img'))
            };
        
    }

    function getImages(obj){
        let img =[];
        for (let index = 0; index < obj.length; index++) {
            if(obj[index].attribs.src)
            img.push(obj[index].attribs.src)
        }
        return img;
    }

};