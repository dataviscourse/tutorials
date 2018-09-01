function sumXY(x = 11, y = 31) {
	console.log( x + y );
}

sumXY(); // 42
sumXY( 5, 6 ); // 11
sumXY( 0, 42 ); // 42
sumXY( 5 ); // 36
sumXY( 5, undefined ); // 36 <-- `undefined` is missing
sumXY( 5, null ); // 5 <-- null coerces to `0`
sumXY( undefined, 6 ); // 17 <-- `undefined` is missing
sumXY( null, 6 ); // 6 <-- null coerces to `0`