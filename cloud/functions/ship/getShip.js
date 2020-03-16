async function getShip1(db, data) {
	const _ = db.command;
	const collection = db.collection('ship');

	const { openid, _id, shipNumber } = data;
	let ships = [];

	if (_id) {
		ships = await collection
			.where({
				openid: _.eq(openid),
				_id: _.eq(_id),
			})
			.get();
	} else if (shipNumber) {
		ships = await collection
			.where({
				openid: _.eq(openid),
				// shipNumber: _.eq(shipNumber),
				shipNumber: db.RegExp({
					regexp: shipNumber,
					options: 'i',
				})
			})
			.get();
	}
	return ships;
}

exports.getShip = getShip1;
