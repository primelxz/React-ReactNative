/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */
fetch("https://cs571.org/s23/hw3/api/students", {
	headers: {
		"X-CS571-ID": "bid_c6b0ef60328ceef94599"
	}
})
.then(res => res.json())
.then(studArray => {
	console.log(studArray);
	let studNames = buildStudentsHtml(studArray);
	document.getElementById('students').innerHTML = studNames;
})

document.getElementById("search-btn").addEventListener("click", () => {
	fetch("https://cs571.org/s23/hw3/api/students", {
		headers: {
			"X-CS571-ID": "bid_c6b0ef60328ceef94599"
		}
	})
	.then(res => res.json())
	.then(studArray => {
		const nameSearch = String(document.getElementById("search-name").value).toLowerCase().trim() ?? "";
		const majorSearch = String(document.getElementById("search-major").value).toLowerCase().trim() ?? "";
		const interestSearch = String(document.getElementById("search-interest").value).toLowerCase().trim() ?? "";

		let results = [];
		studArray.forEach(element => results.push(element));

		if (nameSearch !== "") {
			results  = results.filter(result => {
				const fullName = String(result.name.first).toLowerCase() + " " + String(result.name.last).toLowerCase();
				if(fullName.includes(nameSearch) || fullName.includes(nameSearch)) {
					return true;
				} else {
					return false;
				}
			});
		}
		if (majorSearch !== "") {
			results  = results.filter(result => {
				if(String(result.major).toLowerCase().includes(majorSearch)) {
					return true;
				} else {
					return false;
				}
			});
		}
		if (interestSearch !== "") {
			results  = results.filter(result => {
				let studInterests = [];
				result.interests.forEach(intres => studInterests.push(intres));
				
				if(studInterests.some(intre => intre.toLowerCase().includes(interestSearch))) {
					return true;
				} else {
					return false;
				}
			});
		}
		document.getElementById('students').innerHTML = buildStudentsHtml(results);
	})
});

document.getElementById("reset-search-btn").addEventListener("click", () => {
	fetch("https://cs571.org/s23/hw3/api/students", {
		headers: {
			"X-CS571-ID": "bid_c6b0ef60328ceef94599"
		}
	})
	.then(res => res.json())
	.then(studArray => {
		let studNames = buildStudentsHtml(studArray);
		document.getElementById('search-name').value = "";
		document.getElementById('search-major').value = "";
		document.getElementById('search-interest').value = "";
		document.getElementById('students').innerHTML = studNames;
	})
});
/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h5>${stud.major}</h5>`;
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and is ${stud.fromWisconsin ? '' : 'not'} from Wisconsin.</p>`;
	html += `<p>${stud.interests.length} interests in total: </p>`;
	html += `<ul>`;
	stud.interests.forEach(interest => {html += `<li>${interest}</li>`});
	html += `</ul>`;
	html += `</div>`
	return html;
}
