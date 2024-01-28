# Matehackers fotolog

Flog do mate rodando em <https://fotolog.matehackers.org>.

## Como postar

O flog é gerado usando o [hugo](https://gohugo.io/).

Pra rodar, você precisa do hugo na versão 0.112.1 pra cima.

Clone o repositório:

```bash
git clone git@github.com:matehackers/fotolog.git && cd fotolog
```

Certifique-se de que você tem os arquivos do tema:

```bash
git submodule update --init --recursive
```

Crie um novo post com

```
hugo new --kind post-bundle posts/meu-novo-post-no-flog
```

Isso vai criar um arquivo em `content/posts/meu-novo-post-no-flog/index.md`. Ali você pode escrever o corpo da postagem.

Para adicionar uma galeria de imagens, coloque as imagens direto no diretório do seu post e adicione

```
{{<gallery thumbnail-size="210x210" />}} {{< load-photoswipe >}}
```

em qualquer lugar da postagem.

Você pode verificar o andamento do seu post rodando

```bash
hugo server -D
```

e acessando o site em <http://localhost:1313>.

Veja um exemplo em [rango-21-01-2024](./content/posts/rango-21-01-2024/index.md).

Lembre-se de colocar `draft = false` antes de publicar o site.

## Publicando o site

O site é hospedado utilizando o github pages.

A edição dos arquivos markdown e imagens deve ser feita no branch `main`. Após finalizar a escrita do post, rode

```bash
hugo
```

Isso vai gerar um diretório `public/` com os arquivos estáticos atualizados. Faça um commit incluindo todos os novos arquivos gerados (em `content/` e `public/`)

```bash
git add .
git commit -m "publish 'meu-novo-post-no-flog'"
git push
```

Agora, mude para o branch `gh-pages` e pegue o novo diretório `public/`.

```bash
git switch gh-pages
git checkout main -- public/
```

Vamos copiar os novos arquivos para a raíz do projeto, e depois apagá-los.

```bash
git restore --staged .
rsync -avzP public/* .
rm -rf public/
```

Agora vamos subir um novo commit para publicar o blog.

```bash
git add .
git commit -m "publish 'meu-novo-post-no-flog'"
```

Para finalizar, suba as alterações no repositório.

```bash
git push
```
