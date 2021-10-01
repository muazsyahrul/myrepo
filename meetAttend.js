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

function listName (){
    var name = [];
    for (var i=0; i<data.length; i++){
        name.push(data[i]['FName']);
    }
    return name
}

function getByValue (value,key) {
    var search_Key = Object.keys(data[0]);
    search_Key.forEach((k) => {
        var result = data.findIndex(std=> std[k] == value)
        if (result>-1){
            localStorage.setItem('index',result)
        }
        
    })
    var index = localStorage.getItem('index')
    return data[index][key]
}

//Open list people
var selector = '#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.TqwH9c > div.SZfyod > div > div > div:nth-child(2) > span > button';
$(selector).click();

var short = "short"
var attendNames = []

function update(result){
    var Names = document.querySelectorAll('.ZjFb7c');
    Names.forEach((n) => {
    	var name = removeMOE(n.textContent)
        if ( listName().indexOf(name)>=0 && attendNames.indexOf(name)==-1) {
            attendNames.push(name);
        }
    });

    var absentNames = []
    for (var i=0 , l=data.length ; i<l; i++){
        var name = listName()[i]
        if (attendNames.indexOf(name)==-1){
            absentNames.push(name)
        }
    }

    attendNames.sort();
    absentNames.sort();

    if (result=='short'){
        var attend = attendNames.map(function(a) {return getByValue(a,'SName')});
        var absent = absentNames.map(function(a) {return getByValue(a,'SName')});
        console.log("HADIR\n"+listNum(attend).join("\n")+"\n\n"+"TIDAK HADIR\n"+listNum(absent).join("\n"));
    }
    else{
        console.log("HADIR\n"+listNum(attendNames).join("\n")+"\n\n"+"TIDAK HADIR\n"+listNum(absentNames).join("\n"))
    }
}

update()
setInterval(update,(5*60000))
