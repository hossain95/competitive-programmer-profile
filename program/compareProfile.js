document.getElementById("formCompareProfile").addEventListener("submit", (e)=>
{
    e.preventDefault();
    $( "#solvedProblem").load("index.html #solvedProblem");
    $( "#commonContestId").load("index.html #commonContestId");
    
    document.getElementById("compareProfileOutput").style.display = "none";
    document.getElementById("loader").style.display = "";
    document.getElementById("error").style.display = "none";



    var handle1 = document.getElementById("user1").value;
    var handle2 = document.getElementById("user2").value;

    console.log(handle1+" "+handle2);
    (async() =>
    {
        try
        {
            var userInfo1 = await fetch(`https://codeforces.com/api/user.info?handles=${handle1}`).then(response => response.json());
            var userInfo2 = await fetch(`https://codeforces.com/api/user.info?handles=${handle2}`).then(response => response.json());

            userInfo1 = userInfo1.result[0];
            userInfo2 = userInfo2.result[0];

            document.getElementById("c-handle1").innerText = handle1;
            document.getElementById("c-handle2").innerText = handle2;

            if(userInfo1.firstName)
            {
                if(userInfo1.firstName.length > 0 && userInfo1.lastName.length > 0)
                {
                    document.getElementById("c-name1").innerText = userInfo1.firstName+" "+userInfo1.lastName;
                }
                else
                {
                    document.getElementById("c-name1").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-name1").innerText = "---";
            }
            if(userInfo1.organization)
            {
                if(userInfo1.organization.length > 0)
                {
                    document.getElementById("c-org1").innerText = userInfo1.organization;
                }
                else
                {
                    document.getElementById("c-org1").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-org1").innerText = "---";
            }
            if(userInfo1.country)
            {
                if(userInfo1.country.length > 0)
                {
                    document.getElementById("c-country1").innerText = userInfo1.country;
                }
                else
                {
                    document.getElementById("c-country1").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-country1").innerText = "---";
            }
            document.getElementById("c-rating1").innerText = userInfo1.rating;
            document.getElementById("c-maxRating1").innerText = userInfo1.maxRating;

            if(userInfo2.firstName)
            {
                if(userInfo2.firstName.length > 0 && userInfo2.lastName.length > 0)
                {
                    document.getElementById("c-name2").innerText = userInfo2.firstName+" "+userInfo2.lastName;
                }
                else
                {
                    document.getElementById("c-name2").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-name2").innerText = "---";
            }
            if(userInfo2.organization)
            {
                if(userInfo2.organization.length > 0)
                {
                    document.getElementById("c-org2").innerText = userInfo2.organization;
                }
                else
                {
                    document.getElementById("c-org2").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-org2").innerText = "---";
            }
            if(userInfo2.country)
            {
                if(userInfo2.country.length > 0)
                {
                    document.getElementById("c-country2").innerText = userInfo2.country;
                }
                else
                {
                    document.getElementById("c-country2").innerText = "---";
                }
            }
            else
            {
                document.getElementById("c-country2").innerText = "---";
            }
            document.getElementById("c-rating2").innerText = userInfo2.rating;
            document.getElementById("c-maxRating2").innerText = userInfo2.maxRating;




            var contestant1 = await fetch(`https://codeforces.com/api/user.rating?handle=${handle1}`).then(response => response.json());
            var contestant2 = await fetch(`https://codeforces.com/api/user.rating?handle=${handle2}`).then(response => response.json());
            contestant1 = contestant1.result;
            contestant2 = contestant2.result;
            //console.log(contestant1);
            //console.log(contestant2);
            var contestMap1 = new Map();
            //var contestMap2 = new Array();
            for(var i = 0; i < contestant1.length; i++)
            {
                var tem = 
                {
                    "tofind": contestant1[i].contestId,
                    "rank": contestant1[i].rank,
                }
                contestMap1.set(contestant1[i].contestId, tem);
            }
            //console.log(contestMap1);
            var countContest = 0;
            for(var i = contestant2.length-1; i >= 0; i--)
            {
                //console.log(contestant2[i].contestId);
                if(contestMap1.get(contestant2[i].contestId))
                {
                    countContest++;
                    var contest = contestant2[i].contestName;
                    var rank1 = contestMap1.get(contestant2[i].contestId).rank;
                    var rank2 = contestant2[i].rank;
                    //console.log(contest+ " "+ rank1 + " "+ rank2);

                    var tr = document.createElement("tr");
                    document.getElementById("commonContestId").appendChild(tr);
                    tr.setAttribute("id", "id"+i);
                    var td = document.createElement("td");
                    td.innerText = contest;
                    document.getElementById("id"+i).appendChild(td);

                    var td1 = document.createElement("td");
                    td1.innerText = rank1;
                    document.getElementById("id"+i).appendChild(td1);
                    var td2 = document.createElement("td");
                    td2.innerText = rank2;
                    document.getElementById("id"+i).appendChild(td2);

                }
            }

            //console.log(countContest);
            document.getElementById("user1-rank").innerText = handle1;
            document.getElementById("user2-rank").innerText = handle2;


            var user1 = await fetch(`https://codeforces.com/api/user.status?handle=${handle1}`).then(response => response.json());
            var user2 = await fetch(`https://codeforces.com/api/user.status?handle=${handle2}`).then(response => response.json());
            //console.log(user1);
            //console.log(user2);
            user1 = user1.result;
            user2 = user2.result;


            var acceptuserMap1 = new Map();
            var acceptuserMap2 = new Map();
            var runninguserMap1 = new Map();
            var runninguserMap2 = new Map();
            
            for(var i = 0; i < user1.length; i++)
            {
                var tem =
                {
                    "tofind": user1[i].problem.contestId+user1[i].problem.index,
                    "contestId": user1[i].problem.contestId,
                    "index": user1[i].problem.index,
                }
                if(user1[i].verdict == "OK")
                {
                    acceptuserMap1.set(user1[i].problem.contestId+user1[i].problem.index, tem);
                    if(user1[i].author.participantType == "CONTESTANT")
                    {
                        runninguserMap1.set(user1[i].problem.contestId+user1[i].problem.index, tem);
                    }
                }
            }
            for(var i = 0; i < user2.length; i++)
            {
                var tem =
                {
                    "tofind": user2[i].problem.contestId+user2[i].problem.index,
                    "contestId": user2[i].problem.contestId,
                    "index": user2[i].problem.index,
                }
                if(user2[i].verdict == "OK")
                {
                    acceptuserMap2.set(user2[i].problem.contestId+user2[i].problem.index, tem);
                    if(user2[i].author.participantType == "CONTESTANT")
                    {
                        runninguserMap2.set(user2[i].problem.contestId+user2[i].problem.index, tem);
                    }
                }
            }
            //console.log(acceptuserMap1);
            //console.log(runninguserMap1);
            //console.log(acceptuserMap2);
            //console.log(runninguserMap2);

            var Count = 0;
            runninguserMap1.forEach(element =>
            {
                Count++;
                //unsolvedMap.set(element.tofind, element);
                //total += element + " ";
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                if(runninguserMap2.get(element.tofind))
                {
                    a.style.color = "red";
                }
                document.getElementById("runningContestUser1").prepend(a);
            });
            //document.getElementById("runningContestHeading1").innerText = Count;
            var Count1 = Count;
            
            Count = 0;
            runninguserMap2.forEach(element =>
            {
                Count++;
                //unsolvedMap.set(element.tofind, element);
                //total += element + " ";
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                if(runninguserMap1.get(element.tofind))
                {
                    a.style.color = "red";
                }
                document.getElementById("runningContestUser2").prepend(a);
            });
            //document.getElementById("runningContestHeading2").innerText = Count;
            var Count2 = Count;
            Count = 0;
            acceptuserMap1.forEach(element =>
            {
                Count++;
                //unsolvedMap.set(element.tofind, element);
                //total += element + " ";
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                if(acceptuserMap2.get(element.tofind))
                {
                    a.style.color = "red";
                }
                document.getElementById("solvedContestUser1").prepend(a);
            });
            //document.getElementById("solvedContestHeading1").innerText = Count;
            var Count3 = Count;
            Count = 0;
            acceptuserMap2.forEach(element =>
            {
                Count++;
                //unsolvedMap.set(element.tofind, element);
                //total += element + " ";
                var a = document.createElement('a');
                var contestname = element.contestId+element.index+ " ";
                var link = document.createTextNode(contestname);
                a.appendChild(link);
                a.href = "https://codeforces.com/problemset/problem/"+element.contestId+"/"+element.index;
                if(acceptuserMap1.get(element.tofind))
                {
                    a.style.color = "red";
                }
                document.getElementById("solvedContestUser2").prepend(a);
            });
            //document.getElementById("solvedContestHeading2").innerText = Count;
            document.getElementById("firstId").innerText = handle1+" :: Contest Time Solved:: "+Count1;
            document.getElementById("secondId").innerText = handle2+" :: Contest Time Solved:: "+Count2;
            document.getElementById("thirdId").innerText = handle1+" :: Total Solved:: "+Count3;
            document.getElementById("fourthId").innerText = handle2+" ::Total Solved:: "+Count;





            document.getElementById("compareProfileOutput").style.display = "";
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