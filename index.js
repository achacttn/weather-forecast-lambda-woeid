const https = require('https');

exports.handler = async (event, context, callback) => {

    let { queryStringParameters: { woeid } } = event;

    let dataString = '';
    const response = await new Promise((resolve, reject) => {
        const req = https.get(`https://www.metaweather.com/api/location/${woeid}`, function (res) {
            res.on('data', chunk => dataString += chunk);
            res.on('end', () => {
                resolve({ statusCode: 200, body: dataString, });
            });
        });
        req.on('error', e => {
            reject({
                statusCode: 500,
                body: 'Something wrong',
            });
        });
    });
    return response;

};
