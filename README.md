## Run MyNews
`npm install` and `npm start`

## Important notes
### APIs
- **News API** used for search results is only free during development, meaning it only works with requests coming from "localhost:port". If you access the app on mobile, using the IP address of the PC running it in your local network combined with the port, an attempt to search the news through input will respectively throw an error. <br />
- **NYT API** only allows 5 requests per minute, if you exceed the limit, an error will be thrown. In such a case, wait a couple of seconds before reloading the app :&#x29; <br />     

### Testing
- **Cross-browser testing:** Google Chrome, Mozilla Firefox, MS Edge, Opera and Safari <br />
- **OS testing:** Windows, Android, Mac and iOS <br />
- **Screen readers testing:** NVDA and Windows Narrator with both Google Chrome and Mozilla Firefox <br />

### Accessibility
- **Aria:** aria labels have been set for all buttons which contain SVGs instead of text content, as well as banner buttons and input field. <br />
- **Keyboard navigation:** Latest news widget is currently hidden from screen readers and its child anchor elements are prevented from being focused since the app's behaviour in the main grid needs to be programmed differently from the default. <br />  
- With these modifications, MyNews is **100% keyboard navigable** and users still have access to thousands of articles across different categories. <br />

## Design and functionality choices
### Layout
-  Header and navigation are in a fixed position for swift and easy access. <br />
- The main grid's columns, search filter, article cards, widget and mobile menu all have responsive widths, allowing the app to display as intended on any viewport width from 250 pixels and above <br />
- The Latest news widget also has a responsive height, making its container fully visible without having to scroll the app <br />
- The main grid renders from one to three columns respective to the viewport's width and mobile/desktop version of styling. <br />
- Mobile styling currently always renders a single column and desktop view from two to three, but both can be easily adjusted to increase mobile up to two and add a desired maximum amount for desktop. <br /> 

### Favorites category - saving articles
- Each article card contains a heart shaped button as a mechanism for saving favorite articles. 
-  When clicked, its styling changes from an outline to a full heart and article's category name to "favorite". Both of these changes will persist and display as such in any found instance of the saved article unless the user decides to revert the action by clicking on the heart button again. By making these changes consistent across all categories/article instances, spotting already saved articles becomes easy. <br />
- I opted for this design because heart is a universal symbol for something we love, which makes its function apparent to the majority of users. In addition, an explanatory message is displayed under the "Favorites" category when there are no saved articles just in case users need clarification. <br /> 
- Favorites are stored and pulled from the browser's localStorage to ensure they aren't lost upon closing the app.  <br />    

### Other
- The loader is used by the main grid and the widget. Its animation remains the same for both, however colors, size and placement have been adjusted to fit the instance in which it occurs. <br />
- Custom error message <br />
- Custom image placeholder in case of an error <br />
- Custom modal window for setting the page as the browser's homepage <br />
  - Modal consists of: <br />
    - A dropdown menu to select one of the five most used desktop browsers. The default is set to Chrome as it's currently the most popular one <br />
    - An ordered list of instructions on how to set MyNews as the homepage respective to the chosen browser   <br />
    - A link to the section of the selected browser's support page in case users encounter any issues <br />