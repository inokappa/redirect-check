# redirect-check

## これは

* HTTP リダイレクトの設定が意図した通りに行われるかをチェックする仕組みです

## セットアップ

```sh
$ npm i
$ docker-compose up -d
```

## 使い方

### redirects.txt を作成

以下のように redirects.txt を作成します.

```sh
# PATH TARGET STATUS_CODE
/yahoo/ https://yahoo.co.jp/ 301
/google/ https://google.com/ 301
/ore/ https://oreno.tools/ 301
```

## 実行

```sh
$ docker-compose exec -e BASE_URL=http://10.0.102.10:19190 checker yarn run mocha
```

以下のように出力されます.

```sh
$ docker-compose exec checker yarn run mocha
yarn run v1.22.0
$ /work/node_modules/.bin/mocha


  redirect 301 checks
    ✓ Testing code of http://10.0.102.10:19190/yahoo/
    ✓ Testing code of http://10.0.102.10:19190/google/
    ✓ Testing code of http://10.0.102.10:19190/ore/

  redirected site 200 checks
    ✓ Testing code of http://10.0.102.10:19190/yahoo/ (281ms)
    ✓ Testing code of http://10.0.102.10:19190/google/ (242ms)
    ✓ Testing code of http://10.0.102.10:19190/ore/ (245ms)


  6 passing (819ms)

Done in 2.65s.
```

実サービスの検証等で利用する場合には `BASE_URL` を実サービスに置き換えると良いと思います.

```sh
$ docker-compose exec -e BASE_URL=https://your-service checker yarn run mocha
```
