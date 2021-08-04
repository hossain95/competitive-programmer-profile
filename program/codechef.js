

document.getElementById("formCodechefProfile").addEventListener("submit", (e) =>
{
    e.preventDefault();


    document.getElementById("error").style.display = "none";
    document.getElementById("loader").style.display = "";
    $( "#codechefBody").load("index.html #codechefBody");
    document.getElementById("codechefProfileOutput").style.display = "none";
    


    var handle= document.getElementById("codechefUser").value;
    console.log(handle);
    (async() =>
    {
        try
        {
            var url = `https://competitive-coding-api.herokuapp.com/api/codechef/`+handle;
            var userInfo = await fetch(url).then(response => response.json());
            //console.log(userInfo);
            var userDetails = userInfo.user_details;
            //console.log(userDetails);
            document.getElementById("codechefName").innerText = userDetails.name;
            document.getElementById("codechefCountry").innerText = userDetails.country;
            document.getElementById("codechefInstitution").innerText = userDetails.institution;
            document.getElementById("codechefRating").innerText = userInfo.rating;
            document.getElementById("codechefStars").innerText = userInfo.stars;
            document.getElementById("codechefFullySolved").innerText = userInfo.fully_solved.count;
            document.getElementById("codechefPartiallySolved").innerText = userInfo.partially_solved.count;





            document.getElementById("codechefLong").innerText = userInfo.contests[0].name;
            document.getElementById("codechefLongRating").innerText = userInfo.contests[0].rating;
            document.getElementById("codechefLongCountryRank").innerText = userInfo.contests[0].country_rank;
            document.getElementById("codechefLongGlobalRank").innerText = userInfo.contests[0].global_rank;



            document.getElementById("codechefLunch").innerText = userInfo.contests[2].name;
            document.getElementById("codechefLunchRating").innerText = userInfo.contests[2].rating;
            document.getElementById("codechefLunchCountryRank").innerText = userInfo.contests[2].country_rank;
            document.getElementById("codechefLunchGlobalRank").innerText = userInfo.contests[2].global_rank;


            document.getElementById("codechefCook").innerText = userInfo.contests[1].name;
            document.getElementById("codechefCookRating").innerText = userInfo.contests[1].rating;
            document.getElementById("codechefCookCountryRank").innerText = userInfo.contests[1].country_rank;
            document.getElementById("codechefCookGlobalRank").innerText = userInfo.contests[1].global_rank;



            var ratedContest = userInfo.contest_ratings;
            for(var i = ratedContest.length-1; i >= 0; i--)
            {
                var tr = document.createElement("tr");
                tr.setAttribute("id", "id"+i);

                document.getElementById("codechefBody").appendChild(tr);
                var td1 = document.createElement("td");
                td1.innerText = ratedContest[i].name;
                //td1.style.textAlign = "right";
                document.getElementById("id"+i).appendChild(td1);

                var td2 = document.createElement("td");
                td2.innerText = ratedContest[i].rank;
                td2.style.textAlign = "center";
                td2.style.width = "25%";
                document.getElementById("id"+i).appendChild(td2);

                var td3 = document.createElement("td");
                td3.innerText = ratedContest[i].rating;
                td3.style.textAlign = "center";
                td3.style.width = "25%";
                document.getElementById("id"+i).appendChild(td3);
                
            }


            document.getElementById("codechefProfileOutput").style.display = "";
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