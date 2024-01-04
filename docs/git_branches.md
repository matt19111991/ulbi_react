## Модели ветвления Git
### [Git Flow](../src/shared/assets/git/git-flow.png)
  - Классический пример использования
  
  - `Master` ветка - источник истины, production состояние. Делать коммиты напрямую в нее нельзя
  
  - `Develop` ветка - ветка, от которой ответвляются `feature` ветки

  - `Feature` ветка - ветка, в которой ведется разработка, проводится тестирование.
    Могут быть долгоживущими и ответвляться в другие небольшие ветки 
    (например, для исправления багов)
    
  - Когда разработка в `feature` ветке окончена, ветка вливается в `develop` ветку
  
  - По необходимости от `develop` ветки ответвляем `release` ветку, отлаживаем ее и
    мержем в `master` ветку

  - Минусы: потенциальные `merge conflicts` в большом количестве
  - Плюсы: подходит больше для монолитов и больших проектов

### [Trunk based](../src/shared/assets/git/trunk-based.png)
  - `Master` ветка - основная ветка, от которой ответвляются `release` ветки,
    `production` состояние

  - Нет ветки `develop`

  - `Release` ветки короткоживущие, итеративные, по готовности мержатся в 
    `master` ветку

  - `Feature flags`: неготовый функционал отключаем на основе какого-нибудь 
    простого условия (`isNewFeatureEnabled: false`) и конечный пользователь его
    не видит

  - Минусы: в `master` ветке может лежать сырой функционал
  - Плюсы: скорость, подходит больше для простых проектов, прототипов, `SPA` и 
    микрофронтендов