# TriviaGame
This is a geography inspired trivia game

1. User gets to the first block and is asked to participate
2. if user clicks yes then it goes shows the questions
3. user gets 330 seconds to answer 15 questions
   - the time would show up on top (sticky header)
   - if they choose the right answer, then they get a point, if not they get nothing
   - the game would keep track of the answers given
     - keeps track with an array
     - adds to the array and keeps track of the array's length
   - have the questions show up randomly with Math.floor(math.random)
   - user would have to answer all of the questions
4. If the user finishes all of the questions in the time frame
   - then a div of the total Tally shows up
   - if the user runs out of time
     - the screen shows that they ran out of time
5. The game resets itself
