var data = null;//guarda a resposta do servidor com os dados retornados do swapi.

// responsavel pela criação da interface dos filmes(Renderizado com React)
function BuildUI(films){
    var divApp = document.getElementById('RootApp');   
    var keyComponent = 1;
    var UIfilms = films
    .map(function(films) {
        return React.createElement('div', {className: "column is-one-quarter-tablet is-half-touch", key: keyComponent++},
            React.createElement('div', {onClick: () => populateModal(films.title, films.opening_crawl, films.episode_id), className: "card", style:{background: "rgba(54, 54, 54, 0.45)", padding:"0.5em", height:"100%"}},
                React.createElement('div', {className: "card-image"},
                    React.createElement('figure', {className: "image is-2by3"},
                        React.createElement('img', {src: "images/filmVHS/film"+ films.episode_id + ".png"},
                        )
                    )
                ),
                React.createElement('div', {className: "card-content is-paddingless"},
                    React.createElement('div', {className: "media"},
                        React.createElement('div', {className: "media-content", style:{paddingTop:"0.5em"}},
                            React.createElement('p', {className: "title is-6 has-text-white"}, films.title),
                            React.createElement('p', {className: "subtitle is-7 has-text-white"}, fixDate(films.release_date))
                        )
                    ),
                    React.createElement('div', {className: "content has-text-white"}, films.opening_crawl.substring(0, 100) + "...")  
                ),
                React.createElement('div', {className: "card-footer", style:{}},
                    React.createElement('p', {className: "card-footer-item has-text-white"}, "Clique para ver mais")
                )
            )
        );       
    });
    var rootElement =
        React.createElement('section', {className: ""}, 
        React.createElement('div', {className: "container"}, 
        React.createElement('div', {className:"row is-mobile is-centered"},
        React.createElement('div', {className:"column is-two-thirds-tablet is-four-fifths"},
        React.createElement('div', {className: "row is-mobile is-multiline"}, UIfilms))))
    );
    divApp.classList.add("animate");
    ReactDOM.render(rootElement, divApp);
}

//função responsavel pelo get das informações do swapi
function GatherSWInformation(){
    var request = new XMLHttpRequest()

    request.open('GET', 'https://swapi.dev/api/films/', true)//acessp ao api

    request.onload = function() {
        console.log(this.status);
        if(this.status === 500 || this.status === 404){
            displayError(this.status);//ja aconteceu do site estar fora do ar, mostra um botão para tentar pesquisar novamente
        }else{            
            var divApp = document.getElementById('RootApp');   

            divApp.style.opacity = "0";
            //se trouxe dados do api, organiza os dados e monta a UI
            var reorderedFilms = new Array();
            data = JSON.parse(this.response);    
            reorderedFilms = orderMovie(0);
            BuildUI(reorderedFilms);   
        }
    }
    request.onreadystatechange  = function(){
        displayError(this.status);
    }
    // Send request
    request.send()
}
//em caso do site estar fora do ar, mostra na tela uma mensagem para o usuario tentar pesquisar novamente
function displayError(status){
    var rootElement =
        React.createElement('div', {className: "card", style:{background: "#ef2e55", padding:"0.5em", height:"100%"}},           
            React.createElement('div', {className: "card-content is-paddingless"},               
                React.createElement('div', {className: "content"}, 
                    React.createElement('p', {className: "title is-4 has-text-centered has-text-white"}, "Não foi possível buscar os filmes. O site está fora do ar.")
                )  
            ),
            React.createElement('div', {className: "card-footer", style:{}},
                React.createElement('p', {className: "card-footer-item has-text-white"}, React.createElement('button', {onClick:() => GatherSWInformation(),className: "button is-danger is-light"}, "Buscar Novamente")
                )
            )
        );
    var divApp = document.getElementById('RootApp');
    ReactDOM.render(rootElement, divApp);
    setTimeout(function(){divApp.style.opacity = "1";},1500);
}

//Para cada fã existe uma sequencia correta, eu resolvi colocar duas, cronologica que abrange os eventos em sequencia e Lançamento, que segue as datas de lançamento de cada filme
function orderMovie(order){     
    let ordering = [[1,2,3,4,5,6,7],[4,5,6,1,2,3,7]];
    let reorderedData = new Array();
    ordering[order].forEach(order => {
        data.results.forEach(films => {
            if(films.episode_id == order){
                reorderedData.push(films);
            }
        });
    });  
    return reorderedData;
}

//função para o select trocar a ordenação dos filmes
function changeOrder(reorder){
    BuildUI(orderMovie(reorder));
}

//Servia para controlar a musica, mas agora utilizo os controles proprios do html5 
// function AudioControl(ctrl){
//     var audioPlayer = document.getElementById("audioplayer");
//     if(audioPlayer.paused){
//         ctrl.innerHTML = "Pause"
//         audioPlayer.pause();
//     }else{
//         ctrl.innerHTML = "Play"
//         audioPlayer.play();
//     }
// }

/* Inicializa meu programa */
function Initialization(){                
    //Desde 2017, o google não permite mais o browser tocar sons ou videos sem o consentimento do usuario, ele precisa fazer uma ação antes do browser reagir.
    const isMobile = navigator.maxTouchPoints || "ontouchstart" in document.documentElement;       
    document.body.addEventListener(isMobile ? "touchend" : "click", play, { once: true });
        
    GatherSWInformation();//assim que o site carrega, eu tento puxar os filmes.  
}

//uma funçãozinha para eu trocar os dados do modal, quando voce clica em um filme
function populateModal(title, content, image){
    document.getElementById("modal-title").innerHTML = title;
    document.getElementById("modal-content").innerHTML = "<p class='title is-4 has-text-white'>" + content + "</p>";
    document.getElementById("modal-film").classList.add("is-active");
}

/* poem para tocar a musica em conjunto com o listener colocado na inicialização*/
function play(){
    var audioPlayer = document.getElementById("audioplayer");    
    audioPlayer.play();
    
    audioPlayer.volume = 0.1;
} 

//arruma a data que vem no json para padrão BR
function fixDate(data){
    return data.substring(8, 10) + "/" + data.substring(5, 7) + "/" + data.substring(0, 4);
}
