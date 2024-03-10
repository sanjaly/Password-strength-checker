function checkPassword() {
    var inputPassword = document.getElementById("inputPassword").value;
    var progressBar = document.getElementById("progress-bar");
    var resultDiv = document.getElementById("result");

    progressBar.style.width = "100%";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "rockyou.txt", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var commonPasswords = xhr.responseText.split("\n");
                var strength = "";
                if (commonPasswords.includes(inputPassword)) {
                    strength = "Weak";
                } else if (inputPassword.length >= 8 && /[A-Z]/.test(inputPassword) && /[0-9]/.test(inputPassword)) {
                    strength = "Strong";
                } else {
                    strength = "Medium, must contain at least 8 characters, a capital letter, and a number";
                }

                resultDiv.innerText = "Password Strength: " + strength;
            } else {
                console.error("Failed to fetch rockyou.txt: ", xhr.status, xhr.statusText);
                resultDiv.innerText = "Error: Failed to fetch rockyou.txt";
            }

            progressBar.style.width = "0%";
        }
    };
    xhr.send();
}
