async function addShip1(db, shipInfo) {
	const collection = db.collection('ship');

	if (shipInfo._id) {
		const _id = shipInfo._id;
		delete shipInfo._id;
		const shipData = await collection.doc(_id).set({
			data: {
				...shipInfo,
			},
		});
		return {
			shipData,
		};
	} else {
		const shipData = await collection.add({
			data: {
				...shipInfo,
			},
		});
		return {
			shipData,
		};
	}

	return {};
}

exports.addShip = addShip1;
