function displayOff()
{
    document.getElementById("profileInput").style.display = "none";
    document.getElementById("compareProfileInput").style.display = "none";
    document.getElementById("organizationStandingInput").style.display = "none";
    document.getElementById("countryStandingInput").style.display = "none";
    //document.getElementById("developerInput").style.display = "none";


    document.getElementById("profileOutput").style.display = "none";
    document.getElementById("compareProfileOutput").style.display = "none";
    document.getElementById("organizationStandingOutput").style.display = "none";
    document.getElementById("countryStandingOutput").style.display = "none";
    document.getElementById("developerOutput").style.display = "none";

    document.getElementById("codechefProfileInput").style.display = "none";
    document.getElementById("atcodeProfileInput").style.display = "none";

    document.getElementById("codechefProfileOutput").style.display = "none";
    document.getElementById("atcodeProfileOutput").style.display = "none";
    document.getElementById("error").style.display = "none";
    
}
$(document).ready(function()
{
    $(".nav_link").click(function()
    {
      document.getElementById("welcome").style.display = "none";
      var x = $(this);
      x = x[0].id;
      var input = x+"Input";
      var output = x+"Output";
      console.log(x);
      //console.log(input);
      //console.log(output);
      if(x == "developer")
      {
         displayOff();
          document.getElementById(output).style.display = "";
      }
      else if(x != "upCommingContest")
      {
        displayOff();
        document.getElementById(input).style.display = "";
      }
    });
  });
  $(document).ready(function()
  {
    $("#home").click(function()
    {
      location.reload();
    });
  });