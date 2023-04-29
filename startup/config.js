const config = require('config');
const { transport } = require('winston')



module.exports = function(){
if (!config.get('jwtPrivateKey')) {
    throw new Error('JIDDIY XATO:virtualdars_jwtPrivateKey muhit uzgaruvchisi aniqlanmadi')

}}