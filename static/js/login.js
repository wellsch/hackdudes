async function login() {
    const income = document.getElementById('income').value;
    const zipcode = document.getElementById('zipcode').value;

    async function fetchLogin() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/inituser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    zip: zipcode,
                    income: income
                })
            });
            if (!response.ok) {
                throw new Error('HTTP error, status : ${response.status}');
            }
            const data = await response.text();
            localStorage.setItem('logindata', data);
        } catch (error) {
            console.error('There was an error', error)
        }
    }

    await fetchLogin();

    var loginBody = document.getElementById('login');
    loginBody.style.display = 'none';
    var baseBody = document.getElementById('base');
    baseBody.style.display = 'block';
    console.log(JSON.stringify(localStorage.getItem("logindata")))
}