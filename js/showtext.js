function togglePapers() {
  var hidepapers = document.getElementsByClassName("hidepaper");
  
  for(var i = 0; i < hidepapers.length; i++){
  		if (hidepapers[i].style.display == "none") {
  			hidepapers[i].style.display = "block"; // Hide all elements.
		} else {
			hidepapers[i].style.display = "none"; 
		}   
    }

  var title = document.getElementById('projects');
  var tag = document.getElementById('togglepaperstag');

  if (title.innerHTML == "All Papers") {
  	title.innerHTML = "Selected Papers";
  	tag.innerHTML = '(Show all)';
  } else {
  	title.innerHTML = "All Papers";
  	tag.innerHTML = '(Show selected)';
  }
}
