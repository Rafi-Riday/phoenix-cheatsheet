#### Website is created to build not too fancy yet much functional online MCQ exam platform, mainly for vocabulary questions.

##### Used technologies:
- SvelteKit
- Tailwind

##### Website contains features like:
- Website is Server Side Rendered `(SSR)`.
- Even with intensive tasks, website is much faster, powered by `Svelte JS`, Responsive with `Tailwind CSS`. In this project I found that `Svelte` is really super developer-friendly. Here DX is 10 time better than React. Also its official SSR Framework `SvelteKit` is as cool as `Next JS`.
- It only needs a several questions with only the right answer. Because the other options are generated randomly from other words. Like, if I have a word `Language A 1` and I have another word `Language B 1`, which are in this case of same meaning, then the question will be `Language A 1`, answer will be `Language B 1`, other options will be `Language C 1`, `Language D 1`, `Language E 1`...
- the `vocabulary.json` is like database, where the structure is :
`[{"n":1, "en":"Language A", "bn":"Language B"}, {...}, ...]`
- A huge calculation occurs to generate a random question set. Questions are given serially as its in the `vocabulary.json`. But options are randomly generated. Options are selected randomly from the previous 4 and next 4 words. Like, if i have 14 words (counting starts from 1 in this case), then for question 5, options will be selected from `[1,2,3,4, 6,7,8,9]`, for question 8, options will be selected from `[4,5,6,7, 9,10,11,12]`,  for question 12, options will be selected from `[8,9,10,11, 13,14,1,2]`.
---
- *Reading Section :*
  - All data from `vocabulary.json` will be displayed in a table.
  - You can filter/search a specific data using the `Search Bar` by words.
  - You can search a word in `google search` directly from here by clicking on them.
- *Test Section :*
  - Here, you can search a word in `google search` only from the question.
  - You can switch the Languages, Like from Language A to Language B or vice versa.
  - Select the right answer, after submitting, result will be shown directly in options. Options will be colored based on right, unselected right and wrong.
  - You can reset but it will generate new random Questions.
  - You can view you result in the bottom after submitting only.

##### Website : https://phoenix-batch-5-vocabulary.vercel.app/ (Caution, website maybe pass protected due to copyright law)