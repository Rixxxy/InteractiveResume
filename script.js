document.addEventListener('DOMContentLoaded', () => {
    const educationContainer = document.getElementById('education-container');
    const experienceContainer = document.getElementById('experience-container');
    const certificationsContainer = document.getElementById('certifications-container');
    const previewSection = document.getElementById('resume-preview');
    
    // Adding event listeners for form inputs to call updatePreview() on change
    document.getElementById('resume-form').addEventListener('input', updatePreview);
    document.getElementById('resume-form').addEventListener('change', updatePreview);

    document.getElementById('add-education').addEventListener('click', () => {
        addEntry(educationContainer, 'Education');
    });

    document.getElementById('add-experience').addEventListener('click', () => {
        addEntry(experienceContainer, 'Experience');
    });

    document.getElementById('add-certification').addEventListener('click', () => {
        addEntry(certificationsContainer, 'Certification');
    });

    document.getElementById('clear-form').addEventListener('click', () => {
        previewSection.innerHTML = '';
    });

    function addEntry(container, type) {
        const entry = document.createElement('div');
        entry.classList.add('entry');

        if (type === 'Education') {
            entry.innerHTML = `
                <input type="text" placeholder="Degree/Institution" required>
                <input type="text" placeholder="Year" required>
                <button class="delete-entry">Delete</button>
            `;
        } else if (type === 'Experience') {
            entry.innerHTML = `
                <input type="text" placeholder="Job Title/Company" required>
                <textarea placeholder="Responsibilities"></textarea>
                <button class="delete-entry">Delete</button>
            `;
        } else if (type === 'Certification') {
            entry.innerHTML = `
                <input type="text" placeholder="Certification Title" required>
                <input type="text" placeholder="Issuing Organization" required>
                <input type="text" placeholder="Year" required>
                <button class="delete-entry">Delete</button>
            `;
        }

        container.appendChild(entry);
        attachEventListeners(entry);
        updatePreview();
    }

    function attachEventListeners(entry) {
        entry.querySelector('.delete-entry').addEventListener('click', () => {
            entry.remove();
            updatePreview();
        });

        entry.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updatePreview);
        });
    }

    function updatePreview() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const profile = document.getElementById('profile').value;
        const skills = document.getElementById('skills').value;

        const educationEntries = Array.from(document.querySelectorAll('#education-container .entry'))
            .map(entry => {
                const degree = entry.querySelector('input:nth-child(1)').value;
                const year = entry.querySelector('input:nth-child(2)').value;
                return degree && year ? `<li>${degree} (${year})</li>` : '';
            }).filter(Boolean).join('');

        const experienceEntries = Array.from(document.querySelectorAll('#experience-container .entry'))
            .map(entry => {
                const jobTitle = entry.querySelector('input').value;
                const responsibilities = entry.querySelector('textarea').value;
                return jobTitle || responsibilities ? `<li><strong>${jobTitle}:</strong> ${responsibilities}</li>` : '';
            }).filter(Boolean).join('');

        const certificationEntries = Array.from(document.querySelectorAll('#certifications-container .entry'))
            .map(entry => {
                const title = entry.querySelector('input:nth-child(1)').value;
                const organization = entry.querySelector('input:nth-child(2)').value;
                const year = entry.querySelector('input:nth-child(3)').value;
                return title || organization || year ? `<li>${title} (${organization}, ${year})</li>` : '';
            }).filter(Boolean).join('');

        previewSection.innerHTML = `
            <h3>${name}</h3>
             <p>${profile}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
           
            <h4>Skills</h4>
            <p>${skills}</p>
            <h4>Education</h4>
            <ul>${educationEntries}</ul>
            <h4>Experience</h4>
            <ul>${experienceEntries}</ul>
            <h4>Certifications</h4>
            <ul>${certificationEntries}</ul>
        `;
    }
});
