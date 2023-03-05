
monthLabel = document.getElementById('monthName');

	function nextMonth() {
		nav++;
			loadCal();
		}
		function prevMonth() {
			nav--;
			loadCal();
		}
		const dt = new Date(); //date object
		const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let nav = 0
		function loadCal() {
			dt.setMonth(new Date().getMonth() + nav); //current month + nav to set month of date
				
			const day = dt.getDate();
			const month = dt.getMonth();
			const year = dt.getFullYear();
			//console.log(day, month, year);
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

				for(let i = 0; i < paddingDays; i++) {
					const daySquare = document.createElement('div'); //create div for every day
					daySquare.innerHTML = ""
					daySquare.classList.add('calendar_button');
					grid.appendChild(daySquare);
				}
				for(let i = 1; i <= daysInMonth; i++) {
					const daySquare = document.createElement('button'); //create div for every day
					daySquare.innerHTML = "" + i
					if(i == day && nav ==0)
						daySquare.classList.add('current_day');
					console.log(day)
					console.log(month)

					daySquare.classList.add('calendar_button');

					grid.appendChild(daySquare);
				}
			}

			loadCal()


