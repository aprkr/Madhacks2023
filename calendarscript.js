
monthLabel = document.getElementById('monthName');

	function nextMonth() {
			nav++;
			currentSelectedDay = -1

			loadCal();
		}
		function prevMonth() {
			nav--;
			currentSelectedDay = -1
			loadCal();

		}

		let allReminders = []
		for(let i = 0; i < 31; i++) {
			allReminders.push([]);
		}

		const dt = new Date(); //date object
		const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let nav = 0


		function saveInput() {
			console.log('here');
			let medname = document.getElementById('medname');
			let sdate = document.getElementById('sdate');
			let edate = document.getElementById('edate');
			let mor = document.getElementById('mor');
			let noon = document.getElementById('noon');
			let eve = document.getElementById('eve');
			let quan = document.getElementById('quan');
			let col = document.getElementById('col');
			let mfor = document.getElementById('mfor');


		}

		let selectedDate = document.getElementById("leftCol");
		function updateLeftCol(day, month, year) {
			//alert(month + "/" + day + "/" + year);
			selectedDate.innerHTML = "Reminders for " + (month+nav) + "/" + day + "/" + year + ":";
			currentSelectedDay = day
			loadCal()


		}


			const day = dt.getDate();
			let currentSelectedDay = day

			const month = dt.getMonth();
			const year = dt.getFullYear();

		function loadCal() {
			dt.setMonth(new Date().getMonth() + nav); //current month + nav to set month of date
				
			
			console.log(month, day, year);
			const firstDayOfMonth = new Date(year, month, 1);
			const daysInMonth = new Date(year, month+1, 0).getDate(); //0 means last day of prev month

			document.getElementById('monthName').innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

				//NOTE: getDate gets string info

				const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
					weekday: 'long',
					year: 'numeric',
					month: 'numeric',
					day: 'numeric'
				})

				let paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //split by commaspace, get first result


				let grid = document.getElementById('grid-container');
				grid.innerHTML = '';

				let daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "Su"
					daySquare.classList.add('calendar_button');
					daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
			 	daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "M"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "T"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "W"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "Th"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "F"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "Sa"
					daySquare.classList.add('calendar_button');
										daySquare.classList.add('button_day');

					grid.appendChild(daySquare);
				for(let i = 0; i < paddingDays; i++) {
					daySquare = document.createElement('div'); //create div for every day
					daySquare.innerHTML = ""
					daySquare.classList.add('calendar_button');

					grid.appendChild(daySquare);
				}
				for(let i = 1; i <= daysInMonth; i++) {



					daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "" + i
					if(i == day && nav ==0)
						daySquare.classList.add('current_day');
					if(i == currentSelectedDay)
						daySquare.classList.add('current_selected_day');

					//console.log(day)
					//console.log(month)

					daySquare.classList.add('calendar_button');
					daySquare.addEventListener('click', () => updateLeftCol(i, month+1, year));

					grid.appendChild(daySquare);
				}
			}


			loadCal()
			updateLeftCol(day, month+1, year);


