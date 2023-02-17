# Dict 클래스 만들기

## add( term, definition ) : void

> Dict에 단어를 추가하는 메서드

```
term : 단어의 용어
definition : 단어의 정의
```

## get() : string

> 단어의 정의를 리턴함

## delete(term) : void

> 단어를 삭제함

```
term : 단어의 용어
```

## showAll() : Word[]

> 사전 단어를 모두 보여줌

## count() : number

> 사전 단어들의 총 개수를 리턴함

## upsert(Term, newDefinition, newTerm) :void

> 단어를 업데이트 함. 존재하지 않을시, 이를 추가함

```
term : 사전에 이미 있는 용어
newDefinition : 업데이트 하고자하는 단어의 정의
newTerm : 업데이트 하고자하는 용어
```

## exists(term) : boolean

> 해당 단어가 사전에 존재하는지 여부를 알려줌

원래는 boolean을 return 해야하지만 콘솔로만 작동하도록 하여 console.log만표기

## bulkAdd(wordsInArr) :void

> 여러개의 단어를 한번에 추가할 수 있음

```
wordsInArr : 단어의 용어와 정의가 들어있는 객체를 감싼 array
```

## bulkDelete(termInArray) :void

> 여러개의 단어를 한번에 삭제할 수 있게 도와준다.

```
termInArray : 삭제하고자 하는 단어의 용어가 들어있는 array
```
