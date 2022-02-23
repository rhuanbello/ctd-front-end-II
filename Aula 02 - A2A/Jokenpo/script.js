const userInput = (round) => {
  return parseInt(prompt(`Decida entre Pedra (1), Papel (2), Tesoura (3) no Round ${round + 1}`));
}

const randomChoice = () => {
  return parseInt(Math.random() * 3 + 1);

}

const match = (plays, i, username) => {

  let { maoUsuario, maoMaquina } = plays;

  // estrutura de decisao que sera executada em cada iteracao do for
  switch (maoUsuario[i]) {
    case maoMaquina[i]:
      break;
    case 1:
      if (maoMaquina[i] == 2) {
        plays.maquinaPoints++;
      } else {
        plays.usuarioPoints++;
      }
      break;
    case 2:
      if (maoMaquina[i] == 1) {
        plays.usuarioPoints++;
      } else {
        plays.maquinaPoints++;
      }
      break;
    case 3:
      if (maoMaquina[i] == 1) {
        plays.maquinaPoints++;
      } else {
        plays.usuarioPoints++;
      }
      break;
    default:
      alert('Informe um número correto! Número informado: ', maoUsuario[i]);
  }

  // função para exibir os resultados de cada round no console.log
  roundMessage(plays, i, username);

}

const roundMessage = (plays, round, username) => {
  let { maoMaquina, maoUsuario, maquinaPoints, usuarioPoints } = plays;

  console.log('Round n°', round + 1)
  console.log('Máquina decidiu', maoMaquina[round])
  console.log(`${username} decidiu`, maoUsuario[round])
  console.log('Pontos da Máquina', maquinaPoints)
  console.log(`Pontos do ${username}`, usuarioPoints)
  
}

const handleFinalResult = (plays, username) => {
  const { maquinaPoints, usuarioPoints } = plays;

  confirm(`Fim de Jogo! ${username} fez ${usuarioPoints} ponto(s) e Máquina fez ${maquinaPoints} ponto(s)`)

  if (usuarioPoints < 2 && maquinaPoints < 2) {
    alert(`Baseado nas regras do jogo, só é declarado vencedor quem ganhou duas rodadas :(`);

  } else {

    if (maquinaPoints > usuarioPoints) {
      alert(`${username} perdeu! Máquina venceu com ${maquinaPoints} pontos! ❌`);
  
    } else if (maquinaPoints < usuarioPoints) {
      alert(`${username} venceu com ${usuarioPoints} pontos! Parabéns ✔`);
  
    } else {
      alert('Empate, tente novamente');
  
    }
  
  }
  
  confirm('Deseja jogar novamente?') && initJokenpo(username);

}

const playMatches = (maxRounds, username) => {

  // armazenando todas as variaveis necessarias em um objeto, para facilitar o transporte
  const plays = {
    maoUsuario: [],
    maoMaquina: [],
    maquinaPoints: 0,
    usuarioPoints: 0
  }

  // desestruturando o objeto
  const { maoUsuario, maoMaquina } = plays;

  // loop ocorrerá de acordo com quantos rounds usuario digitou
  for (i = 0; i < maxRounds; i++) {
    maoUsuario.push(userInput(i)); // pra cada entrada do usuario, será enviado o valor ao array
    maoMaquina.push(randomChoice()); 
    match(plays, i, username)
    
  }

  handleFinalResult(plays, username)

}

const initJokenpo = (username) => {

  // caso já tenha nome de usuário registrado, pule o bem-vindo e a inserção de nome
  if (username) {
    const maxRounds = prompt('Digite quantos rounds deseja jogar abaixo:')
    playMatches(maxRounds, username);

  } 

  const decision = confirm('Bem-vindo ao Jokenpô! Pressione OK para continuar. 🚀');

  if (decision) {
    const maxRounds = prompt('Digite quantos rounds deseja jogar abaixo')
    const username = prompt('Insira o seu nome de usuário abaixo:')
    playMatches(maxRounds, username);

  }


}

initJokenpo();