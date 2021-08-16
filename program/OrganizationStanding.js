
document.getElementById("formOrganization").addEventListener("submit", (e) =>
{
    e.preventDefault();


    /*************************Refresh*****************************************************/
   $( "#OrganizationStandingtable").load("index.html #OrganizationStandingtable");
   document.getElementById("organizationStandingOutput").style.display = "none";
   document.getElementById("loader").style.display = "";
   document.getElementById("error").style.display = "none";

    
    var OrganizationName = document.getElementById("OrganizationName").value;
    var ContestId = document.getElementById("ContestId").value;
    var counHandle = document.getElementById("orgHandle").value;
    console.log(OrganizationName + " "+ContestId);

     (async () =>
     {
        try
        {
            var AllUser = await fetch(`https://codeforces.com/api/user.ratedList?activeOnly=true`).then(response => response.json());
            AllUser = AllUser.result;
            //console.log(AllUser);
            var countryUserMap = new Map();
            for(var i = 0; i < AllUser.length; i++)
            {
               if(AllUser[i].organization == OrganizationName)
               {
                  var tem =
                  {
                      rank:0,
                      handle: AllUser[i].handle,
                      points: 0,
                      oldRating: "NA",
                      newRating: "NA",
                  };
                  countryUserMap.set(AllUser[i].handle, tem);
               }
            }
            //console.log(countryUserMap);
            var ratingChange = await fetch(`https://codeforces.com/api/contest.ratingChanges?contestId=${ContestId}`).then(response => response.json());
            if(ratingChange.status != "FAILED")
            {
               if(ratingChange.result.length > 0)
               {
                  ratingChange = ratingChange.result;
                  console.log(ratingChange);
                  for(var i = 0; i < ratingChange.length; i++)
                  {
                     if(countryUserMap.get(ratingChange[i].handle))
                     {
                        countryUserMap.get(ratingChange[i].handle).oldRating = ratingChange[i].oldRating;
                        countryUserMap.get(ratingChange[i].handle).newRating = ratingChange[i].newRating;
                     }
                  }
               }
            }
            var selectedContestant = new Map();
            
            var contestStanding = await fetch(`https://codeforces.com/api/contest.standings?contestId=${ContestId}&showUnofficial=false`).then(response => response.json());
            var contestName = contestStanding.result.contest.name;
            contestStanding = contestStanding.result.rows;

            var SearchUserGlobalRank = "Not found!";

            for(var i = 0; i < contestStanding.length; i++)
            {
               if(countryUserMap.get(contestStanding[i].party.members[0].handle) && contestStanding[i].party.participantType == "CONTESTANT")
               {
                  var tem =
                  {
                      rank:contestStanding[i].rank,
                      handle:contestStanding[i].party.members[0].handle,
                      points:contestStanding[i].points,
                      oldRating:countryUserMap.get(contestStanding[i].party.members[0].handle).oldRating,
                      newRating:countryUserMap.get(contestStanding[i].party.members[0].handle).newRating,
                  };
                  selectedContestant.set(contestStanding[i].party.members[0].handle, tem);
               }
               if(contestStanding[i].party.members[0].handle == counHandle)
               {
                  SearchUserCountryRank = i;
                  SearchUserGlobalRank = contestStanding[i].rank;
               }
            }
            countryUserMap.clear();
            console.log(selectedContestant);


            document.getElementById("contestName").innerText = contestName;
            document.getElementById("OrgName").innerText = OrganizationName;



            var SearchUserCountryRank = "Not found!";
            
            var i = 1;
            selectedContestant.forEach(element =>
            {
                //console.log(element.handle);
                //console.log(element.points);
                if(element.handle == counHandle)
                {
                   SearchUserCountryRank = i;
                   //SearchUserGlobalRank = element.rank;
                }
                const trow = document.createElement('tr');
                document.getElementById("Tablebody").appendChild(trow);
                trow.setAttribute('id', "tr"+i);


                const td1 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td1);
                td1.setAttribute('id', "td1"+i);
                document.getElementById("td1"+i).innerText = i;
            
                const td2 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td2);
                td2.setAttribute('id', "td2"+i);
                document.getElementById("td2"+i).innerText = element.rank;
            
                const td3 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td3);
                td3.setAttribute('id', "td3"+i);
                document.getElementById("td3"+i).innerText = element.handle;
            
                const td4 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td4);
                td4.setAttribute('id', "td4"+i);
                document.getElementById("td4"+i).innerText = element.points;

                const td5 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td5);
                td5.setAttribute('id', "td5"+i);
                document.getElementById("td5"+i).innerText = element.oldRating;
                i++;
            });







            selectedContestant.clear();
            

            document.getElementById("orgRank1").innerText = SearchUserCountryRank;
            document.getElementById("orgRank2").innerText = SearchUserGlobalRank;
            console.log("Windows");






            document.getElementById("organizationStandingOutput").style.display = "";
            document.getElementById("loader").style.display = "none";
            //document.getElementById("firstRow").style.display = "";
            //document.getElementById("OrgFirstRow").style.display = "";
            //console.log(userInfo);
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
