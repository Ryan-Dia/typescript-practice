type Term = string;
type Definition = string;
interface Word {
  term: Term;
  definition: Definition;
}

const ERROR_MESSAGE = Object.freeze({
  existInArr: (...word: Term[]) =>
    `입력하신 단어들 중에서 ${word}는 이미 사전에 등록되어 있습니다. 해당 단어를 제외하고 업데이트가 되었습니다.`,
  exist: '해당 단어는 이미 사전에 등록되어 있습니다.',
  existTerm: '변경하시려는 용어는 이미 사전에 등록되어있어서 업데이트가 되지 않았습니다.',
  notExist: '해당 단어는 사전에 등록되어 있지 않습니다.',
});

class Dict {
  #dict: Word[];

  constructor() {
    this.#dict = [];
  }

  showAll() {
    return console.log(this.#dict);
  }

  count() {
    return console.log(this.#dict.length);
  }

  add(term: Term, definition: Definition) {
    const word = this.#dict.find((word) => word.term === term);
    if (word) return console.log(ERROR_MESSAGE.exist);
    this.#dict.push({ term, definition });
  }

  get(term: Term) {
    const word = this.#dict.find((word) => word.term === term);
    const result = word ? word.definition : ERROR_MESSAGE.notExist;
    console.log(result);
  }

  delete(term: Term) {
    const index = this.#dict.findIndex((word) => word.term === term);
    if (this.#isNotWord(index)) return console.log(ERROR_MESSAGE.notExist);
    this.#dict.splice(index, 1);
  }

  #isNotWord(index: number) {
    return index === -1;
  }

  /**
   *  단어의 용어와 정의를 모두 업데이트 하고싶다면 세 번째 인자까지 입력해줘야한다.
   *  단어의 정의만 업데이트하고자 한다면 두 번째 인자까지만 입력해주면 된다.
   *
   *  @param term 사전에 이미 있는 용어
   *  @param newDefinition 업데이트 하고자하는 단어의 정의
   *  @param newTerm 업데이트 하고자하는 용어
   */
  update(term: Term, newDefinition: Definition, newTerm?: Term) {
    const word = this.#dict.find((word) => word.term === term);
    if (!word) {
      console.log(ERROR_MESSAGE.notExist);
      return true;
    }
    if (newTerm) {
      const sameTerm = this.#dict.find((word) => word.term === newTerm);
      if (sameTerm) return console.log(ERROR_MESSAGE.existTerm);
      word.term = newTerm;
    }
    word.definition = newDefinition;
  }

  upsert(term: Term, newDefinition: Definition, newTerm?: Term) {
    if (this.#isNotWords(term, newDefinition, newTerm)) {
      newTerm ? this.add(newTerm, newDefinition) : this.add(term, newDefinition);
    }
  }

  #isNotWords(term: Term, newDefinition: Definition, newTerm?: Term) {
    return this.update(term, newDefinition, newTerm);
  }

  exists(term: Term) {
    const word = this.#dict.find((word) => word.term === term);
    const result = word ? ERROR_MESSAGE.exist : ERROR_MESSAGE.notExist;
    console.log(result);
  }

  bulkAdd(wordsInArr: Word[]) {
    const sameWords = this.#findSameWords(wordsInArr);
    if (this.#isSameWords(sameWords)) {
      this.#addWithoutDuplcation(sameWords, wordsInArr);
      return console.log(ERROR_MESSAGE.existInArr(...sameWords));
    }
    this.#dict = [...this.#dict, ...wordsInArr];
  }

  #findSameWords(wordsInArr: Word[]) {
    return wordsInArr.reduce<Term[]>((acc, cur) => {
      const sameWord = this.#dict.find((wordInDict) => wordInDict.term === cur.term);
      if (sameWord) acc.push(sameWord.term);
      return acc;
    }, []);
  }

  #isSameWords(sameWords: string[] | []) {
    return sameWords.length;
  }

  #addWithoutDuplcation(sameWords: string[], wordsInArr: Word[]) {
    const newWordsInArr = wordsInArr.filter((word) => !sameWords.includes(word.term));
    this.#dict = [...this.#dict, ...newWordsInArr];
  }

  bulkDelete(termInArray: Term[]) {
    termInArray.forEach((term) => this.delete(term));
  }
}

const dic = new Dict();

// ---------test---------------------

dic.add('김치', '맛있어요');
dic.add('고기', '먹고싶어요');
dic.add('바나나', '맛있니?');
dic.add('국수', '결혼식에서 먹는거 맛남');
dic.add('사과', '제일좋아하는 과일');

dic.showAll();

dic.get('곰탕'); //등록되어있지 않습니다.
dic.delete('고기'); // ok
dic.delete('참치'); // 등록되어있지 않습니다.

dic.update('사과', '너무 비싸', '딸기'); // 딸기 - 너무 비싸
dic.showAll();

dic.upsert('딸기', '짱짱비싸', '국수'); //국수는 이미 사전에 등록되어 있음
dic.add('김치', '얼마지요즘?'); // 이미 사전에 등록되어있음
console.log('---------');

dic.showAll();
console.log('*********');

dic.bulkAdd([
  { term: '김치', definition: '대박이네~' },
  { term: '도라지', definition: '대박이네~' },
  { term: '바나나', definition: '먹고싶다' },
  { term: '국수', definition: '오이시' },
]); // 김치, 바나나, 국수 빼고 도라지만 추가
dic.showAll();

dic.exists('토마토'); // 등록되어있지 x
dic.bulkDelete(['김치', '딸기', '국수']); // 바나나, 도라지만 남음
dic.showAll();
