// pbkdf2 create key by password
function pbkdf2go(psw, then_cb) {
	var mypbkdf2 = new PBKDF2(psw, "ejsoonsalt", 173, 16);
	var status_callback = function(percent_done) {};
	var result_callback = function(key) {
		//conver to array[int]
		var akey = [];
		for (var ki = 0; ki < 32; ki += 2) {
			akey.push(parseInt(key.substr(ki, 2), 16));
		}
		then_cb(akey);
	};
	mypbkdf2.deriveKey(status_callback, result_callback);
}

// encrypto
function ctrengo(key, text) {
	// Convert text to bytes
	var textBytes = aesjs.utils.utf8.toBytes(text);
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(3));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	return encryptedHex;
}

// decrypto
function ctrdego(key, encryptedHex) {
	// When ready to decrypt the hex string, convert it back to bytes
	var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
	var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(3));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	return decryptedText;
}

// decrypt bbcode
function art_decrypt(thus) {
	// handle encrypted text and password
	var distxthd = thus.nextElementSibling.nextElementSibling.nextElementSibling;
	var entxthd = thus.previousElementSibling;
	var pwhd = thus.nextElementSibling;
	// encrypto or decrypto
	var decrypt_display = function(akey) {
		distxthd.innerHTML = ctrdego(akey, entxthd.value);
	}
	pbkdf2go(pwhd.value, decrypt_display);
}
