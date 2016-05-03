var chai = require('chai');
var should = chai.should();

var compare = require('./index.js');

var arr = [];

function check(arr) {
	arr.slice(0).reverse().sort(compare).should.deep.equal(arr);
}

function checkSetOrder(arr, arrEq) {
	arr.slice(0).sort(compare).should.deep.equal(arrEq);
}

describe('semver compare', function() {
	describe('invalid version', function() {
		it('invalid vs b = 0', function (done) {
			should.equal(compare('bad-version', '0.0.1'), 0);
			done();
		});
		it('a vs invalid = 0', function (done) {
			should.equal(compare('0.0.1','bad-version'), 0);
			done();
		});
	});

	describe('version vs version', function() {
		it('a < b = -1', function (done) {
			should.equal(compare('0.0.0', '0.0.1'), -1);
			done();
		});
		it('a == b = 0', function (done) {
			should.equal(compare('0.0.0', '0.0.0'), 0);
			done();
		});
		it('a > b = 1', function (done) {
			should.equal(compare('0.0.1', '0.0.0'), 1);
			done();
		});
	});

	describe('version vs range', function() {
		it('a < min(b) = -1', function (done) {
			should.equal(compare('0.0.0', '0.0.1 - 0.0.2'), -1);
			done();
		});
		it('a == min(b) = -1', function (done) {
			should.equal(compare('0.0.0', '0.0.0 - 0.0.1'), -1);
			done();
		});
		it('a > min(b) = 1', function (done) {
			should.equal(compare('0.0.1', '0.0.0 - 0.0.2'), 1);
			should.equal(compare('0.0.2', '0.0.0 - 0.0.1'), 1);
			done();
		});
	});

	describe('range vs range', function() {
		it('min(a) < min(b) = -1', function (done) {
			should.equal(compare('0.0.0 - 0.0.2', '0.0.1 - 0.0.2'), -1);
			done();
		});
		it('min(a) > min(b) = 1', function (done) {
			should.equal(compare('0.0.1 - 0.0.2', '0.0.0 - 0.0.2'), 1);
			done();
		});
		it('min(a) == min(b) && max(a) < max(b) = -1', function (done) {
			should.equal(compare('0.0.0 - 0.0.1', '0.0.0 - 0.0.2'), -1);
			done();
		});
		it('min(a) == min(b) && max(a) > max(b) = 1', function (done) {
			should.equal(compare('0.0.0 - 0.0.2', '0.0.0 - 0.0.1'), 1);
			done();
		});
		it('min(a) == min(b) && max(a) == max(b) = 0', function (done) {
			should.equal(compare('0.0.0 - 0.0.1', '0.0.0 - 0.0.1'), 0);
			done();
		});
		it('min(a) == min(b) && max(a) == max(b) && semverType(a) == hyphen = 1', function (done) {
			should.equal(compare('0.0.0 - 0.1.0', '0.0.x'), 1);
			done();
		});
		it('min(a) == min(b) && max(a) == max(b) && semverType(b) == hyphen = 1', function (done) {
			should.equal(compare('0.0.x', '0.0.0 - 0.1.0'), -1);
			done();
		});
	});

	describe('any version is first', function() {
		it('* vs b = -1', function (done) {
			should.equal(compare('*', '0.0.0'), -1);
			done();
		});
		it('a vs * = 1', function (done) {
			should.equal(compare('0.0.0', ''), 1);
			done();
		});
		it('>=a vs * = 1', function (done) {
			should.equal(compare('>=0.0.0', '*'), 1);
			done();
		});
	});
});

describe('semver sorting', function() {
	describe('invalid version', function() {
		var arr_iv1 = ['bad-preversion', '0.0.0 - 0.0.1', '0.0.0', 'bad-version'];
		it('should sort '+arr_iv1.join(' , '), function (done) { checkSetOrder(arr_iv1, ['bad-preversion', '0.0.0', '0.0.0 - 0.0.1', 'bad-version']); done(); });
		var arr_iv2 = ['0.0.0', 'bad-version', 'bad-preversion','0.0.0 - 0.0.1'];
		it('should sort '+arr_iv2.join(' , '), function (done) { checkSetOrder(arr_iv2, ['0.0.0', 'bad-version', 'bad-preversion','0.0.0 - 0.0.1']); done(); });
	});

	describe('version vs version', function() {
		arr = ['0.0.0','0.0.0'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.0','0.0.1','0.1.0','0.2.0','1.0.0','1.1.0','1.1.1','2.0.0'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
	});

	describe('version vs version range', function() {
		arr = ['0.0.0','0.0.1 - 0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.1','0.0.1 - 0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.1 - 0.0.2','0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.0','0.0.x'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.1','^0.0.1'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.1','~0.0.1'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
	});

	describe('version range vs version range', function() {
		arr = ['0.0.0 - 0.0.1','0.0.0 - 0.0.1'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.0 - 0.0.1','0.0.1 - 0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.0 - 0.0.1','0.0.0 - 0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.x','0.1.x'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['~0','~0.1'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['^0.0.0','^0.0.1'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['0.0.x','^0.0.1','0.0.2 - 0.0.3','~0.0.2'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
	});

	describe('any version is first', function() {
		arr = ['*', '0.0.0'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
		arr = ['', '0.0.0'];
		it('should sort reverse of '+arr.join(' , '), function (done) { check(arr); done(); });
	});
});
