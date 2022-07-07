var Crawler = require("crawler");

function getDlLink(link: string){
    var childC = new Crawler({
        maxConnections : 10,
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                console.log($("title").text());
                
                // get Name
                const $artList = $("div.products").children("div.product-grid-item");
    
                console.log($artList.html());
                let artInfoList = [];
                $artList.each(function(i, elem){
    
                    
    
                    artInfoList[i] = {
                        id: $(this).find("div.product-element-top").attr('data-id'),
                        url: $(this).find("div.product-element-bottom h3.product-title a").attr('href'),
                        image_url: $(this).find("div.product-element-top img").attr('src'),
                        author: $(this)
                        .find("div.product-element-bottom div.woodmart-product-brands-links")
                        .text(),
                        category: $(this).find("div.product-element-bottom div.woodmart-product-cats a").text(),
                    }
                })
    
                console.log(artInfoList);
    
                return 
            }
            done();
        }
    });
}

 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            
            // get Name
            const $artList = $("div.products").children("div.product-grid-item");

            //console.log($artList.html());
            let artInfoList = [];
            $artList.each(function(i, elem){
                artInfoList[i] = {
                    id: $(this).find("div.product-element-top").attr('data-id'),
                    url: $(this).find("div.product-element-bottom h3.product-title a").attr('href'),
                    image_url: $(this).find("div.product-element-top img").attr('src'),
                    author: $(this)
                    .find("div.product-element-bottom div.woodmart-product-brands-links")
                    .text(),
                    category: $(this).find("div.product-element-bottom div.woodmart-product-cats a").text(),
                    dl_sk: JSON.parse($(this).find("div.product-element-top").attr('data-sk')),
                }
            })

            //https://mdl.artvee.com/sdl/${sk}sdl.jpg
            let dlLink = `https://mdl.artvee.com/sdl/${artInfoList[0].dl_sk["sk"]}sdl.jpg`
            console.log(dlLink);
            console.log(artInfoList);
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue('http://www.artvee.com');
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);
//console.log("test");

