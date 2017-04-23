function microSleep(usecs) {
	var dest = (new Date()).getTime() + usecs;
	while((new Date()).getTime() < dest) {
		; // do nothing
	}
}

var hanoi_peg = new Array(
 new Array(  5,  4,  3,  2,  1,  0 ),
 new Array( -1, -1, -1, -1, -1, -1 ),
 new Array( -1, -1, -1, -1, -1, -1 ) );

function hanoiTower(disk, dest) {
	var source = -1;
	var source_height = -1;

	if(disk < 0) { return; } // no such disk

	// find where the disk is
	for(var peg = 0; peg < 3; peg++) {
		for(var height = 0; height < 6; height++) {
			if(hanoi_peg[peg][height] == disk) {
				source = peg;
				source_height = height;
			}
		}
	}

	if(source == -1) {
		document.form.output.value += "disk " + disk + " not found\n";
		return;
	}

	if(source == dest) { return; } // already there

	var spare;
	if(source != 0 && dest != 0) { spare = 0; }
	if(source != 1 && dest != 1) { spare = 1; }
	if(source != 2 && dest != 2) { spare = 2; }

	// make sure all disks are on spare peg
	for(var smaller = disk - 1; smaller >= 0; smaller--) {
		hanoiTower(smaller, spare);
	}

	// remove the disk from the peg
	hanoi_peg[source][source_height] = -1;
	document["peg" + source.toString() + source_height.toString()].src = "empty.gif";

	var dest_height = 0;
	while(dest_height < 6 && hanoi_peg[dest][dest_height] != -1) {
		dest_height++;
	}
	if(dest_height < 6) {
		hanoi_peg[dest][dest_height] = disk;
		document["peg" + dest.toString() + dest_height.toString()].src = "disk" + disk + ".gif";
	}

	microSleep(150);
}

var hanoi_status = "Nothing selected";
var current_select = -1;

function showStatus() {
	window.status = hanoi_status;
}

function hanoiClick(peg, height) {
	if(current_select == -1) {
		if(peg >= 0 && peg < 3 && height >= 0 && height < 6) {
			current_select = hanoi_peg[peg][height];
			if(current_select >= 0) {
				hanoi_status = "Where should I move disk " + current_select + "?";
			}
		}
	} else {
		hanoiTower(current_select, peg);
		hanoi_status = "Moved disk " + current_select
			+ " to peg " + peg;
		current_select = -1;
	}
	showStatus();
}

function hanoiSolve() {
	current_select = -1;
	var peg;
	for(peg = 0; peg < 3; peg++) {
		if(hanoi_peg[peg][0] == 5) break;
	}
	if(peg == 3) {
		window.status = "Biggest disk not found";
		return;
	}
	for(var disk = 5; disk >= 0; disk--) {
		hanoiTower(disk, (peg + 1) % 3);
	}
}