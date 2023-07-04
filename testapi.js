    $.ajax({
    type: 'GET',
    // TODO: Your URL will be different to the one below.
    // Use the OData REST API Configuration page on the K2 Management site to determine base URL
    // then append the SmartObject system name
    url: 'https://SRV-K2FIVE/api/odata/v3/',
    dataType: 'json',
    // As CORS is used, this must be set to true
    crossDomain: false,
    // Basic authentication is set in the header, enter appropriate user name and password for your environment.
    // The xhr (XMLHttpRequest) function below sends authorization details to the server.
    // This line creates a hash of the user name and password:
    // window.btoa(unescape(encodeURIComponent("[USERNAME]" + ':' + "[PASSWORD]")))
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("sp_admin" + ':' + "P@ssw0rd"))));
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    },
    // On success, we write a 'success' message to the console and stringify the returned JSON to display,
    // for example, in the <div id="t1"><div> tag on a web page
    success: function (json_data) {
        console.log('success');
        console.log(JSON.stringify(json_data));
    },
    // In case of error, show an alert
    error: function () {
        alert('Failed!');
    }
})
