const numerosenha = document.querySelector('.parametro-senha__texto');
let tamanhosenha = 12;
numerosenha.textContent = tamanhosenha;
const letrasmaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasminusculas = 'abcdefghijklmopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const camposenha = document.querySelector ('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcasenha = document.querySelector('.forca');

botoes[0].onclick = diminuitamanho;
botoes[1].onclick = aumentatamanho;

function diminuitamanho(){
    if(tamanhosenha > 1){
        tamanhosenha--;
    }
    numerosenha.textContent = tamanhosenha;
    gerasenha();
}
function aumentatamanho(){
    if(tamanhosenha < 20){
        tamanhosenha++;
    }
    numerosenha.textContent = tamanhosenha;
    gerasenha();
}
for (let i = 0; i < checkbox.length; i++){
    checkbox[i].onclick = gerasenha;
}
gerasenha();

function gerasenha(){
    let alfabeto = '';
    if (checkbox[0].checked){
        alfabeto += letrasmaiusculas;
    }
    if (checkbox[1].checked){
        alfabeto += letrasminusculas;
    }
    if (checkbox[2].checked){
        alfabeto += numeros;
    }
    if (checkbox[3].checked){
        alfabeto += simbolos;
    }
    let senha = '';

    for(let i = 0; i < tamanhosenha; i++){
        let numeroaleatorio = Math.random() * alfabeto.length;
        numeroaleatorio = Math.floor(numeroaleatorio);
        senha += alfabeto[numeroaleatorio];
    }
    camposenha.value = senha;

    classificasenha(alfabeto.length);
}

function classificasenha(tamanhoalfabeto){
    let entropia = tamanhosenha * Math.log2(tamanhoalfabeto);
    forcasenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcasenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcasenha.classList.add('media');
    } else if (entropia <= 35){
        forcasenha.classList.add('fraca');
    }  

    const valorentropia = document.querySelector('.entropia');
    const dias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));
    const anos = Math.floor(dias / 365.25);
    const meses = Math.floor((dias % 365.25) / 30.44);

    if (anos > 0 && meses > 0) {
        valorentropia.textContent = "um computador pode levar até " + anos + " anos e " + meses + " meses para descobrir esta senha";
    } else if (anos > 0) {
        valorentropia.textContent = "um computador pode levar até " + anos + " anos para descobrir esta senha";
    } else if (meses > 0) {
        valorentropia.textContent = "um computador pode levar até " + meses + " meses para descobrir esta senha";
    } else {
        valorentropia.textContent = "um computador pode levar menos de um mês para descobrir esta senha";
    }
}
