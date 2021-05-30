'use strict';

const btn = document.getElementById("copyText");
const uncopy = document.getElementById("uncopyText");
const text_input = document.getElementById('text_input');
const text_input1 = document.getElementById('text_input1');
const text_out = document.getElementById('text_out');
const text_outkey = document.getElementById('text_out1');
const text_unencrypt = document.getElementById('unencrypt');
const button = document.getElementById('button');
const rad = document.getElementsByName('dzen');

text_out.innerHTML = '';
text_out1.innerHTML = '';
const characterSpan = document.createElement('span');
const characterSpan3 = document.createElement('span');

const allsymbols = '1234567890-=+[];/.<>~@#$^&()_!L:HAGWYIMNBCVXZSJ*"?№×÷|';
const string = allsymbols.split('');   
text_unencrypt.innerHTML = '';
const characterSpan2 = document.createElement('span');
 
const checking = (expression) => {
    const english = /^[a-zA-Z0-9]+$/;
    const aftercheck = expression.split('');
    for ( let i = 0; i < aftercheck.length; i++){
        if (english.test(aftercheck[i])){
            window.alert('Ангийский не подходит');
            throw e;   
        } 
    }
    if (expression === null || expression === ''){
         alert('Вы ничего не ввели');
         throw e;
    }
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

const randomsymbol = () =>{//функция генерации символа
    const rand = randomInteger(1, string.length-1);
    const ressym = string[rand];
    string.splice(rand, 1); 
    return ressym;
}

const generatekey = () =>{//функия генерирования ключа
    let key = [];
    let randomnum = 0;
    const side = randomInteger( 1, 10 );    
    for (let c = 0; c < side; c++){
        randomnum = randomInteger(0, 99);
        key.push( randomnum );
}
    const result1 = key.join('');
    return result1;
}

const result = {
    key:  {
        name: 0,
        cod: 0,
    },
    coddingresult: 0,
}

const codding = () => {//функция кодировки
    const checks = checking(text_input.value);
    const alphabet = {
    }

    let res = text_input.value.split('');
    const lenght = res.length;
    const generatedkey = generatekey();//генерируем ключ
    
    let newalphabet = alphabet;
    
    
    if ( rad[1].checked ){
        for (let j = 0; j < lenght; j++){// создаём алфавит символов в тексте 
            alphabet[res[j]] = res[j];
        }    
        
        for ( const keys  of Object.keys( newalphabet ) ){ //генерируем рандомный символы для каждой буквы
                newalphabet[keys] = randomsymbol();
            }
        for ( let i = 0; i < lenght; i++ ){ //кодируем наш текст
            for ( const keys  of Object.keys( alphabet ) ){
                if ( res[i] == keys ){
                res[i] = newalphabet[keys];
                 } 
            }
        }
    res = res.join('');
    result.key.name = generatedkey;
    result.key.cod = newalphabet;
    result.coddingresult = res;
    characterSpan3.innerText = result.key.name;
    text_outkey.appendChild(characterSpan3);
    characterSpan.innerText = result.coddingresult;
    text_out.appendChild(characterSpan);
    
    }

//}

//вывод зашифрован текста
//const uncodding = (key1, text) =>{//функия раскодировки
    if ( rad[0].checked ){
        let res1 = text_input1.value.split('');
        for ( let i = 0; i < res1.length;i ++ ){
            for ( const keys  of Object.keys( result.key.cod ) ){
                if ( res1[i] == result.key.cod[keys] ){
                    res1[i] = keys;
                }
            }
        }
        res1 = res1.join('');
        characterSpan2.innerText = res1;
        text_unencrypt.appendChild(characterSpan2);
    }
}

btn.onclick = function() {
    navigator.clipboard.writeText(result.coddingresult);
   }

document.querySelector('button').onclick = codding;
