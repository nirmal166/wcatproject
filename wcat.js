
  
let fs=require('fs');
let path=require('path');
let input =process.argv.slice(2);
//segregate using -
let file=[];
let option=[]
for(let idx in input){
    let temp=input[idx].charAt(0);
    if(temp=='-'){
        option.push(input[idx]);
    }else{
        file.push(input[idx]);
    }
}
let checkNOption=option.includes('-n');
let checkBOption=option.includes('-b');
if(checkBOption && checkNOption){
    console.log("bro not possible -n and -b command both in one time");
    return;
}
//check dir exits or not
for(let idx in file){
    let ans=fs.existsSync(file[idx]);
    if(ans==false){
        console.log("file doesnt exit ");
        return;
    }
}
//exit than add all dir content and print on console
let content="";
let newcontent;
for(let idx in file){
    content=content+fs.readFileSync(file[idx])+"\r\n";
   
}

// handel -s option for multi enter change in single
let checkSOption=option.includes('-s');
if(checkSOption){
content =checkSOptionfunc(content);
}
// handel -n option for add number at first for all line
if(checkNOption){
    content=checkNOptionfunc(content);
}
//handel -b
if(checkBOption){
    content=checkBOptionfunc(content);
}

//print content
console.log(content);

//all function definations

function checkSOptionfunc(content){
    newcontent =content.split("\r\n");
        for(let idx in newcontent){
            if(newcontent[idx]=="" && newcontent[idx-1]==""){
                newcontent[idx]=null;
            }else if(newcontent[idx]=="" && newcontent[idx-1]==null){
                newcontent[idx]=null;
            }
        }
        let tempArr=[];
        for(idx in newcontent){
            if(newcontent[idx]!=null){
            tempArr.push(newcontent[idx]);
            }
        }
    content=tempArr.join('\n');
    return content;
}

function checkNOptionfunc(content){
    newcontent=content.split('\n');
    let tempArr=[];
    for(let idx in newcontent){
        let temp=Number(idx)+1;
        tempArr.push(temp+newcontent[idx]);
    }
    newcontent=tempArr.join('\n');
    return newcontent;
}
function checkBOptionfunc(content){
    newcontent=content.split('\n');
    console.log(newcontent)
    let tempArr=[];
    let count=1;
    for(let idx in newcontent){
        if(newcontent[idx]=="\r"||newcontent[idx]==""){
        tempArr.push(newcontent[idx]);
        }else{
            tempArr.push(count+newcontent[idx]);
            count+=1;
        }
    }
    newcontent=tempArr.join('\n');
    return newcontent;
}