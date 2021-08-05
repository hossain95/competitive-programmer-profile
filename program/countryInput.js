url = `https://restcountries.eu/rest/v2/`;
fetch(url).then((response)=>
{
    return response.json();
}).then((data)=>
{
    //console.log(data);
    for(var i = 0; i < data.length; i++)
    {
        var tr = document.createElement('option');
        tr.setAttribute('id', "idd"+i);
        tr.value = data[i].name;
        tr.text = data[i].name;
        //console.log(tr);
        document.getElementById("listCountry").appendChild(tr);
    }
});