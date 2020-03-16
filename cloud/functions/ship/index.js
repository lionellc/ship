const app = require('wx-server-sdk');

const { addShip } = require('./addShip');
const { getShip } = require('./getShip');

app.init({
	envName: '************',
	mpAppId: '***********',
});

exports.main = async (event, context) => {
	const db = app.database();
	const { func, data } = event;
	let res;
	if (func === 'getShip') {
		res = await getShip(db, data);
	} else if (func === 'addShip') {
		res = await addShip(db, data);
	}
	return {
		data: res
	};
};
