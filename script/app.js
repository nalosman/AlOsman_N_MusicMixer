(() => {
	// set up the puzzle pieces and boards
	console.log('fired!');


	const iconContainer = document.querySelector('#iconContainer'),
		  dropSection = document.querySelector('#dropSection'),
		  puzzleSelectors = document.querySelectorAll('.resetButton'),
		  dropZones = document.querySelectorAll('.drop-zone');


	let draggablePieces = document.querySelectorAll("#iconContainer img");

	debugger;
	//

	function switchImage() {
		console.log(this);


		dropZones.forEach(zone => {
			if (zone.childElementCount === 1) {
				piece = zone.firstElementChild;
				iconContainer.appendChild(piece);
			}
		});

	}

	puzzleSelectors.forEach(thumbnail => thumbnail.addEventListener("click", switchImage));


	// loop through the draggable images
	// this lets us drag stuff => not that hard
	draggablePieces.forEach(piece => {
		piece.addEventListener("dragstart", function(e){
			console.log('draggin...');

			//dataTransfer has two methods, a setter and getter
			// set data on the drag, and retrieve it on the drop
			e.dataTransfer.setData("text/plain", this.id);
		});
	});


	// this is the dragover and drop functionality => this is for the drop zones
	dropZones.forEach(zone => {
	// allow user to drag over element
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('dragged sumpin over me');
		});

	// allow user to drop an element
		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dropped sumpin over me');

				if (this.childElementCount == 1) {return;}

			let draggedElement = e.dataTransfer.getData("text/plain");
			console.log('you dragged: ', draggedElement);

			// add the image to the drop zone
			e.target.appendChild(document.querySelector(`#${draggedElement}`));
		});
	})

})();
