(() => {
	// set up the puzzle pieces and boards
	console.log('fired!');


	const iconContainer = document.querySelector('#iconContainer'),
		  dropSection = document.querySelector('#dropSection'),
		  reset = document.querySelectorAll('.resetButton'),
		  dropZones = document.querySelectorAll('.drop-zone'),
			allAudio = document.querySelectorAll('audio'),
			mixerContainer = document.querySelectorAll('#mixerContainer'),
			images = document.querySelectorAll('#mixerContainer img');


	let draggablePieces = document.querySelectorAll("#iconContainer img");


	function resetImage() {
		console.log(this);

		dropZones.forEach(zone => {
			if (zone.childElementCount === 1) {
				piece = zone.firstElementChild;
				iconContainer.appendChild(piece);
			}
		});
		
		images.forEach(image => image.classList.add("hidden"));

	}

	function resetSound() {
		 allAudio.forEach(audio => audio.pause());
 }

	reset.forEach(thumbnail => thumbnail.addEventListener("click", resetImage)),
	reset.forEach(thumbnail => thumbnail.addEventListener("click", resetSound));

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

			let draggedElement = e.dataTransfer.getData("text/plain");
			console.log('you dragged: ', draggedElement);

			if ( this.childElementCount == 1 ) { return; }

			let audioKey = document.querySelector(`#${draggedElement}`).dataset.key;

			let imgKey = document.querySelector(`#${draggedElement}`).dataset.target;

			let currentAudioClip = document.querySelector((`audio[data-key="${audioKey}"]`));
			currentAudioClip.play();
			currentAudioClip.loop = "true";

			let currentImage = document.querySelector(`#${imgKey}`);
			currentImage.classList.remove("hidden");

			e.target.appendChild(document.querySelector(`#${draggedElement}`));
		});
	})


})();
