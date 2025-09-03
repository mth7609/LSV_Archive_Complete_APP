
class C {
  set content(val) {
    this.contentValue = val;
  }

  get content() {
    return this.contentValue;
  }
}

let globalStates = new C();
let globalTopicHeadlines = new C();
let globalTopicItems = [];
let globalDatasetItems = [];
let globalInfoLabels = new C();
let globalTopHeadlines = new C();
let globalDataset = new C();
let globalDatasetNumbers = new C();
let i;

for (i = 0; i < 11; i++) {
  globalTopicItems[i] = new C();
}

for (i = 0; i < 32; i++) {
  globalDatasetItems[i] = new C();
}

export { globalDatasetNumbers, globalDataset, globalStates, globalTopicHeadlines, globalTopicItems, globalDatasetItems, globalTopHeadlines, globalInfoLabels }