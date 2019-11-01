# Star Wars Project
## Descrição

Venho por meio desta aplicação demonstrar meu conhecimento e aptidão em desenvolvimento web. Como esta prova não é de caráter eliminatório, decidi construir minha aplicação utilizando **ReactJS**, assim posso demonstrar meu talento com HTML, CSS, JS e de quebra aprender algo novo, já que estou muito familiarizado com Angular, mas não conhecia React.

Através do próprio site oficial ReactJS.org, descobri alguns pontos interessantes que vale comentar aqui a fim de explicar como foi planejada e executada esta aplicação. Após ter lido a documentação inicial, descobri que a maioria dos desenvolvedores utilizavam React, em conjunto com Node.JS, JSX(React JavaScript) e npm(node package manager) para a construção e renderização das views pelo Server Side. Também ficou claro que React na verdade é apenas uma ferramenta que ajuda na construção de views, e não um framework completo como Angular, deste modo sendo possível sua utilização pelo client side e sem a necessidade de uso das aplicações acima. 

Então, pelo fato de a instalação server side se resumir a baixar os pacotes via NPM e então subir o servidor com o node, decidi simplificar tudo e focar no que realmente interessa, o Front Side.

**A aplicação foi construida com base em flexbox, o futuro da responsividade nos browsers. Focado primeiramente em mobile, o site funciona em todo e qualquer dispositivo. Testado no chrome, opera e Edge.**

## Como rodar a aplicação?

Para executar a aplicação, é necessário apenas executar o arquivo index.html com um browser compatível com ES6(Como requerido na descrição da vaga).

## Teste unitário

Para ter certeza de que o programa está funcionando corretamente, vou listar os passos que a aplicação faz. Quando o usuario acessa o site, o mesmo automaticamente vai atras do star wars api para procurar os dados, caso o site esteja fora do ar ou algum erro aconteça, o mesmo vai mostrar uma mensagem em vermelho explicando o que aconteceu e vai fornecer um botão para o usuario procurar as informações novamente. O site, ao ser redimensionado ou visto de um aparelho mobile ou table, vai se auto adequar a tela e proporção do dispositivo. 

Por questões de segurança e para evitar a invasão do espaço do usuario, os browsers atuais não permite que seja executado um audio ou video sem que o usuario tenha pelo menos uma vez interagido com o site que abriu, por este motivo, a musica do tema starwars toca apenas depois de haver esta interação.

No topo do site, é esperado que o usuario possa pausar a musica e alterar o volume. Assim como, mudar a ordenação dos resultados, já que entre os fãs de star wars, existe algumas ordenações corretas, dentre elas coloquei duas, por lançamento e por ordem cronologica de tempo definida dentro do universo star wars.

Ao clicar em um filme, é esperado que abra uma janela modal para o usuario ver na integra a descrição do filme, ja que por questões de experiencia do usuario ele apenas pode ver um trecho na listagem dos filmes


