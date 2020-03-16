async function getUser1(db, _openid) {
	const _ = db.command;
	const collection = db.collection('user');
	const user = await collection.where({
		_openid: _.eq(_openid),
	}).get();

	return user;
}

exports.getUser = getUser1;
