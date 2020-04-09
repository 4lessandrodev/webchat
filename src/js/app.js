
//Lista de nome aleatorios 
var nomes = [
  "Goku",
  "Vedita",
  "Goham",
  "Gotem",
  "Trunks",
  "Mestre Kame",
  "Yamtcha",
  "Kuririm",
  "Videl",
  "Picolo",
  "Bulma",
  "Kami Sama",
  "Majim boo",
  "Mister Satam",
  "Darth Vader",
  "Pequeno Yoda",
  "Mestre Yoda",
  "Jedai",
  "Leia",
  "O lado negro",
  "Perdido",
  "Lobo Mal",
  "Chapeuzinho",
  "Eduard",
  "Cristian Grey",
  "Bob esponja",
  "Naruto",
  "Sask",
  "Raposa",
  "Frodo",
  "Peter Parker",
  "Venon",
  "Sr Stark",
  "Pops",
  "Capitão America",
  "Homem de ferro",
  "Viuva negra",
  "Hulk",
  "Homem formiga",
  "Fumiga",
  "Ota Fumiga",
  "Alcool em gel",
  "Corona Vairus",
  "Galinha Pintadinha",
  "Tomy",
  "Kiberly",
  "Adam",
  "Zack",
  "Alpha",
  "Zord",
  "Triny",
  "Billy",
  "Jazom",
  "Rita",
  "Gollum",
  "Gandalf",
  "Legolas",
  "Aragorn",
  "Arwen",
  "Galadriel",
  "Bilbo",
  "Faramir",
  "Harry Potter",
  "Herminione",
  "Ron Weasley",
  "Luna",
  "Draco Malfoy",
  "Dolores",
  "Dumbledore",
  "Han Solo",
  "Chewbacca",
  "Rey",
  "Luke",
  "Obi-Wan",
  "R2D2",
  "Finn",
  "Sasuki",
  "Sakura",
  "Gaara",
  "Jiraya",
  "Tsunake",
  "Neji",
  "Nagato",
  "Rock Lee",
  "Shino",
  "Gohan",
  "Pica-Pau",
  "He-man",
  "Lion-O",
  "Cheetara",
  "Panthro",
  "Tygra",
  "Snarf",
  "Jaga",
  "Pink",
  "Cérebro",
  "Zé Colmeia"
];


// faz com que seja possível enviar mensagens com Enter
document.getElementById('menssagem').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    enviar_menssagem();
  }
});
// inicia o client socketIO
var socket = io();
// Abre um popup perguntando o nome da pessoa
var nome_usuario = '';
swal("Informe seu apelido (Opcional)", {
  content: "input",
})
  .then((value) => {
    if (value == undefined || value == '' || value == " " || value == null) {
      nome_usuario = nomes[Math.floor(Math.random() * nomes.length)];

    } else {
      // Caso usuário não informe um nome será atribuido um nome aleatório da lista
      nome_usuario = value;

    }
    socket.emit('chat message', `${nome_usuario} entrou na conversa`);
    document.querySelector('#entrar').play();
  });


// adiciona um addEventListener para o botão de submit
document.getElementById('enviar_menssagem').addEventListener("click", enviar_menssagem);
// cria a função que conecta no websocket e emite a mensagem
function enviar_menssagem() {
  // salva a mensagem como uma string
  msg = document.getElementById('menssagem').value;
  if (msg.length > 0) {

    // concatena o nome de usuário e a mensagem para enviar ao socketIo
    socket.emit('chat message', `${nome_usuario}: ${msg}`);
    // reseta o valor do input da mensagem
    document.getElementById('menssagem').value = "";
  }
}
// sempre que receber uma mensagem ela é adicionada a lista
socket.on('chat message', function (msg) {
  // busca o elemento UL
  let ul = document.getElementById("messages");
  // cria um elemento LI
  let li = document.createElement('li');
  // cria o elemento de quebra de linha
  let br = document.createElement('br');
  li.appendChild(document.createTextNode(msg));
  // adicionar o nome do usuário quebra a linha e adicionar a mensagem à lista de mensagems
  ul.appendChild(li);
  //Rolar a pagina para o final
  document.querySelector('#mensagem').play();
  var mensagens = document.querySelector('#mensagens');
  mensagens.scrollTo(0, mensagens.scrollHeight);
});



document.querySelector('.div-btn-icon').addEventListener('click', function () {
  document.querySelector('#icons').classList.toggle('display-none');
});

document.querySelector('#icons').addEventListener('click', function (e) {
  document.querySelector('#icons').classList.toggle('display-none');
  document.getElementById('menssagem').value = document.getElementById('menssagem').value + ' ' + e.target.textContent;
});
