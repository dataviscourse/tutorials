let f1 = () => 12;
let f2 = x => x * 2;
let f3 = (x,y) => {
	let z = x * 2 + y;
	y++;
	x *= 3;
	return (x + y + z) / 2;
};