
import request from 'request';
import cheerio from 'cheerio';

async function crawlEndpoint(req, res) {
    const body = req.body;
    if(!body.url || !body.max_depth || !body.max_pages) return res.json({error:'missing parameters'});
    const {nodes, error} = await crawl(body.url  , body.max_depth, body.max_pages);
    res.json({nodes, error});
}
async function crawl(url, max_depth, max_pages) {
    let firstWebpage = await getWebpageUrls(url);
    if(!firstWebpage || firstWebpage.error) return {error: firstWebpage.error? firstWebpage.error.message :' unable to reach url'};
    let nodes = {[url]: firstWebpage};
    let listToScrap = [url];
    nodes[url].depth = 1;
    let visitedPages = 1;
    while (listToScrap.length > 0 && visitedPages < max_pages) {
        const nodeKey = listToScrap.shift();
        if(nodes[nodeKey].depth >= max_depth) break;
        for (let i in nodes[nodeKey].links){
            if(visitedPages >= max_pages) {
                break;
            }
            const childKey = nodes[nodeKey].links[i];
            if (!nodes[childKey]) {
                const childData = await getWebpageUrls(childKey);
                if(!childData || childData.error) continue;
                nodes[childKey] = childData;
                nodes[childKey].depth = nodes[nodeKey].depth +1;
                listToScrap.push(childKey);
                visitedPages +=1;
            }
        }
    };
    return {nodes}
}

async function getWebpageUrls(url){
        const {error, response, body} = await getWebpage(url);
        if(error == null && response.statusCode === 200  ) {
            const $ = cheerio.load(body);
            const data = {
                links: scrapPageUrls(url, $), 
                title: scrapPageTitle(url, $),
                url, 
            }
            return data;
        }
        return {error};
}

function getWebpage(pageUrl){
    if (!pageUrl) return null;
    return new Promise(resolve=>{
        const url =  pageUrl[pageUrl.length-1] ==='/' ? pageUrl: pageUrl+='/';
        request(url, (error, response, body)=> resolve ({error, response, body}));
    });
}

function scrapPageTitle(url, $){
    return $('head > title').text();
}

function scrapPageUrls(url, $){
    const links = [];
    const relativeLinks = $("a[href^='/']");
    relativeLinks.each(function() {
        links.push(url.substring(0, url.length-1) + $(this).attr('href'));
    });
    
    const absoluteLinks = $(`a[href^='${url}']`);
    absoluteLinks.each(function() {
        links.push($(this).attr('href'));
    });
    return links;
}

export default crawlEndpoint;