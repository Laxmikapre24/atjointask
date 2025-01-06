document.addEventListener("DOMContentLoaded", function() {
    // Code to be executed when the DOM is ready

    document.getElementById('rankForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        const name = document.getElementById('name').value;
        const photoFile = document.getElementById('photo').files[0];
        const rank = document.getElementById('rank').value;
    
        // Generate ID (Auto Generated)
        const idNumber = `#${String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0')}`;
    
        // Generate Image URL
        const reader = new FileReader();
        reader.onload = function(e) {
            createPdf(name, e.target.result, idNumber, rank);
        };
        reader.readAsDataURL(photoFile);
    });
    
    function createPdf(name, photoUrl, idNumber, rank) {
        const output = `
            <div class="output">
                <img src="${photoUrl}" alt="User Photo">
                <p>ID: ${idNumber}</p>
                <p>User Name: ${name}</p>
                <p>Congratulations!! You have secured <strong>${rank}</strong></p>
            </div>`;
    
        // Use jsPDF to create PDF
        const pdf = new pdf();
        pdf.html(output, {
            callback: function (doc) {
                doc.save('user_rank.pdf');
            },
            x: 10,
            y: 10,
        });
    }


});

