(async() =>
{
    try
    {
        var data = await fetch(`https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`).then(response => response.json());
        //console.log(data);
        for(var i = 0; i < data.length; i++)
        {
            var tr = document.createElement('option');
            tr.setAttribute('id', "iddd"+i);
            tr.value = data[i].name;
            tr.text = data[i].name;
            //console.log(tr);
            document.getElementById("listOrg").appendChild(tr);
        }
    }
    catch(error)
    {
        console.log(error);
    }
})();