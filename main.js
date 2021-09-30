var url = "https://script.google.com/macros/s/AKfycbzOAqas-vlhE9V6kI__13CVuHF0eg19mMyHnw_1M4GllCgMz9M/exec";

function getData (url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            localStorage.setItem("data",JSON.stringify(myJson));
            //console.log(JSON.stringify(myJson))
        });
    return JSON.parse(localStorage.getItem("data"))    
}
//

var data = getData(url)
//console.log(data)

function removeMOE (element) {
	return element.replace(" Moe","")
}

function listNum (arry) {
	var newarry = []
	for (var i=0;i<arry.length;i++){
        newarry.push((i+1)+". "+arry[i]) }
    return newarry
}

function indexResult (indexArr,result){
    var arr = []
	indexArr.forEach((i) => {
        arr.push(data[i][result])
    });
    return arr
}

var short = "short"
var attendIndexs = []
function update(result){
    var Names =  document.querySelectorAll('.ZjFb7c');
    Names.forEach((name,i) => {
        if (removeMOE(name.textContent) == data[i].FName) {
            attendIndexs.push(i);
        }
    });

    var absentIndexs = []
    for (var i=0; i<data.length; i++){
        if (attendIndexs.indexOf(i)==-1){
            absentIndexs.push(i)
        }
    }

    if (result=='short'){
        var attend = indexResult(attendIndexs,'SName');
        attend.sort();
        var absent = indexResult(absentIndexs,'SName');
        absent.sort();
        console.log("HADIR\n"+listNum(attend).join("\n")+"\n\n"+"TIDAK HADIR\n"+listNum(absent).join("\n"));
    }
    else{
        var attend = indexResult(attendIndexs,'FName');
        attend.sort();
        var absent = indexResult(absentIndexs,'FName');
        absent.sort();
        console.log("HADIR\n"+listNum(attend).join("\n")+"\n\n"+"TIDAK HADIR\n"+listNum(absent).join("\n"))
    }
}