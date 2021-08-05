(async() =>
{
    try
    {
        var data = await fetch(`https://codeforces.com/api/contest.list?gym=false`).then(response => response.json());
        //console.log(data);
        data = data.result;
        for(var i = 0; i < data.length; i++)
        {
            if(data[i].phase != "BEFORE")
            {
                
                var tr = document.createElement('option');
                tr.setAttribute('id', "idd"+i);
                tr.value = data[i].id;
                tr.text = data[i].id;
                var tr1 = document.createElement('option');
                tr1.setAttribute('id', "iddd"+i);
                tr1.value = data[i].id;
                tr1.text = data[i].id;
                //console.log(tr);
                 document.getElementById("listContestIdOrg").appendChild(tr);
                 document.getElementById("listContestIdCountry").appendChild(tr1);
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }
})();