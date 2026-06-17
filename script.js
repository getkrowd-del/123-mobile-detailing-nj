function handleRacingSubmit(event) {
            event.preventDefault();

            // Extract inputs safely to prevent XSS vulnerability patterns
            const driver = document.getElementById('driver_name').value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const phone = document.getElementById('driver_phone').value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const vehicle = document.getElementById('machine_model').value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const packageSel = document.getElementById('stage_package').value;

            const targetSuccess = document.getElementById('dispatchSuccessBlock');
            const targetText = document.getElementById('successDetailText');

            targetSuccess.classList.remove('hidden');
            targetText.innerHTML = `Green flag, <strong>${driver}</strong>! We've logged your <strong>${packageSel}</strong> request for your <strong>${vehicle}</strong>. Our dispatch unit will call or text you at <strong>${phone}</strong> shortly to lock in your arrival time!`;

            // Clean form state variables
            document.getElementById('racingDispatchForm').reset();
            targetSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }