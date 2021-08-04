

document.getElementById("formAtcoderProfile").addEventListener("submit", (e) =>
{
    e.preventDefault();


    document.getElementById("error").style.display = "none";
    document.getElementById("loader").style.display = "";
    //$( "#codechefBody").load("index.html #codechefBody");
    document.getElementById("atcodeProfileOutput").style.display = "none";
    


    var handle= document.getElementById("atcoderUser").value;
    console.log(handle);
    (async() =>
    {
        try
        {
            var url = `https://competitive-coding-api.herokuapp.com/api/atcoder/`+handle;
            var userInfo = await fetch(url).then(response => response.json());
            //console.log(userInfo);
            

            document.getElementById("atcoderUserName").innerText = userInfo.username;
            document.getElementById("atcoderHighestRating").innerText = userInfo.highest;
            document.getElementById("atcoderRating").innerText = userInfo.rating;
            document.getElementById("atcoderLevel").innerText = userInfo.level;
           

            document.getElementById("atcodeProfileOutput").style.display = "";
            document.getElementById("loader").style.display = "none";
        }
        catch(error)
        {
            console.log(error);
            document.getElementById("loader").style.display = "none";
            document.getElementById("error").style.display = "";
            document.getElementById("error").innerText = "Something is Wrong";
        }
    })();
});