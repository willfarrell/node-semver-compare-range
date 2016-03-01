var semver = require('semver');

function single_vs_range(a,b,bValidRange) {
	if (semver.gtr(a, b)) {
		return 1;
	} else if (semver.ltr(a, b)) {
		return -1
	}

	var brange = bValidRange.replace(/[<>=]/g,'').split(' ');
	var bmin = brange[0];
	if (semver.eq(a,bmin)) {
		return -1;
	}
	return 1;
}

module.exports = function (a, b) {
	var arange,amin,amax,aIsHyphenRange,aValid,aValidRange;
	var brange,bmin,bmax,bIsHyphenRange,bValid,bValidRange;

	if (aValid = semver.valid(a)) {
		if (bValid = semver.valid(b)) {
			return semver.compare(a, b);
		} else if (bValidRange = semver.validRange(b)) {
			if (bValidRange === '*') {
				return 1;	// make b first
			}
			return single_vs_range(a,b,bValidRange);
		} else {
			//console.log('invalid param b', b);
		}
	} else if (aValidRange = semver.validRange(a)) {
		if (aValidRange === '*') {
			return -1;	// make a first
		} else if (bValid = semver.valid(b)) {
			return -1*single_vs_range(b,a,aValidRange);
		} else if (bValidRange = semver.validRange(b)) {
			bValidRange = semver.validRange(b);
			arange = aValidRange.replace(/[<>=]/g,'').split(' ');
			amin = arange[0];
			amax = arange[1];

			brange = bValidRange.replace(/[<>=]/g,'').split(' ');
			bmin = brange[0];
			bmax = brange[1];

			if (semver.gt(amin,bmin)) {
				return 1;
			} else if (semver.lt(amin,bmin)) {
				return -1;
			}

			if (semver.gt(amax,bmax)) {
				return 1;
			} else if (semver.lt(amax,bmax)) {
				return -1;
			} else {	// if (semver.eq(amax,bmax)) {	// special case for hyphen ranges
				aIsHyphenRange = (a.indexOf('-') !== -1);
				bIsHyphenRange = (b.indexOf('-') !== -1);
				if (!aIsHyphenRange && bIsHyphenRange) {
					return -1;
				} else if (aIsHyphenRange && !bIsHyphenRange) {
					return 1
				}
			}

		} else {
			//console.log('invalid param b', b);
		}
	} else {
		//console.log('invalid param a', a);
	}
	return 0;
};