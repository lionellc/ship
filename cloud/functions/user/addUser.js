async function addUser1(db, userInfo) {
	const collection = db.collection('user');
	const _ = db.command;
	let uesr = {}
	try {
		user = await collection.doc(userInfo._id).get();
	} catch (e) {
		user = collection.add({
			data: {
				...userInfo
			}
		})
	}
	return user;
}

exports.addUser = addUser1;
