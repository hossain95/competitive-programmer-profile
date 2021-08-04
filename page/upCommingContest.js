function daysInMonth (month, year)
{
    return new Date(year, month, 0).getDate();
}
var feb = daysInMonth(2, new Date().getFullYear());
var day_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
day_in_months[1] = feb;

url = `https://codeforces.com/api/contest.list?gym=false`;
fetch(url).then((response)=>
{
    return response.json();
}).then((data)=>
{
    result = data.result;
    var name = [];
    var type = [];
    var time = [];
    var dur = [];
    for(i = 0; i < result.length; i++)
    {
        if(result[i].phase !== "BEFORE")
        {
            break;
        }
        name.push(result[i].name);
        type.push(result[i].type);
        time.push(result[i].startTimeSeconds);
        dur.push(result[i].durationSeconds);
    }
    for(i = name.length-1; i >= 0; i--)
    {
        //console.log(name[i] + " "+ id[i] + " "+ time[i] + " "+ dur[i]);
        var startTimes = time[i];
        //before constest start
        var totalTime = parseInt(new Date().getTime()/1000);
        var TimeStore = totalTime;

        var targetTime = startTimes;

        totalTime = targetTime-totalTime;
        var remS = totalTime%60;
        totalTime = parseInt(totalTime/60);
        var remM = totalTime%60
        totalTime = parseInt(totalTime/60);
        var remH = totalTime%24;
        totalTime = parseInt(totalTime/24);
        var remD = totalTime;
        //console.log(remD + " " + remH + " "+ remM + " "+ remS);
        //before contest end


        var myDate = new Date();
        var preD = myDate.getDate();
        var preH = myDate.getHours();
        var preM = myDate.getMinutes();
        var preS = myDate.getSeconds();
        var preMonth = myDate.getMonth();
        var preYear = myDate.getFullYear();
        //console.log(preYear+ " "+ preMonth+ " || "+ preD+ " "+ preH+ " "+preM + " "+ preS);

        var rem = Math.floor((preS+remS)/60);
        var Min = (preM+remM+rem);
        var MM = Min%60;
        rem = Math.floor(Min/60);
        Min = MM;
        var Hour = (preH+remH+rem);
        var HH = Hour%24;
        rem = Math.floor(Hour/24);
        Hour = HH;
        var Day = (preD+remD+rem);
        if(Day > day_in_months[preMonth])
        {
            Day = Day-day_in_months[preMonth];
            preMonth++;
        }
        preMonth += 1;
        if(preMonth > 12)
        {
            preYear++;
        }
        //console.log(preYear+" "+preMonth+" "+ Day+ " || "+ Hour+ " "+Min);
        var durr = dur[i];
        durr = parseInt(durr/60);
        var durHour = parseInt(durr/60);
        var durMin = durr%60;
        var ampm = "AM";
        if(Hour > 12)
        {
            ampm = "PM";
            Hour = Hour%12;
        }
        Min = check(Min);
        Hour = check(Hour);
        Day = check(Day);
        preMonth = check(preMonth);
        durHour = check(durHour);
        durMin = check(durMin);
        console.log(durHour+ " " +durMin);

        //---------------------------------------------------------------
        var tr = document.createElement('tr');
        document.getElementById("upCommingContestBody").appendChild(tr);
        tr.setAttribute("id", "id"+i);
        var td1 = document.createElement("td");
        td1.innerText = name[i];
        document.getElementById("id"+i).appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerText = type[i];
        document.getElementById("id"+i).appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerText =  durHour+":"+durMin;
        document.getElementById("id"+i).appendChild(td3);


        var td4 = document.createElement("td");
        td4.innerText =  Day + "/"+preMonth+"/"+preYear+" "+Hour+":"+Min+" "+ampm;
        document.getElementById("id"+i).appendChild(td4);
    }
});

function check(d)
{
    if(d < 10)
    {
        return (`0${d}`);
    }
    else
    {
        return d;
    }
}