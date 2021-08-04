/*var a = document.createElement('a');
var contestname = "codeforces #128 div. 3";
var link = document.createTextNode(contestname);
a.appendChild(link);
a.href = "https://www.codeforces.com/contest/1551";
document.getElementById("test").prepend(a);
*/

document.getElementById("formProfile").addEventListener("submit", (e) =>
{
    e.preventDefault();
    
    $( "#contestTable").load("index.html #contestTable");
    $( "#problem-list").load("index.html #problem-list");
    document.getElementById("profileOutput").style.display = "none";
    document.getElementById("loader").style.display = "";
    document.getElementById("error").style.display = "none";

    var handle = document.getElementById("user").value;
    console.log(handle);
    (async() =>
    {
        try
        {
            var userInfo = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`).then(response => response.json());
            userInfo = userInfo.result[0];
            //console.log(userInfo);
            document.getElementById("handle").innerText = handle;

            if(userInfo.firstName)
            {
                if(userInfo.firstName.length > 0 && userInfo.lastName.length > 0)
                {
                    document.getElementById("name").innerText = userInfo.firstName+" "+userInfo.lastName;
                }
                else
                {
                    document.getElementById("name").innerText = "---";
                }
            }
            else
            {
                document.getElementById("name").innerText = "---";
            }
            if(userInfo.organization)
            {
                if(userInfo.organization.length > 0)
                {
                    document.getElementById("organization").innerText = userInfo.organization;
                }
                else
                {
                    document.getElementById("organization").innerText = "---";
                }
            }
            else
            {
                document.getElementById("organization").innerText = "---";
            }
            if(userInfo.country)
            {
                if(userInfo.country.length > 0)
                {
                    document.getElementById("country").innerText = userInfo.country;
                }
                else
                {
                    document.getElementById("country").innerText = "---";
                }
            }
            else
            {
                document.getElementById("country").innerText = "---";
            }
            document.getElementById("rating").innerText = userInfo.rating;
            document.getElementById("maxRating").innerText = userInfo.maxRating;






            var contestRating = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`).then(response => response.json());
            contestRating = contestRating.result;
            console.log(contestRating);
            for(var i = contestRating.length-1; i >= 0; i--)
            {
                const trow = document.createElement('tr');
                document.getElementById("contestTable").appendChild(trow);
                trow.setAttribute('id', "tr"+i);


                const td1 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td1);
                td1.setAttribute('id', "td1"+i);
                
                var a = document.createElement('a');
                var contestname = contestRating[i].contestName;
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                var contestNo = contestRating[i].contestId;
                a.href = "https://www.codeforces.com/contest/"+contestNo;
                document.getElementById("td1"+i).prepend(a)

                //document.getElementById().innerText = i;
            
                const td2 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td2);
                td2.setAttribute('id', "td2"+i);
                document.getElementById("td2"+i).innerText = contestRating[i].rank;
            
                const td3 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td3);
                td3.setAttribute('id', "td3"+i);
                document.getElementById("td3"+i).innerText = contestRating[i].oldRating;
            
                const td4 = document.createElement('td');
                document.getElementById("tr"+i).appendChild(td4);
                td4.setAttribute('id', "td4"+i);
                document.getElementById("td4"+i).innerText = contestRating[i].newRating;
            }





            var participant = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`).then(response => response.json());
            console.log(participant);
            participant = participant.result;
            var duringContest = new Map();
            var accept = new Map();
            var others = new Map();
            for(var i = 0; i < participant.length; i++)
            {
                var tem =
                {
                    "tofind": participant[i].problem.contestId+participant[i].problem.index,
                    "contestId": participant[i].problem.contestId,
                    "index": participant[i].problem.index,
                }
                if(participant[i].verdict == "OK")
                {
                    accept.set(participant[i].problem.contestId+participant[i].problem.index, tem);
                    if(participant[i].author.participantType == "CONTESTANT")
                    {
                        duringContest.set(participant[i].problem.contestId+participant[i].problem.index, tem);
                    }
                }
                else
                {
                    others.set(participant[i].problem.contestId+participant[i].problem.index, tem);
                }
            }

            console.log(duringContest);
            console.log(accept);
            console.log(others);
            var Count = 0;
            others.forEach(element =>
            {
                if(accept.get(element.tofind))
                {
                    
                }
                else
                {
                    Count++;
                    //unsolvedMap.set(element.tofind, element);
                    //total += element + " ";
                    var a = document.createElement('a');
                    var contestname = element.contestId+element.index+ " ";
                    var link = document.createTextNode(contestname);
                    a.appendChild(link);
                    a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                    document.getElementById("unsolved").prepend(a);
                }
            });
            document.getElementById("p3").innerText = Count;
            //console.log(unsolvedMap);
            //document.getElementById("show").innerText = total;


            Count = 0;
            duringContest.forEach(element=>
            {
                Count++;
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                document.getElementById("solvedContest").prepend(a);
            });
            document.getElementById("p1").innerText = Count;
            Count = 0;
            accept.forEach(element=>
            {
                Count++;
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                document.getElementById("totalSolved").prepend(a);
            });

            document.getElementById("p2").innerText = Count;

            document.getElementById("profileOutput").style.display = "";
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